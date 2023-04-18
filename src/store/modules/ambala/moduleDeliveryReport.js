import axios from '../../axiosHelper'
import {V1API} from "../../../_helpers/APIPath"
import {populateStore, performNetworkCall, buildFormData} from "../../asyncHelper";


const keyList = {
    deliveryReportUpdate : 'DELIVERY_REPORT_UPDATE',
    deliveryReportDelete : 'DELIVERY_REPORT_DELETE'
};

const mutations = {};
const store = {};

populateStore(store, mutations, keyList, false);

export default {
    namespaced: true,
    state : {
        deliveryReports: [],
        deliveryReportCount: null,
        deliveryReportPageCount: null,
        deliveryReportPrev: null,
        deliveryReportLoading: false,
        deliveryReportError: false,
        submitLoading: false,
        submitError: false,
        submitSuccess: false,


        ...store
    },
    mutations : {
        ...mutations,
        SET_DELIVERY_REPORT (state, deliveryReports) {
            state.deliveryReports= deliveryReports;
        },
        SET_DELIVERY_REPORT_NEXT_PAGE (state, deliveryReports) {
            state.deliveryReports=state.deliveryReports.concat(deliveryReports);
        },
        SET_DELIVERY_REPORT_COUNT (state, deliveryReportCount) {
            state.deliveryReportCount= deliveryReportCount;
        },
        // SET_DELIVERY_REPORT_NEXT (state, deliveryReportNext) {
        //     state.deliveryReportNext= deliveryReportNext;
        // },
        SET_DELIVERY_REPORT_PAGE_COUNT(state, deliveryReportPrev) {
            state.deliveryReportPageCount= deliveryReportPrev;
        },

        DELIVERY_REPORT_LOADING (state, loading) {
            state.deliveryReportLoading = loading;
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


        async fetchDeliveryReport ({ commit },payload) {
            commit('DELIVERY_REPORT_LOADING', true);
            commit('DELIVERY_REPORT_ERROR', false);
            try{


                let result = await axios.get(V1API.delivery_report_get+"?count="+payload.count+"&from_date="+payload.from_date+"&to_date="+payload.to_date+'&status='+payload.status);
                let response=result.data
                //console.log(response)

                commit('SET_DELIVERY_REPORT', response.results);
                commit('SET_DELIVERY_REPORT_COUNT', response.count);

            }catch(error) {

                commit('DELIVERY_REPORT_ERROR', true);

            }
            commit('DELIVERY_REPORT_LOADING', false);
        },
         async fetchDeliveryReportByPage ({ commit },payload) {
                    commit('DELIVERY_REPORT_LOADING', true);
                    commit('DELIVERY_REPORT_ERROR', false);
                    try{


                        let result = await axios.get(V1API.delivery_report_get+"?count="+payload.count+"&from_date="+payload.from_date+"&page="+payload.page+"&to_date="+payload.to_date+'&status='+payload.status);
                        let response=result.data
                        //console.log(response)

                        commit('SET_DELIVERY_REPORT_NEXT_PAGE', response.results);
                        commit('SET_DELIVERY_REPORT_PAGE_COUNT', payload.page);
                        commit('SET_DELIVERY_REPORT_COUNT', response.count);

                    }catch(error) {

                        commit('DELIVERY_REPORT_ERROR', true);

                    }
                    commit('DELIVERY_REPORT_LOADING', false);
                },


    },
    getters: {}
}
