<template>
  <div id="app" class="bare">
    <HelloWorld/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Vuetify from 'vuetify'
export default {
  name: 'App',
  vuetify: new Vuetify(),
  components: {
    HelloWorld
  }
}
</script>

<style>
.bare {
  background-color: #d1dec3;
  height:100;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #00000A;
  height: 100vh;
}
</style>
