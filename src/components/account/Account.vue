<template>
  <div class="content-wrapper" style="min-height: 1301.28px">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Account Management</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <router-link
                  :to="'/home'"
                  @click="$store.commit('changeCurrentItem', 'Game List')"
                  >Home</router-link
                >
              </li>
              <li class="breadcrumb-item active">Account Management</li>
            </ol>
          </div>
        </div>
      </div>
      <!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Account</h3>
              </div>
              <!-- /.card-header -->
              <div class="card-body">
                <div
                  id="example1_wrapper"
                  class="dataTables_wrapper dt-bootstrap4"
                >
                  <AccBtn
                    :permission="permission"
                    :userPermissions="userPermissions"
                    @addNewAccount="addNew = true"
                    @showPermissions="showPermissions($event)"
                  />
                  <AddNewAcc
                    :permission="permission"
                    :show="addNew"
                    :permissionTitles="permissionTitles"
                    @close="addNew = false"
                    @add="getAllUserPermission"
                  />
                  <AccData
                    :permission="permission"
                    :userPermissions="userPermissions"
                    :permissionTitles="permissionTitles"
                    :selectedUser="selectedUser"
                    @update="getAllUserPermission"
                  />
                </div>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container-fluid -->
    </section>
    <!-- /.content -->
  </div>
</template>

<script>
import AccBtn from "./AccBtn.vue";
import AccData from "./AccData.vue";
import AddNewAcc from "./AddNewAcc.vue";
import { permissionsPage } from "../../importJsFile/constStore.js";

export default {
  name: "Account",
  components: {
    AccBtn,
    AddNewAcc,
    AccData,
  },
  data() {
    return {
      permissionTitles: ["Permissions", "Create", "Read", "Update", "Delete"],
      apiPermissions: this.$store.state.apiPermissions,
      userPermissions: [],
      addNew: false,
      selectedUser: "",
    };
  },
  computed: {
    permission() {
      return {
        ...this.$store.state.userPermissions[permissionsPage.accountPage],
      };
    },
  },
  methods: {
    getAllUserPermission() {
      this.$store.dispatch("getAllUserPermissionAPI").then((res) => {
        if (res.data.errorCode === 0) {
          this.userPermissions = res.data.data.usersWithPermission;
          console.log(this.userPermissions);
        }
      });
    },
    showPermissions(user) {
      this.selectedUser = user;
    },
  },
  beforeMount() {
    this.getAllUserPermission();
  },
};
</script>

<style lang="scss" scoped>
</style>
