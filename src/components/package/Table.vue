<!--
 * @Author: zzs 2650317325@qq.com
 * @Date: 2023-11-23 14:07:12
 * @LastEditors: zzs 2650317325@qq.com
 * @LastEditTime: 2023-12-01 10:50:10
 * @FilePath: \vue3-project\src\components\package\Table.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
    <el-table :data="tableData" :stripe="stripe" :border="border">
        <el-table-column v-for="column in columns" :key="column.prop" :label="column.label"
            :prop="column.prop"></el-table-column>
        <el-table-column v-if="!columns[0].hidden == true" label="操作">
            <template #default="scope">
                <el-button @click="() => handleEdit(scope.row)" size="small" type="warning">编辑</el-button>
                <el-button @click="() => handleDelete(scope.row)" size="small" type="danger">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>
  
<!-- <script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue';

const { tableData, columns, stripe, border } = defineProps(['tableData', 'columns', 'stripe', 'border']);
const emit = defineEmits();

const showOperationColumn = computed(() => {
    return tableData.some((row: any) => !row.showEdit || !row.showDelete);
});

const handleEdit = (row: string) => {
    emit('handleEdit', row);
};

const handleDelete = (row: string) => {
    emit('handleDelete', row);
};
</script> -->
<script>
import { ElMessage, ElMessageBox } from 'element-plus'
export default {
    props: {
        tableData: {
            type: Array,
            required: true,
        },
        columns: {
            type: Array,
            required: true,
        },
        stripe: Boolean,
        border: Boolean,
    },

    setup(props, { emit }) {
        const handleEdit = (row) => {
            emit('handleEdit', row);
        };
        const handleDelete = (row) => {
            ElMessageBox.confirm('是否删除该条数据', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                emit('handleDelete', row);
            })
                .catch(() => { })
        };

        return {
            handleEdit,
            handleDelete,
        };
    },
};
</script>