
require('./bootstrap');
window.Vue = require('vue');
import VueRouter from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { routes } from './routes';
import App from "./Layouts/App";
import swal from 'sweetalert2';
window.swal = swal;

Vue.use(VueRouter);
Vue.use(VueAxios,axios);
Vue.axios.defaults.baseURL= 'http://vimet.oo/api';

Vue.prototype.$goTo = function(to){
    router.push(to);
};

const router = new VueRouter({
    mode:'history',
    routes
});

Vue.router = router;
Vue.use(require('@websanova/vue-auth'),{
    auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
    http: require('@websanova/vue-auth/drivers/http/axios.1.x'),
    router: require('@websanova/vue-auth/drivers/router/vue-router.2.x')
});

App.router = Vue.router;
new Vue(App).$mount('#app');
