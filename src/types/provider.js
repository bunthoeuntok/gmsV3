import moment from 'moment';
import {
  EnumProviderStatusForDisplay,
  providerTypeForDisplay,
  EnumHaveRaiseBetForDisplay,
  EnumCommissionStakeForDisplay,
  EnumProviderWalletTypeForDisplay,
  EnumBettingVideoForDisplay,
  EnumDifferentPricesForDisplay,
  EnumHaveResendSettleForDisplay
} from "../components/enums/enumProvider";
export class Provider {
  constructor(parameters) {
    this._id = parameters.id;
    this._name = parameters.name;
    this._providerStatus = parameters.providerStatus
    this._providerType = parameters.providerType
    this._isUM = parameters.isUM
    this._remark = parameters.remark
    this._providerNameCN = parameters.providerNameCN
    this._onlineDate = parameters.onlineDate
    this._providerSupportCurrency = parameters.providerSupportCurrency
    this._currencyRemark = parameters.currencyRemark
    this._568WinSupportCurrency = parameters['568WinSupportCurrency']
    this._providerSupportLanguage = parameters.providerSupportLanguage
    this._serverUrl = parameters.serverUrl
    this._blockCountries = parameters.blockCountries
    this._providerCurrencyRegionRestrictions = parameters.providerCurrencyRegionRestrictions
    this._customerSupportCurrency = parameters.customerSupportCurrency
    this._customerSupportLanguage = parameters.customerSupportLanguage
    this._isCanPlaceBetOnBothSide = parameters.isCanPlaceBetOnBothSide
    this._isCustomizedBetLimit = parameters.isCustomizedBetLimit
    this._haveRaiseBet = parameters.haveRaiseBet
    this._isHaveCheckSum = parameters.isHaveCheckSum
    this._commissionStake = parameters.commissionStake
    this._isHaveCheckSum = parameters.isHaveCheckSum
    this._provideJackpotGame = parameters.provideJackpotGame
    this._needDisableJackpot = parameters.needDisableJackpot
    this._jackpotRemark = parameters.jackpotRemark
    this._providerWalletType = parameters.providerWalletType
    this._bettingReplay = parameters.bettingReplay
    this._isBetListHaveTextDetail = parameters.isBetListHaveTextDetail
    this._timeoutTime = parameters.timeoutTime
    this._officeIPEnable = parameters.officeIPEnable
    this._isSupportedIPv6 = parameters.isSupportedIPv6
    this._isHavePromotion = parameters.isHavePromotion
    this._differentPrices = parameters.differentPrices
    this._isNeedAskToOpenNewCurrency = parameters.isNeedAskToOpenNewCurrency
    this._IsHavingHA = parameters.IsHavingHA
    this._isPlayerLeaveGameWillCausePendingBet = parameters.isPlayerLeaveGameWillCausePendingBet
    this._longestTimeForAutoFinishGame = parameters.longestTimeForAutoFinishGame
    this._isCanAskProviderManualSettle = parameters.isCanAskProviderManualSettle
    this._ourSystemHaveResendSettle = parameters.ourSystemHaveResendSettleRequest
  }
  checkDateIsValid(dateString) {
    const momentDate = moment(dateString);
    const isVaildDateTime = moment(dateString, moment.ISO_8601, true).isValid();
    const year = momentDate.year();
    const invalidYears = [1970, 1];
    return isVaildDateTime && !invalidYears.includes(year)
  }
  formatDate(dateString) {
    const isValidDate = this.checkDateIsValid(dateString);
    if (isValidDate) {
      return moment(dateString).format('YYYY-MM-DD');
    } else { 
      return '--';
    }
  }
  get id() {
    return this._id;
  }
  get name() {
    return this._name;
  }
  get providerStatus() {
    const providerStatus = EnumProviderStatusForDisplay.find((providerStatus) => providerStatus.value === this._providerStatus);
    return providerStatus ?
      { name: providerStatus.name, color: providerStatus.color } : 
      '--'
  }
  get providerType() {
    const providerTypeToDisplay = providerTypeForDisplay.find((pt) => pt.value === this._providerType);
    return providerTypeToDisplay ?
      { name: providerTypeToDisplay.name, color: providerTypeToDisplay.color } :
      '--'
  }
  get isUM() {
    return this._isUM ? '✔️':  '';
  }
  get remark() {
    return this._remark;
  }
  get providerNameCN() {
    return this._providerNameCN;
  }
  get onlineDate() {
    return this.formatDate(this._onlineDate);
  }
  get providerSupportCurrency() {
    return this._providerSupportCurrency;
  }
  get currencyRemark() {
    return this._currencyRemark;
  }
  get __568WinSupportCurrency() {
    return this._568WinSupportCurrency ?? '';
  }
  get providerSupportLanguage() {
    return this._providerSupportLanguage;
  }
  get ServerUrl() {
    return this._serverUrl;
  }
  get blockCountries() {
    return this._blockCountries;
  }
  get providerCurrencyRegionRestrictions() {
    return this._providerCurrencyRegionRestrictions;
  }
  get customerSupportCurrency() {
    return this._customerSupportCurrency;
  }
  get customerSupportLanguage() {
    return this._customerSupportLanguage;
  }
  get isCanPlaceBetOnBothSide() {
    return this._isCanPlaceBetOnBothSide ? '✔️':  '❌';
  }
  get isCustomizedBetLimit() {
    return this._isCustomizedBetLimit ? '✔️':  '❌';
  }
  get haveRaiseBet() {
    const haveRaiseBet = EnumHaveRaiseBetForDisplay.find((hrb) => hrb.value === this._haveRaiseBet);
    return haveRaiseBet ? 
      { name: haveRaiseBet.name, color: haveRaiseBet.color } : 
      '--'
  }
  get isHaveCheckSum() {
    return this._isHaveCheckSum ? '✔️':  '❌';
  }
  get commissionStake() {
    const providerCommissionStake = EnumCommissionStakeForDisplay.find((pcs) => pcs.value === this._commissionStake);
    return providerCommissionStake ? 
      { name: providerCommissionStake.name, color: providerCommissionStake.color } : 
      '--'
  }
  get provideJackpotGame() {
    return this._provideJackpotGame ? '✔️':  '❌';
  }
  get needDisableJackpot() {
    return this._needDisableJackpot ? '✔️':  '❌';
  }
  get jackpotRemark() {
    return this._jackpotRemark;
  }
  get providerWalletType() {
    const providerWalletType = EnumProviderWalletTypeForDisplay.find((pwt) => pwt.value === this._providerWalletType);
    return providerWalletType ? { name: providerWalletType.name, color: providerWalletType.color } 
    : '--'
  }
  get bettingReplay() {
    const bettingVideo = EnumBettingVideoForDisplay.find((btv) => btv.value === this._bettingReplay);
    return bettingVideo ? 
      { name: bettingVideo.name, color: bettingVideo.color } : 
      '--'
  }
  get isBetListHaveTextDetail() {
    return this._isBetListHaveTextDetail ? '✔️':  '❌';
  }
  get timeoutTime() {
    return this._timeoutTime;
  }
  get officeIPEnable() {
    const haveRaiseBet = EnumHaveRaiseBetForDisplay.find((hrb) => hrb.value === this._officeIPEnable);
    return haveRaiseBet ? 
      { name: haveRaiseBet.name, color: haveRaiseBet.color } : 
      '--'
  }
  get isSupportedIPv6() {
    return this._isSupportedIPv6 ? '✔️':  '❌';
  }
  get isHavePromotion() {
    return this._isHavePromotion ? '✔️':  '❌';
  }
  get differentPrices() {
    const differentPrices = EnumDifferentPricesForDisplay.find((dfp) => dfp.value === this._differentPrices);
    return differentPrices ? 
      { name: differentPrices.name, color: differentPrices.color } : 
      '--'
  }
  get isNeedAskToOpenNewCurrency() {
    return this._isNeedAskToOpenNewCurrency ? '✔️':  '❌';
  }
  get IsHavingHA() {
    return this._IsHavingHA ? '✔️':  '❌';
  }
  get isPlayerLeaveGameWillCausePendingBet() {
    return this._isPlayerLeaveGameWillCausePendingBet ? '✔️':  '❌';
  }
  get longestTimeForAutoFinishGame() {
    return this._longestTimeForAutoFinishGame ?? '';
  }
  get isCanAskProviderManualSettle() {
    return this._isCanAskProviderManualSettle ? '✔️':  '❌';
  }
  get ourSystemHaveResendSettle() {
    const haveResendSettle = EnumHaveResendSettleForDisplay.find((hrs) => hrs.value === this._ourSystemHaveResendSettle);
    return haveResendSettle ? 
      { name: haveResendSettle.name, color: haveResendSettle.color } : 
      '--'
  }
}