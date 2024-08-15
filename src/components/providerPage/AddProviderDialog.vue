<template>
  <div v-if="isShowAddDialog">
    <el-dialog
      width="35%"
      custom-class="add-popup"
      @close="handleClose"
    >
      <template #header>
        <div class="font-bold dialog__header-title rounded-b-lg text-s">
          <span>Add Provider</span>
        </div>
      </template>
      <el-form :model="formData" label-position="left" label-width="175px" class="add">
        <el-form-item label="Game Provider Name" required>
          <el-input v-model="formData.gameProviderName" placeholder="Enter Provider Name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Provider Name CN">
          <el-input v-model="formData.providerNameCN" placeholder="Enter Provider Name CN" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="ServerUrl">
          <el-input v-model="formData.serverUrl" placeholder="Enter ServerUrl" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="Remark">
          <el-input v-model="formData.providerStateRemark" type="textarea" autocomplete="off"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer px-4 pt-0">
          <el-button @click="handleClose">Cancel</el-button>
          <el-button type="primary" @click="addProviderInfo()" :loading="isLoading" class="submit-btn">
            Submit
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "AddProviderDialog",
  data() {
    return {
      formData: {
        gameProviderName: "",
        providerStateRemark: "",
        providerNameCN: "",
        serverUrl: "",
      },
      isLoading: false,
    };
  },
  props: ["isShowAddDialog"],
  emits: ["update:isShowAddDialog", "update:keywordProviders"],
  methods: {
    handleClose() {
      this.$emit('update:isShowAddDialog', false);
      this.formData = {
        gameProviderName: "",
        providerStateRemark: "",
        providerNameCN: "",
        serverUrl: "",
      };
    },
    addProviderInfo() {
      this.isLoading = true;
      const request = {
        secretKey: this.$store.state.userData.secretKey,
        sessionToken: this.$store.state.userData.sessionToken,
        modifiedBy: this.$store.state.userData.username,
        gameProviderName: this.formData.gameProviderName,
        providerStateRemark: this.formData.providerStateRemark,
        providerNameCN: this.formData.providerNameCN,
        serverUrl: this.formData.serverUrl,
        createdBy: this.$store.state.userData.username
      };
      if (request.gameProviderName === "") {
        swal("Fail", "Please input game provider name.", "error", {
          button: "OK",
        });
        this.isLoading = false;
        return;
      }
      this.$store
        .dispatch("addProviderAPI", request)
        .then((res) => {
          if (res.data.errorCode === 0) {
            window.location.reload();
            this.$store.dispatch("getProviderAPI").then((res) => {
              if (res.data.errorCode === 0) {
                this.$store.commit("setProvidersData", res.data.data.gameProviders);
                this.$emit('update:keywordProviders', res.data.data.gameProviders);
              }
            });
            swal("Success", "Success to add this provider", "success", {
              button: "OK",
            });
          } else {
            swal("Fail", "Fail to update this provider", "error", {
              button: "OK",
            });
          }
        })
        .catch((error) => {
          swal("Fail", `${error}`, "warn", {
            button: "OK",
          });
        })
        .finally(() => {
          this.isLoading = false;
          this.$emit('update:isShowAddDialog', false);
        });
    }
  },
}
</script>

<style scoped>
.submit-btn {
  width: 80px;
}
:deep(.el-dialog__body) {
  padding: 60px 24px 2px 24px;
}
:deep(.el-form-item.is-required:not(.is-no-asterisk).asterisk-left>.el-form-item__label:before) {
    color: var(--el-color-danger);
    content: "*";
    margin-right: 0px !important;
    left: 15px;
    position: absolute;
}
:deep(.el-dialog__headerbtn:hover .el-dialog__close) {
  color: #0c3c21;
}
:deep(.el-input__inner::placeholder) {
  font-size: 13px;
}
:deep(.el-form-item__content) {
  height: 32px;
}
:deep(.el-form-item) {
  margin-bottom: 10px;
}
</style>
