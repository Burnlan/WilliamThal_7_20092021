<template>
    <form class="d-flex flex-column">
        <label for="firstnameInput" class="form-label">Prénom</label>
        <input type="text" id="firstnameInput" class="form-control" v-model="signupdata.firstname">
        <label for="lastnameInput" class="form-label">Nom</label>
        <input type="text" id="lastnameInput" class="form-control" v-model="signupdata.lastname"> 
        <label for="emailInput" class="form-label">Adresse email</label>
        <input type="email" id="emailInput" class="form-control" v-model="signupdata.email">
        <label for="pwdInput" class="form-label">Mot de passe</label>
        <input type="password" class="form-control" id="pwdInput" v-model="signupdata.password">
        <button @click="registerUser" class="btn btn-primary mt-3 align-self-end">Créer un compte</button>
    </form>
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
            let response = await fetch("http://localhost:3000/api/signup", {
                method: "POST",
                headers: {
                    "Accept": 'application/json', 
                    "Content-Type": "application/json"
                },
                //Sends the data in json format
                body: JSON.stringify(this.signupdata)
            })
            if(response.ok){
                console.log("User "+this.signupdata.firstname+" successfully created !");
                this.$emit("signedup");
            } else {
                console.log(response);
            }
        }
        
    }
}
</script>

<style>

</style>