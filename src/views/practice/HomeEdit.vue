<script setup>
import { getCurrentInstance, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { queryQuestionById, updateQuestion, addQuestion, uploadPdf } from '@/axios/editRequest';
import { options as categoryOptions } from '@/mockjs/mockThink.js';
// import EditorMd from '../../components/EditorMd.vue';
import markdownEdito from '../../components/MarkdownEditor.vue';
import Editor from '../../components/Editor.vue';

const { proxy } = getCurrentInstance();
const options = ref(categoryOptions);

let editor;
const markdownView = ref(null);
const isEditStatus = ref(true);
const timeDealy = 1000;
const activeName = ref('first');
const showUploader = ref(false); 
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

    console.log(formData.value.id);
    if(res.data[0].pdfString != null) formData.value.pdfString = res.data[0].pdfString;
    else formData.value.pdfString = '';
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
  // 默认不会处理到undefined值时的情况，加上else以后就可以处理了
  if (newValue) {
    pdfUrl.value = `data:application/pdf;base64,${newValue}`;
  } else {
    pdfUrl.value = '';
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

const handleDrop = (event) => {
  const files = event.dataTransfer.files;
  if(files.length > 0) {
    const file = files[0];
    if(file.type !== "application/pdf") {
      ElMessage.error('只能上传 PDF 文件');
      return;
    }
    fileList.value = [file];
    pdfUrl.value = URL.createObjectURL(file);
    showUploader.value = false;
  }
}

const showDragUploader = (event) => {
  if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
    showUploader.value = true;
  }
};

const hideDragUploader = (event) => {
  if (
    pdfUrl.value &&
    (event.relatedTarget === null || event.target.nodeName === "HTML")
  ) {
    showUploader.value = false;
  }
};


// 绑定窗口拖拽事件，当发生时将uploader显示出来
onMounted( () => {
  window.addEventListener('dragenter', showDragUploader);
  window.addEventListener('dragleave', hideDragUploader);
});

onBeforeUnmount(() => {
  window.removeEventListener('dragenter', showDragUploader);
  window.removeEventListener('dragleave', hideDragUploader);
});

onActivated(() => {
    console.log('HomeEdit activated');
    if(!!route.query.id){
      isEditStatus.value = true;
      loadData();
      setTimeout(() => {
        // initEditor();
      }, timeDealy);
      // 从数据库获取已上传的 PDF
      // getExistingPdf();
      // editor.setValue(formData.value.content);
      // editor.previewing();
    } else {
      isEditStatus.value = false;
      formData.value.id = '';
      formData.value.pdfString = '';
      // initEditor();
    }
});
onDeactivated(() => { 

});


</script>

<template>
  <div class="edit-container">
    <el-card class="edit-card">
      <el-tabs v-model="activeName" class="custom-tabs" @tab-click="handleTabClick">
        <el-tab-pane label="基本信息" name="first">
          <div class="form-header">
            <h2 class="form-title">{{ isEditStatus ? '编辑题目' : '添加题目' }}</h2>
          </div>
          
          <el-form 
            :model="formData" 
            :rules="rules" 
            ref="editForm" 
            label-width="100px"
            class="edit-form"
          >
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
              <!-- <div id="editor"></div> -->
               <!-- <EditorMd :content="formData.content" /> -->
              <!-- <markdown-editor ref="markdownView" editor-id="editorId" :default-value="formData.content"></markdown-editor> -->
               <Editor v-model="formData.content" />  

            </el-form-item>

            <el-form-item class="form-actions">
              <el-button type="primary" @click="handleSubmit" size="large">保存</el-button>
              <el-button @click="handleCancel" size="large">取消</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="PDF附件" name="second">
          <div class="pdf-container">
            <h6 v-if="!showUploader && pdfUrl" class="section-title">拖拽PDF上传</h6>
            <div 
              v-if="showUploader || !pdfUrl"
              class="upload-section"
              @dragover.prevent
              @drop.prevent="handleDrop"
            >
              <h3 class="section-title">PDF 上传</h3>
              <el-upload
                class="pdf-uploader"
                drag
                action="#"
                :auto-upload="false"
                :before-upload="beforeUpload"
                :on-change="handleUploadSuccess"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                :multiple="false"
              >
                <div class="upload-content">
                  <el-icon class="upload-icon"><upload-filled /></el-icon>
                  <div class="upload-text">
                    <span class="upload-main-text">拖拽 PDF 文件到此处或点击上传</span>
                    <span class="upload-sub-text">单个文件不超过 5MB</span>
                  </div>
                </div>
              </el-upload>
            </div>

            <div v-if="pdfUrl" class="preview-section">
              <h3 class="section-title">PDF 预览</h3>
              <div class="pdf-preview-container">
                <iframe 
                  :src="pdfUrl" 
                  class="pdf-preview-frame"
                  frameborder="0"
                ></iframe>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<style scoped>

.edit-container {
  padding: 20px;
  background-color: var(--morand-bg-light);
  min-height: calc(100vh - 120px);
}

.edit-card {
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px 0 rgba(137, 149, 159, 0.1);
  border: 1px solid var(--morand-border);
}

.custom-tabs :deep(.el-tabs__nav-wrap::after) {
  height: 1px;
  background-color: var(--morand-border);
}

.custom-tabs :deep(.el-tabs__item) {
  color: var(--morand-text-secondary);
}

.custom-tabs :deep(.el-tabs__item.is-active) {
  color: var(--morand-primary);
}

.custom-tabs :deep(.el-tabs__active-bar) {
  background-color: var(--morand-primary);
}

.form-header {
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--morand-border);
}

.form-title {
  margin: 0;
  color: var(--morand-text-primary);
  font-size: 20px;
  font-weight: 500;
}

.edit-form {
  /* max-width: 800px; */
  margin: 0 auto;
  padding: 20px;
}

.form-actions {
  margin-top: 0px;
  text-align: center;
}

.form-actions :deep(.el-button--primary) {
  background-color: var(--morand-primary);
  border-color: var(--morand-primary);
}

.form-actions :deep(.el-button--primary:hover) {
  background-color: var(--morand-secondary);
  border-color: var(--morand-secondary);
}

.form-actions :deep(.el-button--default) {
  border-color: var(--morand-border);
  color: var(--morand-text-secondary);
}

.pdf-container {
  padding: 20px;
}

.upload-section {
  margin-bottom: 30px;
}

.section-title {
  margin: 0 0 20px;
  color: var(--morand-text-primary);
  font-size: 16px;
  font-weight: 500;
}

h6.section-title {
  margin: 0px;
  color: var(--morand-text-secondary);
  font-size: 16px;
  font-weight: 500;
}

.pdf-uploader {
  border: 1px dashed var(--morand-border);
  border-radius: 8px;
  background-color: var(--morand-bg-light);
  transition: border-color 0.3s;
}

.pdf-uploader:hover {
  border-color: var(--morand-primary);
}

.upload-content {
  padding: 30px 0;
  text-align: center;
}

.upload-icon {
  font-size: 48px;
  color: var(--morand-secondary);
  margin-bottom: 16px;
}

.upload-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.upload-main-text {
  color: var(--morand-text-primary);
  font-size: 16px;
}

.upload-sub-text {
  color: var(--morand-text-secondary);
  font-size: 14px;
}

.preview-section {
  margin-top: 20px;
}

.pdf-preview-container {
  border: 1px solid var(--morand-border);
  border-radius: 8px;
  overflow: hidden;
  background-color: var(--morand-bg-light);
}

.pdf-preview-frame {
  width: 100%;
  height: 700px;
  background: #fff;
}

:deep(.el-form-item__label) {
  color: var(--morand-text-primary);
}

:deep(.el-input__inner) {
  border-color: var(--morand-border);
}

:deep(.el-input__inner:focus) {
  border-color: var(--morand-primary);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .edit-container {
    padding: 10px;
  }

  .edit-form {
    padding: 10px;
  }

  .pdf-preview-frame {
    height: 500px;
  }
}
</style>