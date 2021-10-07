<template>
    <form class="d-flex flex-column" ref="signupform">
        <label for="firstnameInput" class="form-label">Prénom</label>
        <input type="text" id="firstnameInput" class="form-control" required v-model="signupdata.firstname">
        <label for="lastnameInput" class="form-label">Nom</label>
        <input type="text" id="lastnameInput" class="form-control" required v-model="signupdata.lastname"> 
        <label for="emailInput" class="form-label">Adresse email</label>
        <input type="email" id="emailInput" class="form-control" required v-model="signupdata.email">
        <label for="pwdInput" class="form-label">Mot de passe</label>
        <input type="password" class="form-control" :class="{ 'is-invalid': pwdWarning }" id="pwdInput" required v-model="signupdata.password">
        <div id="passwordHelp" class="form-text">
            <p>Votre mot de passe dois contenir au moins une lettre miniscule, une lettre majuscule, un chiffre et faire plus de 8 caractères</p>
        </div>
        <button @click.prevent="registerUser" type="submit" class="btn btn-primary mt-3 align-self-end">Créer un compte</button>
    </form>
</template>

<script>
export default {
    name: "Signup",
    data() {
        return {
            //this is the object that will create a new user, we get it from our form using vue model
            signupdata: { firstname: "", lastname: "", email: "", password: "" },
            pwdOk: false,
            pwdWarning: false,
            isValid: false
        }
    },
    methods: {
        async registerUser() {
            //we let the browser inform the user of what's wrong
            this.$refs.signupform.reportValidity();
            //we test the pwd againsdt our regex
            const reg = new RegExp("^(?=.*)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$");
            this.pwdOk = reg.test(this.signupdata.password);
            //if the form is valid and the password passes the regex, we proceed
            if(this.$refs.signupform.checkValidity() && this.pwdOk){
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
            } else {
                if(!this.pwdOk){
                    this.pwdWarning = true;
                }
            }
        },
    },
}
</script>

<style>

</style>