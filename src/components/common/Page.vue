<template>
  <div class="row">
    <div class="col-sm-12 col-md-3">
      <div
        class="dataTables_info"
        id="example1_info"
        role="status"
        aria-live="polite"
      >
        Showing {{ start + 1 }} to {{ listLimit }} of {{ listLength }} entries
      </div>
    </div>
    <div class="col-sm-12 col-md-6">
      <div
        class="dataTables_paginate paging_simple_numbers"
        id="example1_paginate"
      >
        <ul class="pagination">
          <li
            class="paginate_button page-item previous"
            :class="{ disabled: modelValue === 1 }"
            id="example1_previous"
          >
            <a
              href="#"
              aria-controls="example1"
              data-dt-idx="0"
              tabindex="0"
              class="page-link"
              @click="setPage(modelValue - 1)"
              >Previous</a
            >
          </li>
          <li
            class="paginate_button page-item"
            :class="{ active: i === modelValue }"
            v-for="i in limitPageCount"
            @click="setPage(i)"
            :key="i"
          >
            <a
              href="#"
              aria-controls="example1"
              data-dt-idx="['i']"
              tabindex="0"
              class="page-link"
              >{{ i }}</a
            >
          </li>
          <li
            class="paginate_button page-item next"
            :class="{ disabled: modelValue === totalPageCount }"
            id="example1_next"
          >
            <a
              href="#"
              aria-controls="example1"
              data-dt-idx="7"
              tabindex="0"
              class="page-link"
              @click="setPage(modelValue + 1)"
              >Next</a
            >
          </li>
        </ul>
      </div>
    </div>
    <div class="col-sm-12 col-md-3">
      <div class="rows-dropdown">
        Data row
        <select @change="updateRows(modelValue)">
          <option v-for="option in rowsOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Page",
  props: ["perpagenum", "list", "start", "end", "modelValue"],
  data() {
    return {
      rowsOptions: [15, 30, 50, 100],
    };
  },
  computed: {
    limitPageCount(){
      let t = Math.ceil(this.listLength / this.perpagenum)
      let c = this.modelValue
      if (t < 10){
        return Array.from({length: t}, (v, i) => i+1)
      }
      if (c <= 5) {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, t]
      } else if (c >= t - 4) {
        return [1, t-8, t-7, t-6, t-5, t-4, t-3, t-2, t-1, t]
      } else {
        return [1, c-3, c-2, c-1, c, c+1, c+2, c+3, t]
      }
    },
    totalPageCount() {
      return Math.ceil(this.listLength / this.perpagenum);
    },
    listLength() {
      return this.list.length;
    },
    listLimit() {
      return this.list.length > this.end ? this.end : this.list.length;
    },
  },
  methods: {
    setPage(page) {
      if (!(page < 1 || page > this.totalPageCount)) {
        this.$emit('update:modelValue', page);
        this.$emit("updatepage", page);
      }
    },
    updateRows(page) {
      this.$emit("changePerPageNum", this.perpagenum);
      this.$emit('update:modelValue', 1);
      this.$emit("updatepage", page);
    }
  },
};
</script>

<style lang="scss" scoped>
  .rows-dropdown {
    text-align: right;
    font-size: 14px;
  }
  .rows-info {
    text-align: right;
    margin-top: 10px;
    font-size: 14px;
  }
  .paginate_button {
    &.page-item {
      .page-link {
        color: #0c3c21;
        font-size: 14px;
      }
    }
  }
  .dataTables_info {
    font-size: 14px;
  }
</style>

