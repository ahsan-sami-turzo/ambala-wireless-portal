<template>
  <div>
    <div class="container-fluid p-0">
      <div class="row m-0">
        <div class="col-12 p-0">
          <div class="login-card">
            <div>
              <div>
                <a class="logo">
                  <img
                      class=" for-light"
                      src="../assets/images/logo/login.png"
                      alt="looginpage"
                      style="max-width: 20%"
                  />
                  <img
                      class="img-fluid for-dark"
                      src="../assets/images/logo/logo_dark.png"
                      alt="looginpage"
                      style="max-width: 20%"
                  />
                </a>
              </div>
              <div class="login-main login-form-card">
                <form class="theme-form" @submit.prevent="">
                  <h4>Create your account</h4>
                  <p>Enter your personal details to create account</p>
                  <div class="form-group">
                    <label class="col-form-label pt-0">Your Name</label>
                    <div class="form-row">
                      <div class="col-6">
                        <input
                            class="form-control"
                            type="text"
                            required=""
                            placeholder="First name"
                            v-model="payload.first_name"
                        />
                      </div>
                      <div class="col-6">
                        <input
                            class="form-control"
                            type="text"
                            required=""
                            placeholder="Last name"
                            v-model="payload.last_name"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="col-6">
                      <label class="col-form-label">Mobile NO</label>
                      <input
                          class="form-control"
                          type="text"
                          required=""
                          placeholder="01800000000"
                          v-model="payload.mobile_number"
                      />
                    </div>
                    <div class="col-6">
                      <div class="form-group">
                        <label class="col-form-label">Email Address</label>
                        <input
                            class="form-control"
                            type="email"
                            required=""
                            placeholder="Test@gmail.com"
                            v-model="payload.email"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="col-form-label">Company Name</label>
                    <input
                        class="form-control"
                        type="text"
                        required=""
                        placeholder="Life Tech Ltd."
                        v-model="payload.company_name"
                    />

                  </div>
                  <div class="form-group">
                    <label class="col-form-label">Address</label>
                    <input
                        class="form-control"
                        type="text"
                        required=""
                        placeholder="Dhaka, Bangladesh"
                        v-model="payload.address"
                    />

                  </div>
                  <div class="form-group">
                    <label class="col-form-label">Password</label>
                    <input
                        class="form-control"
                        type="password"
                        name="login[password]"
                        required=""
                        placeholder="*********"
                        v-model="payload.password"
                    />
                    <div class="show-hide"><span class="show"></span></div>
                  </div>
                  <div class="form-group">
                    <label class="col-form-label">Password</label>
                    <input
                        class="form-control"
                        type="password"
                        name="login[password]"
                        required=""
                        placeholder="*********"
                        v-model="payload.confirm_password"
                    />
                    <div class="show-hide"><span class="show"></span></div>
                  </div>
                  <div class="form-group mb-0">
                    <div class="checkbox p-0">
                      <input id="checkbox1" type="checkbox"/>
                      <label class="text-muted" for="checkbox1"
                      >Agree with<a class="ml-2" href="#"
                      >Privacy Policy</a
                      ></label
                      >
                    </div>
                    <button class="btn btn-primary btn-block" type="submit" @click="handleSubmit">
                      Create Account
                    </button>
                  </div>
                  <!--                  <h6 class="text-muted mt-4 or">Or signup with</h6>-->
                  <!--                  <div class="social mt-4">-->
                  <!--                    <div class="btn-showcase">-->
                  <!--                      <a class="btn btn-light">-->
                  <!--                        <i class="fa fa-google txt-linkedin"></i>-->
                  <!--                        Google-->
                  <!--                      </a>-->
                  <!--                      <a class="btn btn-light">-->
                  <!--                        <feather type="twitter" class="txt-twitter"></feather-->
                  <!--                        >twitter</a-->
                  <!--                      >-->
                  <!--                      <a class="btn btn-light">-->
                  <!--                        <feather type="facebook" class="txt-fb"></feather-->
                  <!--                        >facebook</a-->
                  <!--                      >-->
                  <!--                    </div>-->
                  <!--                  </div>-->
                  <p class="mt-4 mb-0">
                    Already have an account?
                    <router-link class="ml-2" tag="a" to="/auth/login">
                      Login
                    </router-link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import firebase from 'firebase';
import Userauth from '../auth/js/index';
import {mapState} from "vuex";

export default {
  name: 'login',
  data() {
    return {
      payload:
          {
            "first_name": "",
            "last_name": "",
            "company_name": "",
            "email": "",
            "username": "",
            "mobile_number": "",
            "address": "",
            "password": "",
            "confirm_password": ""
          }
    };
  },
  methods: {

    handleSubmit() {

      this.payload.username=this.payload.email
      this.$store.dispatch('authentication/register', this.payload).then(result => {

          this.$toasted.show(result.message, {
            theme: 'outline',
            position: 'top-right',
            icon: result.code !== 200 ? `ThumbsDownIcon` : 'ThumbsUpIcon',
            type: result.code !== 200 ? `danger` : 'success',
            duration: 2000
          })
         if(result.code==200) {
          this.$router.push('/')
        }

      })
    },
    // show/hide password
    showPassword: function () {
      if (this.type === 'password') {
        this.type = 'text';
      } else {
        this.type = 'password';
      }
    }

  }
};
</script>
