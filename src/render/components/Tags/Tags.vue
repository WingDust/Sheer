<template>
      <div class="TagsContainer" :class="{hided:sibebar}" >
          <aside>
          <ul>
              <li :key="i" v-for="(tag,i) in tags">{{getTagPath(tag)}}</li>
              <!-- <li class="fonticon-CHEVRON-RIGHT"></li> -->
          </ul>
          </aside>
      </div>
</template>

<script>
import {defineComponent,ref,computed} from "vue"
import { useStore } from "vuex";
import {  getTagPath } from "../../../utils/node/Fn";
export default defineComponent({
    setup(props,context){
    const store = useStore()
    const sibebar = computed(()=>store.state.View.sibebar)
    const tags = computed(() => store.state.View.tagline)
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