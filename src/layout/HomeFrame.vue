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
                <router-view v-slot="{ Component }">
                    <KeepAlive>
                        <component :is="Component" />
                    </KeepAlive>
                </router-view>
            </div>
        </main>
    </div>
</template>

<style lang="css" scoped>
.home {
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column; 
    background-color: var(--morand-bg-light); /* 使用全局背景色 */
}

.home > header {
    height: 50px;
    background-color: var(--morand-primary); /* 使用全局主色调 */
    margin: 5px;
    border-radius: 8px;
    color: white; /* 文字颜色保持白色 */
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    font-size: 18px;
    font-weight: bold;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.home > main {
    flex: 1;
    overflow: hidden;
    margin: 5px;
    background-color: var(--morand-bg-light); /* 使用全局背景色 */
    display: flex;
    gap: 10px;
    padding: 5px;
}

.home > main > .menu {
    width: 200px;
    height: 100%;
    overflow: auto;
    background-color: var(--morand-bg-medium); /* 使用全局次级背景色 */
    border-radius: 8px;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.home > main > .client {
    flex: 1;
    overflow: hidden;
    background-color: var(--morand-bg-light); /* 使用全局背景色 */
    border-radius: 10px;
    padding: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    border: 1px solid var(--morand-border); /* 使用全局边框颜色 */
}

.menu {
    height: 100%;
    overflow: auto;
    padding: 10px 0;
}

.menu-item {
    padding: 10px 20px;
    color: var(--morand-text-primary); /* 使用全局主要文字颜色 */
    font-size: 16px;
    transition: background-color 0.3s ease;
    border-radius: 6px;
    margin: 4px 0;
}

.menu-item:hover {
    background-color: var(--morand-secondary); /* 使用全局次要色调 */
    color: white; /* 文字颜色保持白色 */
}

.menu-item.active {
    background-color: var(--morand-primary); /* 使用全局主色调 */
    color: white; /* 文字颜色保持白色 */
    font-weight: bold;
}

/* :deep(.el-menu-item.is-active) {
    color: var(--morand-success);
} */




/* 自定义滚动条样式 */
::-webkit-scrollbar {
    width: 6px;
}

::-webkit-scrollbar-track {
    background: var(--morand-bg-light); /* 使用全局背景色 */
}

::-webkit-scrollbar-thumb {
    background: var(--morand-secondary); /* 使用全局次要色调 */
    border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
    background: var(--morand-primary); /* 使用全局主色调 */
}
</style>

