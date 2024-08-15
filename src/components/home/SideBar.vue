<template>
  <div class="sidebar-sticky">
    <aside class="main-sidebar elevation-4 sidebar-height">
      <Profile :showName="showName" />
      <Menu />
    </aside>
  </div>
</template>

<script>
import Profile from "./Profile.vue";
import Menu from "./Menu.vue";

export default {
  name: "SideBar",
  props: ["showName"],
  components: {
    Profile,
    Menu,
  },
};
</script>

<style lang="css" scoped>
.sidebar-sticky {
  position: sticky;
  top: 0;
  z-index: 100;
}
.sidebar-height {
  height: 100vh !important;
}
.main-sidebar {
  background-color: #28563c;
}
</style>
