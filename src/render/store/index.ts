/*
 * @Author: your name
 * @Date: 2020-08-22 09:36:48
 * @LastEditTime: 2021-01-26 13:06:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-vite\src\render\store\index.ts
 */
// import Vue from 'vue'
import {createStore} from 'vuex'

import { runtime} from "../node/read";
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


runtime()
export type State = typeof store
