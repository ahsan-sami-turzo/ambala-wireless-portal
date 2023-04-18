<template>
  <div>
    <Breadcrumbs main="Messaging" title="Send SMS"/>
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="edit-profile">
        <div class="row">

          <div class="col-xl-8">
            <b-card header-tag="div" no-body>

              <b-card-body>
                <b-tabs pills slot="header" class="tabbed-card">
                  <b-tab title="Single SMS" active>
                    <form @submit.prevent="">
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                            <label class="form-label">Select Sender ID</label>
                            <b-form-select v-model="payload.sender_id" class="btn-square"
                                           :options="sender_id"></b-form-select>

                          </div>
                        </div>
                        <div class="col-md-12 mt-2">
                          <div class="form-group">
                            <label class="form-label">Enter Mobile Numbers</label>
                            <textarea class="form-control" rows="3"
                                      placeholder="01734999936,01874862998" v-model="payload.receiver"></textarea>
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group m-checkbox-inline custom-radio-ml">
                            <div class="checkbox checkbox-dark">
                              <b-form-checkbox name="checkbox7" v-model="payload.remove_duplicate">Remove Duplicate</b-form-checkbox>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group m-checkbox-inline mb-0 custom-radio-ml">
                            <div class="radio radio-primary d-inline-block">
                              <b-form-radio name="radio3" value="option1">Text</b-form-radio>
                            </div>
                            <div class="radio radio-primary d-inline-block">
                              <b-form-radio name="radio3" value="option2">Unicode</b-form-radio>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-12 mt-2">
                          <div class="form-group">
                            <label class="form-label">Enter SMS Content |<a  v-b-modal.modal-3 class="primary ml-2">Use Templates</a></label>
                            <textarea class="form-control" rows="5"
                                      placeholder="Enter SMS Content" v-model="payload.message"></textarea>
                            <small class="bg-dark p-1"> {{ getCharacterCount() }} Characters |
                              {{ 1530 - getCharacterCount() }} Characters Left | <span class="font-primary">1 SMS ( 160 Char./SMS )</span></small>
                          </div>

                        </div>

                        <div class="col-md-4">
                          <button class="btn btn-primary" type="submit" @click="submitSms">Send SMS</button>
                        </div>
                      </div>
                    </form>
                  </b-tab>
                  <b-tab title="Upload File">
                    <form @submit.prevent="">
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                            <label class="form-label">Select Sender ID</label>
                            <b-form-select v-model="upload_payload.sender_id" class="btn-square"
                                           :options="sender_id"></b-form-select>

                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label class="form-label">Select File (CSV) | <a class="ml-2"  href="/files/ambala_sample_contact.csv" download>Download Sample File</a></label>
                            <div>
                              <b-form-file class="form-control" plain v-model="upload_payload.file"
                                           accept=".csv"></b-form-file>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group m-checkbox-inline custom-radio-ml">
                            <div class="checkbox checkbox-dark">
                              <b-form-checkbox name="checkbox7" v-model="upload_payload.remove_duplicate">Remove Duplicate</b-form-checkbox>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group m-checkbox-inline mb-0 custom-radio-ml">
                            <div class="radio radio-primary d-inline-block">
                              <b-form-radio name="radio3" value="option1">Text</b-form-radio>
                            </div>
                            <div class="radio radio-primary d-inline-block">
                              <b-form-radio name="radio3" value="option2">Unicode</b-form-radio>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-12 mt-2">
                          <div class="form-group">
                            <label class="form-label">Enter SMS Content |<a  v-b-modal.modal-3 class="primary ml-2">Use Templates</a></label>
                            <textarea class="form-control" rows="5"
                                      placeholder="Enter SMS Content" v-model="upload_payload.message"></textarea>
                            <small class="bg-dark p-1"> {{ getUploadCharacterCount() }} Characters |
                              {{ 1530 - getUploadCharacterCount() }} Characters Left | <span class="font-primary">1 SMS ( 160 Char./SMS )</span></small>
                          </div>

                        </div>

                        <div class="col-md-4">
                          <button class="btn btn-primary" type="submit" @click="submitFileSms">Send SMS</button>

                        </div>
                      </div>
                    </form>
                  </b-tab>
                  <b-tab title="Group SMS">
                    <form @submit.prevent="">
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                            <label class="form-label">Select Sender ID</label>
                            <b-form-select v-model="group_payload.sender_id" class="btn-square"
                                           :options="sender_id"></b-form-select>
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label class="form-label">Select Contact Group</label>
                            <v-select
                                id="group-name-2"
                                v-model=" group_payload.group_id"
                                :options="contactGroups"
                                :reduce="group_name=>group_name.id"
                                label="group_name"
                            />
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group m-checkbox-inline custom-radio-ml">
                            <div class="checkbox checkbox-dark">
                              <b-form-checkbox name="checkbox7" v-model="group_payload.remove_duplicate">Remove Duplicate</b-form-checkbox>

                            </div>
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group m-checkbox-inline mb-0 custom-radio-ml">
                            <div class="radio radio-primary d-inline-block">
                              <b-form-radio name="radio3" value="option1">Text</b-form-radio>
                            </div>
                            <div class="radio radio-primary d-inline-block">
                              <b-form-radio name="radio3" value="option2">Unicode</b-form-radio>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-12 mt-2">
                          <div class="form-group">
                            <label class="form-label">Enter SMS Content |<a  v-b-modal.modal-3 class="primary ml-2">Use Templates</a></label>
                            <textarea class="form-control" rows="5"
                                      placeholder="Enter SMS Content" v-model="group_payload.message"></textarea>
                            <small class="bg-dark p-1"> {{ getGroupCharacterCount() }} Characters |
                              {{ 1530 - getGroupCharacterCount() }} Characters Left | <span class="font-primary">1 SMS ( 160 Char./SMS )</span></small>
                          </div>

                        </div>

                        <div class="col-md-4">
                          <button class="btn btn-primary" type="submit" @click="submitGroupSms">Send SMS</button>
                        </div>
                      </div>
                    </form>
                  </b-tab>
                </b-tabs>
              </b-card-body>
              <h5 slot="header"></h5>
            </b-card>

          </div>
          <div class="col-xl-4">
            <div class="card">
              <div class="card-header">
                <h4 class="card-title mb-0"> Information</h4>
              </div>
              <div class="card-body">

                <span class="font-primary">Single SMS:</span> With this option, you can send SMS to single or multiple
                users at a time. You can pass comma separated mobile numbers to send to multiple number at a time.
                <br>
                <br>
                <span class="font-primary">Upload File:</span> You can send SMS in bulk by uploading a list of contacts in CSV format. Once the upload is
                completed, your file will be processed instantly.
                <a class=" ml-2"  href="/files/ambala_sample_send_sms.csv" download>Download Sample CSV</a>

                <br>
                <br>
                <span class="font-primary">Group SMS: </span> You can send SMS directly to your saved contact group. Just select the group and type your
                message. You are good to go!
              </div>

            </div>
          </div>
        </div>
      </div>
      <b-modal
          id="modal-3"
          ref="my-modal"
          size="lg"
          centered
          title="Use Template"
          class="large-modal">

        <b-row>
          <b-col xl="6">

            <b-input-group class="datatable-btn">
              <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
              </b-input-group-append>
            </b-input-group>

          </b-col>

          <b-col xl="6">
            <b-form-group label-cols="2" label="Per page" class="mb-0 datatable-select">
              <b-form-select v-model="perPage" :options="pageOptions"></b-form-select>
            </b-form-group>
          </b-col>
        </b-row>

        <div class="table-responsive datatable-vue">
          <b-table
              show-empty
              stacked="md"
              :items="items"
              :fields="tablefields"
              :filter="filter"
              :current-page="currentPage"
              :per-page="perPage"
              @filtered="onFiltered"
          >
            <template #cell(action)="row">
              <b-button @click="insertIntoSmsBody(row.item.sms_body)"
                        class="btn btn-primary"
              >Insert
              </b-button>

            </template>
          </b-table>
        </div>

        <b-col md="6" class="my-1 p-0">
          <b-pagination
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="perPage"
              class="my-0"
          ></b-pagination>
        </b-col>


      </b-modal>
    </div>
    <!-- Container-fluid Ends-->
  </div>
</template>

<script>
import {mapState} from "vuex";
import vSelect from "vue-select"

import 'vue-select/dist/vue-select.css';
export default {
  components: {
    vSelect
  },
  data() {
    return {
      tablefields: [
        {key: 'template_name', label: 'Template Name', sortable: true,},
        {key: 'sms_body', label: 'SMS Body', sortable: true,},
        {key: 'action', label: 'Action', sortable: true,},
      ],

      items: [],

      filter: null,

      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 15],
      payload:{
        "sender_id": "",
        "receiver": "",
        "message": "",
        "remove_duplicate": false
      },
      upload_payload:{
        "sender_id": "",
        "file": null,
        "message": "",
        "remove_duplicate": false
      },
      group_payload:{
        "group_id": "",
        "sender_id": "",
        "message": "",
        "remove_duplicate": false
      },
      numberSelectedFlatInput: 1,
      numberOptions: [
        {value: 1, text: 1},
        {value: 2, text: 2},
        {value: 3, text: 3},
        {value: 4, text: 4},
        {value: 5, text: 5}
      ],
      smsCount: ""
    }
  },
  computed: {
    ...mapState('smsManage', ["sms", "sender_id","smsError", "smsLoading", "submitError", "submitSuccess", "submitLoading"]),
    ...mapState('smsTemplate', ["smsTemplates", "smsTemplateError", "smsTemplateLoading", "submitError", "submitSuccess", "submitLoading"]),
    ...mapState('contactGroup', ["contactGroups", "contactGroupError", "contactGroupLoading", "submitError", "submitSuccess", "submitLoading"]),


    sortOptions() {
      // Create an options list from our fields
      return this.tablefields
          .filter(f => f.sortable)
          .map(f => {
            return {text: f.label, value: f.key};
          });
    }
  },
  created() {
    this.$store.dispatch('contactGroup/fetchContactGroup')
    this.$store.dispatch('smsManage/fetchSmsSender')
    this.$store.dispatch('smsTemplate/fetchSmsTemplate')
    this.items = this.smsTemplates


  },

  watch: {
    smsTemplates(newValue, oldValue) {
      if (newValue) {
        this.items = this.smsTemplates
        this.totalRows = this.items.length;
      }
    },
    sender_id(newValue, oldValue) {}
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    checkFormValidity() {
      //console.log(this.$refs['form'].checkValidity())
      const valid = this.$refs.form.checkValidity()
      this.nameState = valid
      return valid
    },
    resetModal() {
      this.payload.template_name = null
      this.payload.sms_body = null
      this.delete_id = null
      this.nameState = null
    },
    handleOk(bvModalEvt) {
      //console.log(this.payload)
      bvModalEvt.preventDefault()
      this.handleSubmitData()
    },
    insertIntoSmsBody(sms_content){

      this.payload.message=sms_content
      this.upload_payload.message=sms_content
      this.group_payload.message=sms_content
      this.$nextTick(() => {
        this.$refs['my-modal'].toggle('#toggle-btn')
      })
    },


    async handleSubmitData() {
      if (!this.checkFormValidity()) {
        return
      }
      await this.$store.dispatch('smsTemplate/addSmsTemplate', this.payload).then(result => {


        this.$toasted.show(result.message, {
          theme: 'outline',
          position: 'top-right',
          icon: result.code !== 200 ? `ThumbsDownIcon` : 'ThumbsUpIcon',
          type: result.code !== 200 ? `danger` : 'success',
          duration: 2000
        });
        if (result.code == 200) {
          this.resetModal()
          this.$nextTick(() => {
            this.$refs['my-modal'].toggle('#toggle-btn')
          })
        }
      })


    },
    async submitSms() {

      await this.$store.dispatch('smsManage/addSmsSend', this.payload).then(result => {


        this.$toasted.show(result.message, {
          theme: 'outline',
          position: 'top-right',
          icon: result.code !== 200 ? `ThumbsDownIcon` : 'ThumbsUpIcon',
          type: result.code !== 200 ? `danger` : 'success',
          duration: 2000
        });
      })


    },
    async submitFileSms() {

      await this.$store.dispatch('smsManage/addFileSmsSend', this.upload_payload).then(result => {


        this.$toasted.show(result.message, {
          theme: 'outline',
          position: 'top-right',
          icon: result.code !== 200 ? `ThumbsDownIcon` : 'ThumbsUpIcon',
          type: result.code !== 200 ? `danger` : 'success',
          duration: 2000
        });
      })


    },
    async submitGroupSms() {

      await this.$store.dispatch('smsManage/addGroupSmsSend', this.group_payload).then(result => {


        this.$toasted.show(result.message, {
          theme: 'outline',
          position: 'top-right',
          icon: result.code !== 200 ? `ThumbsDownIcon` : 'ThumbsUpIcon',
          type: result.code !== 200 ? `danger` : 'success',
          duration: 2000
        });
      })


    },


    getCharacterCount() {
      return this.payload.message.length
    },
    getGroupCharacterCount() {
      return this.group_payload.message.length
    },
    getUploadCharacterCount() {
      return this.upload_payload.message.length
    }


  }

};
</script>
