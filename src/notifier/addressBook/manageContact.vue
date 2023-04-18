<template>
  <div>
    <Breadcrumbs main="Address Book" title="Manage Contact"/>
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">


        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
                <b-button v-b-modal.modal-add variant="primary">Add Contact</b-button>
                <!--              <button class="btn btn-primary" type="submit"></button>-->
              <b-button v-b-modal.modal-upload class="btn btn-primary ml-2" variant="primary">Upload Contact</b-button>
              <a class="btn btn-secondary ml-2"  href="/files/ambala_sample_contact.csv" download>Download Sample File</a>
<!--              <button class="btn btn-secondary ml-2" type="submit">Download Sample File</button>-->
            </div>

            <div class="card-body">
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
                  <template #cell(index)="row">
                    {{++row.index}}
                  </template>
                  <template #cell(action)="row">
                    <b-button @click="deleteType(row.item.id)"
                              id="delete-btn"
                              v-b-modal.modal-delete
                              variant="danger" class="btn btn-primary"
                    >Delete
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


            </div>

          </div>
        </div>

      </div>
      <b-modal
          id="modal-add"
          ref="my-modal"
          centered
          title="Add New Contact"
          ok-title="Submit"
          @ok="handleOk"
          @cancel="resetModal"
          class="theme-modal">
        <form ref="form">
          <v-select
              id="group-name"
              v-model=" payload.group"
              :options="contactGroups"
              :reduce="group_name=>group_name.id"
              label="group_name"
          />
          <b-form-group
              :state="nameState"
              label="Name"
              label-for="name-input"
              invalid-feedback="Name is required"
          >

            <b-form-input
                id="name-input"
                :state="nameState"
                v-model="payload.name"
                placeholder="Name"></b-form-input>
          </b-form-group>
          <b-form-group
              :state="nameState"
              label="Mobile No"
              label-for="mobile-input"
              invalid-feedback="mobile no is required"
          >

            <b-form-input
                id="mobile-input"
                :state="nameState"
                v-model="payload.mobile"
                placeholder="01811101101"></b-form-input>
          </b-form-group>


        </form>
      </b-modal>

      <b-modal
          id="modal-upload"
          ref="my-modal-2"
          centered
          title="Upload Contact"
          ok-title="Submit"
          @ok="handleUploadOk"
          @cancel="resetModal"
          class="theme-modal">
        <form ref="form">
          <v-select
              id="group-name-2"
              v-model=" upload_payload.group"
              :options="contactGroups"
              :reduce="group_name=>group_name.id"
              label="group_name"
          />

          <b-form-group
              :state="nameState"
              label="Select File (CSV)"
              label-for="csv-input"
              invalid-feedback="CSV is required"
          >

            <b-form-file
                id="csv-input"
                :state="nameState"
                v-model="upload_payload.file"
                accept=".csv"
                ></b-form-file>
          </b-form-group>


        </form>
      </b-modal>
      <b-modal
          id="modal-delete"
          ref="modal-delete"
          centered
          modal-class="modal-danger"
          title="Are you sure?"
          ok-title="Accept"
          @ok="confirmDelete"
          @cancel="resetModal"
          class="theme-modal">
        <b-card-text class="border-2">
          <span>If you delete, you won't be able to revert this action!!</span>
        </b-card-text>
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
      nameState: null,
      addNewMode: false,
      popupActive: true,
      delete_id: null,
      payload:{
        "group": null,
        "name": null,
        "mobile": null
      },
      upload_payload:{
        "group": null,
        "file": null,
      },
      tablefields: [
        {key: 'index', label: '#', sortable: true,},
        {key: 'name', label: 'Name', sortable: true,},
        {key: 'mobile', label: 'Number', sortable: true,},
        {key: 'group_name', label: 'Group', sortable: true,},
        { key: 'action', label: 'Action', sortable: true, },

      ],

      items: [],

      filter: null,

      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 15],
    };
  },computed: {
    ...mapState('contactGroup', ["contactGroups", "contactGroupError", "contactGroupLoading", "submitError", "submitSuccess", "submitLoading"]),
    ...mapState('contact', ["contacts", "contactError", "contactLoading", "submitError", "submitSuccess", "submitLoading"]),


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
    this.$store.dispatch('contact/fetchContact')
    this.items = this.contacts


  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
  },
  watch: {

    contacts(newValue, oldValue) {
      if (newValue) {
        this.items = this.contacts
        this.totalRows = this.items.length;
      }
    },
    contactGroups(newValue, oldValue) {
      if (newValue) {

      }
    }
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
      this.payload.name = null
      this.payload.group = null
      this.payload.mobile = null
      this.upload_payload.group = null
      this.upload_payload.file = null

      this.delete_id = null
      this.nameState = null
    },
    handleOk(bvModalEvt) {
      //console.log(this.payload)
      bvModalEvt.preventDefault()
      this.handleSubmitData()
    },
    handleUploadOk(bvModalEvt) {
      //console.log(this.upload_payload)
      bvModalEvt.preventDefault()
      this.handleUploadData()
    },


    async handleSubmitData() {
      if (!this.checkFormValidity()) {
        return
      }
      //console.log(this.payload)
      await this.$store.dispatch('contact/addContact', this.payload).then(result => {


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
    async handleUploadData() {
      if (!this.checkFormValidity()) {
        return
      }
      //console.log(this.payload)
      await this.$store.dispatch('contact/uploadContact', this.upload_payload).then(result => {


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
            this.$refs['my-modal-2'].toggle('#toggle-btn')
          })
        }
      })


    },
    deleteType(data) {
      //console.log(data)
      this.delete_id = data
      // //console.log(data)
    },
    async confirmDelete() {
      await this.$store.dispatch('contact/deleteContact', this.delete_id).then(result => {
        this.$toasted.show(result.message, {
          theme: 'outline',
          position: 'top-right',
          icon: result.code !== 200 ? `ThumbsDownIcon` : 'ThumbsUpIcon',
          type: result.code !== 200 ? `danger` : 'success',
          duration: 2000
        });
      })
      if (result.code == 200) {
        this.resetModal()
        // this.$nextTick(() => {
        //   this.$refs['modal-delete'].toggle('#delete-btn')
        // })
      }
    }
  }
};
</script>

<style lang="scss" >

</style>
