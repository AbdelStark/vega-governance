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
import settings from "@/settings";
import services from "@/service-factory";
import {
    check as checkNotifications,
    registerServiceWorker as registerNotificationsServiceWorker,
    requestNotificationPermission
} from "@/services/notification/notifications";

Vue.use(BlackDashboard);
Vue.use(VueRouter);
Vue.use(RouterPrefetch);
Vue.use(Vuex);

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

checkNotifications();
registerNotificationsServiceWorker(settings).then(registration => services.notification = registration);
requestNotificationPermission().then(console.log);

