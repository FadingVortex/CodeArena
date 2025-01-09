<script setup>
import { ref } from 'vue';

const selectedValue = ref([]);
const options = ref([
  {
    label: '一、语言及算法基础篇',
    value: 'L1',
    children: [
      {
        label: '基础(一) C++语言',
        value: 'L1-1',
        children: [
          { label: '第一章 C++语言入门', value: 'L1-1-1' },
          { label: '第二章 顺序结构程序设计', value: 'L1-1-2' },
          { label: '第三章 程序的控制结构', value: 'L1-1-3' },
          { label: '第四章 循环结构的程序设计', value: 'L1-1-4' },
          { label: '第五章 数组', value: 'L1-1-5' },
          { label: '第六章 函数', value: 'L1-1-6' },
        ],
      },
      {
        label: '基础(二) 基础算法',
        value: 'L1-2',
        children: [
          { label: '第一章 高精度计算', value: 'L1-2-1' },
          { label: '第二章 数据排序', value: 'L1-2-2' },
          { label: '第三章 递推算法', value: 'L1-2-3' },
          { label: '第四章 递归算法', value: 'L1-2-4' },
          { label: '第五章 搜索与回溯算法', value: 'L1-2-5' },
          { label: '第六章 贪心算法', value: 'L1-2-6' },
          { label: '第七章 分治算法', value: 'L1-2-7' },
          { label: '第八章 广度优先搜索算', value: 'L1-2-8' },
          { label: '第九章 动态规划', value: 'L1-2-9' },
        ],
      },
      {
        label: '基础(三) 数据解构',
        value: 'L1-3',
        children: [
          { label: '第一章 栈', value: 'L1-3-1' },
          { label: '第二章 队列', value: 'L1-3-2' },
          { label: '第三章 树', value: 'L1-3-3' },
          { label: '第四章 图论算法', value: 'L1-3-4' },
        ],
      },
    ],
  },
  {
    label: '二、算法提高篇',
    value: 'L2',
    children: [
      {
        label: '提高(一) 基础算法',
        value: 'L2-1',
        children: [
          { label: '第1章 贪心算法', value: 'L2-1-1' },
          { label: '第2章 二分与三分', value: 'L2-1-2' },
          { label: '第3章 深搜的剪枝技巧', value: 'L2-1-3' },
          { label: '第4章 广搜的优化技巧', value: 'L2-1-4' },
        ],
      },
      {
        label: '提高(二) 字符串算法',
        value: 'L2-2',
        children: [
          { label: '第1章 哈希和哈希表', value: 'L2-2-1' },
          { label: '第2章 KMP算法', value: 'L2-2-2' },
          { label: '第3章 Trie字典树', value: 'L2-2-3' },
          { label: '第4章 AC自动机', value: 'L2-2-4' },
        ],
      },
      {
        label: '提高(三) 图论',
        value: 'L2-3',
        children: [
          { label: '第1章 最小生成树', value: 'L2-3-1' },
          { label: '第2章 最短路问题', value: 'L2-3-2' },
          { label: '第3章 SPFA算法优化', value: 'L2-3-3' },
          { label: '第4章 差分约束系统', value: 'L2-3-4' },
          { label: '第5章 强联通分量', value: 'L2-3-5' },
          { label: '第6章 割点和桥', value: 'L2-3-6' },
          { label: '第7章 欧拉回路', value: 'L2-3-7' },
        ],
      },
      {
        label: '提高(四) 数据结构',
        value: 'L2-4',
        children: [
          { label: '第1章 树状数组', value: 'L2-4-1' },
          { label: '第2章 RMQ问题', value: 'L2-4-2' },
          { label: '第3章 线段树', value: 'L2-4-3' },
          { label: '第4章 倍增求 LCA', value: 'L2-4-4' },
          { label: '第5章 树链剖分', value: 'L2-4-5' },
          { label: '第6章 平衡树Treap', value: 'L2-4-6' },
        ],
      },
      {
        label: '提高(五) 动态规划',
        value: 'L2-5',
        children: [
          { label: '第1章 树状数组', value: 'L2-5-1' },
          { label: '第2章 树型动态规划', value: 'L2-5-2' },
          { label: '第3章 数位动态规划', value: 'L2-5-3' },
          { label: '第4章 状态压缩类动态规划', value: 'L2-5-4' },
          { label: '第5章 单调队列优化动规', value: 'L2-5-5' },
          { label: '第6章 斜率优化动态规划', value: 'L2-5-6' },
        ],
      },
    ],
  },
  {
    label: '三、高手训练',
    value: 'L3',
    children: [
      {
        label: '高手(一) 基础算法',
        value: 'L3-1',
        children: [
          { label: '第1章 贪心算法', value: 'L3-1-1' },
          { label: '第2章 二分与三分', value: 'L3-1-2' },
          { label: '第3章 深搜的剪枝技巧', value: 'L3-1-3' },
          { label: '第4章 广搜的优化技巧', value: 'L3-1-4' },
        ],
      },
      {
        label: '高手(二) 字符串算法',
        value: 'L3-2',
        children: [
          { label: '第1章 哈希和哈希表', value: 'L3-2-1' },
          { label: '第2章 KMP算法', value: 'L3-2-2' },
          { label: '第3章 Trie字典树', value: 'L3-2-3' },
          { label: '第4章 AC自动机', value: 'L3-2-4' },
        ],
      },
      {
        label: '高手(三) 图论',
        value: 'L3-3',
        children: [
          { label: '第1章 最小生成树', value: 'L3-3-1' },
          { label: '第2章 最短路问题', value: 'L3-3-2' },
          { label: '第3章 SPFA算法优化', value: 'L3-3-3' },
          { label: '第4章 差分约束系统', value: 'L3-3-4' },
          { label: '第5章 强联通分量', value: 'L3-3-5' },
          { label: '第6章 割点和桥', value: 'L3-3-6' },
          { label: '第7章 欧拉回路', value: 'L3-3-7' },
        ],
      },
      {
        label: '高手(四) 数据结构',
        value: 'L3-4',
        children: [
          { label: '第1章 树状数组', value: 'L3-4-1' },
          { label: '第2章 RMQ问题', value: 'L3-4-2' },
          { label: '第3章 线段树', value: 'L3-4-3' },
          { label: '第4章 倍增求 LCA', value: 'L3-4-4' },
          { label: '第5章 树链剖分', value: 'L3-4-5' },
          { label: '第6章 平衡树Treap', value: 'L3-4-6' },
        ],
      },
      {
        label: '高手(五) 动态规划',
        value: 'L3-5',
        children: [
          { label: '第1章 树状数组', value: 'L3-5-1' },
          { label: '第2章 树型动态规划', value: 'L3-5-2' },
          { label: '第3章 数位动态规划', value: 'L3-5-3' },
          { label: '第4章 状态压缩类动态规划', value: 'L3-5-4' },
          { label: '第5章 单调队列优化动规', value: 'L3-5-5' },
          { label: '第6章 斜率优化动态规划', value: 'L3-5-6' },
        ],
      },
    ],
  },
  {
    label: '四、官方真题',
    value: 'L4',
    children: [
      { label: '1、NOIP普及组', value: 'L4-1' },
      { label: '2、NOIP提高组', value: 'L4-2' },
    ],
  },
]);

// 表单数据
const formData = ref({
  id: '', // 题号
  LMC: '', // 分区
  title: '', // 题目
});

// 表单验证规则
const rules = ref({
  LMC: [{ required: true, message: '请选择分区', trigger: 'change' }],
  title: [{ required: true, message: '请输入题目', trigger: 'blur' }],
});

// 级联选择器变化事件
const handleChange = (value) => {
  console.log('Selected value:', value);
};

// 路由和表单引用
const router = useRouter();
const route = useRoute();
const editForm = ref(null);

// 加载题目数据
const loadData = async () => {
  const id = route.query.id; // 从路由参数获取题号
  const res = await getQuestionData(id); // 调用后端接口
  formData.value = res.data;
};

// 保存编辑
const handleSubmit = async () => {
  editForm.value.validate(async (valid) => {
    if (valid) {
      try {
        await updateQuestion(formData.value); // 调用后端保存接口
        ElMessage.success('保存成功');
        router.push('/manage'); // 返回管理页面
      } catch (error) {
        ElMessage.error('保存失败，请重试');
      }
    }
  });
};

// 取消编辑
const handleCancel = () => {
  router.push('/manage'); // 返回管理页面
};

// 获取题目数据（模拟后端接口）
const getQuestionData = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: { id: id, LMC: 'L1-1-1', title: '示例题目' },
      });
    }, 500);
  });
};

// 更新题目数据（模拟后端接口）
const updateQuestion = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ message: '更新成功' });
    }, 500);
  });
};

// 组件挂载时加载数据
onMounted(() => {
  loadData();
});
</script>


<template>
    <div>
      <el-form :model="formData" :rules="rules" ref="editForm">
        <el-form-item label="题号" prop="id">
          <el-input v-model="formData.id" />
        </el-form-item>
        <el-form-item label="分区" prop="LMC">
            <el-cascader
                v-model="selectedValue"
                :options="options"
                @change="handleChange"
            />
        </el-form-item>
        <el-form-item label="题目" prop="title">
          <el-input v-model="formData.title" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">保存</el-button>
          <el-button @click="handleCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>