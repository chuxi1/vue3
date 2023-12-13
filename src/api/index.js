/*
 * @Author: zzs 2650317325@qq.com
 * @Date: 2023-11-13 17:24:30
 * @LastEditors: zzs 2650317325@qq.com
 * @LastEditTime: 2023-12-01 09:54:17
 * @FilePath: \vue3-project\src\api\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import request from "./request"

export const logins = (data) => {
    return request({
        url: '/user/login',
        method: 'POST',
        data: data
    })
}

export const listUser = (data) => {
    return request({
        url: '/user/listUser',
        method: 'POST',
        data: data
    });
};

export const userMenus = (data) => {
    return request({
        url: "/menus/userMenus",
        method: "POST",
        data
    })
}

//查询分页设备分类
export const pageAllDeviceClass = (data) => {
    return request({
        url: '/deviceManagement/pageAllDeviceClass',
        method: 'POST',
        data: data
    })
}


//添加设备类
export const addDeviceClass = (data) => {
    return request({
        url: '/deviceManagement/addDeviceClass',
        method: 'POST',
        data: data
    })
}


//更新设备分类
export const updateDeviceClass = (data) => {
    return request({
        url: '/deviceManagement/updateDeviceClass',
        method: 'POST',
        data: data
    })
}

//删除设备分类
export const delDeviceClass = (data) => {
    return request({
        url: '/deviceManagement/delDeviceClass',
        method: 'POST',
        data: data
    })
}
