/*
 =========================================================
 * Vue Black Dashboard - v1.1.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/black-dashboard
 * Copyright 2018 Creative Tim (http://www.creative-tim.com)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */
import Vue from "vue";
import './plugins/bootstrap-vue';
import './plugins/font-awesome';
import './plugins/clipboard';
import Vuex from "vuex";
import VueRouter from "vue-router";
import RouterPrefetch from 'vue-router-prefetch';
import App from "./App";
import router from "./router/index";

import BlackDashboard from "./plugins/blackDashboard";
import i18n from "./i18n";
import './registerServiceWorker';
import VegaWallet from "@/services/VegaWallet";
import VegaGovernanceMock from "@/services/mock/VegaGovernanceMock";
import VegaGovernance from "@/services/VegaGovernance";

Vue.use(BlackDashboard);
Vue.use(VueRouter);
Vue.use(RouterPrefetch);
Vue.use(Vuex);

const mock = true;
const settings = buildSettings();
let services;
if (mock) {
    services = buildMockServices(settings);
} else {
    services = buildServices(settings);
}
// create store
const store = new Vuex.Store({
    state: {
        settings: settings,
        services: services,
    },
    mutations: {}
});

/* eslint-disable no-new */
new Vue({
    router,
    i18n,
    render: h => h(App),
    store,
}).$mount("#app");

router.push({path: '/'});

function buildSettings() {
    if (localStorage.getItem('settings')) {
        return settingsFromLocalStorage();
    }
    return defaultSettings();
}

function settingsFromLocalStorage() {
    console.log('retrieving settings from local storage');
    try {
        return JSON.parse(localStorage.getItem('settings'));
    } catch (e) {
        console.error(e);
        localStorage.removeItem('settings');
        return defaultSettings();
    }
}

function defaultSettings() {
    console.log('loading default application settings');
    return {
        vega: {
            wallet: {
                endpoint: 'http://127.0.0.1:1789',
            },
            governance: {
                endpoint: 'https://lb.testnet.vega.xyz/query',
            }
        }
    };
}

function buildMockServices(settings) {
    return {
        vegaWallet: new VegaWallet(settings.vega.wallet.endpoint),
        vegaGovernance: new VegaGovernanceMock(),
    };
}

function buildServices(settings) {
    return {
        vegaWallet: new VegaWallet(settings.vega.wallet.endpoint),
        vegaGovernance: new VegaGovernance(settings.vega.governance.endpoint),
    };
}
