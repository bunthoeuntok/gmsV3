<template>
  <div class="row">
    <div id="account_btn" class="col-md-6">
      <div class="form-group">
        <select class="form-control" v-model="accountName">
          <option selected disabled>Select Account</option>
          <option
            v-for="(userPermission, index) in userPermissions"
            :key="index"
          >
            {{ userPermission.username }}
          </option>
        </select>
      </div>
      <div class="operation">
        <button
          v-if="permission.canCreate"
          type="button"
          class="btn btn-block btn-primary btn-xs"
          @click="$emit('addNewAccount')"
        >
          Add New Account
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccBtn",
  data() {
    return {
      accountName: "Select Account",
    };
  },
  props: {
    userPermissions: {
      type: Array,
    },
    permission: {
      type: Object,
    },
  },
  emits: ["addNewAccount", "showPermissions"],
  methods: {},
  watch: {
    accountName(newWord, oldWord) {
      this.$emit("showPermissions", newWord);
    },
  },
};
</script>

<style lang="scss" scoped>
.row {
  // border-bottom: 1px solid #000;
  padding-bottom: 10px;
}
#account_btn {
  .form-group {
    .form-control {
      width: 150px;
      height: 35px;
      margin: 3px;
    }
  }
  .operation {
    // width: 50%;
    button {
      width: 150px;
      height: 30px;
      margin: 3px;
    }
  }
}
</style>
