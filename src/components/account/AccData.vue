<template>
  <div class="row">
    <div class="col-sm-12">
      <div class="userData" v-if="permission.canUpdate">
        <div class="form-group">
          <label>New Password :</label>
          <input type="password" class="form-control" v-model="resetPassword" />
        </div>
        <button
          type="button"
          class="btn btn-block btn-default btn-sm"
          @click="resetPwd"
        >
          Reset Password
        </button>
      </div>
      <table
        id="example1"
        class="table table-bordered table-striped dataTable dtr-inline"
        role="grid"
        aria-describedby="example1_info"
      >
        <thead>
          <tr role="row">
            <!-- <th class="sorting sorting_asc" tabindex="0" aria-controls="example1" rowspan="1" colspan="1" aria-label="Rendering engine: activate to sort column descending" aria-sort="ascending">Rendering engine</th> -->
            <th
              v-for="(title, index) in permissionTitles"
              :key="index"
              class="sorting"
              tabindex="0"
              aria-controls="example1"
              rowspan="1"
              colspan="1"
            >
              {{ title }}
            </th>
          </tr>
        </thead>
        <tbody>
          <!-- Account Permissions Data -->
          <tr v-for="permission in displayPermission" :key="permission.page">
            <td class="dtr-control sorting_1" tabindex="0">
              <span class="data">{{ permission.page }}</span>
            </td>
            <td>
              <input
                type="checkbox"
                class="form-control edit"
                v-model="permission.canCreate"
                :disabled="disabled"
              />
            </td>
            <td>
              <input
                type="checkbox"
                class="form-control edit"
                v-model="permission.canRead"
                :disabled="disabled"
              />
            </td>
            <td>
              <input
                type="checkbox"
                class="form-control edit"
                v-model="permission.canUpdate"
                :disabled="disabled"
              />
            </td>
            <td>
              <input
                type="checkbox"
                class="form-control edit"
                v-model="permission.canDelete"
                :disabled="disabled"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button
        v-if="permission.canUpdate"
        type="button"
        class="btn btn-block btn-default btn-sm"
        @click="changePermissions"
      >
        Save Change
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccData",
  data() {
    return {
      resetPassword: "",
    };
  },
  props: ["userPermissions", "permissionTitles", "selectedUser", "permission"],
  emits: ["update"],
  computed: {
    displayPermission() {
      for (let i = 0; i < this.userPermissions.length; i++) {
        if (this.userPermissions[i].username === this.selectedUser) {
          // console.log(this.userPermissions[i].permissions);
          return [...this.userPermissions[i].permissions];
        }
      }
    },
    disabled() {
      return !this.permission.canUpdate;
    },
  },
  methods: {
    resetPwd() {
      let useData = {
        username: this.selectedUser,
        password: this.resetPassword,
      };
      if (this.selectedUser !== "Select Account") {
        if (this.resetPassword.length >= 6) {
          this.$store.dispatch("updateAccountPwdAPI", useData).then((res) => {
            // console.log(res);
            if (res.data.errorCode === 0) {
              if (this.selectedUser === this.$store.state.userData.username) {
                swal(
                  "Success !",
                  "Success to resset your password, please double check by login with the selected account and updated password.",
                  "success",
                  {
                    button: "OK",
                  }
                );
                this.resetPassword = "";
                this.$store.commit("setUserData", {
                  username: "",
                  sessionToken: "",
                });
                this.$router.push({ path: "/" });
              } else {
                swal(
                  "Success !",
                  "Success to resset the password.",
                  "success",
                  {
                    button: "OK",
                  }
                );
                this.resetPassword = "";
              }
            } else {
              swal("Something is wrong !", "Fail to update.", "error", {
                button: "OK",
              });
            }
          });
        } else {
          swal(
            "You can't do it",
            "Please enter at least 6 characters.",
            "error",
            {
              button: "OK",
            }
          );
        }
      } else {
        swal("You can't do it", "Please choose any account.", "error", {
          button: "OK",
        });
      }
    },
    changePermissions() {
      // console.log(this.displayPermission);
      this.$store
        .dispatch("updatePermissionAPI", {
          username: this.selectedUser,
          permissions: this.displayPermission,
        })
        .then((res) => {
          if (res.data.errorCode === 0) {
            swal("Success !", "Success to update.", "success", {
              button: "OK",
            });
            this.$emit("update");
          } else {
            swal("Something is wrong !", "Fail to update.", "error", {
              button: "OK",
            });
          }
        });
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/rwd.scss";

.row {
  min-height: 400px;
  .userData {
    margin: 5px 0;
    padding: 20px 0;
    .form-group {
      display: inline-block;
      label {
        margin: 0 5px;
      }
      input {
        display: inline-block;
        max-width: 200px;
        @include rwd576 {
          width: 150px;
        }
      }
    }
    button {
      display: inline-block;
      margin: 0 0 0 30px;
      width: auto;
    }
  }
  table {
    tr {
      th {
        text-align: center;
      }
    }
  }
  button {
    margin: 15px;
    width: 100px;
    background-color: #acc;
    border: none;

    &:hover {
      background-color: rgb(114, 175, 175);
    }
  }
}
</style>
