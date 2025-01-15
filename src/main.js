import { createApp } from 'vue'
import App from './App.vue'
// import ElementPlus from 'element-plus'
import * as ElIcons from "@element-plus/icons-vue"
import './mockjs'
import store from './store'
import router from "./router/index.js"
import EditorPlugin from './plugins/editor.js'

import './assets/theme/global.css'
// import './assets/theme/Fresh-Mint.css';
// import './assets/theme/Calm-Blue.css'
// import './assets/theme/Warm-Apricot.css'
// import './assets/theme/Warm-Earth.css'
// import './assets/theme/Elegant-Lavender.css'

const app = createApp(App).use(store).use(router).use(EditorPlugin);

// 注册 Element Plus 图标
for (const name in ElIcons) {
    app.component(name, ElIcons[name]);
}

// 动态加载主题 CSS 文件
function loadTheme(themeName) {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `/src/assets/theme/${themeName}.css`;
    link.id = 'theme-style'; // 给 link 标签添加 ID，方便后续移除
    link.onload = () => resolve(); // 文件加载完成后 resolve
    console.log("loadTheme success")
    link.onerror = () => reject(new Error(`Failed to load theme: ${themeName}`)); // 文件加载失败时 reject
    document.head.appendChild(link);
  });
}


// 暴露主题切换方法到全局
app.config.globalProperties.$switchTheme = async (themeName) => {
  const oldLink = document.getElementById('theme-style');
  const newLink = document.createElement('link');
  newLink.rel = 'stylesheet';
  newLink.href = `/src/assets/theme/${themeName}.css`;
  newLink.id = 'theme-style';

  newLink.onload = () => {
    if (oldLink) oldLink.remove(); // 新主题加载完成后移除旧的
    console.log(`Theme switched to: ${themeName}`);
  };

  newLink.onerror = () => {
    console.error(`Failed to load theme: ${themeName}`);
  };

  document.head.appendChild(newLink);
};


// 默认加载 Elegant-Lavender 主题
const defaultTheme = 'Elegant-Lavender';
app.config.globalProperties.$switchTheme(defaultTheme)
  .catch((error) => console.error(`Failed to load default theme: ${error.message}`));

window.app = app;

app.mount('#app');