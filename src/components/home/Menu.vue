<template>
  <nav class="mt-2">
    <ul
      class="nav nav-pills nav-sidebar flex-column"
      data-widget="treeview"
      role="menu"
      data-accordion="false"
    >
      <!-- Add icons to the links using the .nav-icon class
        with font-awesome or any other icon font library -->
      <li class="nav-header text-white text-lg font-semibold">Menu</li>
      <li class="nav-item" v-for="item in asideList" :key="item.name">
        <!-- <a href="#" class="nav-link"> -->
        <router-link
          v-if="item.permission"
          :to="item.path"
          :class="{ on: item.name === currentItem }"
          class="nav-link text-white !py-3"
          @click="confirm(item.name)"
        >
          <i :class="item.icon"></i>
          <p>
            {{ item.name }}
          </p>
        </router-link>
      </li>
      <li class="nav-item logout" @click="logOut">
        <div class="nav-link text-white">
          <i class="fas fa-sign-out-alt"></i>
          <p>Logout</p>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Menu",
  data() {
    return {};
  },
  computed: {
    permissions() {
      return [...this.$store.state.userPermissions];
    },
    asideList() {
      return [...this.$store.getters.asideList];
    },
    currentItem() {
      return this.$store.state.currentItem;
    },
  },
  methods: {
    confirm(name) {
      if (name === "Refresh Game Cache") {
        swal({
          title: "Are you sure ??",
          text: "Do you really want to purge game list cache?",
          icon: "warning",
          buttons: true,
          dangerMode: false,
        }).then((willDelete) => {
          if (willDelete) {
            this.$store.dispatch("purgeGameCache").then((res) => {
              if (res.data.errorCode === 0) {
                swal(
                  "Success",
                  "Success to refresh the game list cache.",
                  "success",
                  {
                    button: "OK",
                  }
                );
              } else {
                swal("Fail", "Fail to refresh the game list cache.", "error", {
                  button: "OK",
                });
              }
            });
          }
        });
      } else {
        this.$store.commit("changeCurrentItem", name);
      }
    },
    logOut() {
      this.$store.commit("setUserData", { username: "", sessionToken: "" });
      this.$store.commit("changeCurrentItem", "Game List");
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style lang="scss" scoped>
.on {
  color: #c2c7d0;
}
i {
  margin-right: 15px;
}
.fa-user-friends {
  margin-right: 11px;
}
.logout {
  cursor: pointer;
}
.sidebar-mini {
  .main-sidebar {
    .nav-link {
      width: 100%;
      margin-bottom: 0px;
    }
  }  
}
li.nav-item:hover {
  background-color: #2f6a48;
  border-radius: 0;
}
a.router-link-active.router-link-exact-active.on.nav-link.text-white {
  background-color: #2f6a48;
}
</style>