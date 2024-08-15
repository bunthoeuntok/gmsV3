<template>
  <div class="row">
    <div class="col-sm-12">
      <table
        id="example1"
        class="table table-bordered table-striped dataTable dtr-inline"
        role="grid"
        aria-describedby="example1_info"
      >
        <thead>
          <tr role="row">
            <th class="dtr-control sorting_1" tabindex="0">
              <input
                id="selectAll"
                type="checkbox"
                v-model="checked"
                @click="selectAll"
              />
              <label for="selectAll"> Select All</label>
            </th>
            <th
              v-for="(title, index) in gameListTitles"
              :key="index"
              class="sorting"
              tabindex="0"
              aria-controls="example1"
              rowspan="1"
              colspan="1"
            >
              {{ title }}
              <a href="#" v-if="index === 1" @click="sortById">
                <i class="fas fa-sort-numeric-down" v-if="!idSort.sortDesc"></i>
                <i
                  class="fas fa-sort-numeric-up-alt"
                  v-if="idSort.sortDesc"
                ></i>
              </a>
              <a href="#" v-if="index === 2" @click="sortByRank">
                <i
                  class="fas fa-sort-numeric-down"
                  v-if="!rankSort.sortDesc"
                ></i>
                <i
                  class="fas fa-sort-numeric-up-alt"
                  v-if="rankSort.sortDesc"
                ></i>
              </a>
              <!-- <a href="#" v-if="index === 3" @click="sortByName">
                <i class="fas fa-sort-alpha-down" v-if="!nameSort.sortDesc"></i>
                <i
                  class="fas fa-sort-alpha-up-alt"
                  v-if="nameSort.sortDesc"
                ></i>
              </a> -->
            </th>
          </tr>
        </thead>
        <tbody v-if="displayGameList.length > 0">
          <!-- Game List Data -->
          <tr
            v-for="game in displayGameList"
            :key="`${game.gameId}` + `${game.gameProviderId}`"
          >
            <td class="dtr-control sorting_1" tabindex="0">
              <input
                type="checkbox"
                class="form-control edit selectGame"
                v-model="checkedList"
                :value="{
                  gameId: game.gameId,
                  gameProviderId: game.gameProviderId,
                }"
              />
            </td>
            <td class="dtr-control sorting_1" tabindex="0">
              <span v-if="this.providersData.length > 0">
                {{ gameProviderName(game.gameProviderId) }}</span
              >
            </td>
            <td class="dtr-control sorting_1" tabindex="0">
              {{ game.gameId }}
            </td>
            <td class="dtr-control sorting_1" tabindex="0">
              {{ game.rank }}
            </td>
            <td>
              <span v-if="game.gameLanguages.length > 0">
                {{ game.gameLanguages[0].gameName }}</span
              >
            </td>
            <td>
              {{ game.remark }}
            </td>
            <td>
              <input
                type="checkbox"
                class="form-control edit"
                v-model="game.isEnabled"
                disabled
              />
            </td>
            <td>
              <input
                type="checkbox"
                class="form-control edit"
                v-model="game.isUnderMaintain"
                disabled
              />
            </td>
            <td>
              <input
                type="checkbox"
                class="form-control edit"
                v-model="game.isRetired"
                disabled
              />
            </td>
            <td>
              <a href="#" @click="$emit('showDetail', game)"
                ><i class="far fa-question-circle"></i
              ></a>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="10">Loading ...</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameListContent",
  data() {
    return {
      rankSort: {
        sort: true,
        sortDesc: false,
      },
      idSort: {
        sort: true,
        sortDesc: false,
      },
      nameSort: {
        sort: false,
        sortDesc: false,
      },
      checkedList: [],
      checked: false,
    };
  },
  props: [
    "providersData",
    "gameListTitles",
    "keywordGameList",
    "start",
    "end",
    "reset",
  ],
  emits: ["showDetail", "selectGame", "over"],
  computed: {
    displayGameList() {
      let result = [];
      let gameList = this.keywordGameList;

      if (this.rankSort.sort) {
        result = this.rankSort.sortDesc
          ? gameList.sort((a, b) => b.rank - a.rank)
          : gameList.sort((a, b) => a.rank - b.rank);
      }

      if (this.idSort.sort) {
        result = this.idSort.sortDesc
          ? gameList.sort((a, b) => b.gameId - a.gameId)
          : gameList.sort((a, b) => a.gameId - b.gameId);
      }

      if (this.nameSort.sort) {
        result = this.nameSort.sortDesc
          ? gameList.sort((a, b) =>
              b.gameLanguages[0].gameName.localeCompare(
                a.gameLanguages[0].gameName
              )
            )
          : gameList.sort((a, b) =>
              a.gameLanguages[0].gameName.localeCompare(
                b.gameLanguages[0].gameName
              )
            );
      }
      let sortedData = result.slice(this.start, this.end);
      return sortedData;
    },
  },
  methods: {
    gameProviderName(providerId) {
      let provider = this.providersData.filter(
        (item) => item.id === providerId
      );
      if (provider.length > 0) {
        return provider[0].name;
      } else {
        return `Provider ID : ${providerId}`;
      }
    },
    sortByRank() {
      this.rankSort.sort = true;
      this.rankSort.sortDesc = !this.rankSort.sortDesc;

      this.nameSort.sort = false;
      this.nameSort.sortDesc = true;

      this.idSort.sort = false;
      this.idSort.sortDesc = true;
    },
    sortById() {
      this.idSort.sort = true;
      this.idSort.sortDesc = !this.idSort.sortDesc;

      this.nameSort.sort = false;
      this.nameSort.sortDesc = true;

      this.rankSort.sort = false;
      this.rankSort.sortDesc = true;
    },
    sortByName() {
      this.nameSort.sort = true;
      this.nameSort.sortDesc = !this.nameSort.sortDesc;

      this.idSort.sort = false;
      this.idSort.sortDesc = true;

      this.rankSort.sort = false;
      this.rankSort.sortDesc = true;
    },
    selectAll() {
      if (!this.checked) {
        if (this.displayGameList.length > 0 && this.checkedList.length > 0) {
          let result = [];
          for (let i = 0; i < this.displayGameList.length; i++) {
            result.push({
              gameId: this.displayGameList[i].gameId,
              gameProviderId: this.displayGameList[i].gameProviderId,
            });
          }
          this.checkedList = [...result];
        } else if (
          this.displayGameList.length > 0 &&
          this.checkedList.length === 0
        ) {
          for (let i = 0; i < this.displayGameList.length; i++) {
            this.checkedList.push({
              gameId: this.displayGameList[i].gameId,
              gameProviderId: this.displayGameList[i].gameProviderId,
            });
          }
        }
      } else {
        // 無法使用遍歷陣列splice()刪值，陣列長度改變，遍歷固定長度最後會取到undefined
        this.checkedList = [];
      }
    },
  },
  watch: {
    reset(newReset) {
      if (newReset) {
        this.checkedList = [];
        this.checked = false;
      }
      this.$emit("over");
    },
    checkedList: {
      handler() {
        this.$emit("selectGame", this.checkedList);
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/rwd.scss";
table {
  @include rwd1200 {
    font-size: 14px;
  }
  tr {
    th,
    td {
      text-align: center;
      > input {
        width: 15px;
        height: 15px;
      }
      &:nth-child(2) {
        @include rwd1270 {
          display: none;
        }
      }
      &:nth-child(3) {
        @include rwd1270 {
          display: none;
        }
      }
      &:nth-child(6) {
        @include rwd768 {
          display: none;
        }
      }
      &:nth-child(7) {
        @include rwd768 {
          display: none;
        }
      }
      &:nth-child(8) {
        @include rwd768 {
          display: none;
        }
      }
    }
    th {
      > input {
        width: 10px;
        height: 10px;
      }
    }
    th.sorting_1 {
      display: flex;
      flex-direction: column;
      align-items: center;
      label {
        font-size: 10px;
        cursor: pointer;
        margin: 0;
      }
    }
    td {
      > input {
        margin: 5px auto 0;
      }
    }
  }
}
</style>
