import axios from '../../axiosHelper'
import {V1API} from "../../../_helpers/APIPath"
import {populateStore, performNetworkCall, buildFormData} from "../../asyncHelper";


const keyList = {
    rechargeHistoryUpdate : 'RECHARGE_HISTORY_UPDATE',
    rechargeHistoryDelete : 'RECHARGE_HISTORY_DELETE'
};

const mutations = {};
const store = {};

populateStore(store, mutations, keyList, false);

export default {
    namespaced: true,
    state : {
        rechargeHistory: [],
        rechargeHistoryCount: null,
        rechargeHistoryPageCount: null,
        rechargeHistoryPrev: null,
        rechargeHistoryLoading: false,
        rechargeHistoryError: false,
        submitLoading: false,
        submitError: false,
        submitSuccess: false,


        ...store
    },
    mutations : {
        ...mutations,
        SET_RECHARGE_HISTORY (state, rechargeHistorys) {
            state.rechargeHistory= rechargeHistorys;
        },
        SET_RECHARGE_HISTORY_NEXT_PAGE (state, rechargeHistorys) {
            state.rechargeHistory=state.rechargeHistory.concat(rechargeHistorys);
        },
        SET_RECHARGE_HISTORY_COUNT (state, rechargeHistoryCount) {
            state.rechargeHistoryCount= rechargeHistoryCount;
        },
        // SET_RECHARGE_HISTORY_NEXT (state, rechargeHistoryNext) {
        //     state.rechargeHistoryNext= rechargeHistoryNext;
        // },
        SET_RECHARGE_HISTORY_PAGE_COUNT(state, rechargeHistoryPrev) {
            state.rechargeHistoryPageCount= rechargeHistoryPrev;
        },

        RECHARGE_HISTORY_LOADING (state, loading) {
            state.rechargeHistoryLoading = loading;
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


        async fetchRechargeHistory ({ commit },payload) {
            commit('RECHARGE_HISTORY_LOADING', true);
            commit('RECHARGE_HISTORY_ERROR', false);
            try{


                let result = await axios.get(V1API.recharge_history_get+"?count="+payload.count+"&from_date="+payload.from_date+"&to_date="+payload.to_date);
                let response=result.data
                //console.log(response)

                commit('SET_RECHARGE_HISTORY', response.results);
                commit('SET_RECHARGE_HISTORY_COUNT', response.count);

            }catch(error) {

                commit('RECHARGE_HISTORY_ERROR', true);

            }
            commit('RECHARGE_HISTORY_LOADING', false);
        },
        async fetchRechargeHistoryByPage ({ commit },payload) {
            commit('RECHARGE_HISTORY_LOADING', true);
            commit('RECHARGE_HISTORY_ERROR', false);
            try{


                let result = await axios.get(V1API.recharge_history_get+"?count="+payload.count+"&from_date="+payload.from_date+"&page="+payload.page+"&to_date="+payload.to_date);
                let response=result.data
                //console.log(response)

                commit('SET_RECHARGE_HISTORY_NEXT_PAGE', response.results);
                commit('SET_RECHARGE_HISTORY_PAGE_COUNT', payload.page);
                commit('SET_RECHARGE_HISTORY_COUNT', response.count);

            }catch(error) {

                commit('RECHARGE_HISTORY_ERROR', true);

            }
            commit('RECHARGE_HISTORY_LOADING', false);
        },


    },
    getters: {}
}
