<template>
<div id="RouterMenu">
  <router-link :to ="{name:'Main'}">Home</router-link> |
  <router-link :to ="{name:'proxy'}">proxy</router-link>
</div>
  <router-view/>
</template>

<script>
import router from './router/index';

export default {
  name: 'App',
  components: {
  }
}
</script>
