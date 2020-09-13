<template>
  <div></div>
</template>

<script>
import { defineComponent,ref,reactive } from "vue";
import { useStore } from "vuex";
export default defineComponent ({
    setup(){
        const store = useStore()
        let ConfigMessage = reactive(store.state.ConfigYaml)

    }

})
</script>

<style>

</style>