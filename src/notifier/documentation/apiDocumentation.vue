<template>
  <div>
    <Breadcrumbs main="Developers" title="API Documentation"/>
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">

        <div class="col-sm-12 col-xl-12">
          <b-card header-tag="div" header-class="b-l-primary">

            <b-card-text class="mb-0">
              <h5>API Credential</h5>
              <p class="font-scale-10">Your API Key : <span class="f-w-600">Token {{ documents }}</span></p>
<!--              <button class="btn btn-primary" @click="copyKey">Copy</button>-->
              <button class="btn btn-primary" @click="regenerateApiKey">Regenerate</button>
            </b-card-text>
          </b-card>
        </div>
        <div class="col-sm-12 col-xl-12">
          <b-card header-tag="div" header-class="b-l-primary">

            <b-card-text class="mb-0">
              <h5>API Documentation</h5>
              <p class="font-scale-10">You can find the API documentation here:
                <span class="f-w-600">
                  <a :href="POSTMAN_DOCUMENTATION_URL" target="_blank">
                    {{ POSTMAN_DOCUMENTATION_URL }}
                  </a>
                </span>
              </p>


            </b-card-text>
          </b-card>
        </div>

<!--      <div class="col-sm-12 col-xl-12">-->
<!--          <b-card header-tag="div" header-class="b-l-primary">-->

<!--            <b-card-text class="mb-0">-->
<!--              <h5>WordPress & Woocomerce Plugin</h5>-->
<!--              <p class="font-scale-10">To use the plugin in woocommerce you need to install both of the plugins. If you just want to use in wordpress, you can use the wordpress plugin only.-->
<!--              </p>-->
<!--              <p>   WordPress: <span class="f-w-600"><a href="" target="_blank"> https://clients.muthobarta.com/module/muthofun-sms.zip</a></span></p>-->
<!--              <p>   Woocemerce: <span class="f-w-600"><a href="" target="_blank"> https://clients.muthobarta.com/module/muthofun-sms-woocomerce-extension.zip</a></span></p>-->


<!--            </b-card-text>-->
<!--          </b-card>-->
<!--        </div>-->

      </div>
    </div>
  </div>
</template>
<script>

import {mapState} from "vuex";

export default {

  mounted() {
    console.log('mounted...', process.env.VUE_APP_POSTMAN_DOCUMENTATION_URL)
  },

  data() {
    return {
      POSTMAN_DOCUMENTATION_URL: process.env.VUE_APP_POSTMAN_DOCUMENTATION_URL
    }
  },

  computed: {
    ...mapState('documentation', ["documents", "documentsError", "documentsLoading", "submitError", "submitSuccess", "submitLoading"]),
  },
  created() {
    this.$store.dispatch('documentation/fetchDocuments',{status:0})
  },
  watch: {
    documents(newValue, oldValue) {
    }
  },
  methods:{
    copyKey() {
      navigator.clipboard.writeText(this.documents);
      this.$toasted.show("Copied the API key to Clipboard!", {
        theme: 'outline',
        position: 'top-right',
        icon: 'ThumbsUpIcon',
        type: 'success',
        duration: 2000
      });
    },
    regenerateApiKey(){
      this.$store.dispatch('documentation/fetchDocuments',{status:1})
    }
  }

};
</script>
