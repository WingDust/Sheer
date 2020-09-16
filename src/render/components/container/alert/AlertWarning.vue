<template>
  <div class="alert alert-warning" v-if="flag">{{`你的配置文件有`}}</div>
  <div class="alert alert-danger" v-if="flag">{{`你的配置文件有`}}</div>
</template>

<script>
import { defineComponent,ref,reactive, } from "vue";
import { useStore } from "vuex";
export default defineComponent ({
    setup(){
        let flag = true;
        const store = useStore()
        let ConfigMessage = reactive(store.state.ConfigYaml)
        // effect(()=>{
        // })

        return {
          flag
        }

    }

})
</script>

<style>

</style>