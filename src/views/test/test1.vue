
<template>
    <div class="container">
        <div class="screen-header">
            <div class="header-left"></div>
            <div class="header-right">
                <el-button type="primary" @click="isShow = true" class="mb-10">新建表单</el-button>
                <el-button type="success" class="mb-10">刷新</el-button>
            </div>
        </div>
        <my-table :table-data="tableData" :columns="tableColumns" :height="tableHeight" @handleEdit="TableEdit"
            @handleDelete="handleDelete" :stripe="true" :border="false" />

        <el-dialog title="对话框标题" v-model="isShow" width="30%">
            <my-form :formLabel="formLabel" :form="form" @changeSelect="handleChangeSelects" labelWidth="80px" />
            <!-- <my-form></my-form> -->
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="isShow = false">Cancel</el-button>
                    <el-button type="primary" @click="submit">
                        Confirm124
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <div class="foot">
            <MyPagination :current-page="configs.pageNo" :page-size="configs.pageSize" :total="configs.total"
                @handlePageChange="handlePageChange" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import MyTable from '@/components/package/Table.vue';
import MyForm from '@/components/package/Form.vue';
import MyPagination from '@/components/package/Pagination.vue';
import { listUser } from '@/api/index.js';
import { ElMessage, ElMessageBox } from 'element-plus'
const isShow = ref(false);
const tableData = ref([{}]);

const getUser = () => {
    let data = [
        { name: '1', age: 0, email: '123@qq.com', phone: '112' },
        { name: '2', age: 10, email: '12323@qq.com', phone: '213112' }
    ];
    tableData.value = data
};
const configs = reactive({
    pageNo: 1, // 当前页码
    pageSize: 10, // 每页的数据条数
    total: 0 //共几条
})
const handlePageChange = (newPage: number) => {
    configs.pageNo = newPage
    // getPageAllPoint()
};
const getPageAllPoint = () => {
    listUser(configs).then((res) => {
        tableData.value = res.data.records;
        configs.total = res.data.total
    })
}
const formLabel = reactive([
    {
        model: "userName",
        label: "用户名称",
        type: "input",
    },
    {
        model: "roleName",
        label: "角色",
        type: "input",
    },

    {
        model: "phone",
        label: "电话",
        type: "input",
    },
    {
        model: "email",
        label: "邮箱",
        type: "input",
    },
    {
        model: "createTime",
        label: "创建时间",
        type: "input",
    },
]);
const form = reactive({
    userName: '',
    roleName: '',
    phone: '',
    email: '',
    createTime: ''
})
const submit = () => {
    // isShow.value = false
};
const tableColumns = ref([
    { label: '姓名', prop: 'userName' },
    { label: '角色', prop: 'roleName' },
    { label: '邮箱', prop: 'email' },
    { label: '电话', prop: 'phone' },
    { label: '创建时间', prop: 'createTime' },
]);
const handleChangeSelects = (val: string) => {
    console.log('Received value:', val);
};
const TableEdit = (val: Record<string, any>) => {
    Object.assign(form, val);
    isShow.value = true
};
const handleDelete = (val: Record<string, any>) => {
    ElMessage({
        type: 'success',
        message: 'Delete completed',
    })
};
const tableHeight = ref('300px');
onMounted(getPageAllPoint);
</script>

<style lang="less" scoped></style>