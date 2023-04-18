// axios
import axios from 'axios'

const baseURL = '';

const http = axios.create({baseURL});

// load the auth token from localstorage
let token = localStorage.getItem('access_token');
//console.log(token)
if(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default axios.create({

  baseURL
  // You can add your headers here
})
