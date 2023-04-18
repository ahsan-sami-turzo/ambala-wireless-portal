<template>
  <div>
    <Breadcrumbs main="Report" title="Todays Delivery Report"/>
    <!-- Container-fluid starts-->
    <div class="container-fluid">

      <div class="row">
        <div class="col-xl-12">
          <div class="card calender-form">
            <div class="card-body">

              <form @submit.prevent="" method="post" class="form theme-form">
                <div class="row">
                  <div class="col-md-4">
                    <div class="form-group">
                      <label class="f-w-600">Select Status:</label>
                      <b-form-select v-model="status" class="btn-square"
                                     :options="numberOptions"></b-form-select>

                    </div>
                  </div>
                  <div class="col-12">
                    <button class="btn btn-primary" @click="fetchReport">Filter</button>
<!--                    <button class="btn btn-secondary ml-2 ">Download</button>-->

                  </div>
                </div>
              </form>

              <div class="card-header">

              </div>


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
                  <template #cell(receiver)="row">
                    {{ row.value }}<br>
                    <small>
                      {{ row.item.operator_name }}
                    </small>
                  </template>
                  <template #cell(created_at)="row">


                    {{ (new Date(row.value)).toDateString() }}
                    <br>
                    <small>
                      {{ (new Date(row.value)).toLocaleTimeString() }}

                    </small>
                    <!--                    {{ row.value }} BDT-->
                  </template>
                  <template #cell(sms_cost)="row">
                    {{ row.item.sms_count }}@{{ row.item.sms_rate }} <br>
                    {{ row.value }} BDT
                  </template>
                </b-table>
              </div>

              <b-col md="6" class="my-1 p-0">
                <b-pagination
                    v-model="currentPage"
                    :total-rows="totalRows"
                    :per-page="perPage"
                    class="my-0"
                    @change="handleChangePage"
                ></b-pagination>

              </b-col>


            </div>
          </div>
        </div>


      </div>
    </div>
    <!-- Container-fluid Ends-->
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import {mapState} from "vuex";

export default {
  components: {
    Datepicker
  },
  data() {

    return {
      format: 'dd/MM/yyyy',
      tablefields: [
        {key: 'index', label: '#', sortable: true,},
        // {key: 'user', label: 'User', sortable: true,},
        {key: 'receiver', label: 'Mobile', sortable: true,},
        {key: 'created_at', label: 'Sent Time', sortable: true,},
        {key: 'sender_id', label: 'Sender ID', sortable: true,},
        {key: 'sms_cost', label: 'Cost', sortable: true,},
        {key: 'sms_body', label: 'SMS Text', sortable: true,},
        {key: 'status', label: 'Status', sortable: true,},
      ],

      items: [
        {
          user: 'Rafat Hossain',
          mobile: 'Credit',
          sent_time: '4.40 ',
          sender_id: '1.00',
          cost: '5.40 ',
          sms_text: 'আপনার মতামতের জন্য ধন্যবাদ',
          status: 'Delivered'
        },


      ],
      numberSelectedFlatInput: 1,
      numberOptions: [
        {value: "Pending", text: "Pending"},
        {value: "Delivered", text: "Delivered"},
        {value: "Submitted", text: "Submitted"},
        {value: "Failed", text: "Failed"},
        {value: "Blocked", text: "Blocked"},
      ],

      filter: null,
      from_date: '',
      status: '',
      to_date: '',
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageCount: null,
      pageOptions: [5, 10, 15],
    };
  },
  computed: {
    ...mapState('deliveryReport', ["deliveryReportError", "deliveryReportCount", "deliveryReports", "deliveryReportPageCount", "deliveryReportLoading", "submitError", "submitSuccess", "submitLoading"]),


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
    this.$store.dispatch('deliveryReport/fetchDeliveryReport', {
      count: this.perPage,
      from_date: this.fromDate(),
      to_date: this.toDate(),
      status: this.status
    })

    this.items = this.deliveryReports


  },
  mounted() {
    // Set the initial number of items

    this.totalRows = this.deliveryReportCount;
  },
  watch: {

    deliveryReports(newValue, oldValue) {


      this.items = this.deliveryReports
      this.totalRows = this.deliveryReportCount;

    },
    deliveryReportPageCount(newValue, oldValue) {

      this.pageCount = this.deliveryReportPageCount

    }
  },
  methods: {
    fromDate() {
      var date = new Date(),
          mnth = ("0" + (date.getMonth() + 1)).slice(-2),
          day = ("0" + date.getDate()).slice(-2);

      return [date.getFullYear(), mnth, day].join("-");

    },
    toDate(str) {

      var date = new Date(),
          mnth = ("0" + (date.getMonth() + 1)).slice(-2),
          day = ("0" + date.getDate()).slice(-2);

      return [date.getFullYear(), mnth, day].join("-");

    },

    fetchReport() {
      this.$store.dispatch('deliveryReport/fetchDeliveryReport', {
        count: this.perPage,
        from_date: this.fromDate(),
        to_date: this.toDate(),
        status: this.status
      })
    },
    handleChangePage(page) {

      if (page > this.pageCount) {
        let f_date = this.fromDate()
        let t_date = this.toDate()
        this.$store.dispatch('deliveryReport/fetchDeliveryReportByPage', {
          count: this.perPage,
          from_date: f_date,
          to_date: t_date,
          page: page,
          status: this.status
        })

      }
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    }
  }
};
</script>
