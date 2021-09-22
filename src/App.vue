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
      //we use this value to check if a user is conencted, by default it's false
      isConnected: false,
      user: ""
    }
  },
  methods: {
    async checkToken() {
      console.log("checking tokens");
      //we check if our "token" cookie exist
      if (document.cookie.split(';').some((item) => item.trim().startsWith('token='))) {
        console.log("Token cookie exists !")
        //if the cookie exist, we check that it's valid using our "authenticate" route
        let response = await fetch("http://localhost:3000/api/authenticate")
        if (response.ok) {
          //if the token was good we get a user in response
          let userData = await response.json(); 
          console.log("valid token with user id :"+userData)
        }
      } else {
        console.log("Token cookie doesn't exist !")
      }
    }
  },
  mounted() {
    this.checkToken();
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
