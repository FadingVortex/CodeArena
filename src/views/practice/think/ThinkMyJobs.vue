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