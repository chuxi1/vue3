
<template>
    <div class="container">
        <div class="screen-header">
            <div class="header-left">
                <el-input v-model="input1" class="mr-10" placeholder="Pick a date" size="small" :suffix-icon="Calendar"
                    style="width: 200px;height: 35px;" />
                <el-input v-model="input2" class="w-50 m-2" placeholder="Type something" size="large" :prefix-icon="Search"
                    style="width: 200px;height: 35px;" />
            </div>
            <div class="header-right">
                <el-button type="primary" @click="isShow = true" class="mb-10">新增分类</el-button>
                <el-button type="success" class="mb-10">刷新</el-button>
            </div>
        </div>
        <my-table :table-data="tableData" :columns="tableColumns" :height="tableHeight" @handleEdit="TableEdit"
            @handleDelete="handleDelete" :stripe="true" :border="false" />
        <el-dialog :title="operateType == 'add' ? '新增分类' : '修改分类'" v-model="isShow" width="30%" style="min-width: 380px;">
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
import { ref, onMounted, reactive, watch } from 'vue';
import MyTable from '../../components/package/Table.vue';
import MyForm from '../../components/package/Form.vue';
import MyPagination from '../../components/package/Pagination.vue';
import { pageAllDeviceClass, addDeviceClass, updateDeviceClass, delDeviceClass, } from '../../api/index';
import { handleSuccess, selectApi } from '../tool/success';
import { Calendar, Search } from '@element-plus/icons-vue'
const input1 = ref('')
const input2 = ref('')
const isShow = ref(false);
const operateType = ref('add');
const tableData = ref([{}]);
const configs = reactive({
    pageNo: 1, // 当前页码
    pageSize: 5, // 每页的数据条数
    total: 0 //共几条
})
const handlePageChange = (newPage: number) => {
    configs.pageNo = newPage
    getPageAllDeviceClass()
};
const handleSizeChange = (newPage: number) => {
    configs.pageSize = newPage
    getPageAllDeviceClass()
};
const getPageAllDeviceClass = () => {
    pageAllDeviceClass(configs).then((res) => {
        selectApi(res, () => {
            tableData.value = res.data.records
            configs.total = res.data.total
        })
    });
}
const formLabel = reactive([
    {
        model: "deviceClassName",
        label: "设备分类名称",
        type: "input",
    },

]);
const form = reactive({
    deviceClassName: ''
})
const submit = () => {
    const apiFunction = operateType.value === 'add' ? addDeviceClass : updateDeviceClass;
    apiFunction(form).then((res) => {
        handleSuccess(res, () => {
            getPageAllDeviceClass();
            isShow.value = false;
        });
    });
};
const tableColumns = ref([
    { prop: "id", label: "分类ID" },
    { prop: "deviceClassName", label: "设备分类名称" },
]);
const handleChangeSelects = (val: string) => {
    console.log('Received value:', val);
};
const TableEdit = (val: Record<string, any>) => {
    operateType.value = 'edit'
    Object.assign(form, val);
    isShow.value = true
};
const handleDelete = (val: Record<string, any>) => {
    delDeviceClass({ id: val.id }).then(res => {
        handleSuccess(res, () => {
            getPageAllDeviceClass();
        });
    })
};
watch(
    () => isShow.value,
    (newValue) => {
        if (!newValue) {
            operateType.value = 'add'
            form.deviceClassName = ''
        }
    }
);
const tableHeight = ref('300px');
onMounted(() => {
    getPageAllDeviceClass();
});
</script>

<style lang="less" scoped></style>