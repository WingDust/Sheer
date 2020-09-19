// import Vue from 'vue'
import {createStore} from 'vuex'

import { runtime} from "../node/read";
import { state } from "./state";
import { mutations } from "./mutations";


export const store = createStore({
  // state: {
  //   FilmPath: {
  //     Trees: Object.create(null),
  //     status:""
  //   },
  //   Flag:{
  //     flag:false,
  //     times:0
  //   },
  //   ConfigYaml:{
  //     Yaml:Object.create(null),
  //     status:0
  //   }
  // },
  state:state,
  mutations:mutations,
  actions: {
  },
  getters: {
  },
  modules: {}
})


runtime()
// export type State = typeof store
