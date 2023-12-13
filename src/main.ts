/*
 * @Author: zzs 2650317325@qq.com
 * @Date: 2023-11-13 14:22:37
 * @LastEditors: zzs 2650317325@qq.com
 * @LastEditTime: 2023-12-04 11:23:13
 * @FilePath: \vue3-project\src\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElIconList from '@element-plus/icons-vue'
import axios from 'axios';
import '@/style/index.less'

const app = createApp(App);

for (const name in ElIconList) {
    app.component(name,(ElIconList as any)[name])
}

// 注册全局依赖，如 Vuex 和 Vue Router
app.provide('$axios', axios);
app.use(store);
app.use(router);
// 注册 Element Plus 插件
app.use(ElementPlus);


app.mount("#app");