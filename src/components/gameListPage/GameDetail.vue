<template>
  <div class="skin" v-if="show">
    <div id="game_detail">
      <div class="operation">
        <button
          v-if="permission.canUpdate"
          type="button"
          class="btn btn-block btn-default btn-sm"
          @click="updateGame"
        >
          Save
        </button>
        <a href="#" @click="$emit('close')">
          <i class="far fa-times-circle"></i>
        </a>
      </div>
      <div class="top_area">
        <div class="basic">
          <ul>
            <li>
              <div class="form-group">
                <label>Game Provider :</label>
                <select
                  class="form-control"
                  v-model="providerDisplayName"
                  disabled
                >
                  <option v-for="(provider, i) in providersData"
                  :key="i" >
                     {{provider.id}}.{{ provider.name }}
                  </option>
                </select>
              </div>
            </li>
            <li>
              <div class="form-group">
                <label>Game ID :</label>
                <input
                  type="number"
                  class="form-control"
                  v-model.number="detailData.gameId"
                  disabled
                />
              </div>
            </li>
            <li>
              <div class="form-group">
                <label>Game Rank :</label>
                <input
                  :disabled="disabled"
                  type="number"
                  class="form-control"
                  v-model="detailData.rank"
                />
              </div>
            </li>
            <li>
              <div class="form-group">
                <label>Game Type :</label>
                <select
                  class="form-control"
                  v-model="gameTypeName"
                  :disabled="disabled"
                >
                  <option v-for="(gameType, i) in gameTypeList" :key="i">
                    {{ gameType.gameTypeName }}
                  </option>
                </select>
              </div>
            </li>
            <li>
              <div class="form-group">
                <label>New Game Type :</label>
                <select
                  class="form-control"
                  v-model="newGameTypeName"
                  :disabled="disabled"
                >
                  <option v-for="(gameType, i) in newGameTypeList" :key="i">
                    {{ gameType.gameTypeName }}
                  </option>
                </select>
              </div>
            </li>
            <li>
              <div class="form-group">
                <label>Game Code :</label>
                <input
                  :disabled="disabled"
                  type="text"
                  class="form-control"
                  v-model.trim="detailData.gameCode"
                />
              </div>
            </li>
            <li>
              <div class="form-group">
                <label>Game Code 1 :</label>
                <input
                  :disabled="disabled"
                  type="text"
                  class="form-control"
                  v-model.trim="detailData.gameCode1"
                />
              </div>
            </li>
            <li>
              <div class="form-group">
                <label>Game Code 2 :</label>
                <input
                  :disabled="disabled"
                  type="text"
                  class="form-control"
                  v-model.trim="detailData.gameCode2"
                />
              </div>
            </li>
            <li>
              <div class="form-group">
                <label>Provider : </label>
                <select
                  class="form-control"
                  v-model="detailData.provider"
                >
                  <option
                    v-for="provider in providerSource"
                    :key="provider"
                    :value="provider"
                  >
                    {{ provider }}
                  </option>
                </select>
              </div>
            </li>
          </ul>
        </div>

        <div class="info">
          <h3>Game Info :</h3>
          <div class="form-group">
            <ul>
              <li>
                <label>Device :</label>
                <select class="form-control" v-model="detailData.device">
                  <option v-for="(device, i) in supportDevice" :key="i" :value="device">
                    {{ device }}
                  </option>
                </select>
              </li>
              <li>
                <label>Platform :</label>
                <select class="form-control" v-model="detailData.platform">
                  <option v-for="(platform, i) in supportPlatform" :key="i" :value="platform">
                    {{ platform }}
                  </option>
                </select>
              </li>
              <li>
                <label>RTP :</label>
                <input
                  :disabled="disabled"
                  type="text"
                  class="form-control"
                  v-model.trim="detailData.rtp"
                />
              </li>
              <li>
                <label>Rows :</label>
                <input
                  :disabled="disabled"
                  type="number"
                  class="form-control"
                  v-model="detailData.rows"
                />
              </li>
              <li>
                 <label>Reels :</label>
                <input
                  :disabled="disabled"
                  type="number"
                  class="form-control"
                  v-model="detailData.reels"
                />
              </li>
              <li>
                <label>Lines :</label>
                <input
                  :disabled="disabled"
                  type="number"
                  class="form-control"
                  v-model="detailData.lines"
                />
              </li>
            </ul>
          </div>
        </div>

        <div class="status">
          <h3>Game Status :</h3>
          <Radio text="IsNewGame" radio1Text="True" radio2Text="False" v-model="detailData.isNewGame" v-if="gameDetail.gameProviderId < 1000"/>
          <Radio text="IsJackpot" radio1Text="True" radio2Text="False" v-model="detailData.isJackpot" />
          <Radio text="IsEnabled" radio1Text="Enabled" radio2Text="Disabled" v-model="detailData.isEnabled" />
          <Radio text="IsUM" radio1Text="UM" radio2Text="Un-UM" v-model="detailData.isUnderMaintain" />
          <Radio text="IsRetired" radio1Text="Retired" radio2Text="Non-Retired" v-model="detailData.isRetired" />
          <Radio text="IsProvideCommission" radio1Text="Yes" radio2Text="No" v-model="detailData.isProvideCommission" />
          <Radio text="HasHedgeBet" radio1Text="Yes" radio2Text="No" v-model="detailData.hasHedgeBet" />
          <Radio text="HasBuyFreeSpin" radio1Text="Yes" radio2Text="No" v-model="detailData.hasBuyFreeSpin" />
          <div class="fblock form-group">
            <label>Remark :</label>
                <input
                  :disabled="disabled"
                  type="text"
                  class="form-control"
                  v-model="detailData.remark"
                />
          </div>
        </div>
      </div>
      <div class="language">
        <ul>
          <li v-for="(gameLanguage, i) in detailData.gameLanguages" :key="i">
            <div class="form-group">
              <label>Game Language :</label>
              <select
                  class="form-control"
                  v-model.trim="detailData.gameLanguages[i].language"
                  :disabled="disabled"
                >
                  <option v-for="(language) in languageList" :key="language">
                    {{ language }}
                  </option>
              </select>
            </div>

            <div class="form-group">
              <label>Game Name :</label>
              <input
                :disabled="disabled"
                type="text"
                class="form-control"
                v-model.trim="detailData.gameLanguages[i].gameName"
              />
            </div>

            <UploadComponent
              :gameLanguage="detailData.gameLanguages[i]"
              :permission="permission"
              :index="i"
              :fileValue="true"
              :urlValue="false"
              :gameId="detailData.gameId"
              :gameProviderId="gameDetail.gameProviderId"
              @updateIconName="updateIconName">
            </UploadComponent>
          </li>
          <div class="btn" v-if="permission.canUpdate">
            <button
              type="button"
              class="btn btn-block btn-default btn-sm"
              @click="addLang"
            >
              Add more language
            </button>
            <button
              type="button"
              class="btn btn-block btn-default btn-sm"
              @click="deleteLang"
            >
              Delete the last language
            </button>
          </div>
        </ul>
      </div>
      <div class="currency" >
        <h3>Supported Currency:</h3>
        <label v-for="(currency, i) in supCurrency" :key="i" class="col-md-1">
          <input
            :disabled="disabled"
            type="checkbox"
            :value="currency"
            v-model.trim="detailData.supportedCurrencies"
          />
          {{ currency }}
        </label>
      </div>
      <div class="blocked" >
        <label class="new_blocked"
          >Blocked Country :
          <input
            :disabled="disabled"
            type="text"
            class="form-control"
            placeholder="Please enter blocked country"
            v-model.trim="newblockedCountry"
          />
        </label>

        <label
          v-for="(country, i) in detailData.blockedCountries"
          :key="i"
          class="old_blocked"
        >
          <input
            type="checkbox"
            :value="country"
            v-model="detailData.blockedCountries"
            :disabled="disabled"
          />
          {{ country }}
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import Radio from "../common/Radio.vue";
import UploadComponent from "../common/UploadComponent.vue";

export default {
  name: "GameDetail",
  components: {
    Radio,
    UploadComponent
  },
  data() {
    return {
      gameTypeName: "",
      gameTypeId: 0,
      newGameTypeName: "",
      newGameTypeId: 0,
      newblockedCountry: "",
      iconNames: [],
      baseURL: process.env.VUE_APP_API_URL,
      providerSource: [],
      providerIdAndName:"",
    };
  },
  props: ["show", "gameDetail", "supCurrency", "providersData", "permission", "gameTypeList", "newGameTypeList", "supportDevice", "supportPlatform"],
  emits: ["close", "updateGameList"],
  computed: {
    detailData() {
      return this.gameDetail;
    },
    disabled() {
      return !this.permission.canUpdate;
    },
    languageList() {
      return this.$store.state.languageList;
    }
  },
  methods: {
    addLang() {
      this.detailData.gameLanguages.push({
        gameIconFilePath: "",
        gameName: "",
        language: "en",
        isGameIconOnServer: true,
      });
    },
    deleteLang() {
      let cancel =
        this.detailData.gameLanguages.length - 1 < 1
          ? 1
          : this.detailData.gameLanguages.length - 1;
      this.detailData.gameLanguages.splice(cancel, 1);
    },
    updateGame() {
      if (this.newblockedCountry !== "") {
        this.detailData.blockedCountries = this.newblockedCountry.split(",");
      }
      for (let i = 0; i < this.iconNames.length; i++) {
        this.detailData.gameLanguages[i].gameIconFilePath = this.iconNames[i];
      }

      if(this.detailData.provider == "")
      {
        swal(
          "provider is null !",
          "Please select the provider.",
          "error",
          { button: "OK" }
        );

        return;
      }

      //Game Data
      let data = {
        gameProviderId: parseInt(this.gameDetail.gameProviderId),
        gameId: parseInt(this.detailData.gameId),
        rank: parseInt(this.detailData.rank),
        gameType: parseInt(this.gameTypeId),
        newGameType: parseInt(this.newGameTypeId),
        device: this.detailData.device,
        platform: this.detailData.platform,
        rtp: this.detailData.rtp,
        rows: parseInt(this.detailData.rows),
        reels: parseInt(this.detailData.reels),
        lines: parseInt(this.detailData.lines),
        gameCode: this.detailData.gameCode,
        gameCode1: this.detailData.gameCode1,
        gameCode2: this.detailData.gameCode2,
        gameCode3: this.detailData.gameCode3,
        gameCode4: this.detailData.gameCode4,
        gameCode5: this.detailData.gameCode5,
        provider: this.detailData.provider,
        gameLanguages: this.detailData.gameLanguages,
        supportedCurrencies: this.detailData.supportedCurrencies,
        blockedCountries: this.detailData.blockedCountries,
        isUnderMaintain: this.detailData.isUnderMaintain,
        isEnabled: this.detailData.isEnabled,
        isRetired: this.detailData.isRetired,
        isJackpot: this.detailData.isJackpot,
        isNewGame: this.detailData.isNewGame,
        remark: this.detailData.remark,
        isProvideCommission: this.detailData.isProvideCommission,
        hasHedgeBet: this.detailData.hasHedgeBet,
        hasBuyFreeSpin: this.detailData.hasBuyFreeSpin
      };
      
      let error = false;
      for (let i = 0; i < this.detailData.gameLanguages.length; i++) {
        if (
          this.detailData.gameLanguages[i].language == "" ||
          this.detailData.gameLanguages[i].gameName == ""
        ) {
          error = true;
        }
      }

      if (error) {
        swal(
          "Language is null !",
          "Please enter the information of language.",
          "error",
          { button: "OK" }
        );
      } else {
        //Update Data
        this.$store.dispatch("updateGameAPI", data).then((res) => {
          if (res.data.errorCode !== 0) {
            swal("Something is wrong !", "Fail to update.", "error", {
              button: "OK",
            });
          } else {
            this.iconNames = [];
            this.newblockedCountry = "";
            var that = this;
            swal("Success !", "Success to update this game.", "success", {
              button: "OK",
            }).then(function(){
              that.$emit("updateGameList");
              that.$emit("close");
            });
          }
        });
      }
    },
    ProviderSelectBind(providerId){
      this.providerSource = this.$store.state.providersData.find((x)=>x.id == providerId).provider;
    },
    updateIconName(iconName, i) {
      this.iconNames[i] = iconName;
    }
  },
  watch: {
    detailData() {
      //Provider ID to Provider Name
      let providerId = this.gameDetail.gameProviderId;
      let provider = this.providersData.filter(function (item, i) {
        return item.id == providerId;
      });
      this.providerDisplayName = providerId + "." + provider[0].name

      this.ProviderSelectBind(providerId);
      let gameTypeId = this.gameDetail.gameType;
      let gameType = this.gameTypeList.filter(function (item, i) {
        return item.gameTypeId == gameTypeId;
      });
      this.gameTypeName = gameType[0].gameTypeName;

      let newGameTypeId = this.gameDetail.newGameType;
      let newGameType = this.newGameTypeList.filter(function (item, i) {
        return item.gameTypeId == newGameTypeId;
      });
      this.newGameTypeName = newGameType[0].gameTypeName;
    },
    gameTypeName() {
      let gName = this.gameTypeName;
      let gameType = this.gameTypeList.filter(function (item, i) {
        // console.log(pName);
        return item.gameTypeName.indexOf(gName) > -1;
      });
      this.gameTypeId = gameType[0].gameTypeId;
    },
    newGameTypeName() {
      let gName = this.newGameTypeName;
      let newGameType = this.newGameTypeList.filter(function (item, i) {
        // console.log(pName);
        return item.gameTypeName.indexOf(gName) > -1;
      });
      this.newGameTypeId = newGameType[0].gameTypeId;
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/rwd.scss";
.skin {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9;
  background-color: rgba(255, 255, 255, 0.8);
}
#game_detail {
  background-color: #eee;
  position: absolute;
  top: 6px;
  // right: 6px;
  // bottom: 6px;
  left: 6px;
  z-index: 10;
  border-radius: 25px;
  border-top: 5px solid #acc;
  border-right: 1px solid #acc;
  border-bottom: 1px solid #acc;
  border-left: 1px solid #acc;

  > div {
    padding: 10px;
  }

  .operation {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    > button {
      margin: 15px;
      width: 100px;
      background-color: #acc;
      border: none;

      &:hover {
        background-color: rgb(114, 175, 175);
      }
    }
    > a {
      order: -1;
      margin: 15px;
      color: #000;
      &:hover {
        color: rgb(112, 110, 91);
      }
    }
  }
  .top_area {
    border-bottom: 1px solid #acc;
    margin-bottom: 10px;
    display: flex;
    @include rwd768 {
      justify-content: space-around;
    }

    .basic {
      width: 50%;
      @include rwd768 {
        width: 35%;
      }
      ul {
        list-style: none;
        @include rwd576 {
          padding: 0;
        }

        li {
          display: flex;
          > .form-group {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            @include rwd768 {
              max-width: 180px;
            }

            label {
              margin: 0 5px;
              @include rwd768 {
                font-size: 14px;
              }
            }
            select,
            input {
              width: 150px;
            }
          }
        }
      }
    }
    .info {
      width: 30%;
      @include rwd768 {
        width: 35%;
      }

      h3 {
        margin-bottom: 20px;
        @include rwd768 {
          font-size: 22px;
          font-weight: bold;
        }
      }
      .form-group {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        @include rwd768 {
          font-size: 14px;
        }
        ul {
          list-style: none;
          padding-left: 0px;
          @include rwd576 {
            padding: 0;
          }

          label {
          margin: 0 5px;
          }
          input {
            width: 150px;
          }
        }
        
      }
    }
    .status {
      width: 50%;
      @include rwd768 {
        min-width: 235px;
      }

      h3 {
        margin-bottom: 20px;
        @include rwd768 {
          font-size: 22px;
          font-weight: bold;
        }
      }
      .fblock {
        display: block !important;
      }
      .form-group {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        @include rwd768 {
          font-size: 14px;
        }

        label {
          margin: 0 5px;
        }
      }
    }
  }

  .language {
    border-bottom: 1px solid #acc;

    ul {
      padding: 0;
      display: flex;
      flex-direction: column;
      list-style: none;

      li {
        display: flex;
        justify-content: space-around;
        .form-group {
          width: 30%;

          img {
            width: 100px;
            height: 100px;
          }
          input[type="file"] {
            @include rwd1200 {
              max-width: 200px;
            }
            @include rwd768 {
              max-width: 150px;
              font-size: 14px;
            }
          }
        }
      }
      button {
        margin: 15px;
        width: 180px;
        background-color: #acc;
        border: none;
        display: inline-block;

        &:hover {
          background-color: rgb(114, 175, 175);
        }
      }
    }
  }

  .currency {
    border-bottom: 1px solid #acc;
    margin-bottom: 10px;
    label {
      padding: 5px;
      margin: 5px;
    }
  }

  .blocked {
    .new_blocked {
      display: flex;
      align-items: center;
      font-size: 24px;
      font-weight: normal;
      input {
        width: 300px;
        margin-left: 16px;
      }
    }
    .old_blocked {
      padding: 5px;
      margin: 5px;
    }
  }
}
</style>
