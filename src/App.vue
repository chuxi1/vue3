<!--
 * @Author: zzs 2650317325@qq.com
 * @Date: 2023-11-13 14:22:37
 * @LastEditors: zzs 2650317325@qq.com
 * @LastEditTime: 2023-12-04 11:30:28
 * @FilePath: \vue3-project\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!--
 * @Author: zzs 2650317325@qq.com
 * @Date: 2023-11-13 14:22:37
 * @LastEditors: zzs 2650317325@qq.com
 * @LastEditTime: 2023-12-04 11:26:20
 * @FilePath: \vue3-project\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-config-provider :locale="zhCh">
    <router-view />
  </el-config-provider>
</template>
<script setup lang="ts">
import zhCh from 'element-plus/dist/locale/zh-cn.mjs'
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 905px;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
