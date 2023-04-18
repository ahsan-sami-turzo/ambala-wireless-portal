// import config from 'config';

/* eslint-disable */
import { authHeader } from '../_helpers';
import axios from 'axios'
import {V1API} from "../_helpers/APIPath"


export const userService = {
    login,
    logout,
    // getAll
};

 async function login(email, password) {

     let data = {
         "email": email,
         "password": password
     };

     let response = await axios.post(V1API.getAccessToken, data)
         .then(user=> {
             if(user.data.code==401){
                 throw user.data
             }


             if (user.data.access_token) {
                 // store user details and jwt token in local storage to keep user logged in between page refreshes
                 localStorage.setItem('user', JSON.stringify(user.data));
                 localStorage.setItem('access_token', user.data.access_token);
                 localStorage.setItem('refresh_token', user.data.refresh_token);
             }
             return user
         })
         .catch(function (error) {
           return error
         });

    return response
}

function logout() {

    // remove user from local storage to log user out
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
}
//
// function getAll() {
//     const requestOptions = {
//         method: 'GET',
//         headers: authHeader()
//     };
//
//     return fetch(`http://localhost:8080/users`, requestOptions).then(handleResponse);
// }

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
