<template>
  <div>
    <Breadcrumbs main="" title="Billing"/>
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">


        <div class="col-md-12">
          <div class="card">
<!--            <div class="card-header">-->
<!--              <button class="btn btn-primary" type="submit">Add Fund</button>-->
<!--            </div>-->

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
                  <template #cell(previous_balance)="row">
                    {{ row.value }} BDT
                  </template>
                  <template #cell(recharge_amount)="row">
                    {{ row.value }} BDT
                  </template>
                  <template #cell(new_balance)="row">
                    {{ row.value }} BDT
                  </template>
                  <template #cell(recharge_date)="row">

                    {{(new Date(row.value)).toDateString()}}
                  </template>
                  <template #cell(balance_expiry_date)="row">

                    {{(new Date(row.value)).toDateString()}}
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
  data() {
    return {
      tablefields: [
        {key: 'recharge_date', label: 'Recharge Date', sortable: true,},
        {key: 'trx_type', label: 'Type', sortable: true,},
        {key: 'previous_balance', label: 'Old Balance', sortable: true,},
        {key: 'recharge_amount', label: 'Recharge Amount', sortable: true,},
        {key: 'new_balance', label: 'New Balance', sortable: true,},
        {key: 'balance_expiry_date', label: 'Validity', sortable: true,},
      ],

      items: [
      ],
      filter: null,
      from_date:'',
      to_date: '',
      pageCount: null,
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 15],
    };
  },
  computed: {
    ...mapState('rechargeHistory', ["rechargeHistoryCount","rechargeHistoryError", "rechargeHistoryLoading","rechargeHistoryPageCount", "rechargeHistory", "submitError", "submitSuccess", "submitLoading"]),


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
    this.$store.dispatch('rechargeHistory/fetchRechargeHistory', {
      count: this.perPage,
      from_date:this.from_date,
      to_date:this.to_date,
    })

    this.items = this.rechargeHistory


  },
  mounted() {
    // Set the initial number of items

    this.totalRows = this.rechargeHistoryCount;
  },
  watch: {

    rechargeHistory(newValue, oldValue) {



      this.items = this.rechargeHistory
      this.totalRows =  this.rechargeHistoryCount;

    },
    rechargeHistoryPageCount(newValue, oldValue) {

      this.pageCount=this.rechargeHistoryPageCount

    }
  },
  methods: {
    fromDate(str){
      //console.log(str)
      if (str !== "") {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        //console.log([date.getFullYear(), mnth, day].join("-"))
        this.from_date= [date.getFullYear(), mnth, day].join("-");
      } else{
        this.from_date=""
      }
    },
    toDate(str){
      //console.log(str)
      if (str !== "") {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        //console.log([date.getFullYear(), mnth, day].join("-"))
        this.to_date= [date.getFullYear(), mnth, day].join("-");
      } else{
        this.to_date=""
      }
    },

    fetchReport(){
      this.$store.dispatch('rechargeHistory/fetchRechargeHistory', {
        count: this.perPage,
        from_date:this.from_date,
        to_date:this.to_date,
      })
    },
    handleChangePage(page) {
      if(page>this.pageCount)
        this.$store.dispatch('rechargeHistory/fetchRechargeHistoryByPage', {count: this.perPage,from_date:this.from_date, to_date:this.to_date, page: page})
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    }
  }
};
</script>
