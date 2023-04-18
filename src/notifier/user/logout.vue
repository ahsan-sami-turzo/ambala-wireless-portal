<template>

</template>

<script>
import {userService} from "../../_services";
import firebase from "firebase";
import UserAuth from "../../auth/js";

export default {
  name: "logout",
  created() {
      userService.logout()
      firebase
          .auth()
          .signOut()
          .then(() => {
            UserAuth.Logout();
            this.$router.replace('/auth/login');
          });

  }
}
</script>

<style scoped>

</style>
