<template>
  <el-icon><Refresh /></el-icon>
</template>

<script>
import { ref } from 'vue';
import {
  Refresh,
} from '@element-plus/icons-vue';

export default {
  components: {
    Refresh,
  },
  setup() {
    const isRotating = ref(false);
    const rotate = () => {
      isRotating.value = true;
      setTimeout(() => {
        isRotating.value = false;
      }, 1000);
    };
    return { isRotating, rotate };
  },
};
</script>
