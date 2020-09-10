// import Vue from 'vue'
import {createStore,MutationTree} from 'vuex'

// import { Tree } from "../js/DataStructure/Tree";

import { runtime} from "../node/read";

runtime()

export const state = createStore({
  state: {
    FilmPath: {
      Trees: Object.create(null),
      status:""
    },
    Flag:{
      flag:false,
      times:0
    },
    ConfigYaml:{
      status:0
    }
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
