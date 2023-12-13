<!--
 * @Author: zzs 2650317325@qq.com
 * @Date: 2023-11-15 14:48:30
 * @LastEditors: zzs 2650317325@qq.com
 * @LastEditTime: 2023-11-30 10:56:25
 * @FilePath: \vue3-project\src\components\Head.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="container">
        <div class="left">首页<div v-if="tag">&nbsp;/ {{ tag.className }}</div>
        </div>
        <div class="right">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <el-image :src="imageHead" style="min-width: 40px;"></el-image>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="personalInformation">个人信息</el-dropdown-item>
                        <el-dropdown-item @click="logout">注销登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>

        </div>
    </div>
</template>
  
<script>
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus'
import { mapState, useStore } from 'vuex';

export default {
    className: 'Head',
    computed: {
        ...mapState(['tag']),
    },
    setup() {
        const store = useStore();
        const router = useRouter(); // 获取路由实例
        const imageHead = require('@/assets/image/portrait.png');
        const logout = () => {

            ElMessageBox.confirm(
                '确定退出吗？',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            )
                .then(() => {
                    store.commit("clearToken");
                    store.commit("clearMenu");
                    ElMessage({
                        type: 'success',
                        message: '退出成功',
                    })
                    router.push('/login');
                })
                .catch(() => {

                })

        };
        const personalInformation = () => {
            // Redirect to the personal information page
            // router.push('/personal-information');
        };

        return {
            imageHead,
            logout,
            personalInformation,
        };
    }
}
</script>
  
<style lang="less" scoped>
.container {
    display: flex;
    // align-items: center;
    // justify-content: center;
    width: 100%;

    .left {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border: 0px solid red;
        width: 97%;
        margin-left: 20px;
    }

    .right {
        display: flex;
        justify-content: flex-end;
        border: 0px solid red;
        width: 3%;
        margin-right: 40px;
    }
}
</style>