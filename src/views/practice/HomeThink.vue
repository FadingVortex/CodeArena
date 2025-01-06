<script setup>
import { computed, onMounted } from 'vue';
import { options, deleteQueryQuestions, queryQuestionByPage} from '@/axios/thinkRequest'
import { changeCurrent } from './think/ThinkData';
import { queryQuestion } from '../../axios/thinkRequest';

// 定义select的已选中的标签
const form = ref({
    level: '',
    module: '',
    chapter: ''
});
// 选择器的选项
const levels = ref([]);
const modules = ref([]);
const chapters = ref([]);
// 表格的数据
const tableData = ref([]);

// HomeThink.vue 初始化数据，从后端提取数据
onMounted(() => {
    // 使用axios或instance，从后端提取数据
    options().then((res) => {
        console.log(res);
        if(res.code === 200) {
            levels.value = [...res.data.options];
        }
    }).catch((err) => { console.log('error')});
    // freshPageData();
});

const handleMyJobs = () => {
    // 动态组件
    // 修改ThinkFrame.vue中的current.value的值
    // 修改ThinkData.js中的响应式变量，修改为2
    // console.log(form.value);
    // showNo.value = 2;
    changeCurrent('ThinkMyJobs');
}

const handleLevelChange = (value) => {
    form.value.module = '';
    form.value.chapter = '';

    modules.value = [];
    chapters.value = [];
    let len = levels.value.length;
    
    if(value === undefined || value.length <= 0) {
        form.value.level = '';
        return;
    }
    levels.value.forEach(element => {
        if(element.value === value) {
            if(element.children !== undefined) {
                modules.value = element.children;
            } else {
                // 根据value值，查询题库
                // queryQuestion(data)
                //requestQueryQuestions(value);
                freshPageData();
            }
            return;
        }
    });
}

const handleModuleChange = (value) => {
    form.value.chapter = '';

    chapters.value = [];
    let len = modules.value.length;
    
    if(value === undefined || value.length <= 0) {
        form.value.module = '';
        return;
    }


    modules.value.forEach(element => {
        if(element.value === value) {
            if(element.children !== undefined) {
                chapters.value = element.children;
            } else {
                // 根据value值，查询题库
                freshPageData();
            }
        }
    });
}

const handleChpaterChange = (value) => {
    // 根据value值，利用axios查询库中的
    if(value === undefined || value.length <= 0) {
        form.value.chapter = '';
        return;
    }

    freshPageData();
}

const freshPageData = () => {
    let {currentPage, pageSize} = page.value;
    let data = {currentPage, pageSize, LMC: LMC.value};
    // if(form.value.chapter !== '') data['LMC'] = form.value.chapter;
    // else if(form.value.module !== '') data['LMC'] = form.value.module;
    // else if(form.value.level !== '') data['LMC'] = form.value.level;
    // else data['LMC'] = ''; 
    console.log(data);
    console.log('计算属性值');

    queryQuestionByPage(data).then(res => {
        console.log("queryQuestionByPage.then");
        console.log(res);
        tableData.value = res.data.tableData;
        page.value.total = res.data.total;
    }).catch(err => {

    });

}

const handelQuery = () => {
    // freshPageData();

    queryQuestion(LMC.value).then(res => {
        console.log(res);
        tableData.value = res.data.tableData;
    }).catch(err => {

    });

}

const handleEdit = (row, column, index, store) => {
    console.log('edit');
    console.log(row);
    console.log(column);
    console.log(index);
    console.log(store);
}

const handleDelete = (row, index) => {
    // index就是row在tabledata数组中的索引值
    console.log('单击了表格上的某一行？的删除按钮');
    console.log(row.id);
    // deleteQuestions(传递一个整数数组)
    deleteQueryQuestions(row.id).then(res => {
        console.log(res);
        tableData.value.splice(index, 1);
    }).catch(err => {
        console.log(err);
    });
}

const page = ref({
    currentPage: 1,
    pageSize: 10,
    total: 0,
});

const LMC = computed(() => {
    let str = '';
    if(form.value.chapter !== '') str = form.value.chapter;
    else if(form.value.module !== '') str = form.value.module;
    else if(form.value.level !== '') str = form.value.level;
    else str = ''; 
    console.log("LMC=" + str);
    return str;
})

</script>
<template>
<div class="page-container">
    <div class="title-container">
        <span></span> 我是标题 <span></span>
    </div>
    <div class="toolbar-container"> 
        <el-form :inline="true" :model="form">
            <el-form-item>
                <el-button @click="handleMyJobs">我的提交</el-button>
            </el-form-item>
            <el-form-item label="等级">
                <el-select clearable style="width: 200px;" placeholder="" v-model="form.level" @change="handleLevelChange">
                    <el-option v-for="op in levels" :key="op.value" :label="op.label" :value="op.value"/>
                </el-select>
            </el-form-item>
            <el-form-item label="模块">
                <el-select clearable style="width: 200px;" placeholder="" v-model="form.module" @change="handleModuleChange">
                    <el-option v-for="op in modules" :key="op.value" :label="op.label" :value="op.value"/>
                </el-select>
            </el-form-item>
            <el-form-item label="章节">
                <el-select clearable style="width: 200px;" placeholder="" v-model="form.chapter" @change="handleChpaterChange">
                    <el-option v-for="op in chapters" :key="op.value" :label="op.label" :value="op.value"/>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button @click="handelQuery">查询</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="content-container">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="SNO" label="序号" width="60" />
            <el-table-column prop="LMC" label="分区" width="100" />
            <el-table-column prop="id" label="题号" width="100" />
            <el-table-column prop="title" label="题目" width="180" />
            <el-table-column prop="pass" label="通过数" width="120" />
            <el-table-column prop="submit" label="提交数" width="120" />
            <el-table-column fixed="right" label="Operations" min-width="120">
            <template #default="scope">
                <el-button type="primary" size="small" @click="handleEdit(scope.row, scope.column, scope.$index, scope.store)">编辑</el-button>
                <el-button type="danger" size="small" @click="handleDelete(scope.row, scope.$index)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
        <el-pagination
            v-model:current-page="page.currentPage"
            v-model:page-size="page.pageSize"
            :page-sizes="[10, 20, 50, 100]"
            :background="true"
            layout="total, prev, pager, next, ->, jumper, sizes"
            :total="page.total"
            :hide-on-single-page="true"
            @size-change="freshPageData"
            @current-change="freshPageData"
        />
    </div>
</div>

</template>
<style scoped>
.page-container {
    height: 100%;
    overflow: hidden;
    margin: 5px;
    display: flex;
    flex-direction: column;
    background-color: var(--morand-bg-light); /* 使用全局背景色 */
    border-radius: 8px;
}

.title-container {
    font-size: 20px;
    font-weight: bold;
    color: var(--morand-text-primary); /* 使用全局主要文字颜色 */
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px 0;
    background-color: var(--morand-bg-medium); /* 使用全局次级背景色 */
    border-radius: 8px 8px 0 0;
}

.toolbar-container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 15px;
    padding: 15px 20px;
    background-color: var(--morand-bg-light); /* 使用全局背景色 */
    border-bottom: 1px solid var(--morand-border); /* 使用全局边框颜色 */
}

.el-form-item {
    margin: 3px;
}

:deep(.el-button) {
    background-color: var(--morand-primary); /* 使用全局主色调 */
    border-color: var(--morand-primary); /* 使用全局主色调 */
    color: white; /* 文字颜色保持白色 */
    transition: all 0.3s ease;
}

:deep(.el-button:hover) {
    background-color: var(--morand-secondary); /* 使用全局次要色调 */
    border-color: var(--morand-secondary); /* 使用全局次要色调 */
}

:deep(.el-button--danger) {
    background-color: var(--morand-danger); /* 使用全局危险色调 */
    border-color: var(--morand-danger); /* 使用全局危险色调 */
}

:deep(.el-button--danger:hover) {
    background-color: var(--morand-warning); /* 使用全局警告色调 */
    border-color: var(--morand-warning); /* 使用全局警告色调 */
}

.content-container {
    flex: 1;
    overflow: auto;
    padding: 15px;
    background-color: var(--morand-bg-light); /* 使用全局背景色 */
}

:deep(.el-table) {
    background-color: var(--morand-bg-light); /* 使用全局背景色 */
    border-radius: 8px;
}

:deep(.el-table th) {
    background-color: var(--morand-bg-medium); /* 使用全局次级背景色 */
    color: var(--morand-text-primary); /* 使用全局主要文字颜色 */
}

:deep(.el-table--striped .el-table__row:nth-child(odd)) {
    background-color: var(--morand-bg-light); /* 使用全局背景色 */
}

:deep(.el-pagination) {
    margin: 15px 0;
    text-align: center;
    background-color: var(--morand-bg-light); /* 使用全局背景色 */
    padding: 10px;
    border-radius: 8px;
}

/* 分页器按钮样式 */
:deep(.el-pagination .btn-prev),
:deep(.el-pagination .btn-next),
:deep(.el-pagination .number:not(.active)) {
    background-color: var(--morand-bg-light); /* 使用全局背景色 */
    border: 1px solid var(--morand-border); /* 使用全局边框颜色 */
    color: var(--morand-text-primary); /* 使用全局主要文字颜色 */
    transition: all 0.3s;
}

:deep(.el-pagination .btn-prev:hover),
:deep(.el-pagination .btn-next:hover),
:deep(.el-pagination .number:not(.active):hover) {
    background-color: var(--morand-secondary); /* 使用全局次要色调 */
    color: white; /* 文字颜色保持白色 */
}

/* 覆盖 Element Plus 默认的选中按钮样式 */
:deep(.el-pagination.is-background .btn-next.is-active),
:deep(.el-pagination.is-background .btn-prev.is-active),
:deep(.el-pagination.is-background .el-pager li.is-active) {
    background-color: var(--morand-primary) !important; /* 使用全局主色调 */
    color: white !important; /* 文字颜色保持白色 */
}

:deep(.el-pagination.is-background .btn-next.is-active:hover),
:deep(.el-pagination.is-background .btn-prev.is-active:hover),
:deep(.el-pagination.is-background .el-pager li.is-active:hover) {
    background-color: var(--morand-primary) !important; /* 使用全局主色调 */
    color: white !important; /* 文字颜色保持白色 */
}

:deep(.el-select-dropdown__item.selected) {
    background-color: var(--morand-primary); /* 使用全局主色调 */
    color: white; /* 文字颜色保持白色 */
}

:deep(.el-select-dropdown__item:hover) {
    background-color: var(--morand-bg-medium); /* 使用全局次级背景色 */
}
</style>

