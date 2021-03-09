<template>
  <div class="inline-block w-64 h-50">
  <!-- <div class="w-64 h-50"> @warning -->
    <vimg :data="data"
    :position="position"
    />
    <renamevil
    :placeholder="placeholder"
    :confirmPosition="confirmPosition"
    />
  </div>
</template>

<script lang='ts'>
import { defineComponent,PropType} from "vue";
import vimg  from "../container/Film/Img.vue";
import renamevil from "../Widgets/RenameEvil.vue";
export default defineComponent({
    props:{
        data:{
          type:String as PropType<string>,
          require:true
        },
        position:{
          type:Boolean
        },
        placeholder:{
          type:String
        },
        confirmPosition:{
          type:Boolean
        }
    },
    components:{
      vimg,
      renamevil
    }
})
</script>