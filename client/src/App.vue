<template>
  <div id="app">
    <Navbarcomponent></Navbarcomponent>

    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/NavBar'
export default {
  name: 'app',
  components: {
    'Navbarcomponent': Navbar
  }
}
</script>

<style>
  #app {
    padding: 24px;
  }
</style>
