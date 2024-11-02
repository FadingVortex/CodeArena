<script setup>

import LayoutMenu from './LayoutMenu.vue'
import LayoutHeader from './LayoutHeader.vue';

</script>

<template>
    <div class="home">
        <header>
            <LayoutHeader></LayoutHeader>
        </header>
        <main>
            <div class="menu">
                <LayoutMenu/>
            </div>
            <div class="client">
                <router-view/>
            </div>
        </main>
    </div>
</template>


<style lang="css" scoped>
.home {
    height: 100%;
    /* 不带滚动条，溢出的话自动隐藏 */
    overflow: hidden;

    display: flex;
    flex-direction: column; 
}
.home > header {
    height: 50px;
    background-color: bisque;
    margin: 5px;
}
.home > main {
    flex: 1;
    overflow: hidden;
    margin: 5px;
    background-color: rgb(255, 255, 255);
    display: flex;
    > .menu {
        height: 100%;
        overflow: auto;
        background-color: rgb(251, 254, 251);
        margin: 0 5px 0 0;
    }
    > .client {
        flex: 1;
        /* overflow: auto; */
        overflow: hidden;
        /* background-color: rgb(186, 236, 183); */
        border: 5px solid rgb(186, 236, 183);
        border-radius: 10px;
    }
}
</style>