<!--
 * @Author: zzs 2650317325@qq.com
 * @Date: 2023-11-15 15:11:48
 * @LastEditors: zzs 2650317325@qq.com
 * @LastEditTime: 2023-11-28 13:43:52
 * @FilePath: \vue3-project\src\views\Main.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="200px" style="height: 100vh;border: 0px solid red;">
                <aside-component></aside-component>
            </el-aside>
            <el-container style="display: block;">
                <div style="height: 4.5vh;border: 1px solid rgba(0, 89, 255,.3);">
                    <head-component></head-component>
                </div>
                <div style="height: 2.6%;">
                    <tags-component></tags-component>
                </div>
                <el-main style="height: 100%;border: 0px solid red;"> <router-view /></el-main>
            </el-container>
        </el-container>
    </div>
</template>
  
<script>
// 引入你的组件
import AsideComponent from '@/components/Aside.vue';
import HeadComponent from '@/components/Head.vue';
import TagsComponent from '@/components/Tags.vue';

export default {
    components: {
        HeadComponent,
        AsideComponent,
        TagsComponent,
    },
};
</script>
  