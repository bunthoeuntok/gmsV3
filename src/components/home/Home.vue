<template>
  <div class="wrapper">
    <SideBar :showName="showName"/>
    <div>
      <Nav @showName="showName = !showName" />
      <Container
        @updateProvidersData="updateProvidersData"
        @justify="refreshTokenAPI"
      />
    </div>
  </div>
</template>

<script>
// import components
import SideBar from "./SideBar.vue";
import Container from "./Container.vue";
import Nav from "./Nav.vue";

export default {
  name: "Home",
  components: {
    Nav,
    SideBar,
    Container,
  },
  data() {
    return {
      showName: true,
    };
  },
  methods: {
    // refreshToken() {
    //   window.setInterval(() => {
    //     this.refreshTokenAPI();
    //   }, 1000 * 60);
    // },
    refreshTokenAPI() {
      this.$store.dispatch("refreshTokenAPI").then((res) => {
        if (res.data.errorCode !== 0) {
          this.$store.commit("setUserData", { username: "", sessionToken: "" });
          this.$store.commit("changeCurrentItem", "Game List");
          this.$router.push({ path: "/" });
        }
      });
    },
    getProviderAll() {
      // calling api getProviderAPI
      this.$store.dispatch("getProviderAPI").then((res) => {
        if (res.data.errorCode === 0) {
          this.$store.commit("setProvidersData", res.data.data.gameProviders);
        }
      });
      ///calling fakeapi
      // this.$store.dispatch('fakeGetProviderAPI');
      // this.$store.dispatch('fakeGetProviderAPI').then((res) => {
      //   console.log('fakeGetProviderAPI', res.data.data.gameProviders);
      //   this.$store.commit("setProvidersData", res.data.data.gameProviders);
      // });
    },
    updateProvidersData() {
      this.getProviderAll();
    },
  },
  mounted() {
    //this.refreshToken();
    this.getProviderAll();
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  min-height: 100vh;
}
</style>