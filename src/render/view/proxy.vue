<template>
  <div>
    <pre   class="line-numbers language-js">
      <code class="language-js ">
var pipe = function (value) {
  var funcStack = [];
  var oproxy = new Proxy({} , {
    get : function (pipeObject, fnName) {
      if (fnName === 'get') {
        return funcStack.reduce(function (val, fn) {
          return fn(val);
        },value);
      }
      funcStack.push(window[fnName]);
      return oproxy;
    }
  });

  return oproxy;
}

var double = n => n * 2;
var pow    = n => n * n;
var reverseInt = n => n.toString().split("").reverse().join("") | 0;

pipe(3).double.pow.reverseInt.get; // 63
      </code></pre>
      <button class="btn btn-primary">test</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive,h } from "vue";
// import Prism from 'prismjs';
// import Prism from 'vue-prism-component';
export default defineComponent({
  setup() {

  },
  components:{
  }
});
</script>
>

<style lang="scss" scoped>
</style>
