<script setup>
import { getCurrentInstance, onMounted, ref, watch } from 'vue';
import { queryQuestionById, updateQuestion, addQuestion, uploadPdf } from '@/axios/editRequest';
import { options as categoryOptions } from '@/mockjs/mockThink.js';

const { proxy } = getCurrentInstance();
const options = ref(categoryOptions);

let editor;
let isEditStatus = ref(true);
const timeDealy = 1000;
const activeName = ref('first');
// 路由和表单引用
const router = useRouter();
const route = useRoute();
const editForm = ref(null);

// 文件列表和 PDF URL 状态
const fileList = ref([]);
const pdfUrl = ref('');


// 表单数据
const formData = ref({
  id: '', // 题号
  LMC: '', // 分区
  title: '', // 题目
  content: '', // 内容详情
  pdfString: ''
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
// 加载题目数据
const loadData = async () => {
  const id = route.query.id; // 从路由参数获取题号
  queryQuestionById(id).then((res) => {
    console.log("res");
    console.log(res);
    formData.value = res.data[0];
    // formData.value.pdfString = 'data:application/pdf;base64,' + res.data[0].pdfstring
    console.log(formData.value.id);
    if(res.data[0].pdfString != null) formData.value.pdfString = res.data[0].pdfString;
    else formData.value.pdfString = '';
    // console.log(formData.value.pdfString === null ? "pdfString is null" : "pdfString not null");
    // selectedValue.value = formData.value.LMC;
  }).catch((err) => {
    console.error(err);
  });
};
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
  if (!editForm.value) return;
  
  editForm.value.validate(async (valid) => {
    if (valid) {
      if (editor) {
        formData.value.content = editor.getMarkdown();
      }
      
      try {
        if (isEditStatus.value) {
          const res = await updateQuestion(formData.value);
          if (res.code === 200) {
            ElMessage.success('保存成功');
            router.push('/course/think/home');
          } else {
            ElMessage.error('保存失败，请重试');
          }
        } else {
          const res = await addQuestion(formData.value);
          if (res.code === 200) {
            ElMessage.success('添加成功');
            router.push('/course/think/home');
          } else {
            ElMessage.error('添加失败，请重试');
          }
        }
      } catch (error) {
        console.error('Submit error:', error);
        ElMessage.error('操作失败，请重试');
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

// Enhanced PDF handling
const pdfViewerRef = ref(null);
const currentPdfString = ref('');
// PDF 上传相关函数
const beforeUpload = (file) => {
  const isPDF = file.type === 'application/pdf';
  const isLt5M = file.size / 1024 / 1024 < 5;

  if (!isPDF) {
    ElMessage.error('只能上传 PDF 文件');
  }
  if (!isLt5M) {
    ElMessage.error('PDF 文件大小不能超过 5MB');
  }
  return isPDF && isLt5M;
};

const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    if (!(file instanceof Blob)) {
      reject(new Error('Invalid file format'));
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(',')[1];
      resolve(base64String);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
};

// Modified upload handlers
const handleUploadSuccess = async (uploadFile) => {
  try {
    if (!uploadFile.raw) {
      throw new Error('No file selected');
    }
    
    const file = uploadFile.raw;
    const base64String = await convertFileToBase64(file);
    formData.value.pdfString = base64String;
    currentPdfString.value = `data:application/pdf;base64,${base64String}`;
    pdfUrl.value = URL.createObjectURL(file);
    fileList.value = [uploadFile];
    ElMessage.success('PDF 上传成功');
  } catch (error) {
    console.error('PDF conversion error:', error);
    ElMessage.error('PDF 上传失败');
    fileList.value = [];
  }
};

// Modified preview handler
const handlePreview = (uploadFile) => {
  if (uploadFile.raw) {
    pdfUrl.value = URL.createObjectURL(uploadFile.raw);
  } else if (formData.value.pdfString != undefined) {
    console.log("formData.value.pdfString" + formData.value.pdfString);
    pdfUrl.value = `data:application/pdf;base64,${formData.value.pdfString}`;
  }
};
// Load existing PDF when editing
watch(() => formData.value.pdfString, (newValue) => {
  if (newValue) {
    pdfUrl.value = `data:application/pdf;base64,${newValue}`;
  }
}, { immediate: true });

// Handle file removal
const handleRemove = () => {
  formData.value.pdfString = '';
  pdfUrl.value = '';
  fileList.value = [];
};

const handleUploadPdf = async () => {
  try {
    if (formData.value.pdfString) {
      const res = await uploadPdf(formData.value.pdfString);
      if (res.data.code === 200) {
        ElMessage.success('PDF 上传成功');
      } else {
        ElMessage.error('PDF 上传失败，请重试');
      }
    } else {
      ElMessage.warning('请先选择一个 PDF 文件');
    }
  } catch (error) {
    ElMessage.error('PDF 上传失败，请重试');
  }
};

onActivated(() => {
    console.log('HomeEdit activated');
    if(!!route.query.id){
      isEditStatus.value = true;
      loadData();
      setTimeout(() => {
        initEditor();
      }, timeDealy);
      // 从数据库获取已上传的 PDF
      // getExistingPdf();
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
        <el-tab-pane label="PDF" name="second">
          <el-upload
            class="upload-demo"
            drag
            action="#"
            :auto-upload="false"
            :before-upload="beforeUpload"
            :on-change="handleUploadSuccess"
            :on-preview="handlePreview"
            :file-list="fileList"
            :multiple="false"
          >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
              拖拽 PDF 文件到此处或 <em>点击上传</em>
            </div>
            <template #tip>
              <div class="el-upload__tip">
                仅支持 PDF 文件，大小不超过 5MB
              </div>
            </template>
          </el-upload>

          <!-- PDF 预览区域 -->
          <div v-if="pdfUrl" class="pdf-preview" ref="pdfViewerRef">
            <h3>PDF 预览</h3>
            <iframe 
              :src="pdfUrl" 
              width="100%" 
              height="600px" 
              frameborder="0"
              style="border: 1px solid #dcdfe6; border-radius: 4px;"
            ></iframe>
          </div>

          <!-- 上传按钮 -->
          <div class="upload-button">
            <el-button type="primary" @click="handleSubmit">上传 PDF</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<style scoped>

.pdf-preview {
  margin-top: 20px;
  padding: 20px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
}

.pdf-preview h3 {
  margin-bottom: 16px;
  color: #303133;
  font-size: 16px;
}


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