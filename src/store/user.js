export default {
    namespaced: true,
    // 这些数据在网页刷新后就清空
    // 网页加载后重新实例化 App ，故生成新的实例对象
    state:{
        token:'',
        userInfor:{
            username:''
        }
    },
    getters: {
        getToken(state) {
            return state.token;
        },
        getUserName(state) {
            return state.userInfor.username;
        },
        isLogin(state) {
            return !! state.token || !! localStorage.getItem('myvue_login_token');
        },
    },
    mutations: {
        setToken(state, token){
            localStorage.setItem('myvue_login_token', token);
            state.token = token;
            console.log("setToken:" + state.token);
        },
        setUserName(state, username) {
            state.userInfor.username = username;
        },
        clearToken(state){
            localStorage.removeItem('myvue_login_token');
            state.token = '';
        }
    },

    actions: {},
    modules: {}
}