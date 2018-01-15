<template>
  <div class="container">
    <form>

      <div class="form-group-row">
        <h1>Registration</h1>
      </div>

      <div class="form-group row">
        <label class="col-2 col-form-label">Username</label>
        <div class="col-10">
          <input placeholder="Username" name="username" v-model="username" class="form-control" type="text" id="username">
        </div>
      </div>

      <div class="form-group row">
        <label class="col-2 col-form-label">Email</label>
        <div class="col-10">
          <input placeholder="example@example.com" name="email" v-model="email" class="form-control" type="email" id="example-email-input">
        </div>
      </div>

      <div class="form-group row">
        <label class="col-2 col-form-label">Password</label>
        <div class="col-10">
          <input placeholder="Password" name="password" v-model="password" class="form-control" type="password" id="password">
        </div>
      </div>

      <div class="form-group row">
        <label class="col-2 col-form-label">Re-Enter Password</label>
        <div class="col-10">
          <input placeholder="Password" name="passwordMatch" v-model="passwordMatch" class="form-control" type="password" id="passwordMatch">
        </div>
      </div>

      <div class="form-group" v-if="errors && errors.length > 0">
        <ul class="list-group">
          <li v-for="error in errors" v-bind:key="error" class="list-group-item list-group-item-danger">{{error.msg}}</li>
        </ul>
      </div>

      <button type="button" @click="register" class="float-right btn btn-success btn-lg">Register</button>

    </form>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      username: '',
      password: '',
      passwordMatch: '',
      errors: null
    }
  },
  methods: {
    async register () {
      try {
        await AuthenticationService.register({
          username: this.username,
          email: this.email,
          password: this.password,
          passwordMatch: this.passwordMatch
        })
        this.errors = null
        this.$router.push('/')
      } catch (error) {
        this.errors = error.response.data.error
      }
    }
  }
}
</script>

<style scop>
.error{
  color: red;
}
button{
  cursor: pointer;
}
</style>
