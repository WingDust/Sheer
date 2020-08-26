<template>
<div></div>
</template>

<script lang="ts">
import { defineComponent, reactive,h, render } from "vue";
import Prism from 'prismjs';

export default  defineComponent({
    setup(props:any){

      class Temp {
        span:string
        private lines:number
        constructor(text:string) {
          this.span=text
          this.lines=0
        }
        getLines() {
         const re:RegExp = RegExp('\n(?!$)','g')
         const re1:RegExp = /\n(?!$)/g
        //  console.log(JSON.stringify(text));
        //  re1.exec(props.code)
         console.log();
        //  console.log(re1.exec(props.code));
        let num:any = this.span.trim().match(re1)
         this.lines = num.length
         return this
       }
        ctrate():string {
         let span:string = "<span></span>"
         const N = "\n"
         for (let i = 0; i < this.lines+1+2; i++) {
          // span = `${span.slice(0,6)}${span.slice(0,6)}${i}${span.slice(-7)}${span.slice(6,span.length)}`
          span = `${span.slice(0,6)}${span.slice(0,6)}${span.slice(-7)}${span.slice(6,span.length)}`
         }
         span = `${span.slice(0,5)} aria-hidden="true" class="line-numbers-rows"${span.slice(5,span.length)}`
         return span
       }
      }

      let t = new Temp(props.code)
      // console.log(t.getLines().ctrate());
      const codes = Prism.highlight(props.code,Prism.languages["js"])+t.getLines().ctrate()
      // console.log(codes);

        // console.log(props.code);
        const state = reactive({count:0})
        function increment() {
          state.count++
        }

        // return () => {
        //   return h('div',{onClick:increment},state.count)
        // }
        return () => {
          return h('pre',{class:"language-js line-numbers"},h('code',{innerHTML:codes}))
        }

    },
  props: {
    code: {
      type: String
    },
    inline: {
      type: Boolean,
      default: false
    },
    language: {
      type: String,
      default: 'markup'
    }
  },
  components:{
  }

})
</script>

<style>

</style>