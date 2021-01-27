<!--
 * @Author: your name
 * @Date: 2020-09-10 17:32:51
 * @LastEditTime: 2021-01-27 15:59:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-vite\src\render\components\container\alert\AlertWarning.vue
-->
<template>
<div class="row">
  <!-- 我得延时显示 -->
  <div class="alert alert-warning fade " v-show="flag===11">{{`你的配置文件有`}}</div>
  <div class="alert alert-danger " v-show="flag">{{`你的配置文件有`}}</div>
</div>
</template>

<script lang="ts">
import { defineComponent,reactive,watchEffect ,} from "vue";
import { useStore } from "vuex";
import { MutationTypes } from "../../../store/mutations";
export default defineComponent ({
    setup(){
        let flag = 1;

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
  top: 64px;
  left: calc(100px + (100%-1000px)*0.75);
  word-break: keep-all;
  z-index: 1;

  // .fade{
  //   transition: opacity .2s linear ;
  // }


  .alert-danger{
    order: 1;
    border-bottom: 5px solid orange;
    border-right: 5px solid orange;
  }
  .alert-warning{
    order: 2;
  }

}

</style>