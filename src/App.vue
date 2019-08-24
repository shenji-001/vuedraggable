<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <keep-alive :include="include" :exclude="exclude">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import { routes } from './router'
export default {
  name: 'App',
  data () {
    let incldue = []
    let exclude = []
    routes.forEach(({ name, meta }) => {
      if (name) {
        exclude.push(name)
      } else {
        incldue.push(name)
      }
    })
    return {
      include: incldue.join(','),
      exclude: exclude.join(',')
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
