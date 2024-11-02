<script setup>
// import LoginView from './home/LoginView.vue';
// import {ref} from 'vue'
// const items = ref([{message: 'Foo'}, {message: 'Bar'}]);
// const objs = {
//     age: 20,
//     message: 'Foo',
//     name: 'rose'
// }
</script>


<template>
  <!-- <li v-for="(x,i,y) in objs" :key="i">{{ x }}==>{{ i }}==>{{ y }}</li>
  <li v-for="(x,i,y) in items" :key="i">{{ x }}==>{{ i }}==>{{ y }}</li> -->
  <!-- <li v-for="(x, i) in items">{{ x }}, {{ i }}</li> -->
  <!-- 第二个参数可以是索引，对于数组来说是下标，对于对象来说是属性名，对于第三个对象属性名对应的索引值 -->
  <!-- (value, key, index) -->
  <!-- 如果想要组件一起渲染，那么使用template包裹同时可以不添加新的组件 -->

    <router-view></router-view>

</template>


<style>
html, body{
    height: 100%;
    /* width: 100%; */
    overflow: hidden;
    background-color: rgb(255, 255, 255);
}
#app {
    height: 100%;
    overflow: hidden;
}
</style>




