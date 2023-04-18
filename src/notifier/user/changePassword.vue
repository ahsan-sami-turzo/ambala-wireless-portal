<template>
  <div>
    <Breadcrumbs main="Users" title="Change Password"/>
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="edit-profile">
        <div class="row">
          <div class="col-xl-4">

          </div>
          <div class="col-xl-4">
            <div class="card">
              <!--              <div class="card-header">-->
              <!--&lt;!&ndash;                <h4 class="card-title mb-0">Change Password</h4>&ndash;&gt;-->
              <!--                <div class="card-options"><a class="card-options-collapse" href="#" data-toggle="card-collapse"><i class="fe fe-chevron-up"></i></a><a class="card-options-remove" href="#" data-toggle="card-remove"><i class="fe fe-x"></i></a></div>-->
              <!--              </div>-->
              <div class="card-body">
                <form @submit.prevent="">

                  <div class="form-group">
                    <label class="form-label">Old Password</label>
                    <input class="form-control" type="password" value="password" v-model="payload.current_password">
                  </div>
                  <div class="form-group">
                    <label class="form-label">Password</label>
                    <input class="form-control" type="password" value="password" v-model="payload.new_password_1">
                  </div>
                  <div class="form-group">
                    <label class="form-label">Re-Type Password</label>
                    <input class="form-control" type="password" value="password" v-model="payload.new_password_2">
                  </div>

                  <div class="form-footer">
                    <button class="btn btn-primary" @click="changePassword">Update Password</button>
                  </div>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <!-- Container-fluid Ends-->
  </div>
</template>

<script>

import {mapState} from "vuex";

export default {
  data() {
    return {
      payload:
          {
            "current_password": "",
            "new_password_1": "",
            "new_password_2": ""
          }

    }
  },

  methods: {
    async changePassword() {
      await this.$store.dispatch('authentication/changePassword', this.payload).then(result => {


        this.$toasted.show(result.message, {
          theme: 'outline',
          position: 'top-right',
          icon: result.code !== 200 ? `ThumbsDownIcon` : 'ThumbsUpIcon',
          type: result.code !== 200 ? `danger` : 'success',
          duration: 2000
        });
        //console.log(this.payload)
      })
    }
  }
};
</script>

