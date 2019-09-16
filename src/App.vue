<template>
  <main>
    <app-header></app-header>
    <router-view />
  </main>
</template>

<script>
import Header from './components/Header.vue'

export default {
  components: {
    appHeader: Header,
  },
}
</script>

<style lang="scss">
body {
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
