<script setup>
import { changeCurrent } from './practice/think/ThinkData';

const handleReturn = () => {
    // 修改ThinkData.js中的showNo = 1
    // showNo.value = 1;
    changeCurrent('HomeThink');
}

const filters = ref({
    id: '',
    states: '',
});


</script>
<template>
<div class="page-container">
    <div class="title-container">
        <span></span> 我的提交程序 <span></span>
    </div>
    <div class="toolbar-container">
        <el-button @click="handleReturn">返回</el-button>
    </div>
    <div class="content-container">

    </div>
</div>

</template>
<style scoped>
.page-container{
    height: 100%;
    overflow: hidden;

    /* background-color: beige; */
    margin: 5px;

    display: flex;
    flex-direction: column;
    > .title-container {
        height: 50px;
        background-color: azure;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        border-radius: 10px 10px 0 0;
    }
    > .toolbar-container {
        height: 40px;
        background-color: beige;
        /* margin: 5px 10px 5px 20px; */
        padding: 5px 0 0 0;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    > .content-container {
        flex: 1;
        overflow: auto;
        background-color: azure;
    }
}
</style>