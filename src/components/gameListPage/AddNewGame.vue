<template>
  <div class="skin" v-if="show">
    <div id="add_new_game">
      <div class="operation">
        <button
          type="button"
          class="btn btn-block btn-default btn-sm"
          @click="addNewGame"
        >
          Save
        </button>
        <a
          href="#"
          @click="
            $emit('close');
            resetFormData();
          "
        >
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
                  id="game-provider-select"
                  class="form-control"
                  @change="gameProviderOnChange($event)"
                  v-model="newGameData.gameProviderId"
                  v-if="checkGameList[0]"
                >
                  <option value="-1" selected disabled>Please Choose</option>
                  <option
                    v-for="provider in providersData"
                    :key="provider.id"
                    :value="provider.id"
                  >
                    {{provider.id}}.{{ provider.name }}
                  </option>
                </select>
                <div v-else>-- Loading Data --</div>
              </div>
            </li>
            <li>
              <div class="form-group">
                <label>Game ID :</label>
                <input
                  type="number"
                  class="form-control"
                  v-model.number="newGameData.gameId"
                  disabled
                />
              </div>
            </li>
            <li>
              <div class="form-group">
                <label>Game Rank :</label>
                <input
                  type="number"
                  class="form-control"
                  v-model.number="newGameData.rank"
                  disabled
                />
              </div>
            </li>
            <li>
              <div class="form-group">
                <label>Game Type :</label>
                <select
                  class="form-control"
                  v-model.number="newGameData.gameType"
                >
                  <option
                    v-for="(gameType, i) in gameTypeList"
                    :key="i"
                    :value="gameType.gameTypeId"
                  >
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
                  v-model.number="newGameData.newGameType"
                >
                  <option
                    v-for="(gameType, i) in newGameTypeList"
                    :key="i"
                    :value="gameType.gameTypeId"
                  >
                    {{ gameType.gameTypeName }}
                  </option>
                </select>
              </div>
            </li>
            <li>
              <div class="form-group">
                <label>Game Code :</label>
                <input
                  type="text"
                  class="form-control"
                  v-model.trim="newGameData.gameCode"
                  required
                />
              </div>
            </li>
            <li>
              <div class="form-group">
                <label>Game Code 1:</label>
                <input
                  type="text"
                  class="form-control"
                  v-model.trim="newGameData.gameCode1"
                />
              </div>
            </li>
            <li>
              <div class="form-group">
                <label>Game Code 2:</label>
                <input
                  type="text"
                  class="form-control"
                  v-model.trim="newGameData.gameCode2"
                />
              </div>
            </li>
            <li>
              <div class="form-group">
                <label v-if="newGameData.gameProviderId < 1000" >Provider : </label>
                <label v-else>SubProvider : </label>
                <select
                  class="form-control"
                  v-model="newGameData.provider"
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
                <select class="form-control" v-model="newGameData.device">
                  <option
                    v-for="(device, i) in supportDevice"
                    :key="i"
                    :value="device"
                  >
                    {{ device }}
                  </option>
                </select>
              </li>
              <li>
                <label>Platform :</label>
                <select class="form-control" v-model="newGameData.platform">
                  <option
                    v-for="(platform, i) in supportPlatform"
                    :key="i"
                    :value="platform"
                  >
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
                  v-model.trim="newGameData.rtp"
                />
              </li>
              <li>
                <label>Rows :</label>
                <input
                  :disabled="disabled"
                  type="number"
                  class="form-control"
                  v-model="newGameData.rows"
                />
              </li>
              <li>
                <label>Reels :</label>
                <input
                  :disabled="disabled"
                  type="number"
                  class="form-control"
                  v-model="newGameData.reels"
                />
              </li>
              <li>
                <label>Lines :</label>
                <input
                  :disabled="disabled"
                  type="number"
                  class="form-control"
                  v-model="newGameData.lines"
                />
              </li>
            </ul>
          </div>
        </div>

        <div class="status">
          <h3>Game Status :</h3>
          <Radio text="IsNewGame" radio1Text="True" radio2Text="False" v-model="newGameData.isNewGame" />
          <Radio text="IsJackpot" radio1Text="True" radio2Text="False" v-model="newGameData.isJackpot" />
          <Radio text="IsEnabled" radio1Text="Enabled" radio2Text="Disabled" v-model="newGameData.isEnabled" />
          <Radio text="IsUM" radio1Text="UM" radio2Text="Un-UM" v-model="newGameData.isUnderMaintain" />
          <Radio text="IsRetired" radio1Text="Retired" radio2Text="Non-Retired" v-model="newGameData.isRetired" />
          <Radio text="IsProvideCommission" radio1Text="Yes" radio2Text="No" v-model="newGameData.isProvideCommission" />
          <Radio text="HasHedgeBet" radio1Text="Yes" radio2Text="No" v-model="newGameData.hasHedgeBet" />
          <Radio text="HasBuyFreeSpin" radio1Text="Yes" radio2Text="No" v-model="newGameData.hasBuyFreeSpin" />
          <div class="fblock form-group">
            <label>Remark :</label>
            <input
              :disabled="disabled"
              type="text"
              class="form-control"
              v-model="newGameData.remark"
            />
          </div>
        </div>
      </div>
      <div class="language">
        <ul>
          <li v-for="(gameLanguage, i) in newGameData.gameLanguages" :key="i">
            <div class="form-group">
              <label>Game Language :</label>
              <select
                class="form-control"
                v-model.trim="newGameData.gameLanguages[i].language"
                :disabled="disabled"
              >
                <option v-for="language in languageList" :key="language">
                  {{ language }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label>Game Name :</label>
              <input
                type="text"
                class="form-control"
                v-model.trim="newGameData.gameLanguages[i].gameName"
              />
            </div>
            <UploadComponent 
              :gameLanguage="newGameData.gameLanguages[i]"
              :permission="permission"
              :index="i"
              :fileValue="false"
              :urlValue="true"
              :gameId="newGameData.gameId"
              :gameProviderId="newGameData.gameProviderId"
              @updateIconName="updateIconName">
            </UploadComponent>
          </li>
          <div class="btn">
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
            type="checkbox"
            :value="currency"
            v-model.trim="newGameData.supportedCurrencies"
          />
          {{ currency }}
        </label>
      </div>
      <div class="blocked" >
        <label class="new_blocked"
          >Blocked Country :
          <input
            type="text"
            class="form-control"
            placeholder="Please enter blocked country code"
            v-model.trim="newblockedCountry"
          />
        </label>

        <label
          v-for="(country, i) in newGameData.blockedCountries"
          :key="i"
          class="old_blocked"
        >
          <input
            type="checkbox"
            :value="country"
            v-model="newGameData.blockedCountries"
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
  name: "AddNewGame",
  components: {
    Radio,
    UploadComponent
  },
  data() {
    return {
      newGameData: this.$store.getters.newGameData,
      providerName: "",
      gameTypeName: "",
      newblockedCountry: "",
      iconNames: [],
      isDocking: false,
      providerSource: [],
      gameList: []
    };
  },
  props: [
    "show",
    "providersData",
    "supCurrency",
    "gameTypeList",
    "newGameTypeList",
    "checkGameList",
    "supportDevice",
    "supportPlatform",
  ],
  emits: ["close", "updateGameList"],
  computed: {
    languageList() {
      return this.$store.state.languageList;
    },
  },
  methods: {
    addLang() {
      this.newGameData.gameLanguages.push({
        gameIconFilePath: "",
        gameName: "",
        language: "",
        isGameIconOnServer: "true",
      });
    },
    deleteLang() {
      let cancel =
        this.newGameData.gameLanguages.length - 1 < 1
          ? 1
          : this.newGameData.gameLanguages.length - 1;
      this.newGameData.gameLanguages.splice(cancel, 1);
    },
    checkBeforeAddGameApi(callback){
      if (
        this.newGameData.gameProviderId == -1 ||
        this.newGameData.gameId == "" ||
        this.newGameData.rank == "" ||
        this.newGameData.provider == ""
      ) {
        swal(
          "Game provider is not choose !",
          "Please choose game provider.",
          "error",
          { button: "OK" }
        );
        return callback(false);
      }
      
      if (this.isDocking === true) {
        swal(
          "Game is still Docking !",
          "Please select another Game Provider",
          "error",
          { button: "OK" }
        );
        return callback(false);
      }

      if(this.gameList.some(x => x.gameProviderId == this.newGameData.gameProviderId && x.gameCode == this.newGameData.gameCode)){
          swal(
            "GameCode Exists",
            "GameCode already exists in this Provider, Please confirm again.",
            "error",
            { button: "OK" });
          return callback(false);
      }
          
      if (this.newblockedCountry !== "") {
        this.newGameData.blockedCountries.push(this.newblockedCountry);
      }
      for (let i = 0; i < this.iconNames.length; i++) {
        this.newGameData.gameLanguages[i].gameIconFilePath = this.iconNames[i];
      }
      for (let i = 0; i < this.newGameData.gameLanguages.length; i++) {
        if (
          this.newGameData.gameLanguages[i].language == "" ||
          this.newGameData.gameLanguages[i].gameName == ""
        ) {
          swal(
            "Language is null !",
            "Please enter the information of language.",
            "error",
            { button: "OK" }
          );
          return callback(false);
        }
      }

      return callback(true);
    },
    addNewGame() {
      let $this = this;
      this.checkBeforeAddGameApi(function (checkResult){
          if(checkResult){
            let loader = $this.$loading.show();
            $this.$store.dispatch("addNewGameAPI", $this.newGameData).then((res) => {
              loader.hide();
              if (res.data.errorCode !== 0) {
                swal("Something is wrong !", `${res.data.errorMessage}`, "error", {
                  button: "OK",
                });
              } else {
                swal("Success !", "Success to add this game.", "success", {
                  button: "OK",
                });
                //reset
                $this.resetFormData();
                $this.$emit("updateGameList");
              }
            });
          }
      })
    },
    resetFormData() {
      this.iconNames = [];
      this.newGameData = this.$store.getters.newGameData;
      this.newGameData.gameProviderId = -1;
      this.providerName = "";
      this.newblockedCountry = "";
      this.providerSource = [];
      this.$emit("close");
    },
    async gameProviderOnChange(event) {
      await this.$store.dispatch("getGameListAPI", event.target.value).then((res) => {
        if (res.data.errorCode === 0) {
          this.gameList = res.data.data.games;
        }
      });
      
      if (this.gameList.length > 0) {
        let providerGames = this.gameList.filter(
          (x) => x.gameProviderId == event.target.value && x.gameId < 100000
        );

        if (providerGames.length > 0) {
          this.newGameData.gameId =
            Math.max.apply(
              Math,
              providerGames.map(function (o) {
                return o.gameId;
              })
            ) + 1;
          this.newGameData.rank =
            Math.max.apply(
              Math,
              providerGames.map(function (o) {
                return o.rank;
              })
            ) + 1;
          this.ProviderSelectBind(event);
          this.isDocking = false;
        } else {
          this.newGameData.gameId = "";
          this.newGameData.rank = "";
          this.providerSource = [];
          this.isDocking = true;
        }
      } else {
        swal("Wrong !", "Loading game data, please select again", "error", {
          button: "OK",
        });
      }
    },
    ProviderSelectBind(event){
      this.providerSource = this.$store.state.providersData.find((x)=>x.id == event.target.value).provider;
      this.newGameData.provider = this.providerSource[0];
    },
    updateIconName(iconName, i) {
      this.iconNames[i] = iconName;
    }   
  },
  mounted() {
    this.newGameData.gameProviderId = -1;
  }
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
#add_new_game {
  width: 95%;
  max-height: 95%;
  overflow: scroll;

  background-color: #eee;
  margin-bottom: 6px;
  position: absolute;
  top: 6px;
  left: 6px;
  z-index: 10;
  border-radius: 25px;
  border-top: 5px solid #acc;
  border-right: 1px solid #acc;
  border-bottom: 1px solid #acc;
  border-left: 1px solid #acc;
  &::-webkit-scrollbar {
    height: 1px;
    width: 1px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(170, 170, 170, 0.3);
    border-radius: 5px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  > div {
    padding: 10px;
  }

  .operation {
    display: flex;
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

  .language {
    border-bottom: 1px solid #acc;

    ul {
      padding: 0;
      display: flex;
      flex-direction: column;
      // justify-content: space-around;
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
