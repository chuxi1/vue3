<template>
    <el-pagination :current-page="currentPage" :page-size="pageSize" :page-sizes="[5, 10, 20, 50]"
        layout="total, sizes, prev, pager, next, jumper" :total="total" :background="background" :small="small"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
</template>

<script>
import { ref } from 'vue';

export default {
    props: {
        currentPage: Number,
        pageSize: Number,
        total: Number,
    },

    emits: ['handleSizeChange', 'handleCurrentChange', 'background'],
    setup(props, { emit }) {
        const small = ref(true)
        const background = ref(true)
        const handleSizeChange = (newPage) => {
            emit('handleSizeChange', newPage);
        };
        const handleCurrentChange = (newPage) => {
            emit('handleCurrentChange', newPage);
        };

        return {
            handleSizeChange,
            handleCurrentChange,
            background, small
        };
    },
};
</script>