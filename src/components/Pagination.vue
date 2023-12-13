<!--
 * @Author: zzs 2650317325@qq.com
 * @Date: 2023-08-28 11:24:04
 * @LastEditors: zzs 2650317325@qq.com
 * @LastEditTime: 2023-08-28 14:18:33
 * @FilePath: \shan_admin_blog\src\components\index\Pagination.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="page">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="config.pageNo"
            :page-sizes="[10, 20, 50, 100]" :page-size="config.pageSize" layout="total, sizes, prev, pager, next, jumper"
            :total="config.total">
        </el-pagination>
    </div>
</template>

<script>
export default {
    props: {
        config: Object,
    },
    methods: {
        // 改变页面数据量
        handleSizeChange(val) {
            this.$emit("changePageSize", val,);
        },
        // 改变页码
        handleCurrentChange(val) {
            this.$emit("changePageNo", val,);
        }
    },
} 
</script>

<style></style>