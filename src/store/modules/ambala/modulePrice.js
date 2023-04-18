import axios from '../../axiosHelper'
import {V1API} from "../../../_helpers/APIPath"
import {populateStore, performNetworkCall, buildFormData} from "../../asyncHelper";


const keyList = {
    priceUpdate : 'PRICE_UPDATE',
    priceDelete : 'PRICE_DELETE'
};

const mutations = {};
const store = {};

populateStore(store, mutations, keyList, false);

export default {
    namespaced: true,
    state : {
        prices: [],
        priceLoading: false,
        priceError: false,
        submitLoading: false,
        submitError: false,
        submitSuccess: false,


        ...store
    },
    mutations : {
        ...mutations,
        SET_PRICE (state, prices) {
            state.prices= prices;
        },

        PRICE_LOADING (state, loading) {
            state.priceLoading = loading;
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


        async fetchPrice ({ commit },payload) {
            commit('PRICE_LOADING', true);
            commit('PRICE_ERROR', false);
            try{

                let result = await axios.get(V1API.price_get);
                let response=result.data

                commit('SET_PRICE', response.data);

            }catch(error) {

                commit('PRICE_ERROR', true);

            }
            commit('PRICE_LOADING', false);
        },


    },
    getters: {}
}
