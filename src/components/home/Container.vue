<template>
  <router-view
    @updateProvidersData="$emit('updateProvidersData')"
  ></router-view>
</template>

<script>
export default {
  name: "Container",
  data() {
    return {};
  },
  props: ["providersData"],
  emits: ["updateProvidersData", "justify"],
};
</script>

<style lang="scss" scoped>
</style>

