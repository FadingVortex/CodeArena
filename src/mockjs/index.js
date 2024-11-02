// import Mock from "../../node_modules/mockjs"
import Mock from "mockjs"
import * as Login from "./mockLogin.js"
import * as Think from "./mockThink.js"

Mock.setup({
    timeout:500
})

// get 用字符串就行
// post 必须要用正则表达式
// 以\ \括起的表达式，匹配一个单词
Mock.mock(/\/login/, "post", (options) => Login.postlogin(options));
Mock.mock(/\/login/, "get", (options) => {
    return Login.getLogin(options);
});
Mock.mock(/\/register/, "post", (options) => {
    return Login.register(options);
});
Mock.mock(/\/think\/options/, "get", (options) => Think.getOptions(options));
Mock.mock(/\/think\/query\/questions/, 'get', (options) => Think.getQueryQuestions(options));

Mock.mock(/\/think\/delete\/questions/, 'post', (options) => Think.deleteQuestions(options));

Mock.mock(/\/think\/query\/page\/questions/, 'post', (options) => Think.getQueryPageQuestions(options))


