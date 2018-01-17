<template>
  <div id="app">
    <Navbarcomponent></Navbarcomponent>

    <router-view/>
    <FooterComponent></FooterComponent>
  </div>
</template>

<script>
import Navbar from './components/NavBar'
import Footer from './components/Footer'

export default {
  name: 'app',
  components: {
    'Navbarcomponent': Navbar,
    'FooterComponent': Footer
  }
}
</script>

<style>
  #app {
    padding: 24px;
  }
</style>
