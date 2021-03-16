<template>
    <span>{{time}}</span>
</template>
<script lang="ts" setup>
import { ref } from "vue"
// const timeFromDate = (date:Date) => date.toTimeString().slice(0,8)
const timeFromDate = (date:Date) => date.toTimeString().slice(0,5)
let t:string=timeFromDate(new Date())
setInterval(()=>{
    t = timeFromDate(new Date())
},1000*60)
const time = ref(t);
// export default {name:'time'}
</script>