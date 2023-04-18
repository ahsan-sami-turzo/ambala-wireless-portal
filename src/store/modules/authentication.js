import {userService} from '../../_services';
import router from '../../router/index';
import axios from 'axios'
import axios2 from '../axiosHelper'
import {V1API} from "../../_helpers/APIPath"
import toastr from "../../pages/advance/toastr";

const user = JSON.parse(localStorage.getItem('user'));
const loginMessage = null
const isUserLoggedIn = false
const initialState = user
    ? {status: {loggedIn: true}, user, isUserLoggedIn, loginMessage}
    : {status: {}, user: null, isUserLoggedIn, loginMessage};

export const authentication = {


    namespaced: true,
    state: initialState,
    getters: {},
    actions: {
        async login({dispatch, commit}, {email, passwordjwt}) {
            commit('loginRequest', {email});
            let response = await userService.login(email, passwordjwt)
                .then(result => {


                    return result
                });
            commit('loginSuccess', user);
            dispatch('isUserLoggedIn')
            //console.log("hello")
            return response
        },
        logout({commit}) {
            userService.logout();
            commit('logout');
        },
        async isLoggedIn({commit, dispatch}, override) {
            try {

                let token = localStorage.getItem('access_token')
                let payload = {
                    'access_token': token
                }
                let result = await axios2.post(V1API.verifyLogin, payload)
                let response = result.data
                if (response.status_code === 401 || response.status_code === 400) {
                    throw response.errors
                }
            } catch (e) {

                try {

                    let refresh = {
                        refresh_token: localStorage.getItem('refresh_token'),
                    }


                    return await axios2.post(V1API.refreshAccessToken, refresh).then(result => {

                        let data = result.data
                        localStorage.setItem('user', JSON.stringify(data));
                        localStorage.setItem('access_token', data.access_token);
                        localStorage.setItem('refresh_token', data.refresh_token);
                        return data
                    })


                } catch (e) {
                    dispatch('logout')
                }


            }
        },
        isUserLoggedIn({commit, dispatch}, override) {

            let accessToken = localStorage.getItem('access_token')

            let status = (accessToken === 'undefined' || accessToken === null) ? false : true;
            4

            commit('loginStatus', status)
        },
        async changePassword({commit, dispatch}, payload) {
            try {

                let response = await axios.patch(V1API.reset_password, payload).then(result => {
                    return result.data
                })

                return response

            } catch (error) {
                return error


            }
        },
        async register({commit, dispatch}, payload) {
            try {
                let response = await axios.post(V1API.register, payload).then(result => {
                    return result.data
                })
                return response

            } catch (error) {
                return error


            }
        },


    },
    mutations: {
        loginStatus(state, status) {
            state.isUserLoggedIn = status
        },
        loginMessageSet(state, status) {
            state.loginMessage = status
        },
        loginRequest(state, user) {
            state.status = {loggingIn: true};
            state.user = user;
        },
        loginSuccess(state, user) {
            state.status = {loggedIn: true};
            state.user = user;
        },
        loginFailure(state) {
            state.status = {};
            state.user = null;
        },
        logout(state) {
            state.status = {};
            state.user = null;
        }
    }
};
