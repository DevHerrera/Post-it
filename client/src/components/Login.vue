<template>
<div>
  <div class>
    <div class="col-12">
      <form @submit.prevent="login">
        <div class="form-group">
          <h1>Login</h1>
          <p class="text-muted">Post it know!</p>
        </div>

        <div class="form-group row">
          <label class="col-3 col-form-label">Username</label>
          <div class="col-9">
            <input placeholder="Username" name="username" v-validate="'required'" v-model="username" :class="{'form-control': true, 'alert-danger': errors.has('username')}"
            type="text" id="username">
            <div v-show="errors.has('username')" class="invalid">{{ errors.first('username') }}</div>
          </div>
        </div>

        <div class="form-group row">
          <label class="col-3 col-form-label">Password</label>
          <div class="col-9">
            <input placeholder="Password" name="password" v-validate="'required'" v-model="password" :class="{'form-control': true, 'alert-danger': errors.has('password')}"
            type="password" id="password">
            <div v-show="errors.has('password')" class="invalid">{{ errors.first('password') }}</div>
          </div>
        </div>

        <div v-if="errorsAPI && errorsAPI.length > 0" class="alert alert-danger" role="alert">
          <h4 class="alert-heading">Ups!</h4>
          <p>Aww It seems We have a problem with the following data.</p>
          <hr>
          <p class="mb-0">
            <ul class="list-group">
              <p class="mb-0" v-bind:key="error" v-for="error in errorsAPI">{{error.msg}}</p>
            </ul>
          </p>
        </div>
        <div v-if="success" class="alert alert-success" role="alert">
          Login successful
        </div>
        <div class="form-group">
          <button type="submit" class="float-right btn btn-color btn-lg">Login</button>
        </div>
      </form>
    </div>

  </div>
</div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import { Validator } from 'vee-validate'
var customErrors = {
  custom: {
    username: {
      required: 'The username is required'
    },
    password: {
      required: 'The Password is required'
    }
  }
}
Validator.localize('en', customErrors)
export default {
  data () {
    return {
      username: '',
      password: '',
      errorsAPI: null,
      success: false
    }
  },
  methods: {
    login () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          AuthenticationService.login({
            username: this.username,
            password: this.password
          }).then(response => {
            this.success = true
            this.errorsAPI = null
            this.cleanInput()
            this.$validator.pause()
            setTimeout(() => {
              this.$validator.resume()
            }, 400)
          })
            .catch(e => {
              this.success = false
              this.errorsAPI = e.response.data.error
            })
        }
      })
    },
    cleanInput () {
      this.username = ''
      this.password = ''
    }
  }
}
</script>

<style scop>
.error_container{
 margin: 0%;
}
.btn-color{
  background-color: #e27d60;
  color: #edf5e1;
}
strong{
  font-size: 90%;
}
.invalid{
  color: #E64A19;
  font-size: 70%;
}
</style>
