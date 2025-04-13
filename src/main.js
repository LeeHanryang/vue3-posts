import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.js';
import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import globalDirectives from './plugins/global-directives';
import dayjs from './plugins/day.js';
import { createPinia } from 'pinia';

const app = createApp(App);
app.use(router);
app.use(globalDirectives);
app.use(dayjs);
app.use(createPinia());
app.mount('#app');
