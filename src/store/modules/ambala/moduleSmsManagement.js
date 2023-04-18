import axios from '../../axiosHelper'
import {V1API} from "../../../_helpers/APIPath"
import {populateStore, performNetworkCall, buildFormData} from "../../asyncHelper";


const keyList = {
    smsUpdate: 'SMS_TEMPLATE_UPDATE',
    smsDelete: 'SMS_TEMPLATE_DELETE'
};

const mutations = {};
const store = {};

populateStore(store, mutations, keyList, false);

export default {
    namespaced: true,
    state: {
        sms: [],
        sender_id: [],
        smsLoading: false,
        smsError: false,
        submitLoading: false,
        submitError: false,
        submitSuccess: false,


        ...store
    },
    mutations: {
        ...mutations,
        SET_SMS_TEMPLATE(state, sms) {
            state.sms = sms;
        },
        SET_SMS_SENDER(state, sender) {
            state.sender_id = sender;
        },

        SMS_TEMPLATE_LOADING(state, loading) {
            state.smsLoading = loading;
        },
        SUBMIT_LOADING(state, loading) {
            state.submitLoading = loading;
        },

        SUBMIT_ERROR(state, hasError) {
            state.submitError = hasError;
        },

        SUBMIT_SUCCESS(state, success) {
            state.submitSuccess = success;
        }
    },
    actions: {

        async fetchSmsSender({commit}, payload) {
            commit('SMS_TEMPLATE_LOADING', true);
            commit('SMS_TEMPLATE_ERROR', false);
            try {

                let result = await axios.get(V1API.sender_id_get);
                let response = result.data
                commit('SET_SMS_SENDER', response.data);

            } catch (error) {

                commit('SMS_TEMPLATE_ERROR', true);

            }
            commit('SMS_TEMPLATE_LOADING', false);
        },
        async fetchSmsTemplate({commit}, payload) {
            commit('SMS_TEMPLATE_LOADING', true);
            commit('SMS_TEMPLATE_ERROR', false);
            try {

                let result = await axios.get(V1API.sms_get);
                let response = result.data
                commit('SET_SMS_TEMPLATE', response.data);

            } catch (error) {

                commit('SMS_TEMPLATE_ERROR', true);

            }
            commit('SMS_TEMPLATE_LOADING', false);
        },
        async addSmsSend({commit, dispatch}, payload) {
            commit('SUBMIT_LOADING', true);
            commit('SUBMIT_ERROR', false);
            try {
                let response = await axios.post(V1API.send_sms, payload).then(result => {
                    //console.log(result.data)

                    return result.data

                });

                commit('SUBMIT_SUCCESS', true);
                return response
            } catch (e) {
                commit('SUBMIT_ERROR', true);
            } finally {
                commit('SUBMIT_LOADING', false);
            }
        },
        async addScheduleSmsSend({commit, dispatch}, payload) {
            commit('SUBMIT_LOADING', true);
            commit('SUBMIT_ERROR', false);
            try {
                let response = await axios.post(V1API.send_schedule_sms, payload).then(result => {
                    //console.log(result.data)

                    return result.data

                });

                commit('SUBMIT_SUCCESS', true);
                return response
            } catch (e) {
                commit('SUBMIT_ERROR', true);
            } finally {
                commit('SUBMIT_LOADING', false);
            }
        },
        async addFileSmsSend({commit, dispatch}, payload) {
            commit('SUBMIT_LOADING', true);
            commit('SUBMIT_ERROR', false);
            try {
                let data = new FormData();

                let payloadData = buildFormData(data, payload);
                let headerConfig = {
                    "Content-Type": "multipart/form-data"
                }
                let response = await axios.post(V1API.send_sms_by_file, payloadData, headerConfig).then(result => {
                    //console.log(result.data)
                    return result.data

                });

                commit('SUBMIT_SUCCESS', true);
                return response
            } catch (e) {
                commit('SUBMIT_ERROR', true);
            } finally {
                commit('SUBMIT_LOADING', false);
            }
        },
        async addGroupSmsSend({commit, dispatch}, payload) {
            commit('SUBMIT_LOADING', true);
            commit('SUBMIT_ERROR', false);
            try {
                let response = await axios.post(V1API.send_group_sms, payload).then(result => {
                    //console.log(result.data)

                    return result.data

                });

                commit('SUBMIT_SUCCESS', true);
                return response
            } catch (e) {
                commit('SUBMIT_ERROR', true);
            } finally {
                commit('SUBMIT_LOADING', false);
            }
        },

    },
    getters: {}
}
