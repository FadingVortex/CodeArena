<script setup>
    //import { ElInput, ElButton, ElForm, ElFormItem } from 'element-plus';
    import {ref} from 'vue'
    import axios from 'axios'
    // import store from '../store/index.js'
    import { useStore } from 'vuex'
    import { useRouter } from 'vue-router'

    const store = useStore();
    const router = useRouter();

    const userinfo = ref({
        username: 'John',
        password: '123'
    });

    const msg = ref('');

    // import instance from "@/axios/instance.js"
    // 自己配置了baseconfig，就可以按照某种格式传递数据
    // 设置了拦截器，进行某种变换
    // instance({
    //     method: 'post',
    //     url: '/login',
    //     data
    // });
    // 通过axios可以设置，不具有通用性
    // axios({
    //     method: 'post',
    //     url: 'login',
    //     data
    // });

    import { login } from "@/axios/rootRequest.js"
    const handleLogin = () => {
        let params = {
            username: userinfo.value.username,
            password: userinfo.value.password
        }
        // axios.post(url, data, config);
        // data 是作为请求体
        // config 内部包含params变量,通常会自动加入到url中        
        // let {username} = usr
        // 将usr中的username变量提取出来

        // axios.post ("/login", params)
        login(params)
        .then((res) => {
            // 在拦截响应器处已经去掉一层，故不再需要
            // let {data} = res;
            // let {data} = res.data
            if(res.code === 200){
                // 用户名和密码正确，跳转到系统首页
                store.commit('User/setToken', res.data.token);
                store.commit('User/setUserName', res.data.username);
                // 跳转到系统首页
                msg.value = '登录成功跳转到系统首页';
                // router.push({name:'HomeFrame'});
                router.push('/');
            } else {
                // 提示用户名或密码错误，清空输入框
                msg.value = '用户名或密码输入错误，请重新输入';
            }
        }).catch((err) => {
            console.log("axios.catch===>");
            console.log(err);
        });
        // 与后台通信
        // 得到结果
        // 分析结果
        // 正确调转到首页
        // 不正确，提示信息，清空输出
        for(const i in userinfo.value) {
            userinfo.value[i]='';
        }
    }    
    const clearWarn = () => {
        msg.value = '';
    }

</script>

<template>
    <div class="login-box">
        <div class="login-avatar">
             <img src="@/assets/login.png">
        </div>
        <el-form class="login-form" :model="userinfo">
            <el-form-item>
                <el-input placeholder="请输入账号" v-model="userinfo.username" @focus="clearWarn"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input placeholder="请输入密码" type="password" show-password v-model=
                "userinfo.password"></el-input>
            </el-form-item>
            <el-form-item>
                <div class="mb-4 button">
                    <el-button type="primary" @click="handleLogin">登录</el-button>
                    <el-button type="info" @click="clearWarn">重置</el-button>
                    <el-button type="info">
                        <router-link to="/register">注册</router-link>
                    </el-button>
                </div>
            </el-form-item>
            <el-form-item>
                <p>{{ msg }}</p>
            </el-form-item>
        </el-form>
    </div>
</template>0

<style scoped>
.login-avatar > img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
.login-form {
    width: 100%;
    height: 250px;
    padding: 50px;
    box-sizing: border-box;
    border-radius: 0 0 20px 20px;
    background-color: coral;

    position: absolute;
    bottom: 0;
}
.login-box {
    height: 400px;
    width: 600px;
    background-color: aquamarine;
    border-radius: 20px;
    position:absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
.login-avatar {
    width: 150px;
    height: 150px;
    background-color: blanchedalmond;
    border-radius: 75px;
    border: 4px solid grey;
    position: absolute;
    left: 50%;
    top: 0%;
    transform: translate(-50%, -50%);
    /* 对内部的留白 */
    margin: 2px;
    box-sizing: border-box;
}
.button {
    width: 100%;
    height: 100%;
    /* background-color: aqua; */
    display: flex;
    justify-content: center;
}
</style>