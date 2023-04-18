import axios from '../../axiosHelper'
import {V1API} from "../../../_helpers/APIPath"
import {populateStore, performNetworkCall, buildFormData} from "../../asyncHelper";


const keyList = {
    contactUpdate : 'CONTACT_GROUP_UPDATE',
    contactDelete : 'CONTACT_GROUP_DELETE'
};

const mutations = {};
const store = {};

populateStore(store, mutations, keyList, false);

export default {
    namespaced: true,
    state : {
        contacts: [],
        contactLoading: false,
        contactError: false,
        submitLoading: false,
        submitError: false,
        submitSuccess: false,


        ...store
    },
    mutations : {
        ...mutations,
        SET_CONTACT_GROUP (state, sms) {
            state.contacts= sms;
        },

        CONTACT_GROUP_LOADING (state, loading) {
            state.contactLoading = loading;
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
        async updateContact({commit, state, dispatch}, payload) {
            let response = '';
            await performNetworkCall(
                commit,
                keyList.contactUpdate,
                async () => {
                    let payloadData={
                        name: payload.name
                    }
                    let magic=encode(payloadData)
                    response = await axios.post(V1API.contact_edit+"/"+payload.id,magic.encodedPayload,magic.config).then(result => {
                        let data=decode(result.data)
                        return data.message
                    })

                    dispatch('fetchContact');

                }
            )
            return response
        },



        async deleteContact({commit, state, dispatch}, payload) {
            let response='';
            await performNetworkCall(
                commit,
                keyList.contactDelete,
                async () => {

                    response = await axios.delete(V1API.contact_delete+'/'+payload).then(result=>{
                        let data=result.data

                        return data

                    });
                    dispatch('fetchContact');
                }
            )

            return response
        },

        async fetchContact ({ commit },payload) {
            commit('CONTACT_GROUP_LOADING', true);
            commit('CONTACT_GROUP_ERROR', false);
            try{

                let result = await axios.get(V1API.contact_get);
                let response=result.data
                commit('SET_CONTACT_GROUP', response.data);

            }catch(error) {

                commit('CONTACT_GROUP_ERROR', true);

            }
            commit('CONTACT_GROUP_LOADING', false);
        },

        async addContact({commit,dispatch}, payload) {
            commit('SUBMIT_LOADING', true);
            commit('SUBMIT_ERROR', false);
            try{
                //console.log('hello')
                let response = await axios.post(V1API.contact_add,payload).then(result=>{
                    //console.log(result.data)

                    return result.data

                });

                commit('SUBMIT_SUCCESS', true);
                dispatch ('fetchContact')
                return response
            }catch (e) {
                commit('SUBMIT_ERROR', true);
            }finally {
                commit('SUBMIT_LOADING', false);
            }
        },
        async uploadContact({commit,dispatch}, payload) {
            commit('SUBMIT_LOADING', true);
            commit('SUBMIT_ERROR', false);
            try{
                let data = new FormData();

                let payloadData=buildFormData(data,payload);
                let headerConfig=  {
                    "Content-Type": "multipart/form-data"
                }
                let response = await axios.post(V1API.contact_upload,payloadData,headerConfig).then(result=>{
                    //console.log(result.data)
                    return result.data

                });

                commit('SUBMIT_SUCCESS', true);
                dispatch ('fetchContact')
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
