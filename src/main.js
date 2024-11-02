import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import * as ElIcons from "@element-plus/icons-vue"

import './mockjs'
import store from './store'
import router from "./router/index.js"


const app = createApp(App).use(store).use(router);
for(const name in ElIcons) {
    app.component(name, ElIcons[name]);
}
app.mount('#app')


