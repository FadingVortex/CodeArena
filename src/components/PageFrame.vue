<script setup>
</script>
<template>
<div class="page-container">
    <div class="title-container">
        <span></span> 我是标题 <span></span>
    </div>
    <div class="toolbar-container">

    </div>
    <div class="content-container">

    </div>
</div>

</template>
<style scoped>
.page-container{
    height: 100%;
    overflow: hidden;

    background-color: beige;
    margin: 5px;

    display: flex;
    flex-direction: column;
    > .title-container {
        height: 50px;
        background-color: azure;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    > .toolbar-container {
        height: 50px;
        background-color: cadetblue;
    }
    > .content-container {
        flex: 1;
        overflow: auto;
        background-color: blueviolet;
    }
}
</style>