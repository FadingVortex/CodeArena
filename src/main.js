import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import * as ElIcons from "@element-plus/icons-vue"

import 'element-plus/theme-chalk/el-message-box.css';
import 'element-plus/theme-chalk/el-message.css';


import './mockjs'
import store from './store'
import router from "./router/index.js"


const app = createApp(App).use(store).use(router);
for(const name in ElIcons) {
    app.component(name, ElIcons[name]);
}
app.mount('#app')


