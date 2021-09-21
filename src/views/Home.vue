<template>
<div class="container-sm">
  <div class="btn-group con-selector mb-3" role="group">
    <button @click="select('signup')" class="btn btn-outline-primary" ref="signbtn">S'inscrire</button>
    <button @click="select('login')" class="btn btn-outline-primary" ref="logbtn">Se connecter</button>
  </div>

  <ConnectionForm :signup="signup"/>

</div>

  
</template>

<script>
import ConnectionForm from '@/components/ConnectionForm.vue'

export default {
  name: 'Home',
  components: {
    ConnectionForm
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
