const EnumColorTab = {
  Green: '#ccebb6',
  Orange: '#f6caae',
  Blue: '#c6e0f4',
  Red: '#f7d1ca',
  DarkGray: '#363636',
  LightGray: '#bbbbbb',
  Purple: '#e2d0f0',
  LowBlue: '#cadae0',
  Gray: '#808080',
  LowGray: '#dadbf5',
  LightBrown: '#e6bf83',
  Yellow: '#ffd700',
  LightPurple: '#dcdcff'
}

const EnumProviderType = {
  Games: 'Games',
  LiveCasino: 'Live Casino',
  Sports: 'Sports'
}
const providerTypeForDisplay = [
  { value: EnumProviderType.Games, name: 'Games', color: EnumColorTab.Blue },
  { value: EnumProviderType.LiveCasino, name: 'Live Casino', color: EnumColorTab.Orange },
  { value: EnumProviderType.Sports, name: 'Sports', color: EnumColorTab.LowBlue },
];

const EnumProviderStatus = {
  Online: 'Online',
  InMaintenance: 'In maintenance',
  Closed: 'Closed',
  NotIntegratedYet: 'Not Integrated Yet',
  Suspend: 'Suspend',
  OnlinePrivate: 'Online_Private',
  InProgress: 'In Progress',
  UAT: 'UAT',
};

const EnumProviderStatusForDisplay = [
  { value: EnumProviderStatus.Online, name: 'Online', color: EnumColorTab.Green },
  // { value: EnumProviderStatus.InMaintenance, name: 'In maintenance', color: EnumColorTab.Red },
  { value: EnumProviderStatus.Closed, name: 'Closed', color: EnumColorTab.LightGray },
  // { value: EnumProviderStatus.NotIntegratedYet, name: 'Not Integrated Yet', color: EnumColorTab.LowBlue },
  { value: EnumProviderStatus.Suspend, name: 'Suspend', color: EnumColorTab.Orange },
  { value: EnumProviderStatus.OnlinePrivate, name: 'Online_Private', color: EnumColorTab.Purple },
  // { value: EnumProviderStatus.InProgress, name: 'In Progress', color: EnumColorTab.Blue },
  // { value: EnumProviderStatus.UAT, name: 'UAT', color: EnumColorTab.Blue },
];

const EnumCanPlaceBetOnBothSide = {
  NotConfirm: 0,
  No: 1, 
  Yes: 2,
  NoNeedForConfirmation: 3,
};

const EnumCanPlaceBetOnBothSideForDisplay = [
  { value: EnumCanPlaceBetOnBothSide.NotConfirm, name: 'Not Confirm', color: EnumColorTab.LowGray },
  { value: EnumCanPlaceBetOnBothSide.No, name: 'No', color: EnumColorTab.Red },
  { value: EnumCanPlaceBetOnBothSide.Yes, name: 'Yes', color: EnumColorTab.Green },
  { value: EnumCanPlaceBetOnBothSide.NoNeedForConfirmation, name: 'No need for confirmation', color: EnumColorTab.Purple },
];

const EnumHaveRaiseBet = {
  NotComfirm: "Not Confirm",
  No: "No",
  Yes: "Yes",
};
const EnumHaveRaiseBetForDisplay = [
  { value: EnumHaveRaiseBet.NotComfirm, name: 'Not Comfirm', color: EnumColorTab.LowGray },
  { value: EnumHaveRaiseBet.No, name: 'NO', color: EnumColorTab.Red },
  { value: EnumHaveRaiseBet.Yes, name: 'YES', color: EnumColorTab.Green },
];

const EnumProviderCommissionStake = {
  NotConfirm: 'Not Confirm',
  ProviderNotProvided: 'Provider not provided',
  ProviderHasProvided: 'Provider has provided',
  Confirmed: 'Confirmed'
};
const EnumProviderCommissionStakeForDisplay = [
  { value: EnumProviderCommissionStake.NotConfirm, name: 'Not Confirm', color: EnumColorTab.LowGray },
  { value: EnumProviderCommissionStake.ProviderNotProvided, name: 'Provider not provided', color: EnumColorTab.Red },
  { value: EnumProviderCommissionStake.ProviderHasProvided, name: 'Provider has provided', color: EnumColorTab.Green },
  { value: EnumProviderCommissionStake.Confirmed, name: 'Confirmed', color: EnumColorTab.Blue },
];

const EnumCommissionStake = {
  NotConfirm: 'Not Confirm', 
  UseProviderCommissionStake: 'Use Provider Commission Stake',
  UseStakeAsCommissionStake: 'Use stake as commission stake',
  TheProviderDidNotProvide: 'The provider did not provide',
  TheProviderHasProvidedItButWeDontHandle: 'The provider has provided it, but we don\'t handle it',
  NotHandleIt: 'Not handle it',
};
const EnumCommissionStakeForDisplay = [
  { value: EnumCommissionStake.NotConfirm, name: 'Not Confirm', color: EnumColorTab.LowGray },
  { value: EnumCommissionStake.UseProviderCommissionStake, name: 'Use Provider Commission Stake', color: EnumColorTab.Yellow },
  { value: EnumCommissionStake.UseStakeAsCommissionStake, name: 'Use stake as commission stake', color: EnumColorTab.Purple },
  { value: EnumCommissionStake.TheProviderDidNotProvide, name: 'The provider did not provide', color: EnumColorTab.LightBrown },
  { value: EnumCommissionStake.TheProviderHasProvidedItButWeDontHandle, name: 'The provider has provided it, but we don\'t handle it', color: EnumColorTab.Red },
  { value: EnumCommissionStake.NotHandleIt, name: 'Not handle it', color: EnumColorTab.Gray },
];

const EnumProviderWalletType = {
  SeamlessWallet: "Seamless Wallet",
  TransferWallet: "Transfer Wallet",
};
const EnumProviderWalletTypeForDisplay = [
  { value: EnumProviderWalletType.SeamlessWallet, name: 'Seamless Wallet', color: EnumColorTab.Yellow },
  { value: EnumProviderWalletType.TransferWallet, name: 'Transfer Wallet', color: EnumColorTab.Blue },
];
const EnumProviderWalletTypeForMap = {
  "Seamless Wallet": 0,
  "Transfer Wallet": 1,
};

const EnumBettingVideo = {
  BackOffice: "Back Office",
  InGame:"In game",
  RequestToProvider: "Request to provider",
  GetBetDetail: "Get bet detail",
  No:"No",
  NotConfirm: "Not Confirm",
};
const EnumBettingVideoForDisplay = [
  { value: EnumBettingVideo.BackOffice, name: 'Back Office', color: EnumColorTab.Blue },
  { value: EnumBettingVideo.InGame, name: 'In game', color: EnumColorTab.Red },
  { value: EnumBettingVideo.RequestToProvider, name: 'Request to provider', color: EnumColorTab.Purple },
  { value: EnumBettingVideo.GetBetDetail, name: 'Get bet detail', color: EnumColorTab.Green },
  { value: EnumBettingVideo.No, name: 'No', color: EnumColorTab.Red },
  { value: EnumBettingVideo.NotConfirm, name: 'Not Confirm', color: EnumColorTab.LowGray },
];

const EnumBettingVideoForMap = {
  "Back Office": 0,
  "In game": 1,
  "Request to provider": 2,
  "Get bet detail": 3,
  "Get bet detail": 4,
  "No": 5,
  "Not Confirm": 6,
};

const EnumIsGameProviderPromotion = {
  Support: "Support",
  NoSupport:"No support",
};
const EnumIsGameProviderPromotionForDisplay = [
  { value: EnumIsGameProviderPromotion.Support, name: 'Support', color: EnumColorTab.Green },
  { value: EnumIsGameProviderPromotion.NoSupport, name: 'No support', color: EnumColorTab.Red },
];

const EnumDifferentPrices = {
  Unconfirmed: 'Unconfirmed',
  UniformPricing: 'Uniform Pricing',
  DifferentPricesperRegion: 'Different Prices per Region',
  OnlyAsiaMarket: 'Only Asia Market',
};
const EnumDifferentPricesForDisplay = [
  { value: EnumDifferentPrices.Unconfirmed, name: 'Unconfirmed', color: EnumColorTab.LowGray },
  { value: EnumDifferentPrices.UniformPricing, name: 'Uniform Pricing', color: EnumColorTab.Green },
  { value: EnumDifferentPrices.DifferentPricesperRegion, name: 'Different Prices per Region', color: EnumColorTab.Purple },
  { value: EnumDifferentPrices.OnlyAsiaMarket, name: 'Only Asia Market', color: EnumColorTab.Red },
];
const EnumDifferentPricesForMap = {
  "Unconfirmed": 0,
  "Uniform Pricing": 1,
  "Different Prices per Region": 2,
};

const EnumHaveResendSettle = {
  NotHave:  'Not Have',
  HaveResend: 'Have Resend',
  NeedConfirm: 'Need Confirm', 
};

const EnumHaveResendSettleForDisplay = [  { value: 0, name: 'Not Have', color: EnumColorTab.Yellow },
  { value: EnumHaveResendSettle.HaveResend, name: 'Have Resend', color: EnumColorTab.Green },
  { value: EnumHaveResendSettle.NeedConfirm, name: 'Need Confirm', color: EnumColorTab.Purple },
];
const EnumResendSettleForMap = {
  "Not Have": 0,
  "Have Resend": 1,
  "Need Confirm": 2,
};


const EnumDevice = {
  DesktopMobile: 'Desktop, Mobile',
  Desktop: 'Desktop',
  Mobile: 'Mobile',
};
const EnumDeviceForDisplay = [
  { value: EnumDevice.DesktopMobile, name: 'Desktop, Mobile', color: EnumColorTab.Yellow },
  { value: EnumDevice.Desktop, name: 'Desktop', color: EnumColorTab.Green },
  { value: EnumDevice.Mobile, name: 'Mobile', color: EnumColorTab.LightPurple },
];
const EnumDeviceForMap = {
  "Desktop, Mobile": 0,
  "Desktop": 1,
  "Mobile": 2,
};

export { 
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
  EnumDeviceForDisplay,
};