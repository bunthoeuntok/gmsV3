<template>
  <div class="skin" v-if="show">
    <div class="row" id="add_new_accouunt">
      <div class="col-sm-12">
        <div class="operation">
          <a href="#" @click="close">
            <i class="far fa-times-circle"></i>
          </a>
        </div>
        <div class="userData">
          <div class="form-group">
            <label>User Name :</label>
            <input
              type="text"
              class="form-control"
              v-model="newAccount.username"
            />
          </div>
          <div class="form-group">
            <label>Password :</label>
            <input
              type="password"
              class="form-control"
              v-model="newAccount.password"
              minlength="6"
            />
          </div>
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
            <tr
              v-for="(permission, index) in newAccount.permissions"
              :key="index"
            >
              <td class="dtr-control sorting_1" tabindex="0">
                <span class="data">{{ permission.page }}</span>
              </td>
              <td>
                <input
                  type="checkbox"
                  class="form-control edit"
                  v-model="permission.canCreate"
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  class="form-control edit"
                  v-model="permission.canRead"
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  class="form-control edit"
                  v-model="permission.canUpdate"
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  class="form-control edit"
                  v-model="permission.canDelete"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button
          type="button"
          class="btn btn-block btn-default btn-sm"
          @click="addNewAccount"
        >
          Add Account
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// import { permissionsPage } from "../importJsFile/constStore.js";

export default {
  name: "AddNewAcc",
  computed: {
    newAccount() {
      return { ...this.$store.getters.newAccount };
    },
  },
  props: ["show", "permissionTitles"],
  emits: ["close", "add"],
  methods: {
    addNewAccount() {
      if (this.newAccount.password.length < 6) {
        swal(
          "You can't do it!",
          "You need to enter more than 6 charator in password column",
          "error",
          {
            button: "OK",
          }
        );
      } else {
        this.$store
          .dispatch("createAccountAPI", this.newAccount)
          .then((res) => {
            if (res.data.errorCode !== 0) {
              swal("Fail cto update!", `${res.data.errorMessage}`, "error", {
                button: "OK",
              });
            } else {
              //reset
              this.newAccount.username = "";
              this.newAccount.password = "";
              this.newAccount.permissions = [
                {
                  page: this.newAccount.permissions[0].page,
                  canRead: false,
                  canCreate: false,
                  canUpdate: false,
                  canDelete: false,
                },
                {
                  page: this.newAccount.permissions[1].page,
                  canRead: false,
                  canCreate: false,
                  canUpdate: false,
                  canDelete: false,
                },
                {
                  page: this.newAccount.permissions[2].page,
                  canRead: false,
                  canCreate: false,
                  canUpdate: false,
                  canDelete: false,
                },
                {
                  page: this.newAccount.permissions[3].page,
                  canRead: false,
                  canCreate: false,
                  canUpdate: false,
                  canDelete: false,
                },
              ];
              //
              swal("Success !", "Success to create this account.", "success", {
                button: "OK",
              });
              this.$emit("add");
              this.$emit("close");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    close() {
      //reset
      this.newAccount.username = "";
      this.newAccount.password = "";
      this.newAccount.permissions = [
        {
          page: this.newAccount.permissions[0].page,
          canRead: false,
          canCreate: false,
          canUpdate: false,
          canDelete: false,
        },
        {
          page: this.newAccount.permissions[1].page,
          canRead: false,
          canCreate: false,
          canUpdate: false,
          canDelete: false,
        },
        {
          page: this.newAccount.permissions[2].page,
          canRead: false,
          canCreate: false,
          canUpdate: false,
          canDelete: false,
        },
        {
          page: this.newAccount.permissions[3].page,
          canRead: false,
          canCreate: false,
          canUpdate: false,
          canDelete: false,
        },
      ];
      //
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.skin {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9;
  background-color: rgba(255, 255, 255, 0.8);
}
#add_new_accouunt {
  width: 100%;
  min-height: 400px;

  background-color: #eee;
  margin-bottom: 6px;
  position: absolute;
  top: 6px;
  left: 6px;
  z-index: 10;
  border-radius: 15px;
  border-top: 3px solid #acc;
  border-right: 1px solid #acc;
  border-bottom: 1px solid #acc;
  border-left: 1px solid #acc;
  .operation {
    display: flex;
    justify-content: flex-end;

    > a {
      margin: 15px;
      color: #000;
      &:hover {
        color: rgb(112, 110, 91);
      }
    }
  }
  .userData {
    margin: 0 5px;
    padding-bottom: 10px;
    .form-group {
      display: flex;
      align-items: center;
      label {
        margin: 0 5px;
      }
      input {
        width: 150px;
      }
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