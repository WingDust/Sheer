<template>
<div class="row">
  <div class="alert alert-warning fade in" v-if="flag===11">{{`你的配置文件有`}}</div>
  <div class="alert alert-danger " v-if="flag">{{`你的配置文件有`}}</div>
</div>
</template>

<script lang="ts">
import { defineComponent,reactive,watchEffect ,} from "vue";
import { useStore } from "vuex";
import { MutationTypes } from "../../../store/mutations";
import { ConfigYaml } from "../../../node/config";
const fs = require("fs")
export default defineComponent ({
    setup(){
        let flag = 1;
        const store = useStore()
        console.log(store.state.ConfigYaml);
        // watchEffect(()=>{
        //   console.log(store.state.ConfigYaml);
        // })

const enum ValueError{
  None=1,     //0
  filmNone=11 ,//1
  filmPanic=20,//2
  storeNone=31,//3
  storePanic=40//4
}
/**
 * 第一位表示错误是什么，第二位表示错误等级
 * 1 空 语法错误 
 * 11 film 为空
 * 20 film 为非路径数组
 * 31 store 为空
 * 40 store 为非路径数组
 */
// 值没有 值错误 有两个所以是 4 种可能
function valuenSure(p:ConfigYaml | null) {
  if (p === null){// yaml 为空文件或语法错误
     // 默认为 正常运行
    return store.commit(MutationTypes.setConfigYamlStatus,ValueError.None)
  }
  if (p!.film === null) {// film 为空
    return store.commit(MutationTypes.setConfigYamlStatus,ValueError.filmNone)
  }
  for (let i = 0; i < p!.film.length; i++) {
    if(!fs.existsSync(p!.film[i])){
    return store.commit(MutationTypes.setConfigYamlStatus,ValueError.filmPanic)
    }
  }
  if (p!.store === null) {
    return store.commit(MutationTypes.setConfigYamlStatus,ValueError.storeNone)
  }
  for (let i = 0; i < p!.store.length; i++) {
    if(!fs.existsSync(p!.store[i])){
    return store.commit(MutationTypes.setConfigYamlStatus,ValueError.storePanic)
    }
  }
}

valuenSure(store.state.ConfigYaml.Yaml)
flag = store.state.ConfigYaml.status
console.log(flag);

        return {
          flag
        }
    }

})
</script>

<style lang="scss" scoped>
.row{
  flex-direction: column;
  position: fixed;
  top: 0;
  left: calc(100px + (100%-1000px)*0.75);
  width: 300px !important;

  .alert-danger{
    order: 1;
  }
  .alert-warning{
    order: 2;
  }

}

</style>