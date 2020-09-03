// import Vue from 'vue'
import {createStore} from 'vuex'

import { Proxy_FLAG ,runtime} from "../node/read";

// const F = new ReadFileDir()
// F.readfilmPath()
// let Trees = F.readFileRecurise()

console.log(Proxy_FLAG);

runtime()




export const state = createStore({
  state: {
    // 设置的储存的视频的根路径数组
    FilmPath: {
      data: true,
      status:""
    } //设为一个对象来,将数据和数据的状态绑定到一起
  },
  mutations: {
  },
  actions: {
  },
  getters: {
    getFilmPath(state) {
      return state.FilmPath
    }
  },
  modules: {}
})

export type State = typeof state
