<template>
  <div id="navbar-component">
    <div class="container">
      <div class="header clearfix">
        <nav>
          <ul class="nav nav-pills float-right">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
              <!-- <a class="nav-link" v-router="home">Home <span class="sr-only">(current)</span></a> -->
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">About</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Contact</a>
            </li>
          </ul>
        </nav>
        <router-link class="nav-link" to="/">
          <h3 class="text-muted float-left">Post | It</h3>
        </router-link>
      </div>
      <hr>
    </div> <!-- /container -->
  </div>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>
