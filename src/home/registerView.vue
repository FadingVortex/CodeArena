<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const userinfo = ref({
    username: '',
    password: '',
    confirmPassword: '',
})

const rules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
    ],
    confirmPassword: [
        { required: true, message: '请确认密码', trigger: 'blur' },
        {
            validator: (rule, value, callback) => {
                if (value !== userinfo.value.password) {
                    callback(new Error('两次输入密码不一致!'))
                } else {
                    callback()
                }
            },
            trigger: 'blur'
        }
    ]
}

const handleRegister = () => {
    // 注册逻辑
}

const handleBack = () => {
    router.push('/login')
}
</script>

<template>
    <div class="register-container">
        <div class="register-box">
            <div class="register-header">
                <h2>用户注册</h2>
            </div>
            <el-form 
                class="register-form" 
                :model="userinfo"
                :rules="rules"
                label-position="top"
            >
                <el-form-item label="用户名" prop="username">
                    <el-input 
                        v-model="userinfo.username"
                        placeholder="请输入用户名"
                        prefix-icon="User"
                    />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input 
                        v-model="userinfo.password"
                        type="password"
                        show-password
                        placeholder="请输入密码"
                        prefix-icon="Lock"
                    />
                </el-form-item>
                <el-form-item label="确认密码" prop="confirmPassword">
                    <el-input 
                        v-model="userinfo.confirmPassword"
                        type="password"
                        show-password
                        placeholder="请确认密码"
                        prefix-icon="Lock"
                    />
                </el-form-item>
                <div class="button-group">
                    <el-button type="primary" @click="handleRegister">注册</el-button>
                    <el-button @click="handleBack">返回登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<style scoped>
.register-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--morand-bg-light);
}

.register-box {
    width: 420px;
    background-color: #ffffff;
    border-radius: 16px;
    padding: 30px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.register-header {
    text-align: center;
    margin-bottom: 30px;
}

.register-header h2 {
    color: var(--morand-text-primary);
    font-size: 24px;
    font-weight: 600;
}

.register-form :deep(.el-form-item__label) {
    color: var(--morand-text-secondary);
    font-size: 14px;
}

.register-form :deep(.el-input__inner) {
    height: 42px;
    background-color: var(--morand-bg-light);
    border: 1px solid var(--morand-border);
    border-radius: 8px;
}

.register-form :deep(.el-input__inner:focus) {
    border-color: var(--morand-primary);
}

.button-group {
    display: flex;
    gap: 10px;
    margin-top: 30px;
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
</style>