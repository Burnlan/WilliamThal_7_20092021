<template>
  <Header :isConnected="isConnected" />
  
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
      //we use this value to check if a user is connected, by default it's false and no user data is provided
      isConnected: false,
    }
  },
  methods: {
    //this method is called whenever the app is mounted 
    //it automatically redirect a user to their feed if they have valid user info in their localstorage 
    //if there is no way to authenticate a user or get the data, the connection view will be displayed by default
    async checkConnected() {
      //first we check if we have a user in our localstorage
      let user = localStorage.getItem("User");
      if(user) {
        //if a user is stored in LS, we check that their id in LS and their token id match. NOTE: this is how we'll check on every secure request
        let response = await fetch("http://localhost:3000/api/authenticate", {
          method: "POST",
          credentials: 'include',
          headers: {
              "Accept": 'application/json', 
              "Content-Type": "application/json",
          },
          //Sends the data in json format
          body: user
        });          
        if(response.ok){
          //if we get an ok from the server, we flip the app on using the "isConnected" boolean
          this.isConnected = true;
          //we then reroute the user to their feed
          this.$router.replace("/feed");
        }
      }
      
    }
  },
  mounted() {
    this.checkConnected();
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
