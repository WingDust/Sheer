<!--
 * @Author: your name
 * @Date: 2020-11-01 16:09:13
 * @LastEditTime: 2021-02-04 13:22:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-vite\src\render\components\Tags\TagsContainer.vue
-->
<template>
      <div class="TagsContainer" :class="{hided:sibebar}" >
          <ul>
              <li :key="i" v-for="(tag,i) in tags">{{getTagPath(tag.dir)}}</li>
              <!-- <li class="fonticon-CHEVRON-RIGHT"></li> -->
          </ul>
      </div>
</template>

<script>
import "keyevent/keyevent_bg.wasm"
import init,{hidesibebar} from "keyevent/keyevent.js"
import {defineComponent,ref,computed} from "vue"
import { useStore } from "vuex";
import {  getTagPath } from "../../utils/utils.ts";
export default defineComponent({
    // async setup(props,context){
     setup(props,context){
    //    let wasm = await init()
    const store = useStore()
    const sibebar = computed(()=>store.state.View.sibebar)
    const tags = computed(() => store.state.FilmPath.checkline[0])
    // let a = ref(false)
    // let show = function() {
    //     // console.log(context);
    //     this.a = true
    // }
       return {sibebar,tags,getTagPath}
    }
})
</script>

<style lang="scss" scoped>
.TagsContainer{
    display: inline-block;
    width:0px;
    background-color: rgb(225,228,235);
    transition: width .4s;
    vertical-align: top;
    ul li{
        width:0px;
        opacity: 0;
        transition: width .4s,opacity .4s;
        list-style: none;
        margin: 10px 0 10px 0;
    }
    ul {
        width:0px;
        transition: width .4s;
    }
}

.hided{
    width: 274px;
    ul li{
        width: 274px;
        opacity: 1;
        list-style: none;
        margin: 10px 0 10px 0;
    }
}


</style>