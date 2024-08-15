<template>
  <div class="content-wrapper" style="min-height: 1301.28px">
    <AddNewGame
      v-if="permission.canCreate"
      :show="addNewGame"
      :supCurrency="supCurrency"
      :supportDevice="supportDevice"
      :supportPlatform="supportPlatform"
      :providersData="providersData"
      :gameTypeList="gameTypeList"
      :newGameTypeList="newGameTypeList"
      :checkGameList="gameList"
      @close="addNewGame = false"
      @updateGameList="updateGameList"
    />
    <!-- <DownloadExcel
      :data="this.gameList"
      :fields="excelFields"
      :name="excelFileName"
      :filename="excelFileName"
      :sheet-name="excelSheetName"
      :button-text="excelButtonText"
      :class-name="excelButtonClass"
      @download-excel="handleDownloadExcel"
    /> -->
    <GameDetail
      v-if="permission.canRead"
      :show="showGameData"
      :gameDetail="gameDetail"
      :supCurrency="supCurrency"
      :supportDevice="supportDevice"
      :supportPlatform="supportPlatform"
      :providersData="providersData"
      :permission="permission"
      :gameTypeList="gameTypeList"
      :newGameTypeList="newGameTypeList"
      @close="showGameData = false"
      @updateGameList="updateGameList"
    />
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Game List</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <router-link
                  :to="'/home'"
                  @click="$store.commit('changeCurrentItem', 'Game List')"
                  >Home</router-link
                >
              </li>
              <li class="breadcrumb-item active">Game List</li>
            </ol>
          </div>
        </div>
      </div>
      <!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">All of games</h3>
              </div>
              <!-- /.card-header -->
              <div class="card-body">
                <div
                  id="example1_wrapper"
                  class="dataTables_wrapper dt-bootstrap4"
                >
                  <Search
                    :newGameTypeList="newGameTypeList"
                    @keyword-search="keyWord = $event"
                    @provider-search="keyWordProvider = $event"
                    @new-game-type-search="keyWordNewGameType = $event"
                    @reload="reloadGameList"
                    @download-excel="handleDownloadExcel()"
                    :filterOptions="searchFilterOptions"
                  />
                  <Button
                    :permission="permission"
                    @addNewGame="addNewGame = true"
                    @selectBtn="selectBtn($event)"
                  />
                  <GameListContent
                    v-if="permission.canRead"
                    :gameListTitles="gameListTitles"
                    :keywordGameList="keywordGameList"
                    :providersData="providersData"
                    :start="start"
                    :end="end"
                    :reset="reset"
                    @showDetail="showDetail($event)"
                    @selectGame="selectGame($event)"
                    @over="reset = false"
                  />
                  <Page
                    :perpagenum="PerPageNum"
                    :list="keywordGameList"
                    :start="start"
                    :end="end"
                    v-model="currentPage"
                    @updatepage="updatePage($event)"
                    @changePerPageNum="changePerPageNum"
                  />
                </div>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container-fluid -->
    </section>
    <!-- /.content -->
  </div>
</template>

<script>
import Search from "../common/Search.vue";
import Page from "../common/Page.vue";
import GameListContent from "./GameListContent.vue";
import GameDetail from "./GameDetail.vue";
import AddNewGame from "./AddNewGame.vue";
import Button from "./Button.vue";
import { permissionsPage } from "../../importJsFile/constStore.js";
import * as XLSX from 'xlsx';

export default {
  name: "GameList",
  components: {
    Search,
    Button,
    Page,
    GameListContent,
    GameDetail,
    AddNewGame,
  },
  data() {
    return {
      gameListTitles: [
        "GAME PROVIDER",
        "GAME ID",
        "GAME RANK",
        "GAME NAME",
        "REMARK",
        "IS ENABLED",
        "IS UM",
        "IS RETIRED",
        "MORE",
      ],
      supCurrency: [],
      supportDevice: [
        "d",
        "m",
        "d/m",
      ],
      supportPlatform: [
        "HTML5",
      ],
      gameList: [],
      gameTypeList: [],
      newGameTypeList: [],
      keywordGameList: [],
      keyWord: "",
      keyWordProvider: 0,
      keyWordNewGameType: -1,
      PerPageNum: 15,
      start: 0,
      end: 15,
      showGameData: false,
      addNewGame: false,
      gameDetail: {},
      selectGameList: [],
      reset: false,
      currentPage: 1,
      searchFilterOptions: {
        byProviderList: true,
        byProviderType: false,
        byProviderName: true,
        showDownloadExcel: true,
        showUploadExcel: true,
        byNewGameType: true,
      },
    };
  },
  computed: {
    providersData() {
      return this.$store.state.providersData;
    },
    permission() {
      return { ...this.$store.state.userPermissions[permissionsPage.gamePage] };
    },
  },
  emits: ["updateProvidersData"],
  methods: {
    handleDownloadExcel() {
      const extractedData = this.keywordGameList.map(game => {
        return {
          "Game Provider": this.getProviderName(game.gameProviderId),
          "GpId": game.gameProviderId,
          "GameId": game.gameId,
          "Game Rank": game.rank,
          "GameType": game.gameType,
          "Game Name": (game.gameLanguages.length != 0)?game.gameLanguages[0].gameName:"",
          "Remark": game.remark,
          "IsEnabled": game.isEnabled,
          "IsUM": game.isUnderMaintain,
          "IsRetired": game.isRetired,
          "IsJackpot": game.isJackpot,
          "IsNewGame": game.isNewGame,
          "RTP": game.rtp,
          "Rows": game.rows,
          "Reels": game.reels,
          "Lines": game.lines,
          "Device": game.device,
          "Platform": game.platform,
          "SubProvider": game.provider,
          "GameCode": game.gameCode,
          "GameCode1": game.gameCode1,
          "GameCode2": game.gameCode2,
          "GameChineseName": (game.gameLanguages.length > 1)?game.gameLanguages[1].gameName:"",
          "SupportedCurrency": (game.supportedCurrencies.length > 0)?
            game.supportedCurrencies.join(", "):game.providerSupportedCurrencies.join(", "),
          "HasBuyFreeSpin": game.hasBuyFreeSpin
        };
      });

      const worksheet = XLSX.utils.json_to_sheet(extractedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

      const excelBuffer = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'GameList-data.xlsx';
      link.click();
      URL.revokeObjectURL(url);
    },
    getProviderName(providerId){
      let providerData = this.$store.state.providersData.find((x)=>x.id == providerId);
      if(providerData!=null){
        return providerData.name;
      }
      else{
        return "";
      }
    },
    updateGameList() {
      //刷新providers
      this.$store.dispatch("getProviderAPI").then((res) => {
        if (res.data.errorCode === 0) {
          this.$store.commit("setProvidersData", res.data.data.gameProviders);
          this.getGameListAll();
        }
      });
    },
    //取得所有資料(API)
    getGameListAll() {
      let loader = this.$loading.show();
      let $this = this;
      this.$store.dispatch("getGameListAPI", $this.keyWordProvider).then((res) => {
        if (res.data.errorCode === 0) {
          this.gameList = res.data.data.games;
          $this.searchGame($this.keyWord, $this.keyWordProvider, $this.keyWordNewGameType);
        }
        loader.hide();
      });
    },
    getGameTypesAll() {
      this.$store.dispatch("getGameTypeAPI").then((res) => {
        if (res.data.errorCode === 0) {
          this.gameTypeList = res.data.data.gameTypes;
        }
      });
      this.$store.dispatch("getNewGameTypeAPI").then((res) => {
        if (res.data.errorCode === 0) {
          this.newGameTypeList = res.data.data.gameTypes;
        }
      });
    },
    showDetail(data) {
      this.showGameData = true;
      this.gameDetail = data;
    },
    //各分頁顯示資料
    updatePage(page) {
      this.reset = true;
      const start = (page - 1) * this.PerPageNum;
      const end =
        start + this.PerPageNum <= this.keywordGameList.length
          ? start + this.PerPageNum
          : this.keywordGameList.length;
      this.start = start;
      this.end = end;
    },
    selectBtn(action) {
      if (this.selectGameList.length > 0) {
        swal(
          "Are you sure to update game status for these games? Please input your reason here.",
          {
            content: "input",
            buttons: true,
          }
        ).then((value) => {
          if (value !== "" && value !== null) {
            this.$store
              .dispatch("updateGameStatusAPI", {
                action,
                games: this.selectGameList,
                reason: value,
              })
              .then((res) => {
                this.reset = true;
                if (res.data.errorCode !== 0) {
                  swal("Something is wrong !", "Fail to update.", "error", {
                    button: "OK",
                  });
                } else {
                  this.selectGameList = [];
                  this.updateGameList();
                  swal(
                    "Success !",
                    "Success to update those game.",
                    "success",
                    {
                      button: "OK",
                    }
                  );
                }
              });
          } else if (value === "") {
            swal("You can't do it", "Please enter the reason", "error", {
              button: "OK",
            });
          }
        });
      } else {
        swal("You can't do it", "You didn't choose any option.", "error", {
          button: "OK",
        });
      }
    },
    selectGame(checkedList) {
      this.selectGameList = checkedList;
    },
    searchGame() {
      let keyWord = this.keyWord;
      let providerId = this.keyWordProvider;
      let newGameTypeId = this.keyWordNewGameType;

      this.keywordGameList = this.gameList;

      if (providerId != -1) {
        this.keywordGameList = this.keywordGameList.filter(game =>
          {
            return game.gameProviderId == providerId;
          });
      }
      if (newGameTypeId != -1) {
        this.keywordGameList = this.keywordGameList.filter(game =>
          {
            return game.newGameType == newGameTypeId;
          });
      }
      if (keyWord != "") {
        this.keywordGameList = this.keywordGameList.filter(game =>
          {
            if (game.gameLanguages.length != 0){
              return game.gameLanguages[0].gameName
              .toLowerCase().includes(keyWord.toLowerCase())
            }
          });
      }
    },
    reloadByKeyword() {
        this.searchGame();
        this.currentPage = 1;
        this.updatePage(1);
    },
    reloadGameList() {
        this.keyWord = "";
        this.keyWordNewGameType = -1;
        this.getGameListAll();
    },
    getAllCurrency() {
      this.$store.dispatch("getAllCurrency").then((res) => {
        if (res.data.errorCode === 0) {
          this.supCurrency = res.data.data.currency;
        }
      });
    },
    changePerPageNum(perpagenum) {
      this.PerPageNum = perpagenum;
    },
    getNewGameTypeAll() {
      this.$store.dispatch("getNewGameTypeAPI").then((res) => {
        if (res.data.errorCode === 0) {
          this.$store.commit("setNewGameTypesData", res.data.data.gameTypes);
        }
      });
    }
  },
  watch: {
    keyWord() {
      this.reloadByKeyword();
    },
    keyWordProvider() {
      this.getGameListAll();
      this.currentPage = 1;
    },
    keyWordNewGameType() {
      this.reloadByKeyword();
    },
  },
  created() {
    this.getGameListAll();
    this.getGameTypesAll();
    this.getAllCurrency();
    this.getNewGameTypeAll();
  },
};
</script>

<style lang="scss" scoped>
.content-wrapper {
  position: relative;
}
</style>
