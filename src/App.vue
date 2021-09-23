<template>
  <Header :user="user"/>
  
  <div class="container-fluid">
      <router-view/>
  </div>
  
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'

export default {
  name: 'App',
  components: {
    Header,
  },
  data() {
    return {
      //we use this value to check if a user is connected, by default it's false
      isConnected: false,
      user: ""
    }
  },
  methods: {
    //this method whenever the app is mounted, and automatically redirect a user to their feed provided the right cookie exists 
    
  },
  mounted() {
    
  }
}
</script>


<style lang="scss">
h1, h2, h3 {
  font: $latoBold;
}

p, a, li, label {
  font: $latoReg;
}

</style>
