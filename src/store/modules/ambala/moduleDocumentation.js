import axios from '../../axiosHelper'
import {V1API} from "../../../_helpers/APIPath"
import {populateStore, performNetworkCall, buildFormData} from "../../asyncHelper";


const keyList = {
    documentsUpdate : 'DOCUMENT_UPDATE',
    documentsDelete : 'DOCUMENT_DELETE'
};

const mutations = {};
const store = {};

populateStore(store, mutations, keyList, false);

export default {
    namespaced: true,
    state : {
        documents:null,
        documentsLoading: false,
        documentsError: false,
        submitLoading: false,
        submitError: false,
        submitSuccess: false,


        ...store
    },
    mutations : {
        ...mutations,
        SET_DOCUMENT (state, documents) {
            state.documents= documents;
        },

        DOCUMENT_LOADING (state, loading) {
            state.documentsLoading = loading;
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


        async fetchDocuments ({ commit },payload) {
            commit('DOCUMENT_LOADING', true);
            commit('DOCUMENT_ERROR', false);
            try{

                let result = await axios.get(V1API.document_api_get+"?regenerate="+payload.status);
                let response=result.data

                commit('SET_DOCUMENT', response.data);

            }catch(error) {

                commit('DOCUMENT_ERROR', true);

            }
            commit('DOCUMENT_LOADING', false);
        },


    },
    getters: {}
}
