/*
 * @Author: your name
 * @Date: 2020-08-22 09:36:48
 * @LastEditTime: 2021-02-03 14:17:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-vite\src\render\store\index.ts
 */
import {createStore} from 'vuex'

import { state } from "./state";
import { mutations } from "./mutations";



export const store = createStore({
  state:state,
  mutations:mutations,
  actions: {
  },
  getters: {
  },
  modules: {}
})


export type State = typeof store
