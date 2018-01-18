<template>
  <div class="container middle-screen">
    <div class="row">
      <div class="container col">
        <div class="features">
          <h1>Connected with the world</h1>
          <h3><i class="ion-ios-search"></i> Discover new things</h3>
          <h3><i class="ion-ios-paperplane-outline"></i> Share with the world your ideas</h3>
          <h3><i class="ion-ios-world-outline"></i> Know what's happening with us</h3>
          <h3><i class="ion-ios-bell-outline"></i> Get in the moment updates on the things that interest you</h3>
        </div>
      </div>
      <div class="col float-right">
        <div id="createAccount" v-if="newUser">
          <registration></registration>
        </div>
        <div id="loginAccount" v-if="!newUser">
          <Login></Login>
        </div>
        <button type="button" v-on:click="changeForm" class="btn btn-info"><span v-bind:value="buttonText">{{buttonText}}</span></button>

      </div>
    </div>
  </div>
</template>

<script>
import Registration from './registration'
import Login from './login'
export default {
  components: {
    'registration': Registration,
    'Login': Login
  },
  data () {
    return {
      newUser: true,
      buttonText: 'Have an account?'
    }
  },
  methods: {
    changeForm () {
      this.newUser = !this.newUser
      if (this.newUser) {
        this.buttonText = 'Have an account?'
      }
      else {
        this.buttonText = 'Create an account'
      }
    }
  }
}
</script>

<style scoped>
.middle-screen{
  padding-top: 50px;
}
i{
  font-size: 40px;
  margin-right: 20px;
}
h3{
  font-size: 18px;
  color: #757575;
}
.features{
  margin-top: 50px;
}
</style>
