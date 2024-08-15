<template>
  <div class="content-wrapper" style="min-height: 1301.28px">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="mb-2 row">
          <div class="col-sm-6">
            <h1>Providers</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <router-link
                  :to="'/home'"
                  @click="$store.commit('changeCurrentItem', 'Game List')"
                  >Home</router-link
                >
              </li>
              <li class="breadcrumb-item active">Providers</li>
            </ol>
          </div>
        </div>
      </div>
      <!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="header header-sticky">
                <div class="text-white card-title">All of providers</div>
                <div>
                  <el-button class="py-1.5 px-2.5 h-6" @click="onExportExcel">
                    <img src="../../assets/excelIcon.png" width='20' alt="">
                    <span class="ml-1">Export</span>
                  </el-button>                  
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body">
                <div
                  id="example1_wrapper"
                  class="dataTables_wrapper dt-bootstrap4"
                >
                  <div class="body-top">
                    <div class="providers">
                      <Search
                        @keyword-search="keyWord = $event"
                        @provider-type-search="keyWordProviderType = $event"
                        @reload="setProviderAll"
                        :filterOptions="searchFilterOptions"
                      />
                    </div>
                    <div class="right-site">
                      <el-button v-if="canCreate" :disabled="!canCreate" type="primary" class="add-btn" @click="isShowAddDialog = true">
                        Add
                        <font-awesome-icon icon="plus" />
                      </el-button>
                      <el-button type="primary" class="refresh-btn" @click="onReload">
                        <refresh-icon :class="{ 'fa-spin': isLoading }" />
                        <span class="ml-2">Refresh</span>
                      </el-button>
                      <HideColumnsTableDropDown />
                    </div>
                  </div>
                  <ProviderContent
                    :permission="permission"
                    :providerTitles="providerTitles"
                    :keywordProviders="keywordProviders"
                    :start="start"
                    :end="end"
                    @updateProvider="updateProvider($event)"
                    @addProvider="addProvider($event)"
                    @update:getAllProviderData="getAllProviderData"
                  />
                  <Page
                    :perpagenum="PerPageNum"
                    :list="keywordProviders"
                    :start="start"
                    :end="end"
                    @updatepage="updatePage($event)"
                  />
                </div>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container-fluid -->
    </section>
    <!-- /.content -->
     <AddProviderDialog
      :isShowAddDialog="isShowAddDialog"
      @update:isShowAddDialog="isShowAddDialog = $event"
      @update:keywordProviders="keywordProviders"
     />
  </div>
</template>

<script>
import Search from "../common/Search.vue";
import RefreshIcon from "../common/RefreshIcon.vue";
import Page from "../common/Page.vue";
import ProviderContent from "./ProviderContent.vue";
import { permissionsPage } from "../../importJsFile/constStore.js";
import AddProviderDialog from "./AddProviderDialog.vue";
import { providerTypeForDisplay } from "../../components/enums/enumProvider";
import HideColumnsTableDropDown from "../HideColumnsTableDropDown.vue";

export default {
  name: "Provider",
  components: {
    Search,
    Page,
    ProviderContent,
    AddProviderDialog,
    RefreshIcon,
    HideColumnsTableDropDown,
  },
  data() {
    return {
      providerTypeForDisplay,
      providerTitles: ["GPID", "NAME", "IS UM", "REMARK", "ProviderType"],
      providers: [],
      keywordProviders: [],
      keyWordProviderType: "",
      pageProviders: [],
      keyWord: "",
      PerPageNum: 15,
      start: 0,
      end: 15,
      isShowAddDialog: false,
      isLoading: false,
      searchFilterOptions: {
        byProviderType: true,
        byProviderName: true,
      },
    };
  },
  computed: {
    providersData() {
      return this.$store.state.providersData;
    },
    permission() {
      return {
        ...this.$store.state.userPermissions[permissionsPage.providerPage],
      };
    },
    canCreate() {
      return this.permission.canCreate;
    },
  },
  methods: {
    //取得所有資料
    setProviderAll() {
      this.providers = this.providersData;
      this.keywordProviders = this.providersData;
      this.pageProviders = this.providersData;
    },
    onReload() {
      this.isLoading = true;
      const request = {
        isForceReload: true
      };

      // Delay the API call by 5 seconds
      setTimeout(() => {
        this.$store.dispatch("getProviderAPI", request).then((res) => {
          if (res.data.errorCode === 0) {
            this.$store.commit("setProvidersData", res.data.data.gameProviders);
          }
          this.isLoading = false;
        });
      }, 2000);
    },
    //新增資料(API)
    addProvider(data) {
      //Send data
      this.$store
        .dispatch("addProviderAPI", data)
        .then((res) => {
          if (res.data.errorCode === 0) {
            //Reset data
            this.$store.dispatch("getProviderAPI").then((res) => {
              if (res.data.errorCode === 0) {
                this.$store.commit(
                  "setProvidersData",
                  res.data.data.gameProviders
                );
                this.setProviderAll();
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
        });
    },
    //更新資料(API)
    updateProvider(data) {
      // Send data
      this.$store.dispatch("updateProviderAPI", data).then((res) => {
        if (res.data.errorCode === 0) {
          this.$store.dispatch("getProviderAPI").then((res) => {
            if (res.data.errorCode === 0) {
              //Reset data
              this.$store.commit(
                "setProvidersData",
                res.data.data.gameProviders
              );
              this.setProviderAll();
            }
          });
          swal("Success", "Success to update this provider", "success", {
            button: "OK",
          });
        } else {
          swal("Fail", "Something is wrong", "error", { button: "OK" });
        }
      });
    },
    //各分頁顯示資料
    updatePage(page) {
      const start = (page - 1) * this.PerPageNum;
      const end =
        start + this.PerPageNum <= this.keywordProviders.length
          ? start + this.PerPageNum
          : this.keywordProviders.length;
      this.start = start;
      this.end = end;
    },
    getProviderType(value) {
      if(value !== ""){
        return providerTypeForDisplay.find((pt) => pt.value === value).name || '';
      }
    },
    searchByProviderType(searchText) {
      let keyWord = this.keyWord; 
      if (searchText != "") {
        this.keywordProviders = this.providers.filter(function (item, i) {
          let providerTypeString = '';
          if(item.providerType !== ""){
            const foundProviderType =  providerTypeForDisplay.find((pt) => pt.value === item.providerType);
            providerTypeString =  foundProviderType ? foundProviderType.name : '';
          }
          if(keyWord != "") {
            return item.name.toLowerCase().indexOf(keyWord.toLowerCase()) > -1 && providerTypeString.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
          }
          return providerTypeString.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
        });
      } else {
        this.keywordProviders = this.providers;
      }
    },
    onExportExcel() {
      this.$store.dispatch("exportExcel", this.keywordProviders);
    },
    async getAllProviderData(){
      await this.$store.dispatch("getProviderAPI").then((res) => {
        if (res.data.errorCode === 0) {
          this.$store.commit("setProvidersData",res.data.data.gameProviders);
        }
      });
      this.setProviderAll();
    }
  },
  watch: {
    keyWord() {
      let keyWord = this.keyWord; //filter()有自己的this值
      let keyWordProviderType = this.keyWordProviderType; // if not declare here error undefined keyWordProviderType 
      if (keyWord != "") {
        this.keywordProviders = this.providers.filter(function (item, i) {
          if(keyWordProviderType !== "") {
            let providerTypeString = '';
            if(item.providerType !== ""){
              providerTypeString =  providerTypeForDisplay.find((pt) => pt.value === item.providerType).name || '';
            }
            return item.name.toLowerCase().indexOf(keyWord.toLowerCase()) > -1 && providerTypeString.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
          }
          return item.name.toLowerCase().indexOf(keyWord.toLowerCase()) > -1;
        });
      } else {
        this.keywordProviders = this.providers;
      }
    },
    keyWordProviderType() {
      let keyWordProviderType = this.keyWordProviderType; //filter()有自己的this值
      this.searchByProviderType(keyWordProviderType)
    },
  },
  created() {
    this.setProviderAll();
    this.$emit("justify");
  },
};
</script>

<style lang="scss" scoped>
.card-body {
  padding: 16px 20px;
  overflow: hidden;
}
.bg-primary  {
  background-color: var(--primary);
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, .125);
  padding: .75rem 1.25rem;
  border-top-left-radius: .25rem;
  border-top-right-radius: .25rem;
  background-color: #66967A;
}
.body-top {
  display: flex;
  justify-content: space-between;
}
.hidden-column:before {
  position: absolute;
  content: "";
  border-top: 1px solid #ccc;
  width: 105%;
  top: 0px;
  left: -20px;
}
:deep(.right-site .el-button) {
  height: 28px;
  width: 100px;
  margin: 0;
}
</style>
<style>
.providers input.form-control.form-control-sm {
  width: 210px;
  height: 28px;
}
.add-btn, .refresh-btn {
  width: 120px;
}
.right-site {
  display: flex;
  gap: 8px;
}
.header-sticky {
  position: sticky;
  top: 0;
  z-index: 90;
}
</style>
