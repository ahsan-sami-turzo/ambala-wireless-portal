<template>
  <div>
    <Breadcrumbs main="Dashboard" title="Home"/>
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div >
        <div class="row">

          <div class="col-sm-6 col-xl-3 col-lg-6">
            <px-card class="static-top-widget-card">
              <div slot="with-padding">
                <div class="media static-top-widget">
                  <div class="media-body">
                    <h6 class="font-roboto mb-0">Successful</h6>
                    <h7 class="font-roboto">SMS</h7>
                    <h4 class="mb-0 counter">{{ dashboard.successful_sms }}</h4>
                  </div>
                  <svg version="1.1" id="Trophy_x5F_cup" xmlns="http://www.w3.org/2000/svg"
                       x="0px"
                       class="fill-success"
                       y="0px"
                       width="100px" height="100px" viewBox="0 0 250 250" style="enable-background:new 0 0 250 250;"
                       xml:space="preserve">
                              <path d="M190.878,111.272c31.017-11.186,53.254-40.907,53.254-75.733l-0.19-8.509h-48.955V5H64.222v22.03H15.266l-0.19,8.509
                                c0,34.825,22.237,64.546,53.254,75.733c7.306,18.421,22.798,31.822,41.878,37.728v20c-0.859,15.668-14.112,29-30,29v18h-16v35H195
                                v-35h-16v-18c-15.888,0-29.141-13.332-30-29v-20C168.08,143.094,183.572,129.692,190.878,111.272z M195,44h30.563
                                c-0.06,0.427-0.103,1.017-0.171,1.441c-3.02,18.856-14.543,34.681-30.406,44.007C195.026,88.509,195,44,195,44z M33.816,45.441
                                c-0.068-0.424-0.111-1.014-0.171-1.441h30.563c0,0-0.026,44.509,0.013,45.448C48.359,80.122,36.837,64.297,33.816,45.441z
                                 M129.604,86.777l-20.255,13.52l6.599-23.442L96.831,61.77l24.334-0.967l8.44-22.844l8.44,22.844l24.334,0.967L143.26,76.856
                                l6.599,23.442L129.604,86.777z"/>
                          </svg>
                </div>
              </div>
            </px-card>
          </div>
          <div class="col-sm-6 col-xl-3 col-lg-6">
            <px-card class="static-top-widget-card">
              <div slot="with-padding">
                <div class="media static-top-widget">
                  <div class="media-body">
                    <h6 class="font-roboto mb-0">Failed</h6>
                    <h7 class="font-roboto">SMS</h7>
                    <h4 class="mb-0 counter">{{ dashboard.failed_sms }}</h4>
                  </div>
                  <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                       xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                       class="fill-danger"
                       width="100px" height="100px"
                       viewBox="0 0 340 340" style="enable-background:new 0 0 340 340;" xml:space="preserve">
                            <path style="fill-rule:evenodd;clip-rule:evenodd;" d="M331.783,266.645L215.865,28.675C207.316,11.131,189.51,0,170,0
                              s-37.316,11.131-45.865,28.675L8.217,266.645c-7.703,15.81-6.71,34.473,2.61,49.386C20.148,330.944,36.497,340,54.08,340h231.84
                              c17.583,0,33.933-9.056,43.252-23.969C338.493,301.118,339.486,282.455,331.783,266.645z M170,284.167
                              c-10.396,0-18.818-8.424-18.818-18.817c0-10.394,8.423-18.817,18.818-18.817c10.395,0,18.818,8.423,18.818,18.817
                              C188.818,275.743,180.395,284.167,170,284.167z M186.448,223.357c-0.515,8.598-7.912,15.271-16.45,15.323
                              c-8.532-0.054-15.942-6.723-16.445-15.323c-1.655-35.015-3.304-70.033-4.955-105.052c-0.18-13.54,12.115-21.198,21.399-21.138
                              c9.291-0.062,21.581,7.598,21.405,21.138C189.749,153.325,188.091,188.339,186.448,223.357z"/>
                          </svg>
                </div>
              </div>
            </px-card>
          </div>
          <div class="col-sm-6 col-xl-3 col-lg-6">
            <px-card class="static-top-widget-card">
              <div slot="with-padding">
                <div class="media static-top-widget">
                  <div class="media-body">
                    <h6 class="font-roboto mb-0">Total</h6>
                    <h7 class="font-roboto">SMS Cost</h7>
                    <h4 class="mb-0 counter"> ৳ {{ dashboard.total_sms_cost }}</h4>
                  </div>
                  <svg version="1.1" id="Capa_1" class="fill-primary" xmlns="http://www.w3.org/2000/svg"
                       xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                       width="100px" height="100px" viewBox="0 0 60 60" style="enable-background:new 0 0 60 60;"
                       xml:space="preserve">
                            <g>
                              <path
                                  d="M11,57.439C11,58.852,12.148,60,13.561,60h32.879C47.852,60,49,58.852,49,57.439V52H11V57.439z"/>
                              <path d="M29,25.189c-0.494,0.176-0.944,0.464-1.292,0.875c-0.256,0.303-0.374,0.694-0.331,1.104
                                c0.046,0.439,0.272,0.848,0.622,1.12L29,29.067V25.189z"/>
                              <path d="M32.623,35.053c-0.046-0.438-0.272-0.847-0.622-1.118L31,33.156v3.878c0.494-0.176,0.944-0.464,1.292-0.875
                                C32.548,35.855,32.666,35.463,32.623,35.053z"/>
                              <path d="M46.439,4H31v4.101c2.279,0.465,4,2.484,4,4.899c0,2.757-2.243,5-5,5s-5-2.243-5-5c0-2.414,1.721-4.434,4-4.899V4H13.561
                                C12.148,4,11,5.148,11,6.561V50h38V6.561C49,5.148,47.852,4,46.439,4z M26,33.223c0.552,0,1,0.447,1,1c0,1.302,0.839,2.402,2,2.816
                                V31.6l-2.229-1.734c-0.777-0.604-1.282-1.513-1.383-2.491c-0.1-0.956,0.183-1.881,0.794-2.603c0.733-0.867,1.728-1.446,2.818-1.668
                                V22c0-0.553,0.448-1,1-1s1,0.447,1,1v1.101c2.279,0.465,4,2.484,4,4.899c0,0.553-0.448,1-1,1s-1-0.447-1-1
                                c0-1.302-0.839-2.402-2-2.816v5.438l2.229,1.734c0.777,0.604,1.281,1.511,1.383,2.488c0.1,0.957-0.182,1.882-0.793,2.605
                                c-0.734,0.867-1.728,1.446-2.819,1.668V40c0,0.553-0.448,1-1,1s-1-0.447-1-1v-0.878c-2.279-0.465-4-2.484-4-4.899
                                C25,33.67,25.448,33.223,26,33.223z M38,48H22c-0.552,0-1-0.447-1-1s0.448-1,1-1h16c0.552,0,1,0.447,1,1S38.552,48,38,48z M38,45
                                H22c-0.552,0-1-0.447-1-1s0.448-1,1-1h16c0.552,0,1,0.447,1,1S38.552,45,38,45z"/>
                              <path d="M31,1c0-0.552-0.448-1-1-1s-1,0.448-1,1v3h2V1z"/>
                            </g>
                          </svg>
                </div>
              </div>
            </px-card>
          </div>
          <div class="col-sm-6 col-xl-3 col-lg-6">
            <px-card class="static-top-widget-card">
              <div slot="with-padding">
                <div class="media static-top-widget">
                  <div class="media-body">
                    <h6 class="font-roboto mb-0">Account</h6>
                    <h7 class="font-roboto">Balance</h7>
                    <h4 class="mb-0 counter">৳ {{ dashboard.account_balance }}</h4>
                  </div>
                  <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                       xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                       class="fill-secondary"
                       width="100px" height="100px"
                       viewBox="0 0 490.1 490.1" style="enable-background:new 0 0 490.1 490.1;" xml:space="preserve">
                  <g>
                    <g>
                      <g>
                        <path d="M310.75,0h-161.4v120.6h161.4V0z M272.25,92.2h-84.8c-5.4,0-10.1-4.3-10.1-10.1c0-5.4,4.3-10.1,10.1-10.1h84.8
                          c5.4,0,10.1,4.3,10.1,10.1C282.35,87.5,277.75,92.2,272.25,92.2z M272.25,45.5h-84.8c-5.4,0-10.1-4.3-10.1-10.1
                          s4.3-10.1,10.1-10.1h84.8c5.4,0,10.1,4.3,10.1,10.1S277.75,45.5,272.25,45.5z"/>
                        <path d="M330.65,140.4h-201.1V94.5h-14.4c-8.6,0-15.6,7-15.6,15.6v364.4c0,8.6,7,15.6,15.6,15.6h231.8V94.5h-16.3V140.4z
                           M179.75,430.9h-11.3c-5.4,0-10.1-4.3-10.1-10.1c0-5.4,4.3-10.1,10.1-10.1h11.3c5.4,0,10.1,4.3,10.1,10.1
                          C189.85,426.2,185.55,430.9,179.75,430.9z M179.75,379.9h-11.3c-5.4,0-10.1-4.3-10.1-10.1c0-5.4,4.3-10.1,10.1-10.1h11.3
                          c5.4,0,10.1,4.3,10.1,10.1C189.85,375.3,185.55,379.9,179.75,379.9z M179.75,329h-11.3c-5.4,0-10.1-4.3-10.1-10.1
                          s4.3-10.1,10.1-10.1h11.3c5.4,0,10.1,4.3,10.1,10.1S185.55,329,179.75,329z M235.35,430.9h-11.3c-5.4,0-10.1-4.3-10.1-10.1
                          c0-5.4,4.3-10.1,10.1-10.1h11.3c5.4,0,10.1,4.3,10.1,10.1C245.45,426.2,241.15,430.9,235.35,430.9z M235.35,379.9h-11.3
                          c-5.4,0-10.1-4.3-10.1-10.1c0-5.4,4.3-10.1,10.1-10.1h11.3c5.4,0,10.1,4.3,10.1,10.1C245.45,375.3,241.15,379.9,235.35,379.9z
                           M235.35,329h-11.3c-5.4,0-10.1-4.3-10.1-10.1s4.3-10.1,10.1-10.1h11.3c5.4,0,10.1,4.3,10.1,10.1S241.15,329,235.35,329z
                           M290.95,430.9h-10.9c-5.4,0-10.1-4.3-10.1-10.1c0-5.4,4.3-10.1,10.1-10.1h11.3c5.4,0,10.1,4.3,10.1,10.1
                          C301.05,426.2,296.75,430.9,290.95,430.9z M290.95,379.9h-10.9c-5.4,0-10.1-4.3-10.1-10.1c0-5.4,4.3-10.1,10.1-10.1h11.3
                          c5.4,0,10.1,4.3,10.1,10.1C301.05,375.3,296.75,379.9,290.95,379.9z M290.95,329h-10.9c-5.4,0-10.1-4.3-10.1-10.1
                          s4.3-10.1,10.1-10.1h11.3c5.4,0,10.1,4.3,10.1,10.1S296.75,329,290.95,329z M322.85,248.1h-185.9v-84.4h185.9V248.1z"/>
                        <path
                            d="M374.95,94.5h-8.2V490h8.2c8.6,0,15.6-7,15.6-15.6V110.1C390.45,101.5,383.45,94.5,374.95,94.5z"/>
                      </g>
                    </g>
                  </g>
                </svg>
                </div>
              </div>
            </px-card>
          </div>
        </div>
      </div>
              <div class="col-md-12">
                <px-card :title="getChartTitle()" :subtitle="getChartSubTitle()" >
                  <div class="bar-chart-widget">
                    <div class="bottom-content card-body">
                      <div class="row">
                        <div class="col-12">
                          <div id="chart-widget4" class="legend-apex">
                            <apexchart
                                height="350"
                                type="bar"
                                :options="chart4.options"
                                :series="chart4.series"
                            ></apexchart>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </px-card>
              </div>

    </div>
  </div>
</template>
<script>
import {mapState} from "vuex";

var primary = localStorage.getItem('primary_color') || '#FF0006';
var secondary = localStorage.getItem('secondary_color') || '#818284';


export default {
  data() {
    return {
      dashboard_data:null,

      chart4: {
        options: {
          chart: {
            width: 955,
            height: 350,
            type: 'bar',
            toolbar: {
              show: false,
            },
          },
          legend: {
            show: true,
          },
          colors: ['#a927f9', secondary, '#51bb25', primary],
          dataLabels: {
            enabled: false,
          },
          plotOptions: {
            bar: {
              endingShape: 'rounded',
              radius: 10,
              borderRadius: 8,
              horizontal: false,
              columnWidth: '40%',
            },
          },
          stroke: {
            show: true,
            colors: ['transparent'],
            curve: 'smooth',
            lineCap: 'butt',
          },
          xaxis: {
            categories: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec',
            ],
          },
          yaxis: {
            title: {
              text: 'SMS Count',
            },
          },
          fill: {
            colors: ['#a927f9', secondary, '#51bb25', primary],
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return val + ' SMS';
              },
            },
          },
          grid: {
            yaxis: {
              show: false
            },
            padding: {
              left: 0,
              right: 0,
            },
          },
        },
        series: [

        ],
      },

    };
  },
  computed: {
    ...mapState('dashboard', ["dashboard", "dashboardGraph","dashboardError", "dashboardLoading", "submitError", "submitSuccess", "submitLoading"]),


  },
  beforeCreate() {
    this.$store.dispatch('dashboard/fetchAccountSummary').then(result=>{
      this.dashboard_data=this.dashboard
    })
    this.$store.dispatch('dashboard/fetchAccountGraphData').then(result=>{
      this.chart4.series=this.dashboardGraph
    })

  },
  beforeMount() {

  },
  created() {

    // this.$store.dispatch('dashboard/fetchAccountSummary').then(result=>{
    //   this.dashboard_data=this.dashboard
    // })
    // this.$store.dispatch('dashboard/fetchAccountGraphData')


  },
  watch: {

    dashboard(newValue, oldValue) {

        this.dashboard_data=this.dashboard
    } ,
    dashboardGraph(newValue, oldValue) {

        this.chart4.series=this.dashboardGraph
    }
  },


  methods: {
    getChartTitle(){
      var date = new Date()
        return 'SMS Delivery Report for'+date.getFullYear()

    },
    getChartSubTitle(){
      var date = new Date()


        return '01-01-'+date.getFullYear()+' to '+ date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear()

    }
  },
};
</script>
