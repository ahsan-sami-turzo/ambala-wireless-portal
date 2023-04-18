<template>
  <li class="profile-nav onhover-dropdown p-0 mr-0">
    <div class="media profile-media" v-if="user">
      <img
        class="b-r-10 w-2 height-2"
        :src="user.user_object.user_image"
        alt=""
        style="width:35px"
      />
      <div class="media-body">
        <span>{{user.user_object.first_name+" "+user.user_object.last_name}}</span>
        <p class="mb-0 font-roboto">
          {{user.user_object.username}} <i class="middle fa fa-angle-down"></i>
        </p>
      </div>
    </div>
    <div class="media profile-media" v-else>

      <div class="media-body">
      Logout
      </div>
    </div>
    <ul class="profile-dropdown onhover-show-div">
      <li>
        <a href="#"><router-link :to="{ path: '/dashboard' }"><feather type="lock"></feather><span>Change Password </span></router-link></a>
      </li>
<!--      <li>-->
<!--        <a href="#"><feather type="user"></feather><span>Account </span></a>-->
<!--      </li>-->
<!--      <li>-->
<!--        <a href="#"><feather type="mail"></feather><span>Inbox</span></a>-->
<!--      </li>-->
<!--      <li>-->
<!--        <a href="#"-->
<!--          ><feather type="file-text"></feather><span>Taskboard</span></a-->
<!--        >-->
<!--      </li>-->
<!--      <li>-->
<!--        <a href="#"><feather type="settings"></feather><span>Settings</span></a>-->
<!--      </li>-->
      <li>
        <a @click="logout"
          ><feather type="log-in"></feather><span>Log out</span></a
        >
      </li>
    </ul>
  </li>
</template>

<script>
  import firebase from 'firebase';
  import UserAuth from '../../auth/js/index';
  import {userService} from "../../_services";

  export default {
    name: 'Profile',
    created(){
      this.$store.dispatch('authentication/isUserLoggedIn')
      if(this.$store.state.authentication.isUserLoggedIn){
        this.user=JSON.parse(localStorage.getItem('user'))
      }else{
        this.user=null
      }
      // //console.log(this.user)
    },
    data(){
      return{
        user:null
      }
    },
    methods: {
      logout: function() {
        userService.logout()
        firebase
          .auth()
          .signOut()
          .then(() => {
            UserAuth.Logout();
            this.$router.replace('/auth/login');
          });
      },
    },
  };
</script>
