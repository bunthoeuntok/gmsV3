<template>
  <div class="w-8 h-8">
    <el-dropdown trigger="click" popper-class="provider-info-drop-down-popper" class="provider-info-drop-down">
      <span class="el-dropdown-link">
        <el-button class='el-button-popup' style="padding: 5px;">
          <el-icon :size="18"><Fold /></el-icon>
        </el-button>
      </span>
      <template #dropdown>
        <div class="dropdown-container h-[50vh]">
          <el-input
            placeholder="Search column options"
            @input="searchProviderInfoColumns"
            v-model="searchProviderInfoColumnsValue"
            class="search-sticky"
          >
          <template #suffix>
            <el-icon class="el-input__icon"><Search /></el-icon>
          </template>
          </el-input>
          <el-dropdown-menu>
            <div class='px-4 py-0'>
              <ul>
                <li v-for='(check, index) in columnsForDropdown' :key='index' class="py-0.5">
                  <el-checkbox v-if="check.filterShow" v-model="check.show" @change="updateHideTableColumns()" :label="check.label" size="small" />
                </li>
              </ul>
            </div>
          </el-dropdown-menu>
        </div>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
import { Fold, Search, } from '@element-plus/icons-vue';

export default {
  name: "HideColumnsTableDropDown",
  components: {
    Fold,
    Search,
  },
  data() {
    return {
      columnsForDropdown: [],
      searchProviderInfoColumnsValue: '',
    }
  },
  computed: {
    hideTableColumns() {
      return this.$store.state.hideTableColumns['providers'];
    },
    updateDefaultDropdownList() {
      return this.$store.getters.getDefaultProviderColumnsDropdownList;
    },
  },
  methods: {
    setColumnsForDropdown() {
      this.columnsForDropdown = this.updateDefaultDropdownList;
    },
    updateHideTableColumns() {
      this.columnsForDropdown = this.hideTableColumns;
      this.$store.commit('setHideTableColumns', { key: 'providers', value: this.columnsForDropdown });
    },
    searchProviderInfoColumns() {
      this.columnsForDropdown.forEach((column) => {
        if (column.label.toLowerCase().includes(this.searchProviderInfoColumnsValue.toLowerCase())) {
          column.filterShow = true;
        } else {
          column.filterShow = false;
        }
      });
    },    
  },
  created() {
    this.setColumnsForDropdown();
  },
}
</script>

<style lang="scss">
.el-popper {
  &.provider-info-drop-down-popper {
    height: 50vh;
    .el-scrollbar__bar.is-vertical {
      display: block !important;
    }
  }
}
.provider-info-drop-down {
  .el-button.el-button-popup {
    width: auto !important;
  }
}
.search-sticky {
  position: sticky !important;
  top: 0;
  z-index: 100;
}

</style>