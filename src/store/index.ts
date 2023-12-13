/*
 * @Author: zzs 2650317325@qq.com
 * @Date: 2023-11-15 15:13:00
 * @LastEditors: zzs 2650317325@qq.com
 * @LastEditTime: 2023-12-01 08:59:37
 * @Filecode: \vue3-project\src\store\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { createStore } from 'vuex';
import Cookies from 'js-cookie';
interface RootState {
  token: string;
  tag: object;
  tagList: Array<{ className: string,code:string }>;
}
const store = createStore<RootState>({
  state: {
    token: '',
    tag: {
      className: '首页',
      code:'home'
    },
    tagList: [
      { className: '首页',code:'home', }
    ]
  },
  getters: {
    getTagList: state => {
      return state.tagList;
    },
    getTag: state => { 
      return state.tag;
    },
    getToken: state => {
      return state.token;
    }
  },
  mutations: {
    setToken(state, newToken: string) {
      state.token = newToken;
    },
    setTag(state, newTag) {
      const tagExists = state.tagList.some(tag => tag.className=== newTag.className);
      if (!tagExists) {
        state.tagList.push(newTag);
      }
      state.tag = newTag;
    },
    setList(state, netSetList) {
      state.tag=netSetList
    },
    clearToken(state) {
      state.token = ''
      Cookies.remove('token')
    },
    clearMenu(state) {
      state.tag = []
  },
    removeTag(state, newTag) { 
      const indexToRemove = state.tagList.findIndex((tag) => tag.className === newTag.className);
     if (indexToRemove !== -1) {
      state.tagList.splice(indexToRemove, 1);
     }
    }
  },
  actions: {
  },
  modules: {
  },
});

export default store;