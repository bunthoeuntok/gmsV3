<template>
  <div class="flex flex-col items-center justify-center w-full h-screen px-20 overflow-hidden bg-white">
    <div class="flex flex-col w-full gap-4 px-12 py-16 rounded-lg shadow-md min-w-min md:w-3/5 xl:w-2/5">
      <div class="flex flex-col items-center gap-6">
        <img alt="GMS logo" class="w-40" src="../assets/logo.svg" />
        <p class="text-[22px] font-semibold text-gray-700 truncate whitespace-nowrap">Game Management System</p>
      </div>
      <!-- logIn -->
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <el-label class="font-semibold text-md">Username</el-label>
          <el-input
            type="text"
            size="large"
            placeholder="Account"
            v-model="userData.username"
            @keyup.enter="login"
            :suffix-icon="User"
          />
        </div>
        <div class="flex flex-col gap-2">
          <el-label class="font-semibold text-md">Password</el-label>
          <el-input
            type="password"
            size="large"
            placeholder="Password"
            v-model="userData.password"
            @keyup.enter="login"
            show-password
          />
        </div>
        <el-button class="w-full mt-2" size="large" type="primary" @click="login">
          <span class="pr-2">LOGIN</span>
          <el-icon :size="20"><Right /></el-icon>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { User, Right } from '@element-plus/icons-vue'
export default {
  name: "LogIn",
  components: {
    User,
    Right
  },
  data() {
    return {
      userImg: "../assets/profileImg.png",
      userData: {
        secretKey: "StagingSecretKey",
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      let data = this.userData;
      this.$store.dispatch("logInAPI", data).then((res) => {
        if (res.data.errorCode === 0) {
          //寫入userData
          let sessionToken = res.data.data.sessionToken;
          let username = data.username;
          this.$store.commit("setUserData", { username, sessionToken });
          //判斷權限
          this.$store.dispatch("getPermissionAPI").then((res) => {
            if (res.data.errorCode === 0) {
              console.log(res.data.data.permissions);
              this.$store.commit(
                "setUserPermissions",
                res.data.data.permissions
              );
            }
          });
          //導頁
          this.$router.push({ path: "/home" });
        } else {
          swal(
            "Fail to Login !",
            "Please check your account or password again.",
            "error",
            {
              button: "OK",
            }
          );
        }
      });
    },
  },
};
</script>



