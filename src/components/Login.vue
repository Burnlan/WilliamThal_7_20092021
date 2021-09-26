<template>
    <form class="d-flex flex-column">
        <label for="emailInput" class="form-label">Adresse email</label>
        <input type="email" id="emailInput" class="form-control" v-model="logindata.email">
        <label for="pwdInput" class="form-label">Mot de passe</label>
        <input type="password" class="form-control" id="pwdInput" v-model="logindata.password">
        <button @click="login" class="btn btn-primary mt-3 align-self-end">Se connecter</button>

        <p v-if="failed" class="warning">Identifiants invalides</p>

    </form>
</template>

<script>
export default {
    name: "Login",
    data() {
        return {
            //this is the object that will create a new user, we get it from our form using vue model
            logindata: { email: "", password: "" },
            failed: false
        }
    },
    methods: {
        async login(e) {
            e.preventDefault();
            let response = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Accept": 'application/json', 
                    "Content-Type": "application/json",
                },
                //Sends the data in json format
                body: JSON.stringify(this.logindata)
            })
            if(response.ok){
                //we reload the page to automatically set everything up
                this.$router.go();
            } else {
                console.log(response);
                this.failed = true;
            }
        }
    }
}
</script>

<style lang="scss">
.warning{
    color: $clr-red;
    text-align: center;
}
</style>