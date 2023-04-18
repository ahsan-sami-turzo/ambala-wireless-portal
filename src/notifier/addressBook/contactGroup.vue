<template>
  <div>
    <Breadcrumbs main="Address Book" title="Contact Group"/>
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">


        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <b-button v-b-modal.modal-3 variant="primary">Add Contact Group</b-button>
              <!--              <button class="btn btn-primary" type="submit"></button>-->
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
                    {{ ++row.index }}
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
          id="modal-3"
          ref="my-modal"
          centered
          title="Add New Template"
          ok-title="Submit"
          @ok="handleOk"
          @cancel="resetModal"
          class="theme-modal">
        <form ref="form">

          <b-form-group
              :state="nameState"
              label="Group Name"
              label-for="name-input"
              invalid-feedback="Group Name is required"
          >

            <b-form-input
                id="name-input"
                :state="nameState"
                v-model="payload.group_name"
                placeholder="Group Name"></b-form-input>
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

export default {
  data() {
    return {
      nameState: null,
      addNewMode: false,
      popupActive: true,
      delete_id: null,
      payload:{
        group_name:null
      },

      tablefields: [
        {key: 'index', label: '#', sortable: true,},
        {key: 'group_name', label: 'Group Name', sortable: true,},
        {key: 'action', label: 'Action', sortable: true,},

      ],

      items: [
        {group_name: 'Grameenphone',},
        {group_name: 'Teletalk',},
        {group_name: 'Airtel',},


      ],

      filter: null,

      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 15],
    }
  },
  computed: {
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
    this.items = this.contactGroups


  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
  },
  watch: {

    contactGroups(newValue, oldValue) {
      if (newValue) {
        this.items = this.contactGroups
        this.totalRows = this.items.length;
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
      this.payload.group_name = null

      this.delete_id = null
      this.nameState = null
    },
    handleOk(bvModalEvt) {
      //console.log(this.payload)
      bvModalEvt.preventDefault()
      this.handleSubmitData()
    },


    async handleSubmitData() {
      if (!this.checkFormValidity()) {
        return
      }
      await this.$store.dispatch('contactGroup/addContactGroup', this.payload).then(result => {


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
    deleteType(data) {
      //console.log(data)
      this.delete_id = data
      // //console.log(data)
    },
    async confirmDelete() {
      await this.$store.dispatch('contactGroup/deleteContactGroup', this.delete_id).then(result => {
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
}
</script>
