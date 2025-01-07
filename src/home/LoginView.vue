<script setup>
    // 保持原有的 script 部分不变
    import {ref} from 'vue'
    import { useStore } from 'vuex'
    import { useRouter } from 'vue-router'
    import { login } from "@/axios/rootRequest.js"

    const store = useStore();
    const router = useRouter();

    const userinfo = ref({
        username: 'John',
        password: '123'
    });

    const msg = ref('');

    const handleLogin = () => {
        let params = {
            username: userinfo.value.username,
            password: userinfo.value.password
        }
        
        login(params)
        .then((res) => {
            if(res.code === 200){
                store.commit('User/setToken', res.data.token);
                store.commit('User/setUserName', res.data.username);
                msg.value = '登录成功跳转到系统首页';
                console.log(res.data.username);
                console.log('getUsername' + store.getters['User/getUserName']);
                router.push('/');
            } else {
                msg.value = '用户名或密码输入错误，请重新输入';
            }
        }).catch((err) => {
            console.log("axios.catch===>");
            console.log(err);
        });

        for(const i in userinfo.value) {
            userinfo.value[i]='';
        }
    }    
    
    const clearWarn = () => {
        msg.value = '';
    }
</script>

<template>
    <div class="login-container">
        <div class="login-box">
            <div class="login-avatar">
                <img src="@/assets/login.png" alt="Login Avatar">
            </div>
            <div class="login-form-container">
                <h2 class="login-title">欢迎登录</h2>
                <el-form class="login-form" :model="userinfo">
                    <el-form-item>
                        <el-input 
                            placeholder="请输入账号" 
                            v-model="userinfo.username" 
                            @focus="clearWarn"
                            prefix-icon="User"
                        />
                    </el-form-item>
                    <el-form-item>
                        <el-input 
                            placeholder="请输入密码" 
                            type="password" 
                            show-password 
                            v-model="userinfo.password"
                            prefix-icon="Lock"
                        />
                    </el-form-item>
                    <el-form-item>
                        <div class="button-group">
                            <el-button type="primary" @click="handleLogin">登录</el-button>
                            <el-button @click="clearWarn">重置</el-button>
                            <el-button>
                                <router-link to="/register" class="register-link">注册</router-link>
                            </el-button>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <p class="error-message">{{ msg }}</p>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>



<style scoped>
.login-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--morand-bg-light);
}

.login-box {
    width: 420px;
    background-color: #ffffff;
    border-radius: 16px;
    position: relative;
    padding: 20px;
    height: 37vh;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.login-avatar {
    width: 100px;
    height: 100px;
    position: relative;
    margin: -70px auto 20px;
}

.login-avatar > img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 4px solid #ffffff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.login-form-container {
    padding: 20px;
}

.login-title {
    text-align: center;
    color: var(--morand-text-primary);
    font-size: 24px;
    margin-bottom: 30px;
}


.button-group {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    margin-top: 20px;
}

.button-group .el-button {
    flex: 1;
    height: 40px;
}

:deep(.el-button--primary) {
    background-color: var(--morand-primary);
    border-color: var(--morand-primary);
}

:deep(.el-button--primary:hover) {
    background-color: var(--morand-secondary);
    border-color: var(--morand-secondary);
}

:deep(.el-form-item__content) {
    justify-content: center;
}

.register-link {
    text-decoration: none;
    color: inherit;
}

.error-message {
    text-align: center;
    color: #ff6b6b;
    margin-top: 10px;
    font-size: 14px;
}
</style>




