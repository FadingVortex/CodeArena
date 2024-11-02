<!-- <script setup>
</script>
<template>
    计算思维 ---》 软件开发
</template>
<style scoped>
</style> -->

<script setup>
import { ref } from 'vue'
const seen = ref(true);

const handleClick = ()=> {
    seen.value = !seen.value;
    // seen.value++;
}
</script>
<template>
    <!-- v-show 和 v-if 的区别在于 v-if 如果不显示就不会渲染，而v-show如果不显示是通过修改 display 来使组件隐藏 -->
    <el-button @click="handleClick">单击触发更改</el-button>
    <span v-if="seen">if 分支</span>
    <p v-else>else 分支</p>
</template>
<style scoped>
</style>