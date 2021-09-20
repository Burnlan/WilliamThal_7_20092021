<template>
  <Header />
  <div class="container-xxl row">
  <SideBar />
    <div class="col-9">

      <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>

    <router-view/>
    </div>
  

  </div>
  
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import SideBar from '@/components/SideBar.vue'

export default {
  name: 'App',
  components: {
    Header,
    SideBar
  }
}
</script>


<style lang="scss">
h1, h2, h3 {
  font: $latoBold;
}

p, a, li {
  font: $latoReg;
}

</style>
