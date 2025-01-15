// src/plugins/editor.js
import $ from 'jquery';

// Editor 配置对象
export const EditorConfig = {
  BASE_PATH: '/editor.md-master',
  DEPENDENCIES: {
    marked: '/editor.md-master/lib/marked.min.js',
    prettify: '/editor.md-master/lib/prettify.min.js',
    editormd: '/editor.md-master/editormd.min.js',
    css: '/editor.md-master/css/editormd.min.css'
  },
  DEFAULT_OPTIONS: {
    width: "100%",
    height: "400px",
    saveHTMLToTextarea: true,
    emoji: true,
    taskList: true,
    tex: true,
    tocm: true,
    imageUpload: true,
    imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
    imageUploadURL: "/api/upload/image",
    theme: "gray",
    editorTheme: "material",
    previewTheme: "default"
  }
};

// 加载脚本的工具函数
function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// 加载样式的工具函数
function loadStyle(href) {
  if (document.querySelector(`link[href="${href}"]`)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
}

// Editor 初始化函数
async function initEditor(editorId, customOptions = {}) {
  loadStyle(EditorConfig.DEPENDENCIES.css);
  
  try {
    await Promise.all([
      loadScript(EditorConfig.DEPENDENCIES.marked),
      loadScript(EditorConfig.DEPENDENCIES.prettify),
      loadScript(EditorConfig.DEPENDENCIES.editormd)
    ]);

    const options = {
      ...EditorConfig.DEFAULT_OPTIONS,
      path: `${EditorConfig.BASE_PATH}/lib/`,
      ...customOptions
    };

    return window.editormd(editorId, options);
  } catch (error) {
    console.error('Failed to initialize editor:', error);
    throw error;
  }
}

// Vue 插件
const EditorPlugin = {
  install(app) {
    // 注入 jQuery
    window.jQuery = $;
    window.$ = $;
    
    // 提供全局属性
    app.config.globalProperties.$initEditor = initEditor;
    
    // 提供全局配置访问
    app.config.globalProperties.$editorConfig = EditorConfig;
  }
};

export default EditorPlugin;