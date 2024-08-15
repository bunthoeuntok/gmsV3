<template>
  <div class="row">
    <div class="col-sm-12 sticky-main-container">
      <!-- <table
        id="example1"
        class="table table-bordered table-striped dataTable dtr-inline"
        role="grid"
        aria-describedby="example1_info"
      >
        <thead>
          <tr role="row"> -->
            <!-- <th class="sorting sorting_asc" tabindex="0" aria-controls="example1" rowspan="1" colspan="1" aria-label="Rendering engine: activate to sort column descending" aria-sort="ascending">Rendering engine</th> -->
            <!-- <th
              v-for="(title, index) in providerTitles"
              :key="index"
              class="sorting"
              tabindex="0"
              aria-controls="example1"
              rowspan="1"
              colspan="1"
            >
              {{ title }}
              <a href="#" v-if="index === 0" @click="sortById">
                <i class="fas fa-sort-numeric-down" v-if="!idSort.sortDesc"></i>
                <i
                  class="fas fa-sort-numeric-up-alt"
                  v-if="idSort.sortDesc"
                ></i>
              </a>
              <a href="#" v-if="index === 1" @click="sortByName">
                <i class="fas fa-sort-alpha-down" v-if="!nameSort.sortDesc"></i>
                <i
                  class="fas fa-sort-alpha-up-alt"
                  v-if="nameSort.sortDesc"
                ></i>
              </a>
            </th>
            <th
              v-if="canUpdate || canCreate"
              class="sorting"
              tabindex="0"
              aria-controls="example1"
              rowspan="1"
            >
              <button
                v-if="canUpdate || canCreate"
                type="button"
                class="btn btn-block btn-primary btn-xs"
                @click="clickAddProvider"
                :disabled="!canCreate"
              >
                {{ addProviderBtn }}
              </button>
            </th>
          </tr>
        </thead>
        <tbody> -->
          <!-- Add New Provider -->
          <!-- <tr v-if="showAdd">
            <td>
              <input
                type="text"
                class="form-control"
                placeholder="ID"
                v-model="addProviderData.id"
              />
            </td>
            <td>
              <input
                type="text"
                class="form-control"
                placeholder="name"
                v-model="addProviderData.name"
              />
            </td>
            <td>
              <input
                type="checkbox"
                class="form-control"
                v-model="addProviderData.isUM"
              />
            </td>
            <td>
              <textarea
                class="form-control"
                rows="3"
                placeholder="Enter ..."
                v-model="addProviderData.remark"
              ></textarea>
            </td>
            <td>
              <button
                type="button"
                class="btn btn-block btn-warning btn-xs"
                @click="addProvider"
                :disabled="!canUpdate"
              >
                Save
              </button>
            </td>
          </tr> -->
          <!-- Providers Data -->
          <!-- <tr v-for="provider in displayProviders" :key="provider.id">
            <td class="dtr-control sorting_1" tabindex="0">
              <span class="data">{{ provider.id }}</span>
              <input
                type="text"
                class="form-control edit"
                v-model.number="updateProviderItem.id"
              />
            </td>
            <td>
              <span class="data">{{ provider.name }}</span>
              <input
                type="text"
                class="form-control edit"
                v-model.trim="updateProviderItem.name"
              />
            </td>
            <td>
              <input
                type="checkbox"
                class="form-control data"
                v-model="provider.isUM"
                disabled
              />
              <input
                v-if="canUpdate"
                type="checkbox"
                class="form-control edit"
                v-model="updateProviderItem.isUM"
              />
            </td>
            <td>
              <span class="data">{{ provider.remark }}</span>
              <textarea
                class="form-control edit"
                v-model.trim="updateProviderItem.remark"
              ></textarea>
            </td>
            <td v-if="canUpdate || canCreate">
              <button
                v-if="canUpdate || canCreate"
                type="button"
                class="btn btn-block btn-warning btn-xs data"
                @click="showUpdate($event, provider)"
                :disabled="!canUpdate"
              >
                Edit
              </button>
              <button
                v-if="canUpdate || canCreate"
                type="button"
                class="btn btn-block btn-warning btn-xs edit"
                @click="
                  updateProvider(
                    updateProviderItem.id,
                    updateProviderItem.name,
                    updateProviderItem.isUM,
                    updateProviderItem.remark,
                    $event
                  )
                "
                :disabled="!canUpdate"
              >
                Save
              </button>
              <button
                v-if="canUpdate || canCreate"
                type="button"
                class="btn btn-block btn-warning btn-xs data cancel"
                @click="
                  showUpdate($event, {
                    id: 0,
                    name: '',
                    isUM: false,
                    remark: '',
                  })
                "
                :disabled="!canUpdate"
              >
                Cancel
              </button>
            </td>
          </tr>
        </tbody>
      </table> -->
      <el-table
        :data="tableData"
        border
        stripe
        tooltip-effect="light"
        style="width: 100%; margin-bottom: 20px; height: calc(100vh - 40px);"
        :header-cell-style="{textAlign: 'center'}"
        class="provider-info"
      >
        <el-table-column v-if="getShowProperty('id')" align="center" prop="id" label="GPID" width="70" sortable fixed="left" />
        <el-table-column v-if="getShowProperty('name')" prop="name" label="Game Provider" width="150" sortable fixed="left" />
        <el-table-column v-if="getShowProperty('providerStatus')" align="center" label="Provider Status" min-width="140">
          <template #default="scope">
            <el-tag v-if="displayProviderStatus(scope.row.providerStatus).name" round effect="light" :color="displayProviderStatus(scope.row.providerStatus).color" class="border-0">
              {{ displayProviderStatus(scope.row.providerStatus).name }}
            </el-tag>
            <span v-else="scope.row.providerStatus !== displayProviderStatus(scope.row.providerStatus).name"> {{ '--' }}-{{ scope.row.providerStatus }}  </span>
          </template>
        </el-table-column>
        <el-table-column v-if="getShowProperty('providerType')" align="center" label="Provider Type" width="130">
          <template #default="scope">
            <template v-if="displayProviderType(scope.row.providerType) !== '--'">
              <el-tag
                round effect="light" 
                :color="displayProviderType(scope.row.providerType).color" 
                class="border-0 type"
              >
                {{ displayProviderType(scope.row.providerType).name }}
              </el-tag>
            </template>
            <template v-else>
              <span>--</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column v-if="getShowProperty('isUM')" align="center" label="IS UM" width="70">
          <template #default="scope">
            <el-checkbox disabled v-model="scope.row.isUM" />
          </template>
        </el-table-column>
        <el-table-column v-if="getShowProperty('nameEn')" prop="name" label="Provider Name EN" width="180" />
        <el-table-column v-if="getShowProperty('providerNameCN')" prop="providerNameCN" label="Provider Name CN" width="180" />
        <el-table-column v-if="getShowProperty('onlineDate')" label="Online Date" width="120">
          <template #default="scope">
            <p class="mb-0">{{ scope.row.onlineDate ? formatDate(scope.row.onlineDate) : '-' }}</p>
          </template>
        </el-table-column>
        <el-table-column v-if="getShowProperty('remark')" prop="remark" label="Provider State Remark" width="400" show-overflow-tooltip/>
        <el-table-column v-if="getShowProperty('providerSupportCurrency')"  prop="providerSupportCurrency" label="Provider Support Currency" width="400" show-overflow-tooltip/>
        <el-table-column v-if="getShowProperty('currencyRemark')" prop="currencyRemark" label="Currency Remark" width="200" show-overflow-tooltip/>
        <el-table-column v-if="getShowProperty('568WinSupportCurrency')" prop="568WinSupportCurrency" label="568Win Support Currency" width="200" show-overflow-tooltip/>
        <el-table-column v-if="getShowProperty('providerSupportLanguage')" prop="providerSupportLanguage" label="Provider Support Language" width="400" show-overflow-tooltip/>
        <el-table-column v-if="getShowProperty('serverUrl')" prop="serverUrl" label="ServerUrl" width="200" />
        <el-table-column v-if="getShowProperty('blockCountries')" prop="blockCountries" label="Block Country" width="400" show-overflow-tooltip/>
        <el-table-column v-if="getShowProperty('providerCurrencyRegionRestrictions')" label="Currency/Region Restriction" width="150">
          <template #default="scope">
            {{ scope.row.providerCurrencyRegionRestrictions }}
          </template>
        </el-table-column>
        <el-table-column v-if="getShowProperty('customerSupportCurrency')" prop="customerSupportCurrency" label="568Win Support Currency" width="200" show-overflow-tooltip/>
        <el-table-column v-if="getShowProperty('customerSupportLanguage')" prop="customerSupportLanguage" label="Customer Support Language" width="180" />
        <el-table-column v-if="getShowProperty('isCanPlaceBetOnBothSide')" align="center" label="Can Place Bet On Both Side" width="100">
          <template #default="scope">
            <el-checkbox disabled v-model="scope.row.isCanPlaceBetOnBothSide" />
          </template>
        </el-table-column>
        <el-table-column v-if="getShowProperty('isCustomizedBetLimit')" align="center" label="Customized BetLimit" width="100">
          <template #default="scope">
            <el-checkbox disabled v-model="scope.row.isCustomizedBetLimit" />
          </template>
        </el-table-column>
        <el-table-column v-if="getShowProperty('haveRaiseBet')" align="center" label="Have Raise Bet" width="130">
          <template #default="scope">
            <el-tag v-if="displayHaveRaiseBet(scope.row.haveRaiseBet).name" round effect="light" :color="displayHaveRaiseBet(scope.row.haveRaiseBet).color" class="border-0">
              <span class="truncate">{{ displayHaveRaiseBet(scope.row.haveRaiseBet).name }}</span>
            </el-tag>
            <span v-else="scope.row.haveRaiseBet !== displayHaveRaiseBet(scope.row.haveRaiseBet).name"> {{ '--' }} </span>
          </template>
        </el-table-column>
        <!-- <el-table-column v-if="getShowProperty('isHaveCheckSum')" align="center" label="Have Commission Stake" width="130">
          <template #default="scope">
            <el-checkbox disabled v-model="scope.row.isHaveCheckSum" />
          </template>
        </el-table-column> -->
        <el-table-column v-if="getShowProperty('commissionStake')" align="center" label="Commission Stake" width="300">
          <template #default="scope">
            <el-tag v-if="displayCommissionStake(scope.row.commissionStake).name" round effect="light" :color="displayCommissionStake(scope.row.commissionStake).color" class="truncate border-0">
              {{ displayCommissionStake(scope.row.commissionStake).name }}
            </el-tag>
            <span v-else="scope.row.commissionStake !== displayCommissionStake(scope.row.commissionStake).name"> {{ '--' }}  </span>
          </template>
        </el-table-column>
        <el-table-column v-if="getShowProperty('isHaveCheckSum')" align="center" prop="isHaveCheckSum" label="Checksum" width="100">
          <template #default="scope">
            <el-checkbox disabled v-model="scope.row.isHaveCheckSum" />
          </template>
        </el-table-column>
        <el-table-column v-if="getShowProperty('provideJackpotGame')" align="center" label="Provide Jackpot Game" width="100" >
          <template #default="scope">
            <el-checkbox disabled v-model="scope.row.provideJackpotGame" />
          </template>
        </el-table-column>
        <el-table-column v-if="getShowProperty('needDisableJackpot')" align="center" label="Need Disable Jackpot" width="100" >
          <template #default="scope">
            <el-checkbox disabled v-model="scope.row.needDisableJackpot" />
          </template>
        </el-table-column>
        <el-table-column v-if="getShowProperty('jackpotRemark')" prop="jackpotRemark" label="Jackport Remark" width="400" show-overflow-tooltip/>
        <el-table-column v-if="getShowProperty('providerWalletType')" align="center" label="Provider Wallet Type" width="150">
          <template #default="scope">
            <el-tag v-if="displayProviderWalletType(scope.row.providerWalletType).name" round effect="light" :color="displayProviderWalletType(scope.row.providerWalletType).color" class="truncate border-0">
              {{ displayProviderWalletType(scope.row.providerWalletType).name }}
            </el-tag>
            <span v-else="scope.row.providerWalletType !== displayProviderWalletType(scope.row.providerWalletType).name"> {{ '--' }}  </span>
          </template>
        </el-table-column>
        <el-table-column v-if="getShowProperty('bettingReplay')" align="center" label="Betting Video" width="150">
          <template #default="scope">
            <el-tag v-if="displayBettingVideo(scope.row.bettingReplay).name" round effect="light" :color="displayBettingVideo(scope.row.bettingReplay).color" class="truncate border-0">
              {{ displayBettingVideo(scope.row.bettingReplay).name }}
            </el-tag>
            <span v-else="scope.row.bettingReplay !== displayBettingVideo(scope.row.bettingReplay).name"> {{ '--' }}  </span>
          </template>
        </el-table-column>
        <el-table-column v-if="getShowProperty(isBetListHaveTextDetail)" align="center" label="Bet List Have Text Detail" width="100">
          <template #default="scope">
            <el-checkbox disabled v-model="scope.row.isBetListHaveTextDetail" />
          </template>
        </el-table-column>
        <el-table-column v-if="getShowProperty(timeoutTime)" prop="timeoutTime" label="Timeout" width="200" />
        <el-table-column v-if="getShowProperty(officeIPEnable)" align="center" label="Office IP Enable" width="120">
          <template #default="scope">
            <el-tag v-if="displayHaveRaiseBet(scope.row.officeIPEnable).name" round effect="light" :color="displayHaveRaiseBet(scope.row.officeIPEnable).color" class="border-0">
              {{ displayHaveRaiseBet(scope.row.officeIPEnable).name }}
            </el-tag>
            <span v-else="scope.row.officeIPEnable !== displayHaveRaiseBet(scope.row.officeIPEnable).name"> {{ '--' }}  </span>
          </template>
        </el-table-column>
        <el-table-column v-if="getShowProperty(isSupportedIPv6)" align="center" label="Supported IPv6" width="100">
          <template #default="scope">
            <el-checkbox disabled v-model="scope.row.isSupportedIPv6" />
          </template>
        </el-table-column>
        <el-table-column v-if="getShowProperty(isHavePromotion)" align="center" label="Is Game Provider Promotion" width="120">
          <template #default="scope">
            <el-checkbox disabled v-model="scope.row.isHavePromotion" />
          </template>
        </el-table-column>
        <el-table-column v-if="getShowProperty(differentPrices)" align="center" label="Different Prices" width="200" >
          <template #default="scope">
            <el-tag v-if="displayDifferentPrices(scope.row.differentPrices).name" round effect="light" :color="displayDifferentPrices(scope.row.differentPrices).color" class="truncate border-0">
              {{ displayDifferentPrices(scope.row.differentPrices).name }}
            </el-tag>
            <span v-else="scope.row.differentPrices !== displayDifferentPrices(scope.row.differentPrices).name"> {{ '--' }}  </span>
          </template>
        </el-table-column>
        <el-table-column v-if="getShowProperty(isNeedAskToOpenNewCurrency)" align="center" label="Is Need Ask To Open New Currency" width="140">
          <template #default="scope">
            <el-checkbox disabled v-model="scope.row.isNeedAskToOpenNewCurrency" />
          </template>
        </el-table-column>
        <el-table-column v-if="getShowProperty(isHavingHA)" align="center" label="IsHavingHA" width="100">
          <template #default="scope">
            <el-checkbox disabled v-model="scope.row.isHavingHA" />
          </template>
        </el-table-column>
        <el-table-column v-if="getShowProperty(isPlayerLeaveGameWillCausePendingBet)" align="center" label="Player Leave Game Will Cause Pending Bet" width="150">
          <template #default="scope">
            <el-checkbox disabled v-model="scope.row.isPlayerLeaveGameWillCausePendingBet" />
          </template>
        </el-table-column>
        <el-table-column v-if="getShowProperty(longestTimeForAutoFinishGame)" align="center" prop="longestTimeForAutoFinishGame" label="Longest Time For Auto Finish Game" width="150" show-overflow-tooltip/>
        <el-table-column v-if="getShowProperty(isCanAskProviderManualSettle)" align="center" label="Can We Ask Provider Manual Settle" width="150">
          <template #default="scope">
            <el-checkbox disabled v-model="scope.row.isCanAskProviderManualSettle" />
          </template>
        </el-table-column>
        <el-table-column v-if="getShowProperty(ourSystemHaveResendSettle)" align="center" label="Is Our Syteam Have Resend Settle" width="150">
          <template #default="scope">
            <el-tag v-if="displayOurSystemHaveResendSettle(scope.row.ourSystemHaveResendSettle).name" round effect="light" :color="displayOurSystemHaveResendSettle(scope.row.ourSystemHaveResendSettle).color" class="truncate border-0">
              {{ displayOurSystemHaveResendSettle(scope.row.ourSystemHaveResendSettle).name }}
            </el-tag>
            <span v-else="scope.row.ourSystemHaveResendSettle !== displayOurSystemHaveResendSettle(scope.row.ourSystemHaveResendSettle).name"> {{ '--' }}  </span>
          </template>
        </el-table-column>
        <el-table-column align="center" fixed="right" label="Action" width="80">
          <template #default="scope">
            <el-button
              type="primary"
              class="edit-btn"
              @click="editProvider(scope.row)">
              <el-icon :size="14"><Edit /></el-icon>
            </el-button>
          </template>
        </el-table-column>
      </el-table> 
      </div>
    </div>
    <EditProviderDialog 
      :isShowEditDialog="isShowEditDialog" 
      :editProviderFormData="updateProviderItem"
      @update:isShowEditDialog="isShowEditDialog = $event"
      @update:keywordProviders="getAllProviderData"
    />
</template>

<script>
// import { useProviderList } from "../../composables/providerList/useProviderList"
import {
  providerTypeForDisplay,
  EnumProviderStatusForDisplay,
  EnumCanPlaceBetOnBothSideForDisplay,
  EnumHaveRaiseBetForDisplay,
  EnumProviderCommissionStakeForDisplay,
  EnumCommissionStakeForDisplay, 
  EnumProviderWalletTypeForDisplay,
  EnumBettingVideoForDisplay,
  EnumIsGameProviderPromotionForDisplay,
  EnumDifferentPricesForDisplay,
  EnumHaveResendSettleForDisplay,
  EnumDeviceForDisplay
} from "../../components/enums/enumProvider";
import moment from 'moment';
import {
  Edit,
  Fold,
} from '@element-plus/icons-vue';
import EditProviderDialog from "./EditProviderDialog.vue";

export default {
  name: "ProviderContent",
  components: {
    Edit,
    Fold,
    EditProviderDialog,
  },
  data() {
    return {
      //Show Control
      showAdd: false,
      // isSortDesc: false,
      idSort: {
        sort: true,
        sortDesc: false,
      },
      nameSort: {
        sort: false,
        sortDesc: false,
      },
      updateProviderItem: {
        id: 0,
        name: "",
        isUM: false,
        remark: "",
        providerType: "",
        providerNameCN: "",
        onlineDate: "",
        providerSupportCurrency: "",
        providerSupportLanguage: "",
        isCanPlaceBetOnBothSide: false,
        isCustomizedBetLimit: false,
        haveRaiseBet: "",
        commissionStake: "",
        isHaveCheckSum: false,
        jackpotRemark: "",
        providerWalletType: "",
        timeoutTime: "",
        bettingReplay: "",
        isBetListHaveTextDetail: false,
        officeIPEnable: "",
        isSupportedIPv6: false,
        isHavePromotion: false,
        differentPrices: "",
        isNeedAskToOpenNewCurrency: false,
        isHavingHA: false,
        isPlayerLeaveGameWillCausePendingBet: false,
        longestTimeForAutoFinishGame: "",
        isCanAskProviderManualSettle: false,
        ourSystemHaveResendSettle: "",
        isNeedBetDetailArchived: false,
        invoiceTimeZone: "",
        currencyRemark: "",
        customerSupportCurrency: "",
        customerSupportLanguage: "",
        provideJackpotGame: false,
        needDisableJackpot: false,
        blockCountries: "",
        isEnabled: false,
        providerCurrencyRegionRestrictions: "",
        providerStatus: "",
        serverUrl: "",
      },
      tableData: this.keywordProviders,
      isShowEditDialog: false,
      columnsForDropdown: [],
    };
  },
  props: ["providerTitles", "keywordProviders", "start", "end", "permission"],
  emits: ["updateProvider", "addProvider"],
  watch: {
    keywordProviders () {
      this.tableData = this.keywordProviders
    }
  },
  computed: {
    updateDefaultDropdownList() {
      return this.$store.getters.getDefaultProviderColumnsDropdownList;
    },
    displayProviders() {
      let result = [];
      let providers = this.keywordProviders;

      if (this.idSort.sort) {
        result = this.idSort.sortDesc
          ? providers.sort((a, b) => b.id - a.id)
          : providers.sort((a, b) => a.id - b.id);
      }

      if (this.nameSort.sort) {
        result = this.nameSort.sortDesc
          ? providers.sort((a, b) => b.name.localeCompare(a.name))
          : providers.sort((a, b) => a.name.localeCompare(b.name));
      }
      return result.slice(this.start, this.end);
    },
    addProviderData() {
      return { ...this.$store.getters.addProviderData };
    },
    updateProviderData() {
      return this.$store.getters.updateProviderData;
    },
    canUpdate() {
      return this.permission.canUpdate;
    },
    canCreate() {
      return this.permission.canCreate;
    },
    rwd() {
      return this.$store.state.rwd.width;
    },
    addProviderBtn() {
      if (this.rwd >= 576) return "+ Provider";
      else return "+";
    },
    displayProviderType() {
      return (value) => {
        const providerTypeToDisplay = this.getProviderType(value);
        return providerTypeToDisplay ?
          { name: providerTypeToDisplay.name, color: providerTypeToDisplay.color } :
          '--'
      };
    },
    displayProviderStatus() {
      return (value) => {
        const providerStatus = this.getProviderStatus(value);
        return providerStatus ?
          { name: providerStatus.name, color: providerStatus.color } : 
          '--'
      };
    },
    displayCanPlaceBetOnBothSide() {
      return (value) => {
        const canPlaceBetOnBothSide = EnumCanPlaceBetOnBothSideForDisplay.find((cpb) => cpb.value === value);
        return canPlaceBetOnBothSide ? 
          { name: canPlaceBetOnBothSide.name, color: canPlaceBetOnBothSide.color } : 
          '--'
      };
    },
    displayHaveRaiseBet() {
      return (value) => {
        const haveRaiseBet = EnumHaveRaiseBetForDisplay.find((hrb) => hrb.value === value);
        return haveRaiseBet ? 
          { name: haveRaiseBet.name, color: haveRaiseBet.color } : 
          '--'
      };
    },
    displayProviderCommissionStake() {
      return (value) => {
        const providerCommissionStake = EnumProviderCommissionStakeForDisplay.find((pcs) => pcs.value === value);
        return providerCommissionStake ? 
          { name: providerCommissionStake.name, color: providerCommissionStake.color } : 
          '--'
      };
    },
    displayCommissionStake() {
      return (value) => {
        const commissionStake = EnumCommissionStakeForDisplay.find((cms) => cms.value === value);
        return commissionStake ? 
          { name: commissionStake.name, color: commissionStake.color } : 
          '--';
      };
    },
    displayProviderWalletType() {
      return (value) => {
        const providerWalletType = EnumProviderWalletTypeForDisplay.find((pwt) => pwt.value === value);
        return providerWalletType ? { name: providerWalletType.name, color: providerWalletType.color } 
        : '--'
      };
    },
    displayBettingVideo() {
      return (value) => {
        const bettingVideo = EnumBettingVideoForDisplay.find((btv) => btv.value === value);
        return bettingVideo ? 
          { name: bettingVideo.name, color: bettingVideo.color } : 
          '--'
      };
    },
    displayIsGameHavePromotion() {
      return (value) => {
        const isGameHavePromotion = EnumIsGameProviderPromotionForDisplay.find((gpp) => gpp.value === value);
        return isGameHavePromotion ? 
          { name: isGameHavePromotion.name, color: isGameHavePromotion.color } : 
          '--'
      };
    },
    displayDifferentPrices() {
      return (value) => {
        const differentPrices = EnumDifferentPricesForDisplay.find((dfp) => dfp.value === value);
        return differentPrices ? 
          { name: differentPrices.name, color: differentPrices.color } : 
          '--'
      };
    },
    displayOurSystemHaveResendSettle() {
      return (value) => {
        const haveResendSettle = EnumHaveResendSettleForDisplay.find((hrs) => hrs.value === value);
        return haveResendSettle ? 
          { name: haveResendSettle.name, color: haveResendSettle.color } : 
          '--'
      };
    },
    displayDevice() {
      return (value) => {
        const device = EnumDeviceForDisplay.find((device) => device.value === value);
        return device ? 
          { name: device.name, color: device.color } : 
          '--'
      };
    },
    hideTableColumns() {
      return this.$store.state.hideTableColumns['providers'];
    }
  },
  methods: {
    clickAddProvider() {
      if (this.showAdd) {
        this.addProviderData.id = "";
        this.addProviderData.name = "";
        this.addProviderData.remark = "";
        this.addProviderData.isUM = false;
        this.showAdd = false;
        this.showAdd = false;
      } else {
        this.showAdd = true;
      }
    },
    //判斷Edit時顯示按鈕
    showUpdate(e, provider) {
      let showBtn = e.target;
      $("tbody tr.clickItem ").removeClass("clickItem");
      $(showBtn).closest("tbody tr").addClass("clickItem");
      //非點擊項(css)
      $("tbody tr:not(.clickItem) ")
        .find("input.edit, textarea.edit, button.cancel, button.edit")
        .css("display", "none");
      $("tbody tr:not(.clickItem) ")
        .find(
          "span.data, input[type='checkbox'].data, button.data:not(.cancel)"
        )
        .css({ display: "inline-block" });
      //點擊項(css)
      $(showBtn).closest("tr").find(".edit, .data").toggle();
      //更新資料
      this.updateProviderItem = {
        id: provider.id,
        name: provider.name,
        isUM: provider.isUM,
        remark: provider.remark,
      };
    },
    //新增資料(將資料上傳父層)
    addProvider() {
      this.addProviderData.id = parseInt(this.addProviderData.id);
      let data = this.addProviderData;
      this.$emit("addProvider", data);

      //Reset data
      this.addProviderData.id = "";
      this.addProviderData.name = "";
      this.addProviderData.remark = "";
      this.addProviderData.isUM = false;
      this.showAdd = false;
    },
    //更新資料(將資料上傳父層)
    updateProvider(id, name, isUM, remark, event) {
      this.updateProviderData.id = id;
      this.updateProviderData.name = name;
      this.updateProviderData.isUM = isUM;
      this.updateProviderData.remark = remark;

      this.$emit("updateProvider", this.updateProviderData);

      $(event.target).closest("tr").find(".edit, .data").toggle();
    },
    sortById() {
      this.idSort.sort = true;
      this.idSort.sortDesc = !this.idSort.sortDesc;

      this.nameSort.sort = false;
      this.nameSort.sortDesc = true;
    },
    sortByName() {
      this.nameSort.sort = true;
      this.nameSort.sortDesc = !this.nameSort.sortDesc;

      this.idSort.sort = false;
      this.idSort.sortDesc = true;
    },
    getProviderType(value) {
      if(value !== ""){
        return providerTypeForDisplay.find((pt) => pt.value === value);
      }
    },
    getProviderStatus(value) {
      if(value){
        return EnumProviderStatusForDisplay.find((providerStatus) => providerStatus.value === value);
      }
    },
    checkDateIsValid(dateString) {
      const momentDate = moment(dateString);
      const isVaildDateTime = moment(dateString, moment.ISO_8601, true).isValid();
      const year = momentDate.year();
      const invalidYears = [1970, 1];
      return isVaildDateTime && !invalidYears.includes(year)
    },
    formatDate(dateString) {
      const isValidDate = this.checkDateIsValid(dateString);
      if (isValidDate) {
        return moment(dateString).format('YYYY-MM-DD');
      } else { 
        return '--';
      }
    },
    formatTime(dateString) {
      const isValidDate = this.checkDateIsValid(dateString);
      if (isValidDate) {
        return moment(dateString).format('HH:mm:ss');
      } else { 
        return '--';
      }
    },
    editProvider(providerRowData) {
      this.isShowEditDialog = true;
      const keys = Object.keys(providerRowData);
      const updatingKeys = Object.keys(this.updateProviderItem);
      for (let i = 0; i < keys.length; i++) {
        const providerRowDataLabel = keys[i];
        if(providerRowDataLabel) {
          this.updateProviderItem[providerRowDataLabel] = providerRowData[providerRowDataLabel];
        }
      }
    },
    setColumnsForDropdown() {
      this.columnsForDropdown = this.updateDefaultDropdownList;
      console.log('00000 this.columnsForDropdown = ', this.columnsForDropdown[0]);
    },
    updateHideTableColumns() {
      this.$store.commit('setHideTableColumns', { key: 'providers', value: this.updateDefaultDropdownList});
      this.setColumnsForDropdown();
    },
    getShowProperty(prop) {
      const matchedColumn = this.columnsForDropdown.filter(function(columnState) {
        return columnState.props === prop
      });
      // console.log('matchedColumn = ', matchedColumn);
      return matchedColumn.length ? matchedColumn[0].show : false;
    },
    getAllProviderData(){
      this.$emit('update:getAllProviderData');
    }
  },
  created() {
    this.updateHideTableColumns();
    this.setColumnsForDropdown();
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/rwd.scss";
table {
  @include rwd768 {
    font-size: 14px;
  }
  @include rwd576 {
    font-size: 12px;
  }
  thead {
    th {
      @include rwd576 {
        padding: 8px;
      }
      text-align: center;
      .sorting {
        @include rwd768 {
          max-width: 90px;
        }
      }
      a {
        margin-left: 5px;
      }
      button {
        @include rwd576 {
          max-width: 50px;
        }
      }
    }
  }
  tbody {
    > tr {
      > td {
        @include rwd576 {
          padding: 8px;
        }
        &:first-child {
          max-width: 100px;
          input {
            @include rwd576 {
              max-width: 55px;
              font-size: 14px;
              padding: 0 4px;
            }
          }
        }
        &:nth-child(2) {
          max-width: 200px;
          @include rwd768 {
            max-width: 90px;
          }
          input {
            @include rwd576 {
              font-size: 14px;
              padding: 0 4px;
            }
          }
        }
        &:nth-child(3) {
          text-align: center;
          min-width: 90px;
          max-width: 120px;
        }
        &:nth-child(4) {
          @include rwd576 {
            max-width: 115px;
          }
        }
        &:nth-child(5) {
          max-width: 100px;
        }
        > textarea {
          resize: none;
          @include rwd576 {
            max-width: 115px;
          }
        }
        input[type="checkbox"].data {
          width: 25px;
          height: 25px;
          margin: 0 auto;
        }
        input[type="checkbox"].edit {
          margin: 6px auto 0;
        }
        .edit,
        .cancel {
          display: none;
        }
      }
    }
  }
}
:deep(.el-popper) {
  max-width: 400px;
}
:deep(.el-popper.is-light) {
    background: #fff7e3;
    border: 1px solid #d0d0d0;
}
:deep(.el-popper.is-light .el-popper__arrow:before) {
  background: #fef7e4;
  border: 1px solid #c4c4c4;
}
:deep(.el-table .caret-wrapper) {
  width: 13px;
}
</style>

<style lang="scss">
.provider-info.el-table th.el-table__cell {
  @apply font-bold;
  background-color: #75897e !important;
  color: #fff;
  padding: 4px 0;
}
.provider-info.el-table th.el-table__cell .cell {
  padding: 0 4px;
}
.provider-info.el-table .el-table__cell {
  padding: 4px 0;
}
.provider-info.el-table .sort-caret.descending {
  border-top-color: #ffffff;
}
.provider-info.el-table .sort-caret.ascending {
  border-bottom-color: #fff;
}
.el-tag__content {
  color : black;
}
.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
  background-color: #409eff !important;
  border-color: #409eff !important;
}
.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner:after {
  border-color: white !important;
}
/* .el-checkbox__input.is-disabled .el-checkbox__inner {
  border-color: #ffcccc !important;
} */
.el-checkbox__input.is-disabled .el-checkbox__inner:after {
  border-color: white !important;
}
ul {
  list-style-type: none;
  padding: 0;
}
.edit-btn.el-button {
  padding: 8px;
  height: 28px;
}
.type.el-tag {
  background-color: transparent;
}
.el-table__header-wrapper {
  position: sticky;
  top: 0;
  z-index: 10;
}
.sticky-main-container {
  overflow-y: scroll;
  position: relative;
  height: calc(100vh - 20px);
  scrollbar-width: none;
}
.sticky-table-container {
  height: 100%;
  position: sticky;
  top: 0;
  z-index: 9;
}
</style>