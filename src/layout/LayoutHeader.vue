<script setup>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore();
const router = useRouter();
const handleClear = ()=> {
    store.commit('User/clearToken');
    router.push({name: 'LoginView'});
}


</script>

<template>
<el-button @click="handleClear"> 清除token </el-button>
</template>

<style scoped>
</style>

