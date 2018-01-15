<template>
  <div class="container">
    <div class="jumbotron">
      <h1 class="display-3">Share eveything you want</h1>
      <p class="lead">Get feedback from your work!</p>
      <p><router-link class="btn btn-lg btn-success" role="button" to="/user/signup">Sign up today</router-link></p>
    </div>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  name: 'Home',
  data () {
    return {
      message: null
    }
  },
  mounted () {
    AuthenticationService.home()
      .then(response => {
        console.log(response.data)
      })
      .catch(e => {
        console.log('ERROR')
      })
  }
}
</script>
