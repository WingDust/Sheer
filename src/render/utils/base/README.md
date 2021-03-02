
## Emitter Analysis
  -  get event construtor
    - 通过 _options 属性依赖注入监听函数，即 _options 中保存了监听函数
    - 当实例初始化时，通过 getter 将 _options 中的监听函数，生成默认事件函数
  - 问题
    - _options 中的函数是在 fire 后执行，还是在 fire 前执行
      - 在 new Emitter 实例化时不执行，在返回出去的事件函数被添加上监听函数后执行

## Event Analysis
  - fromNodeEventEmitter
    - map
      - 本身为具有默认值为传入什么返回什么的函数的参数
      - 它函数的返回值要作为 Emitter 实例 fire 的入参