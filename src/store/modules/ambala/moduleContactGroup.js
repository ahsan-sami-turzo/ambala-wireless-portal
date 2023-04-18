import axios from '../../axiosHelper'
import {V1API} from "../../../_helpers/APIPath"
import {populateStore, performNetworkCall, buildFormData} from "../../asyncHelper";


const keyList = {
    contactGroupUpdate : 'CONTACT_GROUP_UPDATE',
    contactGroupDelete : 'CONTACT_GROUP_DELETE'
};

const mutations = {};
const store = {};

populateStore(store, mutations, keyList, false);

export default {
    namespaced: true,
    state : {
        contactGroups: [],
        contactGroupLoading: false,
        contactGroupError: false,
        submitLoading: false,
        submitError: false,
        submitSuccess: false,


        ...store
    },
    mutations : {
        ...mutations,
        SET_CONTACT_GROUP (state, sms) {
            state.contactGroups= sms;
        },

        CONTACT_GROUP_LOADING (state, loading) {
            state.contactGroupLoading = loading;
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
        async updateContactGroup({commit, state, dispatch}, payload) {
            let response = '';
            await performNetworkCall(
                commit,
                keyList.contactGroupUpdate,
                async () => {
                    let payloadData={
                        name: payload.name
                    }
                    let magic=encode(payloadData)
                    response = await axios.post(V1API.contactGroup_edit+"/"+payload.id,magic.encodedPayload,magic.config).then(result => {
                        let data=decode(result.data)
                        return data.message
                    })

                    dispatch('fetchContactGroup');

                }
            )
            return response
        },



        async deleteContactGroup({commit, state, dispatch}, payload) {
            let response='';
            await performNetworkCall(
                commit,
                keyList.contactGroupDelete,
                async () => {

                    response = await axios.delete(V1API.contactGroup_delete+'/'+payload).then(result=>{
                        let data=result.data

                        return data

                    });
                    dispatch('fetchContactGroup');
                }
            )

            return response
        },

        async fetchContactGroup ({ commit },payload) {
            commit('CONTACT_GROUP_LOADING', true);
            commit('CONTACT_GROUP_ERROR', false);
            try{

                let result = await axios.get(V1API.contactGroup_get);
                let response=result.data
                commit('SET_CONTACT_GROUP', response.data);

            }catch(error) {

                commit('CONTACT_GROUP_ERROR', true);

            }
            commit('CONTACT_GROUP_LOADING', false);
        },

        async addContactGroup({commit,dispatch}, payload) {
            commit('SUBMIT_LOADING', true);
            commit('SUBMIT_ERROR', false);
            try{
                //console.log('hello')
                let response = await axios.post(V1API.contactGroup_add,payload).then(result=>{
                    //console.log(result.data)

                    return result.data

                });

                commit('SUBMIT_SUCCESS', true);
                dispatch ('fetchContactGroup')
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
