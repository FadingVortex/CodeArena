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
    background-color: #1a73e8; /* 深蓝色，替换原 bisque */
    margin: 5px;
    border-radius: 8px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: bold;
}
.home > main {
    flex: 1;
    overflow: hidden;
    margin: 5px;
    background-color: #ffffff; /* 保持白色背景 */
    display: flex;

    /* 子元素样式 */
    > .menu {
        width: 200px; /* 固定宽度 */
        height: 100%;
        overflow: auto;
        background-color: #f4f6f8; /* 替换为浅灰 */
        margin: 0 5px 0 0;
        border-radius: 8px;
        padding: 10px;
    }
    > .client {
        flex: 1;
        /* overflow: auto; */
        overflow: hidden;
        border: 2px solid #e3e7eb;
        border-radius: 10px;
        padding: 10px;
    }
}

.menu {
    height: 100%;
    overflow: auto;
    background-color: #f7f8fa; /* 提升导航背景为更浅的灰 */
    border-right: 1px solid #e0e0e0; /* 添加分隔线 */
    padding: 10px 0;
}
.menu-item {
    padding: 10px 20px;
    color: #333;
    font-size: 16px;
    transition: background-color 0.3s ease;
}
.menu-item:hover {
    background-color: #e0f3ff; /* 鼠标悬浮高亮 */
}
.menu-item.active {
    background-color: #d0e7ff; /* 当前选中项背景 */
    font-weight: bold;
}


</style>
