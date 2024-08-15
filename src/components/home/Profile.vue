<template>
  <div class="user-panel mb-3 d-flex">
    <div class="image">
      <img
        src="/dist/img/user2-160x160.jpg"
        class="img-circle elevation-2"
        alt="User Image"
      />
    </div>
    <div class="info">
      <a href="#" class="d-block uppercase text-[var(--primary)] font-semibold">{{ showName ? userData.username : "" }}</a>
      <a href="#" class="d-block">{{ userData.email }}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  props: ["showName"],
  computed: {
    userData() {
      return this.$store.state.userData;
    },
  },
};
</script>

<style lang="scss" scoped>
.info a.d-block {
  text-overflow: ellipsis;
}
.user-panel {
  border-bottom: 1px solid #fff;
  background-color: #adcfbb;
  padding: 10px 0;
}
</style>
