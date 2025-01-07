<script setup>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { getCurrentInstance } from 'vue';

const store = useStore();
const router = useRouter();
const { proxy } = getCurrentInstance();
const handleClear = ()=> {
    store.commit('User/clearToken');
    router.push({name: 'LoginView'});
}

// 定义主题列表
const themes = [
  { label: 'Fresh-Mint', value: 'Fresh-Mint' },
  { label: 'Elegant-Lavender', value: 'Elegant-Lavender' },
  { label: 'Warm-Earth', value: 'Warm-Earth' },
  { label: 'Calm-Blue', value: 'Calm-Blue' },
  { label: 'Warm-Apricot', value: 'Warm-Apricot' },
];

// 当前选中的主题
const selectedTheme = ref('Elegant-Lavender');

watch(selectedTheme, (newTheme) => {
  handleThemeChange(newTheme);
});

// 组件挂载时加载默认主题
onMounted(async () => {
  try {
    const savedTheme = localStorage.getItem('selectedTheme');
    if(savedTheme) {
      selectedTheme.value = savedTheme;
    }
    await proxy.$switchTheme(selectedTheme.value); // 加载默认主题
    console.log(`Default theme loaded: ${selectedTheme.value}`);
  } catch (error) {
    console.error(error);
  }
});

// 切换主题
const handleThemeChange = async (themeName) => {
  try {
    console.log(`Switching to theme: ${themeName}`);
    await proxy.$switchTheme(themeName); // 调用全局方法
    console.log(`Theme switched to: ${themeName}`);
    localStorage.setItem('selectedTheme', themeName);
  } catch (error) {
    console.error(error);
  }
};


</script>

<template>
<el-button @click="handleClear"> 清除token </el-button>
<div class="select-container">
    <el-select v-model="selectedTheme" placeholder="请选择主题">
        <el-option
          v-for="theme in themes"
          :key="theme.value"
          :label="theme.label"
          :value="theme.value"
        ></el-option>
    </el-select>
</div>
</template>

<style scoped>

.el-button {
  margin: 0; /* 移除默认的外边距 */
}

.select-container {
  margin-left: auto; /* 将选择框推到最右边 */
  padding: 4px;
}

/* :deep 和 ::v-deep 可以影响动态生成的组件，style加上scoped后自动只适用于静态的DOM组件 */ 
::v-deep(.el-select__wrapper) {
  gap: 0px;
}

</style>

