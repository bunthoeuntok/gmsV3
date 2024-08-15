<template>
    <div v-if="isShowEditDialog">
      <el-dialog
        width="70%"
        destroy-on-close
        model-class="edit-popup"
        class="edit-game-provider-dialog"
				@close="handleClose"
				top="46px"
				:style="{ height: '80vh', 'max-height': '100vh', 'overflow-y': 'hidden', 'border-radius': '10px' }"
      >
				<template #header>
					<div class="font-bold dialog__header-title rounded-b-lg text-s">
						<span>Edit Provider</span>
					</div>
				</template>
				<el-form class="p-4 edit-form-dialog" :model="editProviderFormData" label-position="top" >
					<div class="edit-form">
						<div id="left-side-settings" class="first-col">
							<div class="left-side-settings--provider-basic-info">
								<el-form-item label="Game Provider ID" class="inline bold-label">
									<el-input disabled v-model="editProviderFormData.id" autocomplete="off" />
								</el-form-item>
								<el-form-item label="Game Provider Name" class="inline bold-label">
									<el-input v-model="editProviderFormData.name" autocomplete="off" />
								</el-form-item>
								<el-form-item label="Game Provider Name CN" class="inline bold-label">
									<el-input v-model="editProviderFormData.providerNameCN" autocomplete="off" />
								</el-form-item>
								<el-form-item label="Game Provider Type" class="inline bold-label">
									<el-select
										v-model="editProviderFormData.providerType"
										size="large"
										style="width: 240px">
										<el-option
											v-for="item in providerTypeForDisplay"
											:key="item.value"
											:label="item.name"
											:value="item.value"
										/>
									</el-select>
								</el-form-item>
								<el-form-item label="Game Provider Status" class="inline bold-label">
									<el-select
										v-model="editProviderFormData.providerStatus"
										size="large"
										style="width: 240px">
										<el-option
										v-for="item in EnumProviderStatusForDisplay"
										:key="item.value"
										:label="item.name"
										:value="item.value"
									/>
									</el-select>
								</el-form-item>
								<el-form-item label="Game Provider Online Date" class="inline bold-label">
									<el-date-picker
										v-model="editProviderFormData.onlineDate"
										type="date"
										placeholder="Select date"
										format="YYYY-MM-DD"
										value-format="YYYY-MM-DD"
									/>
								</el-form-item>
								<el-form-item label="Game Provider Timeout" class="inline bold-label">
									<el-input v-model="editProviderFormData.timeoutTime" autocomplete="off" />
								</el-form-item>
								<el-form-item label="Game Provider Office IP Enable" class="inline bold-label">
									<el-select
										v-model="editProviderFormData.officeIPEnable"
										size="large"
										style="width: 240px">
										<el-option
											v-for="item in EnumHaveRaiseBetForDisplay"
											:key="item.value"
											:label="item.name"
											:value="item.value"
										/>
									</el-select>
								</el-form-item>
								<el-form-item label="Game Provider Different Prices" class="inline bold-label">
									<el-select
										v-model="editProviderFormData.differentPrices"
										size="large"
										style="width: 240px">
										<el-option
											v-for="item in EnumDifferentPricesForDisplay"
											:key="item.value"
											:label="item.name"
											:value="item.value"
										/>
									</el-select>
								</el-form-item>
								<el-form-item label="Longest time for auto finish game" class="inline bold-label">
									<el-input v-model="editProviderFormData.longestTimeForAutoFinishGame" autocomplete="off" />
								</el-form-item>
								<el-form-item label="Invoice TimeZone" class="inline bold-label">
									<el-input v-model="editProviderFormData.invoiceTimeZone" autocomplete="off" />
								</el-form-item>
								<el-form-item label="Game Provider Betting Video" class="inline bold-label">
									<el-select
										v-model="editProviderFormData.bettingReplay"
										size="large"
										style="width: 240px">
										<el-option
											v-for="item in EnumBettingVideoForDisplay"
											:key="item.value"
											:value="item.name"
											:label="item.value"
										/>
									</el-select>
								</el-form-item>
								<el-form-item label="Game Provider Have RaiseBet" class="inline bold-label">
									<el-select
										v-model="editProviderFormData.haveRaiseBet"
										size="large"
										style="width: 240px">
										<el-option
											v-for="item in EnumHaveRaiseBetForDisplay"
											:key="item.value"
											:label="item.name"
											:value="item.value"
										/>
									</el-select>
								</el-form-item>
								<el-form-item label="Is Our system Have Resend Settle" class="inline bold-label">
									<el-select
										v-model="editProviderFormData.ourSystemHaveResendSettle"
										size="large"
										style="width: 240px">
										<el-option
											v-for="item in EnumHaveResendSettleForDisplay"
											:key="item.value"
											:label="item.name"
											:value="item.value"
										/>
									</el-select>
								</el-form-item>
								<el-form-item label="Game Provider Wallet Type" class="inline bold-label">
									<el-select
										v-model="editProviderFormData.providerWalletType"
										size="large"
										style="width: 240px">
										<el-option
											v-for="item in EnumProviderWalletTypeForDisplay"
											:key="item.value"
											:label="item.name"
											:value="item.value"
										/>
									</el-select>
								</el-form-item>
								<el-form-item label="Game Provider Commission Stake" class="inline bold-label">
									<el-select
										v-model="editProviderFormData.commissionStake"
										size="large"
										style="width: 240px">
										<el-option
											v-for="item in EnumCommissionStakeForDisplay"
											:key="item.value"
											:label="item.name"
											:value="item.value"
										/>
									</el-select>
								</el-form-item>
								<el-form-item label="ServerUrl" class="inline bold-label">
									<el-input v-model="editProviderFormData.serverUrl" autocomplete="off"/>
								</el-form-item>
								<el-form-item label-position="top" label="Game Provider Currency/Region Restriction" class="flex flex-col bold-label">
									<el-input type="text-area" v-model="editProviderFormData.providerCurrencyRegionRestrictions" autocomplete="off" />
								</el-form-item>
							</div>
							<div class="left-side-settings--supports-settings">
								<span class="custom-horizontal-line el-divider el-divider--horizontal"></span>
								<el-form-item label="Game Provider Customer Support Language" class="bold-label">
									<el-input disabled type="textarea" v-model="editProviderFormData.customerSupportLanguage" autocomplete="off" />
								</el-form-item>
								<el-form-item label="Game Provider Support Language" class="bold-label">
									<el-input type="textarea" v-model="editProviderFormData.providerSupportLanguage" autocomplete="off" />
								</el-form-item>
								<el-form-item label="Game Provider Block Country" class="bold-label">
									<el-input type="textarea" v-model="editProviderFormData.blockCountries" autocomplete="off" />
								</el-form-item>
							</div>
						</div>
						<!-- <div class="line"></div> -->
						<div id="right-side-settings" class="last-col">
							<div class="right-side-settings--yes-no-options">
								<el-form-item label="Is UM" class="inline bold-label">
									<el-radio-group v-model="editProviderFormData.isUM">
										<el-radio :value="true">Yes</el-radio>
										<el-radio :value="false">No</el-radio>
									</el-radio-group>
								</el-form-item> 
								<el-form-item label="Is Enabled" class="inline bold-label">
									<el-radio-group disabled v-model="editProviderFormData.isEnabled">
										<el-radio :value="true">Yes</el-radio>
										<el-radio :value="false">No</el-radio>
									</el-radio-group>
								</el-form-item>
								<el-form-item label="Game Provider Supported IPv6" class="inline bold-label">
									<el-radio-group v-model="editProviderFormData.isSupportedIPv6">
										<el-radio :value="true">Yes</el-radio>
										<el-radio :value="false">No</el-radio>
									</el-radio-group>
								</el-form-item>
								<el-form-item label="Is Have Promotion" class="inline bold-label">
									<el-radio-group v-model="editProviderFormData.isHavePromotion">
										<el-radio :value="true">Yes</el-radio>
										<el-radio :value="false">No</el-radio>
									</el-radio-group>
								</el-form-item>
								<el-form-item label="Need Ask To Open New Currency" class="inline bold-label">
									<el-radio-group v-model="editProviderFormData.isNeedAskToOpenNewCurrency">
										<el-radio :value="true">Yes</el-radio>
										<el-radio :value="false">No</el-radio>
									</el-radio-group>
								</el-form-item>
								<el-form-item label="Is Having HA" class="inline bold-label">
									<el-radio-group v-model="editProviderFormData.isHavingHA">
										<el-radio :value="true">Yes</el-radio>
										<el-radio :value="false">No</el-radio>
									</el-radio-group>
								</el-form-item>
								<el-form-item label="Player Leave Game Will Cause Pending Bet" class="inline bold-label">
									<el-radio-group v-model="editProviderFormData.isPlayerLeaveGameWillCausePendingBet">
										<el-radio :value="true">Yes</el-radio>
										<el-radio :value="false">No</el-radio>
									</el-radio-group>
								</el-form-item>
								<el-form-item label="Can we ask provider manual settle" class="inline bold-label">
									<el-radio-group v-model="editProviderFormData.isCanAskProviderManualSettle">
										<el-radio :value="true">Yes</el-radio>
										<el-radio :value="false">No</el-radio>
									</el-radio-group>
								</el-form-item>
								<el-form-item label="Is Can Place Bet" class="inline bold-label">
									<el-radio-group v-model="editProviderFormData.isCanPlaceBetOnBothSide">
											<el-radio :value="true">Yes</el-radio>
											<el-radio :value="false">No</el-radio>
										</el-radio-group>
								</el-form-item>
								<el-form-item label="Is Customized BetLimit" class="inline bold-label">
									<el-radio-group v-model="editProviderFormData.isCustomizedBetLimit">
										<el-radio :value="true">Yes</el-radio>
										<el-radio :value="false">No</el-radio>
									</el-radio-group>
								</el-form-item>
								<el-form-item label="Is Need Bet Detail Archived" class="inline bold-label">
									<el-radio-group v-model="editProviderFormData.isNeedBetDetailArchived">
										<el-radio :value="true">Yes</el-radio>
										<el-radio :value="false">No</el-radio>
									</el-radio-group>
								</el-form-item>
								<el-form-item label="Is Have Check Sum" class="inline bold-label">
									<el-radio-group v-model="editProviderFormData.isHaveCheckSum">
										<el-radio :value="true">Yes</el-radio>
										<el-radio :value="false">No</el-radio>
									</el-radio-group>
								</el-form-item>
								<el-form-item label="Is Need Disable Jackpot" class="inline bold-label">
									<el-radio-group disabled v-model="editProviderFormData.needDisableJackpot">
										<el-radio :value="true">Yes</el-radio>
										<el-radio :value="false">No</el-radio>
									</el-radio-group>
								</el-form-item>
								<el-form-item label="Is Bet list have text detail" class="inline bold-label">
									<el-radio-group v-model="editProviderFormData.isBetListHaveTextDetail">
										<el-radio :value="true">Yes</el-radio>
										<el-radio :value="false">No</el-radio>
									</el-radio-group>
								</el-form-item>
								<el-form-item label="Provide Jackpot Game" class="inline bold-label">
									<el-radio-group disabled v-model="editProviderFormData.provideJackpotGame">
										<el-radio :value="true">Yes</el-radio>
										<el-radio :value="false">No</el-radio>
									</el-radio-group>
								</el-form-item>
								<el-form-item label="Game Provider Jackpot Remark" class="bold-label">
									<el-input type="textarea" v-model="editProviderFormData.jackpotRemark" autocomplete="off" />
								</el-form-item>
								<el-form-item label="Game Provider Remark" class="bold-label">
									<el-input type="textarea" v-model="editProviderFormData.remark" autocomplete="off" />
								</el-form-item>
							</div>
							<div class="right-side-settings--currency-settings">
								<el-form-item label="Game Provider 568Win Support Currency" class="bold-label">
									<el-input disabled type="textarea" v-model="editProviderFormData.customerSupportCurrency" autocomplete="off" />
								</el-form-item>
								<el-form-item label="Game Provider Support Currency" class="bold-label">
									<el-input type="textarea" v-model="editProviderFormData.providerSupportCurrency" autocomplete="off" />
								</el-form-item>
								<el-form-item label="Game Provider Currency Remark" class="bold-label">
									<el-input type="textarea" v-model="editProviderFormData.currencyRemark" autocomplete="off" />
								</el-form-item>
							</div>
						</div>
					</div>
				</el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button class="cancel-button" @click="handleClose">Cancel</el-button>
            <el-button type="success"  @click="handleUpdateProvider()" :loading="isLoading">
              Confirm
            </el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </template>
  
  <script>
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
		EnumDeviceForDisplay,
	} from "../../components/enums/enumProvider";

  export default {
    name: "EditProviderDialog",
		emits: ["update:isShowEditDialog", "update:keywordProviders"],
		props:["isShowEditDialog" , "editProviderFormData"],
    data() {
      return {
        visible: false,
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
				isLoading: false,
      }
    },
		computed:{
			isUMYes: {
				get() { return this.editProviderFormData.isUM; },
				set(value) { this.editProviderFormData.isUM = value; }
			},
			isUMNo: {
				get() { return !this.editProviderFormData.isUM; },
				set(value) { this.editProviderFormData.isUM = !value; }
			},
			isEnabledYes: {
				get() { return this.editProviderFormData.isEnabled; },
				set(value) { this.editProviderFormData.isEnabled = value; }
			},
			isEnabledNo: {
				get() { return !this.editProviderFormData.isEnabled; },
				set(value) { this.editProviderFormData.isEnabled = !value; }
			},
		},
    methods: {
      handleClose() {
				this.$emit('update:isShowEditDialog', false);
			},
			handleUpdateProvider() {
				this.isLoading = true;
				delete this.editProviderFormData.provider;
				const updateRequestData = {
					secretKey: "StagingSecretKey",
					sessionToken: this.$store.state.userData.sessionToken,
					modifiedBy: this.$store.state.userData.username,
					...this.editProviderFormData,
					officeIPEnable: this.editProviderFormData.officeIPEnable,
					haveRaiseBet: this.editProviderFormData.haveRaiseBet,
					bettingReplay: this.editProviderFormData.bettingReplay,
					commissionStake: this.editProviderFormData.commissionStake,
					differentPrices: this.editProviderFormData.differentPrices,
					providerWalletType: this.editProviderFormData.providerWalletType,
					ourSystemHaveResendSettle: this.editProviderFormData.ourSystemHaveResendSettle,
				};
				this.$store.dispatch("updateProviderAPI", updateRequestData).then((res) => {
					if (res.data.errorCode === 0) {
						this.$emit('update:keywordProviders');
						swal("Success", "Success to update this provider", "success", {
							button: "OK",
						});
						this.$emit('update:isShowEditDialog', false);
					} else {
						swal("Fail", "Something is wrong", "error", { button: "OK" });
					}
				})
				.finally(() => {
				this.isLoading = false;
				});
			}
		}
  }
  </script>

<style lang="scss">
.el-form-item--label-left .el-form-item__label {
	font-weight: 500;
}
.label:not(.form-check-label):not(.custom-file-label) {
  font-weight: 500;
}
.edit-form-dialog {
	padding: 0 !important;
	margin-top: 40px;
	.el-radio__input.is-checked .el-radio__inner {
    background: #0c3c21;
    // border-color: #e30613;
    border-color: #0c3c21;
	}
	.el-radio__input.is-checked+.el-radio__label {
		color: #0c3c21;
	}
}
.edit-form {
	display: flex;
	width: 100%;
	justify-content: space-between;
}
#left-side-settings {
	position: relative;
	.left-side-settings--supports-settings {
		width: 100%;
		position: absolute;
		bottom: 0;
	}
}
.custom-horizontal-line {
	&.el-divider--horizontal {
		border-top: 2px solid rgba(102, 150, 122, 0.6);
	}
}
#right-side-settings {
	position: relative;
	border-left: 2px solid rgba(102, 150, 122, 0.6);
  padding-left: 30px;
	.right-side-settings--currency-settings {
		width: 100%;
		position: relative;
		bottom: 0;
	}
}
.first-col, .last-col {
	width: 48%;
}
.el-form-item__label {
	font-weight: normal !important;
}
.el-form-item.bold-label{
	align-items: center;
	.el-form-item__label {
		font-weight: bold !important;
		flex: 1;
		margin-bottom: 0;
	}
}
.edit-form-dialog .el-select {
	width: 100% !important;
}
.edit-form-dialog .el-textarea__inner {
	min-height: 90px !important;
}
.edit-form-dialog .el-select--large .el-select__wrapper {
	min-height: 20px !important;
}
.el-date-editor.el-input {
	width: 100% !important;
}
.inline {
	display: flex !important;
	align-items: start;
}
.inline .el-radio-group {
	align-items: start !important;
}
.inline .el-checkbox {
	align-items: center !important;
}
.inline .el-radio, .inline .el-checkbox {
	height: 22px !important;
}
.el-radio__label, label.el-checkbox {
	font-weight: normal !important;
}
.line {
	background-color: #ccc;
	border: 1px solid;
}
.el-dialog {
	padding: 0px 0px 20px 0px !important;
	border-radius: 10px !important;
}
.edit-game-provider-dialog {
	.el-dialog__header, .el-dialog__body {
		padding: 16px 20px;
	}
	.el-dialog__body {
		padding-bottom: 0;
		overflow-y: scroll;
		height: 95%;
		&::-webkit-scrollbar-thumb {
		background-color: rgba(102, 150, 122, 0.5);
		-webkit-border-radius: 4px;
		height: 20px;
		}
	}
	.el-dialog__footer {
		margin: 0 20px;
		padding-top: 0;
		.dialog-footer {
			padding-top: 10px;
			border-top: 1px solid rgb(102, 150, 122);
			.cancel-button {
				// border: 1.2pt solid rgba(255, 255, 255, .4);rgba(227, 6, 19, .4);
				border: 1.2pt solid rgb(235, 235, 239);
				// border: #e30613;
				background-color: rgba(255, 255, 255, .02);
				backdrop-filter: blur(20px);
			}
			.el-button.el-button--success {
				background-color: #66967A;
				border-color: #66967A;
				color: #0c3c21;
			}
		}
	}
}

.el-button.el-button--primary{
	background-color: #66967A;
	border-color: #66967A;
	color: rgb(235, 235, 239);
	&:hover {
		background-color: rgba(83, 125, 101, 1);
		border-color: rgba(83, 125, 101, 1);
		color: rgb(235, 235, 239);
		outline: none;
	}
}
</style>

<style>
.dialog__header-title {
	background-color:  rgba(124, 163, 140, 1);
	color: #0c3c21;
	font-weight: 600;
	width: fit-content;
	position: absolute;
	top: 0;
	padding: 4px 10px;
	border-radius: 0 0 10px 10px;
}
.el-dialog__headerbtn, .el-dialog__headerbtn:hover {
	.el-dialog__close {
		color: #0c3c21;
		font-weight: bold;
	}
}
.el-dialog__header {
	background:  #66967A;
	padding: 12px 16px 0px 16px;
	font-weight: 500;
	height: 45px;
	position: fixed;
	width: inherit;
	z-index: 100;
	border-radius: 10px 10px 0 0;
}
</style>