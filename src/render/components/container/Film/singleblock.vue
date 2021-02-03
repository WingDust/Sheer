<template>
  <div :key="data.dirname" v-for="data in datas">
    <img :src="`safe-file-protocol:://${data.dirname+'/'+data.filename}`" alt="">
    <div class="">{{data.filename}}</div>
  </div>
</template>

<script lang='ts'>
import { defineComponent,PropType } from "vue";
import { picture } from "../../../node/utilInterface";
export default defineComponent({
    setup(){

    },
    props:{
        datas:{
            // type:Array as PropType<picture[]>
            type: Object
        }
    }
})
</script>
<style lang="scss" scoped>

</style>
