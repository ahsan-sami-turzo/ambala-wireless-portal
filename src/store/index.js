import Vue from 'vue';
import Vuex from 'vuex';
// import 'es6-promise/auto';
import layout from './modules/layout';
import menu from './modules/menu';
import chat from './modules/chat';
import products from './modules/products';
import email from './modules/email';
import todo from './modules/todo';
import firebase_todo from './modules/firebase_todo';
import jobs from './modules/jobs';
import courses from './modules/courses';
import common from './modules/common';
import {alert} from './modules/alert';
import {authentication} from './modules/authentication';
import {users} from './modules/users';
import smsTemplate from './modules/ambala/moduleSmsTemplate';
import price from './modules/ambala/modulePrice';
import contactGroup from './modules/ambala/moduleContactGroup';
import contact from './modules/ambala/moduleContactManage';
import deliveryReport from './modules/ambala/moduleDeliveryReport';
import rechargeHistory from './modules/ambala/moduleRechargeHistory';
import documentation from './modules/ambala/moduleDocumentation';
import smsManage from './modules/ambala/moduleSmsManagement';
import dashboard from './modules/ambala/moduleDashboard';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {},
    mutations: {
        changeLang(state, payload) {
            localStorage.setItem('currentLanguage', payload.id);
            localStorage.setItem('currentLanguageIcon', payload.icon);
            window.location.reload();
        }
    },
    actions: {
        setLang({commit}, payload) {
            commit('changeLang', payload);
        }
    },
    modules: {
        alert,
        authentication,
        users,
        rechargeHistory,
        layout,
        chat,
        menu,
        products,
        email,
        todo,
        smsTemplate,
        smsManage,
        dashboard,
        price,
        documentation,
        contactGroup,
        contact,
        deliveryReport,
        firebase_todo,
        jobs,
        courses,
        common
    }
});

