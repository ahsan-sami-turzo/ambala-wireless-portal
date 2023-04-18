<template>
  <div>
    <Breadcrumbs main="SMS TEMPLATE" title=" SMS Template"/>
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">


        <div class="col-md-12">
          <div class="card">
            <!--            <div class="card-header">-->
            <!--              <button class="btn btn-primary" type="submit">Add Template</button>-->
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
                  <template #cell(non_masking_rate)="row">
                    {{ row.value }} {{ row.item.currency_symbol}}
                  </template>
                  <template #cell(masking_rate)="row">
                    {{ row.value }} {{ row.item.currency_symbol}}
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
    </div>
    <!-- Container-fluid Ends-->
  </div>
</template>

<script>

import {mapState} from "vuex";

export default {
  data() {
    return {
      tablefields: [
        {key: 'operator', label: 'Operator', sortable: true,},
        {key: 'prefix', label: 'Prefix', sortable: true,},
        {key: 'non_masking_rate', label: 'Rate (Non-Masking)', sortable: true,},
        {key: 'masking_rate', label: 'Rate (Masking)', sortable: true,},
      ],

      items: [


      ],

      filter: null,

      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 15],
    };
  },

  computed: {
    ...mapState('price', ["prices", "priceError", "priceLoading", "submitError", "submitSuccess", "submitLoading"]),


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
    this.$store.dispatch('price/fetchPrice')
    //console.log(this.prices)
    this.items = this.prices


  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
  },
  watch: {

    prices(newValue, oldValue) {
      if (newValue) {
        //console.log(this.prices)
        this.items = this.prices
        this.totalRows = this.items.length;
      }
    }
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    }
  }
};
</script>
