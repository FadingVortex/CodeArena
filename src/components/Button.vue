<!-- 变量希望和组件一起使用（模板和脚本发送交互），那么需要将变量定义在外面 -->
<script setup>
import {reactive, ref} from 'vue'
// 返回一个对象只有一个属性value
const count = ref(10);

const add=()=>{
    count.value++;
}

const x1 = ref(0);
const x2 = ref(true);
const x3 = ref([]);
const x4 = ref('hello');
const x5 = ref({
    username:'',
    password:''
});

// reactive() 括号内部本身必须要是一个对象
const y1 = reactive({x:10});

const x = 'button';


</script>

<template>
    <button v-bind:type="x" class="button" @click="add">
        <!-- 在页面模板中ref不用加.value自动解析 -->
        count is {{ count }}
    </button>

</template>

<style scoped>
.button{
    color: red;
}
</style>