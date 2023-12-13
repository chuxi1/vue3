<!--
 * @Author: zzs 2650317325@qq.com
 * @Date: 2023-11-13 14:22:37
 * @LastEditors: zzs 2650317325@qq.com
 * @LastEditTime: 2023-11-23 10:04:32
 * @FilePath: \vue3-project\src\views\HomeView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="container">
    <div class="login-container">
      <el-form label-width="100px" :model="formLabelAlign" style="max-width: 460px" ref="ruleFormRef">
        <el-form-item label="账号:">
          <el-input v-model="formLabelAlign.userAccount" />
        </el-form-item>
        <el-form-item label="密码:">
          <el-input v-model="formLabelAlign.userPwd" />
        </el-form-item>
        <el-button type="primary" @click="onSubmit(ruleFormRef)">注册</el-button>
      </el-form>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import { logins } from '@/api/index.js';
import { useRouter } from 'vue-router';
const formLabelAlign = reactive({
  userAccount: "",
  userPwd: "",
});

const router = useRouter(); // 获取路由实例

const onSubmit = () => {
  const data = {
    userAccount: formLabelAlign.userAccount,
    userPwd: formLabelAlign.userPwd,
  };

  logins(data).then((res) => {
    if (res.code == 200) {
      ElMessage.success(res.msg);
      router.push({ name: 'login' });
    } else {
      ElMessage.error(res.msg);
      router.push({ name: 'login' });
    }
  }).catch((error) => {
    console.error(error);
  });
};
</script>

<style lang="less">
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: url('../assets/00062-2167275567.png');


  .login-container {
    margin-right: 50px;
    justify-content: center;
    display: flex;
    align-items: center;
    height: 50%;
    border: 1px solid rgb(238, 226, 226);
    border-radius: 8px;
    min-width: 30%;
    background: rgba(235, 233, 233, 0.5);
  }
}
</style>