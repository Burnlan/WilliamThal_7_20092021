<template>
<div>
    <form>
        <label for="firstnameInput" class="form-label">Prénom</label>
        <input type="text" id="firstnameInput" class="form-control" v-model="signupdata.firstname">
        <label for="lastnameInput" class="form-label">Nom</label>
        <input type="text" id="lastnameInput" class="form-control" v-model="signupdata.lastname"> 
        <label for="emailInput" class="form-label">Adresse email</label>
        <input type="email" id="emailInput" class="form-control" v-model="signupdata.email">
        <label for="pwdInput" class="form-label">Mot de passe</label>
        <input type="password" class="form-control" id="pwdInput" v-model="signupdata.password">
        <button @click="registerUser" class="btn btn-primary mt-3 end">Créer un compte</button>
    </form>

</div>




</template>

<script>
export default {
    name: "Signup",
    data() {
        return {
            //this is the object that will create a new user, we get it from our form using vue model
            signupdata: { firstname: "", lastname: "", email: "", password: "" }
        }
    },
    methods: {
        async registerUser(e) {
            e.preventDefault();
            console.log(this.signupdata)
        }
        
    }
}
</script>

<style>

</style>