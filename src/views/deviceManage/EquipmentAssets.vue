
<template>
    <div class="container">
        <div class="screen-header">
            <div class="header-left"></div>
            <div class="header-right">
                <el-button type="primary" @click="isShow = true" class="mb-10">新建表单</el-button>
                <el-button type="success" class="mb-10" @click="refresh()">刷新{{ user.name }}</el-button>
            </div>
        </div>
        <my-table :table-data="tableData" :columns="tableColumns" :height="tableHeight" @handleEdit="TableEdit"
            @handleDelete="handleDelete" :stripe="true" :border="false" />
        <el-dialog title="对话框标题" v-model="isShow" width="30%" style="min-width: 380px;">
            <my-form :formLabel="formLabel" :form="form" @changeSelect="handleChangeSelects" labelWidth="130px"
                @submit="submit" @cancel="isShow = false" />
        </el-dialog>
        <div class="foot">
            <MyPagination :current-page="configs.pageNo" :page-size="configs.pageSize" :total="configs.total"
                @handleCurrentChange="handlePageChange" @handleSizeChange="handleSizeChange" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import MyTable from '../../components/package/Table.vue';
import MyForm from '../../components/package/Form.vue';
import MyPagination from '../../components/package/Pagination.vue';
import { listUser } from '../../api/index';
import { ElMessage } from 'element-plus'
const isShow = ref(false);
const tableData = ref([{}]);
const getUser = () => {
    const name = ref(1)
    const setName = () => {
        name.value = configs.pageNo
    }
    return {
        name,
        setName
    }
};
const user = getUser();

const configs = reactive({
    pageNo: 1, // 当前页码
    pageSize: 10, // 每页的数据条数
    total: 0 //共几条
})
const refresh = () => {
    user.setName()
}

const handlePageChange = (newPage: number) => {
    configs.pageNo = newPage
    getPageAllPoint()
};
const handleSizeChange = (newPage: number) => {
    configs.pageSize = newPage
    getPageAllPoint()
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
    isShow.value = false
};
const tableColumns = ref([
    { label: '姓名', prop: 'userName', hidden: true },
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