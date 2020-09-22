<template>
  <titlebar></titlebar>
  <div id="RouterMenu">
  <router-link :to ="{name:'Main'}">Home</router-link> |
  <router-link :to ="{name:'proxy'}">proxy</router-link>
  </div>
  <router-view/>
</template>

<script>
import router from './router/index';
import titlebar from "./components/titlebar/titlebar.vue";

export default {
  name: 'App',
  components: {
    titlebar
  }
}
</script>

<style lang="scss" scoped>
#RouterMenu {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

</style>
