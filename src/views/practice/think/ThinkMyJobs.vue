<script setup>
import { changeCurrent } from './ThinkData';
import { queryJobs, ThinkJobDelete } from '@/axios/thinkRequest';


const tableData = ref([]);
const tableProp = ref([]);
const store = useStore();


const filters = ref({
    id: '',
    state: '',
});

const page = ref({
    currentPage: 1,
    pageSize: 10,
    total: 0,
});

const options_status = ["全部", "通过", "未通过", "编译错误", "待提交"];

const handleQuery = () => {

    // 根据查询条件获取查询内容
    // 查询条件，题号，状态数组，将来用in
    let data = {
        username: store.getters["User/getUsername"],
        id: filters.value.id,
        state: filters.value.state,
        states: filters.value.state === '全部' ? options_status : [filters.value.state],
        pageSize: page.value.pageSize,
        currentPage: page.value.currentPage
    }
    // 异步执行，当有返回时执行then
    console.log(data);
    console.log("handleQuery");
    queryJobs(data).then(res => {
        if(res.code === 200) {
            tableData.value = res.data.tableData;
            tableProp.value = res.data.tableProp;
            page.value.total = res.data.total;
            console.log("tableData===>", tableData);
            console.log("tableprop===>", tableProp);
        }
    }).catch(err => {
        console.log("something error");
    });
}

const handleHome = () => {
    changeCurrent('HomeThink');
}

const handleEdit = (row, column, index, store) => {
    console.log('edit');
    console.log(row);
    console.log(column);
    console.log(index);
    console.log(store);
}

const handleDelete = (row) => {
    console.log(row);
    // 用户确定删除
    let data = {
        runids: [row.runid],
        username: store.getters["User/getUsername"],
        id: filters.value.id,
        state: filters.value.state,
        states: filters.value.state === '全部' ? options_status
        : [filters.value.state],
        currentPage: page.value.currentPage,
        pageSize: page.value.pageSize
    };
    console.log(data);
    ThinkJobDelete(data).then(res => {
        console.log(res);
        if(res.code === 200) {
            page.value.total = res.data.total;
            tableData.value = res.data.tableData;
            tableProp.value = res.data.tableProp;
        }
    }).catch(err => {

    });
    console.log("delete finished");
}

</script>

<template>
<div class="page-container">
    <div class="title-container">
        <span></span> 测试 <span></span>
    </div>
    <div class="toolbar-container"> 
        <el-form :inline="true" :model="form">
            <el-form-item>
                <el-input v-model="filters.id" style="width: 240px" placeholder="题号" />
            </el-form-item>
            <el-form-item>
                <el-select v-model="filters.state" placeholder="状态" size="large" style="width: 240px">
                    <el-option v-for="(item, index) in options_status" :key="index" :label="item" :value="item" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button @click="handleQuery">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button @click="handleHome">首页</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="content-container">
        <el-table :data="tableData" style="width: 100%" strip border >
            <el-table-column v-for="item in tableProp" :key="item.prop" :prop="item.prop" :label="item.label" width="150px" />
            <el-table-column fixed="right" label="操作" min-width="120">
            <template #default="scope">
                <el-button type="primary" size="small" @click="handleEdit(scope.row, scope.column, scope.$index, scope.store)">编辑</el-button>
                <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
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
            @size-change="handleQuery"
            @current-change="handleQuery"
        />
    </div>
</div>

</template>


<!-- <style scoped>
.page-container {
    height: 100%;
    overflow: hidden;
    margin: 10px 20px;
    display: flex;
    flex-direction: column;
    background-color: var(--morand-bg-light); /* 使用全局背景色 */
    border-radius: 8px;
}

.title-container {
    height: 60px;
    background-color: var(--morand-bg-medium); /* 使用全局次级背景色 */
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    font-size: 20px;
    font-weight: bold;
    color: var(--morand-text-primary); /* 使用全局主要文字颜色 */
    border-radius: 10px 10px 0 0;
}

.toolbar-container {
    height: auto;
    background-color: var(--morand-bg-light); /* 使用全局背景色 */
    padding: 15px 20px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 15px;
    border-bottom: 1px solid var(--morand-border); /* 使用全局边框颜色 */
}

:deep(.el-form) {
    .el-input,
    .el-select,
    .el-button {
        height: 35px;
        line-height: 35px;
        border-radius: 6px;
    }

    .el-input__inner {
        border-color: var(--morand-border); /* 使用全局边框颜色 */
    }

    .el-input__inner:focus {
        border-color: var(--morand-primary); /* 使用全局主色调 */
    }
}

.el-form-item {
    margin: 5px;
}

:deep(.el-button) {
    background-color: var(--morand-primary); /* 使用全局主色调 */
    color: white; /* 文字颜色保持白色 */
    font-weight: bold;
    border: none;
    transition: all 0.3s;
}

:deep(.el-button:hover) {
    background-color: var(--morand-secondary); /* 使用全局次要色调 */
}

.content-container {
    flex: 1;
    overflow: auto;
    background-color: var(--morand-bg-light); /* 使用全局背景色 */
    padding: 15px;
    border-radius: 0 0 10px 10px;
}

:deep(.el-table) {
    border-radius: 8px;
    background-color: var(--morand-bg-light); /* 使用全局背景色 */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

:deep(.el-table .el-table__row:nth-child(odd)) {
    background-color: var(--morand-bg-light); /* 使用全局背景色 */
}

:deep(.el-pagination) {
    margin: 15px 0;
    text-align: center;
    background-color: var(--morand-bg-light); /* 使用全局背景色 */
    padding: 10px;
    border-radius: 8px;
}

:deep(.el-select-dropdown__item.selected) {
    background-color: var(--morand-primary); /* 使用全局主色调 */
    color: white; /* 文字颜色保持白色 */
}

:deep(.el-select-dropdown__item:hover) {
    background-color: var(--morand-bg-medium); /* 使用全局次级背景色 */
}
</style> -->


<style scoped>
.page-container {
    height: 100%;
    overflow: hidden;
    margin: 10px 20px;
    display: flex;
    flex-direction: column;
    background-color: var(--morand-bg-light); /* 使用全局背景色 */
    border-radius: 8px;
}

.title-container {
    height: 60px;
    background-color: var(--morand-bg-medium); /* 使用全局次级背景色 */
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    font-size: 20px;
    font-weight: bold;
    color: var(--morand-text-primary); /* 使用全局主要文字颜色 */
    border-radius: 10px 10px 0 0;
}

.toolbar-container {
    height: auto;
    background-color: var(--morand-bg-light); /* 使用全局背景色 */
    padding: 15px 20px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 15px;
    border-bottom: 1px solid var(--morand-border); /* 使用全局边框颜色 */
}

:deep(.el-form) {
    .el-input,
    .el-select,
    .el-button {
        height: 35px;
        line-height: 35px;
        border-radius: 6px;
    }

    .el-input__inner {
        /* border-color: var(--morand-border); /* 使用全局边框颜色 */
    }

    .el-input__inner:focus {
        border-color: var(--morand-primary); /* 使用全局主色调 */
    }
}

.el-form-item {
    margin: 5px;
}

:deep(.el-button) {
    background-color: var(--morand-primary); /* 使用全局主色调 */
    color: white; /* 文字颜色保持白色 */
    font-weight: bold;
    border: none;
    transition: all 0.3s;
}

:deep(.el-button:hover) {
    background-color: var(--morand-secondary); /* 使用全局次要色调 */
}

.content-container {
    flex: 1;
    overflow: auto;
    background-color: var(--morand-bg-light); /* 使用全局背景色 */
    padding: 15px;
    border-radius: 0 0 10px 10px;
}

:deep(.el-table) {
    border-radius: 8px;
    background-color: var(--morand-bg-light); /* 使用全局背景色 */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

:deep(.el-table .el-table__row:nth-child(odd)) {
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
