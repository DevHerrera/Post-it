<template>
  <div class="container middle-screen">
    <div class="row">
      <div class="container col">
        <div class="features">
          <h1>Connected with the world</h1>
          <h3>Discover new things <i class="ion-ios-search"></i></h3>
          <h3>Share with the world your ideas <i class="ion-ios-paperplane-outline"></i></h3>
          <h3>Know what's happening with us <i class="ion-ios-world-outline"></i></h3>
          <h3>Get in the moment updates on the things that interest you <i class="ion-ios-bell-outline"></i></h3>
        </div>
      </div>
      <div class="col float-right">
        <registration></registration>
      </div>
    </div>
  </div>
</template>

<script>
import Registration from './registration'
export default {
  components: {
    'registration': Registration
  }
}
</script>

<style scoped>
.middle-screen{
  padding-top: 50px;
}
i{
  font-size: 40px;
  margin-left: 20px;
}
h3{
  font-size: 18px;
  color: #757575;
}
.features{
  margin-top: 50px;
}
</style>
