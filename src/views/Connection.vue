<template>
<div class="container-sm d-flex flex-column p-5">
  
  <h1>Bienvenue</h1>

  <div class="btn-group con-selector" role="group">
    <button @click="select('signup')" class="btn btn-outline-primary" ref="signbtn">S'inscrire</button>
    <button @click="select('login')" class="btn btn-outline-primary" ref="logbtn">Se connecter</button>
  </div>
  
  <Signup v-if="signup" />
  <Login v-else />

</div>

  
</template>

<script>
import Signup from '@/components/Signup.vue'
import Login from '@/components/Login.vue'

export default {
  name: 'Connection',
  components: {
    Signup,
    Login
  },
  data(){
    return {
      //boolean to switch between the signup form and the login form
      signup: false
    }
  },
  //we init the components with the login form
  mounted() {
    this.$refs.logbtn.classList.add("active");
  },
  methods: {
  //switches between showing the login form or the signup form
    select(btn) {
      if(btn == "signup") {
        this.$refs.logbtn.classList.remove("active");
        this.$refs.signbtn.classList.add("active");
        this.signup = true;
      } else {
        this.$refs.signbtn.classList.remove("active");
        this.$refs.logbtn.classList.add("active");
        this.signup = false;
      }
    }
  }
}

</script>

<style lang="scss" scoped>
.con-selector {
  width: 250px;
  align-self: center;
  padding: 10px;
}
h1{
  text-align: center;
  font-size: 2rem;
}



</style>
