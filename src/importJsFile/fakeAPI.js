export const fakeAPI = {
    actions: {
        fakeRefreshTokenAPI({ commit, rootState }) {
            console.log('refresh');
            return {
                data: {
                    errorCode: 0
                }
            }
        },
        fakeLogInAPI({ commit }, data) {
            console.log('login');
            console.log(data);
            return {
                data: {
                    errorCode: 0,
                    data: {
                        sessionToken: 'gameManagementSystem'
                    }
                }
            }

        },
        fakeGetProviderAPI({ rootState }) {
            console.log('get game providers');
            return {
                data: {
                  errorCode: 0,
                  data: {
                    gameProviders: [
                      {
                        id: 0,
                        name: "WanMei",
                        isUM: false,
                        remark: "完美",
                        provider: ["WanMei"],
                        providerType: 0,
                        providerStatus: 1,
                        providerNameCN: "完美",
                        onlineDate: "",
                        providerSupportCurrency: ["AUD", "CNY", "HKD", "IDR", "INR", "JPY", "KRW", "MMK", "MYR", "PHP", "THB", "USD", "VND"],
                        providerSupportLanguage: ["EN", "ZH_TW", "ZH_CN", "JA_JP", "KO_KR", "TH_TH", "VI_VN", "ID_ID"],
                        isCanPlaceBetOnBothSide: 'No',
                        isCustomizedBetLimit: false,
                        isHaveRaiseBet: 'YES',
                        providerProvideCommissionStake: 'Not Confirm',
                        commissionStake: "Use Provider Commission Stake",
                        isHaveCheckSum: true,
                        jackpotRemark: "remark",
                        provideJackpotGame: false,
                        needDisableJackpot: false,
                        providerWalletType: "Seamless Wallet",
                        timeoutTime: "30s",
                        bettingReplay: "In game",
                        isBetListHaveTextDetail: true,
                        isOfficeIPEnable: true,
                        isSupportedIPv6: false,
                        isCanLoginByGameId: true,
                        isHavePromotion: false,
                        differentPrices: "Uniform Pricing",
                        isNeedAskToOpenNewCurrency: false,
                        isHavingHA: false,
                        isPlayerLeaveGameWillCausePendingBet: true,
                        longestTimeForAutoFinishGame: "60s",
                        isCanAskProviderManualSettle: false,
                        isOurSystemHaveResendSettle: 'Have Resend',
                        blockCountries: ["SG", "TW"],
                        currencyRemark: "IDR(1:1000): 568Win supports IDO(IDR:1), so player will see amounts multiplied by 1000 in the game. For example, 568Win displays 1 IDR, provider displays 1000 IDR.\nVND(1:1000): 568Win supports VND(VND1:1), so player will see amounts multiplied by 1000 in the game. For example, 568Win displays 1 VND, provider displays 1000 VND.",
                        infoURL: "https://olympian.myjetbrains.com/youtrack/articles/AT-A-2267/GpId-0-WM",
                        officialDemoLink: "https://win99.org/",
                        device: "Desktop",
                        customerSupportCurrency: "ES_ES, FR_FR, RU_RU",
                        customerSupportLanguage: "\u4e2d\u6587\u3001 IT \u7fa9\u5927\u5229\u6587\u3001ES \u897f\u73ed\u7259\u6587\u3001SW\u65af\u74e6\u5e0c\u91cc\u8a9e\u3001DE \u5fb7\u6587\u3001TH",
                        providerCurrencyRegionRestrictions: "AUD",
                        // providerCurrencyRegionRestrictions: [
                        //   {
                        //     providerId: 0,
                        //     currency: "WM Restriction",
                        //     countries: "WM Restriction",
                        //     createdOn: "2024-07-31T08:28:48.960Z",
                        //     createdBy: "string",
                        //     modifiedOn: "2024-07-31T08:28:48.960Z",
                        //     modifiedBy: "string"
                        //   }
                        // ]
                      },
                      {
                        id: 2,
                        name: "Live Casino",
                        isUM: true,
                        remark: "Live Casino",
                        provider: ["Live Casino"],
                        providerType: 1,
                        providerStatus: 2,
                        providerNameCN: "Live Casino",
                        onlineDate: "2022-10-02T00:00:00.000Z",
                        providerSupportCurrency: ["EUR", "GBP", "USD", "CAD", "AUD"],
                        providerSupportLanguage: ["EN", "FR", "DE", "IT", "ES"],
                        isCanPlaceBetOnBothSide: 'Yes',
                        isCustomizedBetLimit: true,
                        isHaveRaiseBet: 'Not Comfirm',
                        providerProvideCommissionStake: 'Provider not provided',
                        commissionStake: "",
                        isHaveCheckSum: false,
                        jackpotRemark: "jackpot remark",
                        provideJackpotGame: true,
                        needDisableJackpot: true,
                        providerWalletType: "Transfer Wallet",
                        timeoutTime: "60s",
                        bettingReplay: "Request to provider",
                        isBetListHaveTextDetail: false,
                        isOfficeIPEnable: false,
                        isSupportedIPv6: true,
                        isCanLoginByGameId: false,
                        isHavePromotion: true,
                        differentPrices: "Unconfirmed",
                        isNeedAskToOpenNewCurrency: true,
                        isHavingHA: true,
                        isPlayerLeaveGameWillCausePendingBet: false,
                        longestTimeForAutoFinishGame: "120s",
                        isCanAskProviderManualSettle: true,
                        isOurSystemHaveResendSettle: 'No Resend',
                        blockCountries: ["US", "UK"],
                        currencyRemark: "USD(1:1): 568Win supports USD(1:1), so player will see amounts multiplied by 1 in the game. For example, 568Win displays 1 USD, provider displays 1 USD.",
                        infoURL: "https://example.com/info",
                        officialDemoLink: "https://example.com/demo",
                        device: "Mobile",
                        customerSupportCurrency: "FR_FR, DE_DE, IT_IT",
                        customerSupportLanguage: "EN\u3001 FR \u7fa9\u5927\u5229\u6587\u3001DE \u5fb7\u6587\u3001IT \u7fa9\u5927\u5229\u6587",
                        providerCurrencyRegionRestrictions: "AUD",
                        // providerCurrencyRegionRestrictions: [
                        //   {
                        //     providerId: 1,
                        //     currency: "EUR",
                        //     countries: "EU",
                        //     createdOn: "2024-07-31T08:28:48.960Z",
                        //     createdBy: "user1",
                        //     modifiedOn: "2024-07-31T08:28:48.960Z",
                        //     modifiedBy: "user1"
                        //   }
                        // ]
                      },
                      {
                        id: 3,
                        name: "Slots",
                        isUM: true,
                        remark: "Slots",
                        provider: ["Slots"],
                        providerType: 0,
                        providerStatus: 1,
                        providerNameCN: "Slots",
                        onlineDate: "0001-01-01T03:04:11Z",
                        providerSupportCurrency: ["USD", "EUR", "GBP"],
                        providerSupportLanguage: ["EN", "FR", "DE"],
                        isCanPlaceBetOnBothSide: 'noo nooo',
                        isCustomizedBetLimit: true,
                        isHaveRaiseBet: 'NO',
                        providerProvideCommissionStake: 'Provider has provided',
                        commissionStake: "",
                        isHaveCheckSum: false,
                        jackpotRemark: "Jackpot remark",
                        provideJackpotGame: true,
                        needDisableJackpot: true,
                        providerWalletType: "Seamless Wallet",
                        timeoutTime: "45s",
                        bettingReplay: "Back Office",
                        isBetListHaveTextDetail: false,
                        isOfficeIPEnable: false,
                        isSupportedIPv6: true,
                        isCanLoginByGameId: true,
                        isHavePromotion: false,
                        differentPrices: "Different Pricing",
                        isNeedAskToOpenNewCurrency: true,
                        isHavingHA: true,
                        isPlayerLeaveGameWillCausePendingBet: false,
                        longestTimeForAutoFinishGame: "45s",
                        isCanAskProviderManualSettle: true,
                        isOurSystemHaveResendSettle: 'Not Have',
                        blockCountries: ["CA", "DE"],
                        currencyRemark: "USD(1:1): 568Win supports USD(1:1), so player will see amounts multiplied by 1 in the game. For example, 568Win displays 1 USD, provider displays 1 USD.",
                        infoURL: "https://example.com/info3",
                        officialDemoLink: "https://example.com/demo3",
                        device: "Desktop",
                        customerSupportCurrency: "FR_FR, DE_DE, ES_ES",
                        customerSupportLanguage: "EN\u3001 FR \u7fa9\u5927\u5229\u6587\u3001DE \u5fb7\u6587",
                        providerCurrencyRegionRestrictions: "AUD",
                        // providerCurrencyRegionRestrictions: [
                        //   {
                        //     providerId: 2,
                        //     currency: "USD",
                        //     countries: "US",
                        //     createdOn: "2024-07-31T08:28:48.960Z",
                        //     createdBy: "user1",
                        //     modifiedOn: "2024-07-31T08:28:48.960Z",
                        //     modifiedBy: "user1"
                        //   }
                        // ]
                      },
                      {
                        id: 3,
                        name: "Sports",
                        isUM: false,
                        remark: "Sports",
                        provider: ["Sports Betting"],
                        providerType: 1,
                        providerStatus: 2,
                        providerNameCN: "Sports",
                        onlineDate: "2024-08-02T03:04:11Z",
                        providerSupportCurrency: ["AUD", "CAD", "NZD"],
                        providerSupportLanguage: ["EN", "FR", "ES"],
                        isCanPlaceBetOnBothSide: 'No need for confirmation',
                        isCustomizedBetLimit: false,
                        isHaveRaiseBet: 'NO',
                        providerProvideCommissionStake: 'Confirmed',
                        commissionStake: "The provider has provided it, but we don\'t handle it",
                        isHaveCheckSum: true,
                        jackpotRemark: "Jackpot remark",
                        provideJackpotGame: false,
                        needDisableJackpot: false,
                        providerWalletType: "Wallet Type 3",
                        timeoutTime: "60s",
                        bettingReplay: "No",
                        isBetListHaveTextDetail: true,
                        isOfficeIPEnable: true,
                        isSupportedIPv6: false,
                        isCanLoginByGameId: true,
                        isHavePromotion: true,
                        differentPrices: "Unconfirmed",
                        isNeedAskToOpenNewCurrency: false,
                        isHavingHA: false,
                        isPlayerLeaveGameWillCausePendingBet: true,
                        longestTimeForAutoFinishGame: "120s",
                        isCanAskProviderManualSettle: false,
                        isOurSystemHaveResendSettle: 'Need Confirm',
                        blockCountries: ["AU", "CA"],
                        currencyRemark: "AUD(1:1): 568Win supports AUD(1:1), so player will see amounts multiplied by 1 in the game. For example, 568Win displays 1 AUD, provider displays 1 AUD.",
                        infoURL: "https://example.com/info4",
                        officialDemoLink: "https://example.com/demo4",
                        device: "Desktop, Mobile",
                        customerSupportCurrency: "EN_US, FR_FR, ES_ES",
                        customerSupportLanguage: "EN\u3001 FR \u7fa9\u5927\u5229\u6587\u3001ES \u897f\u73ed\u7259\u6587",
                        providerCurrencyRegionRestrictions: "AUD",
                        // providerCurrencyRegionRestrictions: [
                        //   {
                        //     providerId: 3,
                        //     currency: "AUD",
                        //     countries: "AU",
                        //     createdOn: "2024-07-31T08:28:48.960Z",
                        //     createdBy: "user2",
                        //     modifiedOn: "2024-07-31T08:28:48.960Z",
                        //     modifiedBy: "user2"
                        //   }
                        // ]
                      }
                    ]
                  }
                }
            }
        },
        fakeAddProviderAPI(context, data) {
            console.log('add provider data');
            console.log(data);
            return {
                data: {
                    errorCode: 0
                }
            }
        },
        fakeUpdateProviderAPI(context, data) {
            console.log('update provider data');
            console.log(data);
            return {
                data: {
                    errorCode: 0
                }
            }
        },
        fakeGetGameListAPI({ state }) {
            console.log('get game list');
            return {
                data: {
                    errorCode: 0,
                    //餵資料
                    data: {
                        games: [
                            {
                                gameProviderId: 0,
                                gameId: 0,
                                gameType: 2,
                                gameCode: "test_rup",
                                provider: "le",
                                gameLanguages: [
                                    {
                                        language: "en",
                                        gameName: "Candy Gosh",
                                        gameIconFilePath: ""
                                    }
                                ],
                                supportedCurrencies: [
                                    "CAD", "CHF", "CNY", "GBP"
                                ],
                                blockedCountries: [
                                    "TW"
                                ],
                                isUnderMaintain: true,
                                isEnabled: true,
                                isRetired: true,
                                remark: "Happy everyday"
                            },
                            {
                                gameProviderId: 1,
                                gameId: 1,
                                gameType: 1,
                                gameCode: "test_hungry",
                                provider: "flora_shop",
                                gameLanguages: [
                                    {
                                        language: "HK",
                                        gameName: "SHOT",
                                        gameIconFilePath: ""
                                    }
                                ],
                                supportedCurrencies: [
                                    "HKD",
                                    "IDR",
                                    "JPY",
                                    "KRW",
                                    "MMK",
                                ],
                                blockedCountries: [
                                    "EN"
                                ],
                                isUnderMaintain: true,
                                isEnabled: false,
                                isRetired: false,
                                remark: "DON'T shot me."
                            },
                            {
                                gameProviderId: 3,
                                gameId: 4,
                                gameType: 4,
                                gameCode: "test_9527",
                                provider: "Heaven",
                                gameLanguages: [
                                    {
                                        language: "ZH",
                                        gameName: "Big and Small",
                                        gameIconFilePath: ""
                                    }
                                ],
                                supportedCurrencies: [
                                    "NZD",
                                    "SEK",
                                    "THB",
                                    "USD",
                                ],
                                blockedCountries: [
                                    "JP"
                                ],
                                isUnderMaintain: false,
                                isEnabled: true,
                                isRetired: true,
                                remark: "Run and run."
                            },
                            {
                                gameProviderId: 2,
                                gameId: 8,
                                gameType: 3,
                                gameCode: "over",
                                provider: "PAPA",
                                gameLanguages: [
                                    {
                                        language: "GG",
                                        gameName: "SUNSHINE",
                                        gameIconFilePath: ""
                                    }
                                ],
                                supportedCurrencies: [
                                    "CNY", "USD", "VND",
                                ],
                                blockedCountries: [
                                    ""
                                ],
                                isUnderMaintain: true,
                                isEnabled: true,
                                isRetired: false,
                                remark: "NEVER"
                            },
                        ]
                    }
                }
            }
        },
        fakeUpdateGameAPI({ rootState }, updateData) {
            let data = {
                secretKey: rootState.userData.secretKey,
                sessionToken: rootState.userData.sessionToken,
                modifiedBy: rootState.userData.username,
                rank: 10,
                device: 'IP',
                platform: 'ST',
                rtp: 0,
                rows: 0,
                reels: 0,
                lines: 0,
                ...updateData
            }
            console.log('update game data');
            console.log(data);
            return {
                data: {
                    errorCode: 0
                }
            }
        },
        fakeUploadGameIconAPI({ state }, file) {
            console.log('uploadIcon');
            return {
                data: {
                    errorCode: 0
                }
            }
        },
        fakeAddNewGameAPI({ rootState }, newGame) {
            console.log('add new game');
            console.log(newGame);
            return {
                data: {
                    errorCode: 0
                }
            }
        },
        fakeUpdateGameStatusAPI({ rootState }, gameData) {
            // let url = '/api/Game/UpdateGameStatus';
            let data = {
                secretKey: rootState.userData.secretKey,
                sessionToken: rootState.userData.sessionToken,
                games: gameData.games,
                action: gameData.action,
                reason: gameData.reason,
                modifiedBy: rootState.userData.username
            }
            console.log('update game status');
            console.log(data);
            return {
                data: {
                    errorCode: 0
                }
            }
        },
        fakePurgeGameCache({ rootState }) {
            console.log('purge game cache');
            return {
                data: {
                    errorCode: 0
                }
            }
        },
        fakeGetPermissionAPI({ rootState }) {
            console.log('get user permission');
            return {
                data: {
                    errorCode: 0,
                    data: {
                        permissions: [
                            {
                                page: 'Game Provider Page',
                                canRead: true,
                                canCreate: true,
                                canUpdate: true,
                                canDelete: true
                            },
                            {
                                page: 'Game Page',
                                canRead: true,
                                canCreate: true,
                                canUpdate: true,
                                canDelete: true
                            },
                            {
                                page: 'Account Management',
                                canRead: true,
                                canCreate: true,
                                canUpdate: true,
                                canDelete: true
                            },
                            {
                                page: 'Refresh Game List Cache',
                                canRead: true,
                                canCreate: true,
                                canUpdate: true,
                                canDelete: true
                            },
                        ],
                    }
                }
            }
        },
        fakeGetAllUserPermissionAPI({ rootState }) {
            console.log('get all account permission');
            return {
                data: {
                    errorCode: 0,
                    data: {
                        usersWithPermission: [
                            {
                                username: "testRoot",
                                permissions: [
                                    {
                                        page: 'Game Provider Page',
                                        canRead: true,
                                        canCreate: true,
                                        canUpdate: true,
                                        canDelete: true
                                    },
                                    {
                                        page: 'Game Page',
                                        canRead: true,
                                        canCreate: true,
                                        canUpdate: true,
                                        canDelete: true
                                    },
                                    {
                                        page: 'Account Management',
                                        canRead: true,
                                        canCreate: true,
                                        canUpdate: true,
                                        canDelete: true
                                    },
                                    {
                                        page: 'Refresh Game List Cache',
                                        canRead: true,
                                        canCreate: true,
                                        canUpdate: true,
                                        canDelete: true
                                    },
                                ],
                            },
                            {
                                username: "John",
                                permissions: [
                                    {
                                        page: 'Game Provider Page',
                                        canRead: true,
                                        canCreate: true,
                                        canUpdate: true,
                                        canDelete: true
                                    },
                                    {
                                        page: 'Game Page',
                                        canRead: true,
                                        canCreate: true,
                                        canUpdate: true,
                                        canDelete: true
                                    },
                                    {
                                        page: 'Account Management',
                                        canRead: true,
                                        canCreate: true,
                                        canUpdate: true,
                                        canDelete: true
                                    },
                                    {
                                        page: 'Refresh Game List Cache',
                                        canRead: true,
                                        canCreate: true,
                                        canUpdate: true,
                                        canDelete: true
                                    },
                                ],
                            },
                            {
                                username: "testRead",
                                permissions: [
                                    {
                                        page: 'Game Provider Page',
                                        canRead: true,
                                        canCreate: false,
                                        canUpdate: false,
                                        canDelete: false
                                    },
                                    {
                                        page: 'Game Page',
                                        canRead: true,
                                        canCreate: false,
                                        canUpdate: false,
                                        canDelete: false
                                    },
                                    {
                                        page: 'Account Management',
                                        canRead: true,
                                        canCreate: false,
                                        canUpdate: false,
                                        canDelete: false
                                    },
                                    {
                                        page: 'Refresh Game List Cache',
                                        canRead: true,
                                        canCreate: false,
                                        canUpdate: false,
                                        canDelete: false
                                    },
                                ],
                            },
                            {
                                username: "testCreate",
                                permissions: [
                                    {
                                        page: 'Game Provider Page',
                                        canRead: true,
                                        canCreate: true,
                                        canUpdate: false,
                                        canDelete: false
                                    },
                                    {
                                        page: 'Game Page',
                                        canRead: true,
                                        canCreate: true,
                                        canUpdate: false,
                                        canDelete: false
                                    },
                                    {
                                        page: 'Account Management',
                                        canRead: true,
                                        canCreate: true,
                                        canUpdate: false,
                                        canDelete: false
                                    },
                                    {
                                        page: 'Refresh Game List Cache',
                                        canRead: true,
                                        canCreate: true,
                                        canUpdate: false,
                                        canDelete: false
                                    },
                                ],
                            },
                            {
                                username: "testUpdate",
                                permissions: [
                                    {
                                        page: 'Game Provider Page',
                                        canRead: true,
                                        canCreate: false,
                                        canUpdate: true,
                                        canDelete: false
                                    },
                                    {
                                        page: 'Game Page',
                                        canRead: true,
                                        canCreate: false,
                                        canUpdate: true,
                                        canDelete: false
                                    },
                                    {
                                        page: 'Account Management',
                                        canRead: true,
                                        canCreate: false,
                                        canUpdate: true,
                                        canDelete: false
                                    },
                                    {
                                        page: 'Refresh Game List Cache',
                                        canRead: true,
                                        canCreate: false,
                                        canUpdate: true,
                                        canDelete: false
                                    },
                                ],
                            },
                            {
                                username: "testDelete",
                                permissions: [
                                    {
                                        page: 'Game Provider Page',
                                        canRead: true,
                                        canCreate: false,
                                        canUpdate: false,
                                        canDelete: true
                                    },
                                    {
                                        page: 'Game Page',
                                        canRead: true,
                                        canCreate: false,
                                        canUpdate: false,
                                        canDelete: true
                                    },
                                    {
                                        page: 'Account Management',
                                        canRead: true,
                                        canCreate: false,
                                        canUpdate: false,
                                        canDelete: true
                                    },
                                    {
                                        page: 'Refresh Game List Cache',
                                        canRead: true,
                                        canCreate: false,
                                        canUpdate: false,
                                        canDelete: true
                                    },
                                ],
                            },
                        ]
                    }
                }
            }
        },
        fakeCreateAccountAPI(context, account) {
            console.log('create account');
            console.log(account);
            return {
                data: {
                    errorCode: 0
                }
            }
        },
        fakeUpdateAccountPwdAPI({ rootState }, userData) {
            let data = {
                secretKey: rootState.userData.secretKey,
                sessionToken: rootState.userData.sessionToken,
                username: userData.username,
                password: userData.password,
                modifiedBy: rootState.userData.username
            }
            console.log('update account');
            console.log(data);
            return {
                data: {
                    errorCode: 0
                }
            }
        },
        fakeUpdatePermissionAPI({ rootState }, userData) {
            let data = {
                secretKey: rootState.userData.secretKey,
                sessionToken: rootState.userData.sessionToken,
                username: userData.username,
                permissions: userData.permissions,
                modifiedBy: rootState.userData.username
            }
            console.log('update permissions');
            console.log(data);
            return {
                data: {
                    errorCode: 0
                }
            }
        },
    }
}