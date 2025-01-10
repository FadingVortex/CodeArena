<script setup>
import { getCurrentInstance, onMounted, ref, watch } from 'vue';
import { queryQuestionById, updateQuestion, addQuestion} from '@/axios/editRequest';
import { options as categoryOptions } from '@/mockjs/mockThink.js';

const { proxy } = getCurrentInstance();
const options = ref(categoryOptions);

let editor;
let isEditStatus = ref(true);
const timeDealy = 1000;
const activeName = ref('first');


// 表单数据
  const formData = ref({
    id: '', // 题号
    LMC: '', // 分区
    title: '', // 题目
    content: '', // 内容详情
  });

// 表单验证规则
const rules = ref({
  LMC: [{ required: true, message: '请选择分区', trigger: 'change' }],
  title: [{ required: true, message: '请输入题目', trigger: 'blur' }],
});

// 级联选择器变化事件
const handleChange = (value) => {
  // console.log('Selected value:', value);
};

// 路由和表单引用
const router = useRouter();
const route = useRoute();
const editForm = ref(null);

// 加载题目数据
const loadData = async () => {
  const id = route.query.id; // 从路由参数获取题号
  queryQuestionById(id).then((res) => {
    console.log("res");
    console.log(res);
    formData.value = res.data[0];
    console.log(formData.value);
    // selectedValue.value = formData.value.LMC;
  }).catch((err) => {
    console.error(err);
  });
};

// const loadData = () => {
//   const id = route.query.id; // 从路由参数获取题号
//   queryQuestionById(id).then((res) => {
//     console.log("res");
//     console.log(res);
//     formData.value = res.data[0];
//     console.log("formData is content" + formData.value.content);
//     // selectedValue.value = formData.value.LMC;
//   }).catch((err) => {
//     console.error(err);
//   });
// };


const initEditor = async () => {
  try {
    editor = await proxy.$initEditor("editor", {
      markdown: formData.value.content== null ? "" : formData.value.content,
      onload: () => {
        console.log('Editor loaded successfully');
      }
    });
  } catch (error) {
    console.error('Failed to initialize editor:', error);
  }
};


const handleSubmit = async () => {
  console.log('Submit form data:', formData.value);
  if (!editForm.value) return;
  editForm.value.validate(async (valid) => {
    if (valid) {
      // Get editor content before submitting
      if (editor) {
        formData.value.content = editor.getMarkdown();
      }
      if(isEditStatus.value) {
        // 提交表单数据
        console.log('UPDATE-Form data id:', formData.value.id);
        console.log('UPDATE-Form data:', formData.value);
        // await updateQuestion(formData.value);
        updateQuestion(formData.value).then((res) => {
          console.log("updateQuestion" + res);
          if(res.code === 200) {
            ElMessage.success('保存成功');
            router.push('/course/think/home');
          } else {
            ElMessage.error('保存失败，请重试');
          }
        }).catch((err) => {
          console.error(err);
          ElMessage.error('保存失败，请重试');
        });
      } else {
        // 提交表单数据
        console.log('ADD-Form data id:', formData.value.id);
        addQuestion(formData.value).then((res) => {
          console.log("addQuestion" + res);
          if(res.code === 200) {
            ElMessage.success('添加成功');
            // router.push('/course/think/home');
          } else {
            ElMessage.error('添加失败，请重试');
          }
        }).catch((err) => {
          console.error(err);
          ElMessage.error('添加失败，请重试');
        })
      }
    }
  });
};

const handleCancel = () => {
  ElMessageBox.confirm('确定要取消当前操作吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    router.push('/course/think/home');
  }).catch(() => {
    console.log('取消操作');
  });
};


onActivated(() => {
    console.log('HomeEdit activated');
    if(!!route.query.id){
      isEditStatus.value = true;
      loadData();
      setTimeout(() => {
        initEditor();
      }, timeDealy);
    } else {
      isEditStatus.value = false;
      formData.value.id = '';
      initEditor();
    }
});

onDeactivated(() => { 

});


</script>

<template>
  <div class="edit-container">
    <el-card>



      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="User" name="first">
          <div slot="header" class="form-title">
            <span v-if="isEditStatus">编辑题目</span>
            <span v-else>添加题目</span>
          </div>
          <el-form :model="formData" :rules="rules" ref="editForm" label-width="80px">
            <el-form-item label="题号" prop="id">
              <el-input v-if="isEditStatus" v-model="formData.id" disabled></el-input>
              <el-input v-else v-model="formData.id" placeholder="请输入题号"></el-input>
            </el-form-item>
            
            <el-form-item label="分区" prop="LMC">
              <el-cascader
                v-model="formData.LMC"
                :options="options"
                @change="handleChange"
                style="width: 100%"
              />
            </el-form-item>
            
            <el-form-item label="题目" prop="title">
              <el-input type="text" v-model="formData.title" placeholder="请输入题目"></el-input>
            </el-form-item>

            <el-form-item label="内容详情" prop="content">
              <div id="editor"></div>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="handleSubmit">保存</el-button>
              <el-button @click="handleCancel">取消</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="Config" name="second">
          <el-upload
            class="upload-demo"
            drag
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            multiple
          >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
              Drop file here or <em>click to upload</em>
            </div>
            <template #tip>
              <div class="el-upload__tip">
                jpg/png files with a size less than 500kb
              </div>
            </template>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<style scoped>

.form-title {
    font-size: 15px;
    font-weight: bold;
    color: var(--morand-text-primary); /* 使用全局主要文字颜色 */
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px 0;
    margin: 5px;
    background-color: var(--morand-bg-medium); /* 使用全局次级背景色 */
    border-radius: 8px 8px 0 0;
}

.edit-container {
  margin: 20px;
}

/* Add required Editor.md styles */
:deep(.editormd) {
  z-index: 1000;
}
</style>