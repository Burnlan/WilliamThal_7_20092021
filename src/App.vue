<template>
  <Header :user="user" :isConnected="isConnected" />
  
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
      //common user data, by default it's blanck
      user: {
        firstname: "",
        lastname: "",
        pictureUrl: ""
      }
    }
  },
  methods: {
    //this method is called whenever the app is mounted 
    //it automatically redirect a user to their feed and load their data if they have a valid session
    async checkConnected() {
      let response = await fetch("http://localhost:3000/api/checkSession", {
                method: "GET",
                credentials: 'include'
            })        
      if(response.ok){
        //if we get an ok from the server, we flip the app on using the "isConnected" boolean
        this.isConnected = true;
        //we get the userData from the response
        let userData = await response.json();
        this.user = userData;
        //we then reroute the user to their feed
        this.$router.replace("/");
      } else {
        //if no user session could be retrieved, we redirect to the connection page
        this.$router.replace("/connection");
      }
    },

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
