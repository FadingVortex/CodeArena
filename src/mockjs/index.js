import Mock from "mockjs"
import * as Login from "./mockLogin.js"
import * as Think from "./mockThink.js"

Mock.setup({
    timeout:500
})

// get 用字符串就行
// post 必须要用正则表达式
// 以\ \括起的表达式，匹配一个单词

/**
 * Login-Register View 请求拦截
 */
// Mock.mock(/\/login/, "post", (options) => Login.postlogin(options));    // 验证账号密码
Mock.mock(/\/register/, "post", (options) => {
    return Login.register(options);
});
// Mock.mock(/\/think\/options/, "get", (options) => Think.getOptions(options));   // HomeThink.vue 初始化数据


// Mock.mock(/\/think\/query\/questions/, 'get', (options) => Think.getQueryQuestions(options));

// Mock.mock(/\/think\/delete\/questions/, 'post', (options) => Think.deleteQuestions(options));

// Mock.mock(/\/think\/query\/page\/questions/, 'post', (options) => Think.getQueryPageQuestions(options));

// Mock.mock(/\/think\/jobs\/query/, 'post', (opt) => Think.JobQueryPage(opt));

// Mock.mock(/\/thinkhome\/jobs\/delete/, "post", (opt) =>  Think.JobDeleteItem(opt));