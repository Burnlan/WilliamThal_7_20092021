<template>
<div class="container-sm">
  <div class="btn-group con-selector mb-3" role="group">
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
  name: 'Home',
  components: {
    Signup,
    Login
  },
  data(){
    return {
      signup: false
    }
  },
  methods: {
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
    console.log(this.signup);
    }
  }
}

</script>

<style lang="scss">
.con-selector {
  display: flex;
}



</style>
