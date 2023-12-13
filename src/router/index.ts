/*
 * @Author: zzs 2650317325@qq.com
 * @Date: 2023-11-13 14:22:37
 * @LastEditors: zzs 2650317325@qq.com
 * @LastEditTime: 2023-12-01 09:28:57
 * @FilePath: \vue3-project\src\router\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import main from '../views/Main.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'main',
    component: main,
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("../views/Index.vue"),
      },
      {
        path: "/equipmentClassification",
        name: "equipmentClassification",
        component: () => import("../views/deviceManage/EquipmentClassification.vue"),
      },
      {
        path: "/equipmentAssets",
        name: "equipmentAssets",
        component: () => import("../views/deviceManage/EquipmentAssets.vue"),
      },
      {
        path: "/pointManagement",
        name: "pointManagement",
        component: () => import("../views/deviceManage/PointManagement.vue"),
      },
      {
        path: "/test1",
        name: "test1",
        component: () => import("../views/test/test1.vue"),
      },
      {
        path: "/test2",
        name: "test2",
        component: () => import("../views/test/test2.vue"),
      },
      {
        path: "/test3",
        name: "test3",
        component: () => import("../views/test/test3.vue"),
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  }
  ,
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/Test.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router
