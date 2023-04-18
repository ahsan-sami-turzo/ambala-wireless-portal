import axios from '../../axiosHelper'
import {V1API} from "../../../_helpers/APIPath"
import {populateStore, performNetworkCall, buildFormData} from "../../asyncHelper";


const keyList = {
    smsTemplateUpdate : 'SMS_TEMPLATE_UPDATE',
    smsTemplateDelete : 'SMS_TEMPLATE_DELETE'
};

const mutations = {};
const store = {};

populateStore(store, mutations, keyList, false);

export default {
    namespaced: true,
    state : {
        smsTemplates: [],
        smsTemplateLoading: false,
        smsTemplateError: false,
        submitLoading: false,
        submitError: false,
        submitSuccess: false,


        ...store
    },
    mutations : {
        ...mutations,
        SET_SMS_TEMPLATE (state, sms) {
            state.smsTemplates= sms;
        },

        SMS_TEMPLATE_LOADING (state, loading) {
            state.smsTemplateLoading = loading;
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
        async updateSmsTemplate({commit, state, dispatch}, payload) {
            let response = '';
            await performNetworkCall(
                commit,
                keyList.smsTemplateUpdate,
                async () => {
                    let payloadData={
                        name: payload.name
                    }
                    let magic=encode(payloadData)
                    response = await axios.post(V1API.smsTemplate_edit+"/"+payload.id,magic.encodedPayload,magic.config).then(result => {
                        let data=decode(result.data)
                        return data.message
                    })

                    dispatch('fetchSmsTemplate');

                }
            )
            return response
        },



        async deleteSmsTemplate({commit, state, dispatch}, payload) {
            let response='';
            await performNetworkCall(
                commit,
                keyList.smsTemplateDelete,
                async () => {

                    response = await axios.delete(V1API.smsTemplate_delete+'/'+payload).then(result=>{
                        let data=result.data

                        return data

                    });
                    dispatch('fetchSmsTemplate');
                }
            )

            return response
        },

        async fetchSmsTemplate ({ commit },payload) {
            commit('SMS_TEMPLATE_LOADING', true);
            commit('SMS_TEMPLATE_ERROR', false);
            try{

                let result = await axios.get(V1API.smsTemplate_get);
                let response=result.data
                commit('SET_SMS_TEMPLATE', response.data);

            }catch(error) {

                commit('SMS_TEMPLATE_ERROR', true);

            }
            commit('SMS_TEMPLATE_LOADING', false);
        },
        async addSmsTemplate({commit,dispatch}, payload) {
            commit('SUBMIT_LOADING', true);
            commit('SUBMIT_ERROR', false);
            try{
                //console.log('hello')
                let response = await axios.post(V1API.smsTemplate_add,payload).then(result=>{
                    //console.log(result.data)

                    return result.data

                });

                commit('SUBMIT_SUCCESS', true);
                dispatch ('fetchSmsTemplate')
                return response
            }catch (e) {
                commit('SUBMIT_ERROR', true);
            }finally {
                commit('SUBMIT_LOADING', false);
            }
        },

    },
    getters: {}
}
