<template>
  <div class="game_list_btns">
    <div class="change_operation">
      <button
        type="button"
        class="btn btn-block btn-primary btn-xs"
        @click="$emit('addNewGame')"
        v-if="permission.canCreate"
      >
        Add New Game
      </button>
    </div>
    <div class="status_operatoin" v-if="permission.canUpdate">
      <button
        type="button"
        class="btn btn-block btn-primary btn-xs"
        v-for="(btn, i) in btnList"
        :key="i"
        @click="$emit('selectBtn', btn.action)"
      >
        {{ btn.name }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Button",
  data() {
    return {
      // btnList: [
      //   {
      //     name: "Set Selection Enabled",
      //     action: "Enabled",
      //   },
      //   {
      //     name: "Set Selection Disabled",
      //     action: "Disabled",
      //   },
      //   {
      //     name: "Set Selection UM",
      //     action: "UnderMaintain",
      //   },
      //   {
      //     name: "Set Selection Un-UM",
      //     action: "UnUnderMaintain",
      //   },
      //   {
      //     name: "Set Selection Retired",
      //     action: "Retired",
      //   },
      //   {
      //     name: "Set Selection Non-Retired",
      //     action: "UnRetired",
      //   },
      // ],
    };
  },
  props: {
    permission: {
      type: Object,
    },
  },
  computed: {
    btnList() {
      if (this.$store.state.rwd.width >= 768) {
        return [
          {
            name: "Set Selection Enabled",
            action: "Enabled",
          },
          {
            name: "Set Selection Disabled",
            action: "Disabled",
          },
          {
            name: "Set Selection UM",
            action: "UnderMaintain",
          },
          {
            name: "Set Selection Un-UM",
            action: "UnUnderMaintain",
          },
          {
            name: "Set Selection Retired",
            action: "Retired",
          },
          {
            name: "Set Selection Non-Retired",
            action: "UnRetired",
          },
        ];
      } else {
        return [
          {
            name: "Enabled",
            action: "Enabled",
          },
          {
            name: "Disabled",
            action: "Disabled",
          },
          {
            name: "UM",
            action: "UnderMaintain",
          },
          {
            name: "Un-UM",
            action: "UnUnderMaintain",
          },
          {
            name: "Retired",
            action: "Retired",
          },
          {
            name: "Non-Retired",
            action: "UnRetired",
          },
        ];
      }
    },
  },
  emits: ["addNewGame", "selectBtn"],
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/rwd.scss";

.game_list_btns {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  // overflow: hidden;
  > div {
    // max-width: 50%;
    button {
      display: inline-block;
      width: 150px;
      height: 30px;
      margin: 3px;
    }
  }
  .change_operation {
    button {
      @include rwd768 {
        max-width: 100px;
      }
    }
  }
  .status_operatoin {
    max-width: 470px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    @include rwd768 {
      min-width: 400px;
    }
    button {
      @include rwd768 {
        max-width: 100px;
      }
    }
  }
}
</style>
