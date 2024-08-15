<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      fullWidth: 0,
      fullHeight: 0,
    };
  },
  mounted() {
    const vm = this;
    vm.fullWidth = window.innerWidth;
    vm.fullHeight = window.innerHeight;
    window.onresize = () => {
      vm.fullWidth = window.innerWidth;
      vm.fullHeight = window.innerHeight;
      // console.log(this.fullWidth);
    };
  },
  watch: {
    fullWidth() {
      this.$store.commit("setWidth", this.fullWidth);
      // console.log(this.$store.state.rwd.width);
    },
  },
};
</script>

<style lang="scss">
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }
</style>
