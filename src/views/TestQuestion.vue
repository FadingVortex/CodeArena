<script setup>
import { computed, onMounted, ref } from 'vue';
import { options, deleteQueryQuestions, queryQuestionByPage} from '@/axios/thinkRequest'
import { showNo } from './practice/think/ThinkData';

const filters = ref({
    id: '',
    states: '',
});

const options = ["所有", "通过", "未通过", "编译错误", "待提交"];

const handelQuery = () => {

}

const handleHome = () => {

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

const tableData = ref([]);
const tableProp = ref([]);

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
                <el-select v-model="filters.states" placeholder="状态" size="large" style="width: 240px">
                    <el-option v-for="(item, index) in options" :key="index" :label="item" :value="item" />
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
            @size-change="freshPageData"
            @current-change="freshPageData"
        />
    </div>
</div>

</template>
<style scoped>
.page-container{
    height: 100%;
    overflow: hidden;

    /* background-color: beige; */
    margin: 5px;

    display: flex;
    flex-direction: column;
    > .title-container {
        height: 50px;
        background-color: azure;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        border-radius: 10px 10px 0 0;
    }
    > .toolbar-container {
        height: 40px;
        background-color: beige;
        /* margin: 5px 10px 5px 20px; */
        padding: 5px 0 0 0;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    > .content-container {
        flex: 1;
        overflow: auto;
        background-color: azure;
    }
}
</style>