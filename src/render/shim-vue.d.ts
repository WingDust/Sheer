declare module '\*.vue' {
  import { defineComponent } from 'vue'
  const Component: ReturnType<typeof defineComponent>
  export default Component
}
declare module 'prismjs'{
  import  Prism from 'prismjs'
  export default Prism
}