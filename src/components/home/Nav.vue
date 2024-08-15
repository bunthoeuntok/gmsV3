<template>
  <!-- Navbar -->
  <nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a
          class="nav-link"
          data-widget="pushmenu"
          href="#"
          role="button"
          @click="$emit('showName')"
          ><i class="fas fa-bars"></i
        ></a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <router-link
          :to="'/home'"
          class="nav-link"
          @click="$store.commit('changeCurrentItem', 'Game List')"
          >Home</router-link
        >
      </li>
    </ul>

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <span>TIME：{{ time }}</span>
      </li>
    </ul>
  </nav>
  <!-- /.navbar -->
</template>

<script>
export default {
  name: "Nav",
  emits: ["showName"],
  data() {
    return {
      time: "",
    };
  },
  methods: {
    showTime() {
      window.setInterval(() => {
        this.time = `${
          new Date().getHours() +
          ":" +
          new Date().getMinutes() +
          ":" +
          (new Date().getSeconds() > 9
            ? new Date().getSeconds()
            : "0" + new Date().getSeconds())
        }`;
      }, 1000);
    },
    push() {
      //   this.$store.commit("changeCurrentItem", "Game List");
    },
  },
  beforeMount() {
    this.showTime();
  },
};
</script>