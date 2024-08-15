import { createStore } from 'vuex'
import { permissionsPage } from "../importJsFile/constStore.js";
import { fakeAPI } from "../importJsFile/fakeAPI.js";
import { rwd } from "../importJsFile/rwd.js";
import { multipleExportExcel } from "../importJsFile/excelHelper.js";
import createPersistedState from "vuex-persistedstate";
import axios from 'axios';
import { last, orderBy } from 'lodash';
import { Provider } from '../types/provider.js';

function createInstance() {
  return axios.create({
    baseURL: import.meta.env.VUE_APP_API_URL
  });
}
// Please modify this columns property {key: value} follow the api return properties /GameProvider/GetAll
// key = api property name, value is label to display on table and dropdown
const allProviderColumnByName = {
  id: {
    label: "GPID",
    align: 'center'
  },
  name: {
    label: "Game Provider",
    align: 'left'
  },
  providerNameCN: {
    label: "Provider Name CN",
    align: 'left'
  },
  providerStatus: {
    label: "Provider Status",
    align: 'center',
  },
  providerType: {
    label: "Provider Type",
    align: 'center'
  },
  isUM:{
    label: "IS UM",
    align: 'center'
  },
  onlineDate: {
    label: "Online Date",
    align: 'left'
  },
  remark:{
    label: "Provider State Remark",
    align: 'left'
  },
  providerSupportCurrency: {
    label: "Provider Support Currency",
    align: 'left'
  },
  currencyRemark: {
    label: "Currency Remark",
    align: 'left',
  },
  nameEn: {
    label: "Provider Name EN",
    align: 'left'
  },
  __568WinSupportCurrency:{
    label:  "568Win Support Currency",
    align: 'left'
  },
  providerSupportLanguage: {
    label: "Provider Support Language",
    align: 'left'
  },
  serverUrl:  {
    label: "ServerUrl",
    align: 'left'
  },
  blockCountries: {
    label: "Block Country",
    align: 'left'
  },
  providerCurrencyRegionRestrictions: {
    label: "Currency/Region Restriction",
    align: 'left'
  },
  customerSupportCurrency: {
    label: "Customer Support Currency",
    align: 'left'
  },
  customerSupportLanguage: {
    label:  "Customer Support Language",
    align: 'left'
  },
  isCanPlaceBetOnBothSide: {
    label: "Can Place Bet On Both Side",
    align: 'center'
  },
  isCustomizedBetLimit: {
    label: "Customized BetLimit",
    align: 'center'
  },
  haveRaiseBet: {
    label: "Have Raise Bet",
    align: 'center'
  },
  commissionStake: {
    label: "Commission Stake",
    align: 'center'
  },
  isHaveCheckSum: {
    label: "Checksum",
    align: 'center'
  },
  provideJackpotGame: {
    label: "Provide Jackpot Game",
    align: 'center'
  },
  needDisableJackpot: {
    label: "Need Disable Jackpot",
    align: 'center'
  },
  jackpotRemark: {
    label: "Jackpot Remark",
    align: 'left'
  },
  providerWalletType: {
    label: "Provider Wallet Type",
    align: 'center'
  },
  bettingReplay:{
    label:  "Betting Video",
    align: 'center'
  },
  isBetListHaveTextDetail: {
    label: "Bet list have text detail",
    align: 'center'
  },
  timeoutTime: {
    label: "Timeout",
    align: 'left'
  },
  officeIPEnable: {
    label: "Office IP Enable",
    align: 'center'
  },
  isSupportedIPv6: {
    label: "Supported IPv6",
    align: 'center'
  },
  isHavePromotion: {
    label: "Is Game Provider Promotion",
    align: 'center'
  },
  differentPrices: {
    label: "Different Prices",
    align: 'center'
  },
  isNeedAskToOpenNewCurrency: {
    label: "Is Need Ask To Open New Currency",
    align: 'center'
  },
  IsHavingHA: {
    label: "IsHavingHA",
    align: 'center'
  },
  isPlayerLeaveGameWillCausePendingBet: {
    label: "Player Leave Game Will Cause Pending Bet",
    align: 'center'
  },
  longestTimeForAutoFinishGame: {
    label: "Longest time for auto finish game",
    align: 'center'
  },
  isCanAskProviderManualSettle: {
    label: "Can we ask provider manual settle",
    align: 'center'
  },
  ourSystemHaveResendSettle: {
    label: "Is Our System Have Resend Settle",
    align: 'center'
  }
};
const getColumnsProps = Object.keys(allProviderColumnByName)
const defaultHiddenColumns = ["nameEn", "providerNameCN", "providerSupportLanguage", "serverUrl", "blockCountries", "providerCurrencyRegionRestrictions", "customerSupportCurrency", "customerSupportLanguage", "isCanPlaceBetOnBothSide", "isCustomizedBetLimit", "haveRaiseBet",
  "commissionStake", "isHaveCheckSum", "provideJackpotGame", "needDisableJackpot", "jackpotRemark", "providerWalletType", "bettingReplay", "isBetListHaveTextDetail", "timeoutTime",
  "officeIPEnable", "isSupportedIPv6", "isHavePromotion", "differentPrices", "isNeedAskToOpenNewCurrency", "IsHavingHA", "isPlayerLeaveGameWillCausePendingBet", "longestTimeForAutoFinishGame",
  "isCanAskProviderManualSettle", "ourSystemHaveResendSettle"]
// console.log('getColumnsProps = ', getColumnsProps.length);
let defaultProvidersTableColumns = [];
if (!defaultProvidersTableColumns.length) {
  getColumnsProps.map(function (columnName, _columnIndex) {
      const isHideByDefault = defaultHiddenColumns.includes(columnName);
      defaultProvidersTableColumns.push({
        label: allProviderColumnByName[columnName].label || 'Undefined',
        value: _columnIndex + 1,
        show: !isHideByDefault,
        columnIndex: _columnIndex,
        displayOrderIndex: _columnIndex + 1,
        props: columnName,
        // props: columnName !== 'nameEn' ? columnName : 'name',
        filterShow: true,
        align: allProviderColumnByName[columnName].align || 'center'
      });
  });
}
// console.log('defaultProvidersTableColumns = ', defaultProvidersTableColumns);

const apiInstance = createInstance();

export default createStore({
  state: {
    userData: {
      secretKey: "StagingSecretKey",
      username: '',
      sessionToken: '',
    },
    providersData: [],
    userPermissions: [
      {
        page: 'Game Provider Page',
        canRead: false,
        canCreate: false,
        canUpdate: false,
        canDelete: false
      },
      {
        page: 'Game Page',
        canRead: false,
        canCreate: false,
        canUpdate: false,
        canDelete: false
      },
      {
        page: 'Account Management',
        canRead: false,
        canCreate: false,
        canUpdate: false,
        canDelete: false
      },
      {
        page: 'Refresh Game List Cache',
        canRead: false,
        canCreate: false,
        canUpdate: false,
        canDelete: false
      },
    ],
    currentItem: "Game List",
    languageList: ["en", "zh_cn", "zh_tw", "th_th", "id_id", "ja_jp", "vi_vn", "ko_kr"],
    deviceList: ["d", "m", "d/m"],
    hideTableColumns: {
      providers: defaultProvidersTableColumns
    },
  },
  getters: {
    asideList(state) {
      return [
        {
          name: "Game List",
          icon: "fas fa-list-ul",
          path: "/home/gamelist",
          permission: state.userPermissions[permissionsPage.gamePage].canRead
        },
        {
          name: "Refresh Game Cache",
          icon: "fas fa-redo-alt",
          path: "#",
          permission: state.userPermissions[permissionsPage.refreshPage].canRead
        },
        {
          name: "Account Management",
          icon: "fas fa-user-friends",
          path: "/home/account",
          permission: state.userPermissions[permissionsPage.accountPage].canRead
        },
        {
          name: "Provider",
          icon: "far fa-building",
          path: "/home/provider",
          permission: state.userPermissions[permissionsPage.providerPage].canRead
        }
      ]
    },
    addProviderData: state => {
      return {
        secretKey: state.userData.secretKey,
        sessionToken: state.userData.sessionToken,
        id: 0,
        name: '',
        remark: '',
        isUM: false,
        createdBy: state.userData.username,
      }
    },
    updateProviderData(state) {
      return {
        secretKey: state.userData.secretKey,
        sessionToken: state.userData.sessionToken,
        id: 0,
        name: '',
        remark: '',
        isUM: false,
        modifiedBy: state.userData.username
      }
    },
    newGameData(state) {
      return {
        secretKey: state.userData.secretKey,
        sessionToken: state.userData.sessionToken,
        gameProviderId: 0,
        gameId: 0,
        gameType: 0,
        newGameType: 0,
        rank: 1,
        gameCode: "",
        gameCode1: "",
        gameCode2: "",
        gameCode3: "",
        gameCode4: "",
        gameCode5: "",
        device: "",
        platform: "",
        provider: "",
        rtp: 0,
        rows: 0,
        reels: 0,
        lines: 0,
        gameLanguages: [{ gameIconFilePath: "", gameName: "", language: "en", isGameIconOnServer: "true" }],
        supportedCurrencies: [],
        blockedCountries: [],
        isUnderMaintain: false,
        isEnabled: true,
        isRetired: false,
        isJackpot: false,
        isNewGame: true,
        isProvideCommission: false,
        hasHedgeBet: false,
        hasBuyFreeSpin: false,
        remark: "",
        modifiedBy: state.userData.username
      }
    },
    newAccount(state) {
      return {
        secretKey: state.userData.secretKey,
        sessionToken: state.userData.sessionToken,
        username: '',
        password: '',
        permissions: [
          {
            page: state.userPermissions[permissionsPage.providerPage].page,
            canRead: false,
            canCreate: false,
            canUpdate: false,
            canDelete: false
          },
          {
            page: state.userPermissions[permissionsPage.gamePage].page,
            canRead: false,
            canCreate: false,
            canUpdate: false,
            canDelete: false
          },
          {
            page: state.userPermissions[permissionsPage.accountPage].page,
            canRead: false,
            canCreate: false,
            canUpdate: false,
            canDelete: false
          },
          {
            page: state.userPermissions[permissionsPage.refreshPage].page,
            canRead: false,
            canCreate: false,
            canUpdate: false,
            canDelete: false
          },
        ],
        createdBy: state.userData.username
      }
    },
    getDefaultProviderColumnsDropdownList(state) {
      // console.log('getter default', defaultProvidersTableColumns);
      // this function to prevent when update state in js but not update property in localStorage
      const updatingDefaultColumns = JSON.parse(JSON.stringify(defaultProvidersTableColumns));
      updatingDefaultColumns.map(function(defaultColumn, index) {
        state.hideTableColumns.providers.map(function (stateColumn) {
          if ((stateColumn.column === defaultColumn.props )|| (stateColumn.props === defaultColumn.props) ) {
            // console.log('stateColumn = ', stateColumn);
            defaultColumn = {
              ...defaultColumn,
              ...stateColumn,
            }
          } else {
            state.hideTableColumns.providers = state.hideTableColumns.providers.filter(item => (item.column !== stateColumn.column) || (item.props !== stateColumn.props) );
            // console.log('getter changing', state.hideTableColumns.providers);
          
          }
        })
        return defaultColumn;
      });
      return updatingDefaultColumns
    }
  },
  mutations: {
    setUserData(state, userData) {
      state.userData = {
        secretKey: state.userData.secretKey,
        username: userData.username,
        sessionToken: userData.sessionToken
      }
    },
    setProvidersData(state, providersData) {
      state.providersData = providersData
    },
    setUserPermissions(state, promissions) {
      for (let i = 0; i < promissions.length; i++) {
        switch (promissions[i].page) {
          case 'Game Provider Page':
            state.userPermissions[0] = promissions[i];
            break;
          case 'Game Page':
            state.userPermissions[1] = promissions[i];
            break;
          case 'Account Management':
            state.userPermissions[2] = promissions[i];
            break;
          case 'Refresh Game List Cache':
            state.userPermissions[3] = promissions[i];
            break;
        }
      }
    },
    changeCurrentItem(state, name) {
      state.currentItem = name
    },
    setHideTableColumns(state, data) {
      state.hideTableColumns[data.key] = data.value
    }
  },
  actions: {
    refreshTokenAPI({ commit, state }) {
      let url = "/api/Authentication/RefreshToken";
      let data = {
        secretKey: state.userData.secretKey,
        sessionToken: state.userData.sessionToken,
        username: state.userData.username,
      };
      return apiInstance.post(url, data)
    },
    logInAPI({ commit }, data) {
      //連接API
      let url = "/api/authentication/login";
      return apiInstance.post(url, data);
    },
    getProviderAPI({ state }, isForceReload = { isForceReload: false }) {
      let url = "/api/GameProvider/GetAll";
      let data = {
        secretKey: state.userData.secretKey,
        sessionToken: state.userData.sessionToken,
        ...isForceReload
      };
      return apiInstance.post(url, data)
    },
    addProviderAPI(context, data) {
      let url = "/api/GameProvider/Add";
      return apiInstance.post(url, data)
    },
    updateProviderAPI(context, data) {
      let url = "/api/GameProvider/Update";
      return apiInstance.post(url, data)
    },
    getGameListAPI({ state }, providerId) {
      let url = "/api/Game/GetAll";
      let data = {
        secretKey: state.userData.secretKey,
        sessionToken: state.userData.sessionToken,
        providerId: providerId,
      };
      return apiInstance.post(url, data)
    },
    getGameTypeAPI({ state }) {
      let url = "/api/Game/GetAllGameTypes";
      let data = {
        secretKey: state.userData.secretKey,
        sessionToken: state.userData.sessionToken,
      };
      return apiInstance.post(url, data)
    },
    getNewGameTypeAPI({ state }) {
      let url = "/api/Game/GetAllNewGameTypes";
      let data = {
        secretKey: state.userData.secretKey,
        sessionToken: state.userData.sessionToken,
      };
      return apiInstance.post(url, data)
    },
    updateGameAPI({ state }, updateData) {
      let url = "/api/Game/Update";
      let data = {
        secretKey: state.userData.secretKey,
        sessionToken: state.userData.sessionToken,
        modifiedBy: state.userData.username,
        ...updateData
      }
      return apiInstance.post(url, data)
    },
    updateGameRankAPI({ state }, updateData) {
      let url = "/api/Game/UpdateRank";
      let data = {
        secretKey: state.userData.secretKey,
        sessionToken: state.userData.sessionToken,
        modifiedBy: state.userData.username,
        ...updateData
      }
      return apiInstance.post(url, data)
    },
    uploadGameIconAPI({ state }, file) {
      let formData = new FormData();
      formData.append("file", file);
      formData.append("secretKey", state.userData.secretKey);
      formData.append("sessionToken", state.userData.sessionToken);

      let url = '/api/Game/UploadGameIcon';
      return apiInstance.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
    },
    uploadKhGameIconAPI({ state }, updateData) {    
      let url = '/api/Game/UploadKhGameIcon';      
      let formData = new FormData();
      formData.append("file", updateData.iconFile);
      formData.append("secretKey", state.userData.secretKey);
      formData.append("sessionToken", state.userData.sessionToken);
      formData.append("providerId", updateData.ProviderId);
      formData.append("gameId",  updateData.GameId);
      return apiInstance.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
    },
    addNewGameAPI({ state }, newGame) {
      let url = "/api/Game/Add";
      let data = newGame;
      return apiInstance.post(url, data)
    },
    updateGameStatusAPI({ state }, gameData) {
      let url = '/api/Game/UpdateGameStatus';
      let data = {
        secretKey: state.userData.secretKey,
        sessionToken: state.userData.sessionToken,
        games: gameData.games,
        action: gameData.action,
        reason: gameData.reason,
        modifiedBy: state.userData.username
      }
      return apiInstance.post(url, data)
    },
    purgeGameCache({ state }) {
      let url = '/api/Game/PurgeCache'
      let data = {
        secretKey: state.userData.secretKey,
        sessionToken: state.userData.sessionToken,
        modifiedBy: state.userData.username,
      }
      return apiInstance.post(url, data)
    },
    getPermissionAPI({ state }) {
      let url = '/api/Authorization/GetPermissions'
      let data = {
        secretKey: state.userData.secretKey,
        sessionToken: state.userData.sessionToken,
        username: state.userData.username
      }
      return apiInstance.post(url, data)
    },
    getAllUserPermissionAPI({ state }) {
      let url = '/api/Authorization/GetAllUsersWithPermissions';
      let data = {
        secretKey: state.userData.secretKey,
        sessionToken: state.userData.sessionToken,
      }
      return apiInstance.post(url, data)
    },
    createAccountAPI(context, account) {
      let url = '/api/Account/CreateAccount';
      let data = account;
      return apiInstance.post(url, data)
    },
    updateAccountPwdAPI({ state }, userData) {
      let url = '/api/Account/UpdatePassword'
      let data = {
        secretKey: state.userData.secretKey,
        sessionToken: state.userData.sessionToken,
        username: userData.username,
        password: userData.password,
        modifiedBy: state.userData.username
      }
      return apiInstance.post(url, data)
    },
    updatePermissionAPI({ state }, userData) {
      let url = '/api/Authorization/UpdatePermissions'
      let data = {
        secretKey: state.userData.secretKey,
        sessionToken: state.userData.sessionToken,
        username: userData.username,
        permissions: userData.permissions,
        modifiedBy: state.userData.username
      }
      return apiInstance.post(url, data)
    },
    getAllCurrency({ state }) {
      let url = "/api/Game/GetAllCurrency";
      let data = {
        secretKey: state.userData.secretKey,
        sessionToken: state.userData.sessionToken,
        modifiedBy: state.userData.username,
      }
      return apiInstance.post(url,data)
    },
    exportExcel({ state }, data) {
      const colorBlack = '000000';
      const colorRed = 'FF0000';
      const colorGreen = '00FF00';
      const bgWhite = 'FFFFFF';
      const columns = orderBy(state.hideTableColumns['providers'], 'columnIndex').filter((column) => column.show);
      const columnHeaders = columns.map((column) => column.label);
      const exportedData= data.map(
        (item) => {
          const providerFormat = new Provider(item);
          const rowData = [];
          columns.forEach((header) => {
            const columnValue = providerFormat[header.column];
            const value = (typeof columnValue === 'object' && columnValue !== null) ? columnValue.name : columnValue;
            const bgColor = (typeof columnValue === 'object' && columnValue !== null) ? columnValue.color : bgWhite;
            const color = !['✔️', '❌'].includes(columnValue) ? colorBlack : columnValue === '✔️' ? (header.column !== 'isUM' ? colorGreen : colorRed) : colorRed;
            rowData.push({
              value,
              color,
              align: header.align,
              bgColor: bgColor.replace('#', ''),
            });
          });

          return rowData; 
        });
        
      const tableData = [
        {
          tableName: 'Betting Record',
          data: exportedData,
          columnHeaders,
          mergeFirstCell: 0,
        },
      ];

      multipleExportExcel({
        tables: tableData,
        title: 'Provider List',
        fileName: 'provider_list',
      });
    },
  },
  modules: {
    fakeAPI,
    rwd
  },
  plugins: [createPersistedState()]
})
