<template>
  <div class="row">
    <div class="col-sm-12 col-md-12">
      <div id="example1_filter" class="dataTables_filter">
        <div class="col-sm-2" v-if="filterOptions.byProviderList">
          <select
            id="game-provider-select"
            class="form-control form-control-sm"
            @input="$emit('provider-search', $event.target.value)"
            v-model="keyWordProvider"
            v-if="this.$route.path.toLowerCase() == '/home/gamelist'"
          >
            <option value="-1">All Providers</option>
            <option
              v-for="provider in this.$store.state.providersData"
              :key="provider.id"
              :value="provider.id"
            >
              {{ provider.id }}.{{ provider.name }}
            </option>
          </select>
        </div>
        <div class="col-sm-3" v-if="filterOptions.byProviderName">
          <input
            type="search"
            class="form-control form-control-sm bold-placeholder"
            placeholder="Searching Game Provider"
            aria-controls="example1"
            v-model="keyWord"
            @input="$emit('keyword-search', keyWord)"
          />
        </div>
        <div class="col-sm-3" v-if="filterOptions.byProviderType">
          <input
            type="search"
            class="form-control form-control-sm bold-placeholder"
            placeholder="Searching Provider Type"
            aria-controls="example1"
            v-model="keyWordProviderType"
            @input="$emit('provider-type-search', keyWordProviderType)"
          />
          <!-- <el-select
            v-model="keyWordProviderType"
            filterable
            class="provider-type"
            placeholder="Searching Provider Type"
            @change="$emit('provider-type-search', keyWordProviderType)"
          >
            <el-option
              v-for="item in providerTypeForDisplay"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select> -->
        </div>
        <div class="col-sm-2" v-if="filterOptions.byNewGameType">
          <select
            id="new-game-type-select"
            class="form-control form-control-sm"
            @input="$emit('new-game-type-search', $event.target.value)"
            v-model="keyWordNewGameType"
            v-if="this.$route.path.toLowerCase() == '/home/gamelist'"
          >
            <option value="-1">All New Game Type</option>
            <option
              v-for="newGameType in newGameTypeList"
              :key="newGameType.gameTypeId"
              :value="newGameType.gameTypeId"
            >
              {{ newGameType.gameTypeName }}
            </option>
          </select>
        </div>
        <div class="col-sm-2" v-if="filterOptions.showDownloadExcel">
          <button
            type="button"
            class="form-control form-control-sm btn-success"
            @click="$emit('downloadExcel')"
            v-if="this.$route.path.toLowerCase() == '/home/gamelist'"
          >
            Download Excel
          </button>
        </div>
        <div class="col-sm-2" v-if="filterOptions.showUploadExcel">
          <button type="button" 
            class="form-control form-control-sm btn-success"
            @click="showUploadModal = true"
            v-if="this.$route.path.toLowerCase() == '/home/gamelist'">
            Upload Excel</button>
          <UploadModal :visible="showUploadModal" @close="showUploadModal = false" @updateGameList="$emit('reload')"></UploadModal>
        </div>
        <div class="row justify-content-between">
          <div class="col align-self-end">
            <button @click="$emit('reload'); clearInput();"
            v-if="this.$route.path.toLowerCase() == '/home/gamelist'">
              <i class="fa fa-repeat"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UploadModal from './UploadModal.vue';
import { providerTypeForDisplay } from "../../components/enums/enumProvider";

export default {
  name: "Search",
  components: {
    UploadModal
  },
  data() {
    return {
      keyWord: "",
      keyWordProvider: 0,
      keyWordNewGameType: -1,
      showUploadModal: false,
      keyWordProviderType: "",
      providerTypeForDisplay: [],
    };
  },
  props: ["newGameTypeList", "filterOptions"],
  emits: ["keyword-search", "provider-search", "new-game-type-search", "reload", "downloadExcel", "provider-type-search"],
  methods: {
    clearInput(){
      this.keyWord = "";
      this.keyWordNewGameType = -1;
      this.keyWordProviderType = "";
    }
  },
  created() {
    this.providerTypeForDisplay = providerTypeForDisplay;
  }
};
</script>

<style lang="scss" scoped>
.dataTables_filter {
  display: flex;
  justify-content: space-between;
  // padding-right: 10px;
  margin-bottom: 15px;

  > 
  button {
    outline: none;
    border: 1px solid #aaa;
    border-radius: 4px;
  }
}
.bold-placeholder::placeholder {
    color: #BBBBBB; /* Light gray color for "Searching" */
    font-weight: normal;
    font-family: Arial, sans-serif;
}
.provider-type.el-select {
  width: 210px;
}
:deep(.el-select__wrapper) {
  min-height: 28px;
  height: 28px;
}
</style>

