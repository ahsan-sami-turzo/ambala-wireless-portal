import axios from '../../axiosHelper'
import {V1API} from "../../../_helpers/APIPath"
import {populateStore, performNetworkCall, buildFormData} from "../../asyncHelper";


const keyList = {
    dashboardUpdate : 'DASHBOARD_UPDATE',
    dashboardDelete : 'DASHBOARD_DELETE'
};

const mutations = {};
const store = {};

populateStore(store, mutations, keyList, false);

export default {
    namespaced: true,
    state : {
        dashboard:null,
        accountBalance:null,
        dashboardGraph:null,
        dashboardLoading: false,
        dashboardError: false,
        submitLoading: false,
        submitError: false,
        submitSuccess: false,


        ...store
    },
    mutations : {
        ...mutations,
        SET_ACCOUNT_BALANCE (state, account) {
            state.accountBalance= account;
        },
        SET_DASHBOARD_SUMMARY (state, dashboard) {
            state.dashboard= dashboard;
        },
        SET_DASHBOARD_GRAPH (state, dashboard) {
            state.dashboardGraph= dashboard;
        },

        DASHBOARD_LOADING (state, loading) {
            state.dashboardLoading = loading;
        },
        SUBMIT_LOADING (state, loading) {
            state.submitLoading = loading;
        },

        SUBMIT_ERROR (state, hasError) {
            state.submitError = hasError;
        },

        SUBMIT_SUCCESS (state, success) {
            state.submitSuccess = success;
        }
    },
    actions: {


        async fetchAccountSummary({ commit },payload) {
            commit('DASHBOARD_LOADING', true);
            commit('DASHBOARD_ERROR', false);
            try{
                //console.log("hello")

                let result = await axios.get(V1API.account_summary_get);
                let response=result.data
                commit('SET_DASHBOARD_SUMMARY', response.data);

            }catch(error) {

                commit('DASHBOARD_ERROR', true);

            }
            commit('DASHBOARD_LOADING', false);
        },
        async fetchAccountGraphData({ commit },payload) {
            commit('DASHBOARD_LOADING', true);
            commit('DASHBOARD_ERROR', false);
            try{
                // //console.log("hello")

                let result = await axios.get(V1API.account_graph_get);
                // //console.log(result.data)
                let response=result.data
                // //console.log(response.data)
                commit('SET_DASHBOARD_GRAPH',response.data.graph);

            }catch(error) {

                commit('DASHBOARD_ERROR', true);

            }
            commit('DASHBOARD_LOADING', false);
        },


    },
    getters: {}
}
