<template>
<div>
  <div class>
    <div class="col-12">
      <form @submit.prevent="register">

        <div class="form-group row">
          <h1>Registration</h1>
        </div>

        <div class="form-group row">
          <label class="col-3 col-form-label">Username</label>
          <div class="col-9">
            <input placeholder="Username" name="username" v-validate="'required|min:4|max:15'" v-model="username" :class="{'form-control': true, 'alert-danger': errors.has('username')}"
            type="text" id="username">
            <div v-show="errors.has('username')" class="invalid">{{ errors.first('username') }}</div>
          </div>
        </div>

        <div class="form-group row">
          <label class="col-3 col-form-label">Email</label>
          <div class="col-9">
              <input name="email" v-model="email" v-validate="'required|email'" :class="{'form-control': true, 'alert-danger': errors.has('email') }"
              type="text" placeholder="Email">
              <!-- <i v-show="errors.has('email')" class="alert alert-warning"></i> -->
              <div v-show="errors.has('email')" class="invalid">{{ errors.first('email') }}</div>
          </div>
        </div>

        <div class="form-group row">
          <label class="col-3 col-form-label">Password</label>
          <div class="col-9">
            <input placeholder="Password" name="password" v-validate="'required|min:8|max:32|regex:.*\\d+.*'" v-model="password" :class="{'form-control': true, 'alert-danger': errors.has('password')}"
            type="password" id="password">
            <div v-show="errors.has('password')" class="invalid">{{ errors.first('password') }}</div>
          </div>
        </div>

        <div class="form-group row">
          <label class="col-3 col-form-label">Password (Confirm)</label>
          <div class="col-9">
            <input placeholder="Password" name="passwordMatch" v-validate="'required|confirmed:password'" v-model="passwordMatch"
            :class="{'form-control': true, 'alert-danger': errors.has('passwordMatch')}"
            type="password" id="passwordMatch">
            <div v-show="errors.has('passwordMatch')" class="invalid">{{ errors.first('passwordMatch') }}</div>
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
        <div class="form-group">
          <button type="submit" class="float-right btn btn-success btn-lg">Register</button>
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
      required: 'The username is required',
      min: 'The username must be between 4-15 characters long',
      max: 'The username must be between 4-15 characters long'
    },
    email: {
      required: 'The email is required',
      email: 'This email is not valid'
    },
    password: {
      regex: 'The password must contain 1 number'
    },
    passwordMatch: {
      required: 'Password confirmation is required',
      confirmed: 'The password did not match'
    }
  }
}
Validator.localize('en', customErrors)
export default {
  data () {
    return {
      email: '',
      username: '',
      password: '',
      passwordMatch: '',
      errorsAPI: null,
      success: null
    }
  },
  methods: {
    register () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          AuthenticationService.register({
            username: this.username,
            email: this.email,
            password: this.password,
            passwordMatch: this.passwordMatch
          }).then(response => {
            this.success = true
            this.errorsAPI = null
          })
            .catch(e => {
              this.success = false
              this.errorsAPI = e.response.data.error
            })
        }
      })
    }
  }
}
</script>

<style scop>
.error_container{
 margin: 0%;
}
button{
  cursor: pointer;
  margin-bottom: 0%;
}
strong{
  font-size: 90%;
}
.invalid{
  color: red;
  font-size: 70%;
}
</style>
