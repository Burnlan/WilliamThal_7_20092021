<template>
<div>
    <form v-if="signup">
        <label for="firstnameInput" class="form-label">Prénom</label>
        <input type="text" id="firstnameInput" class="form-control">
        <label for="lastnameInput" class="form-label">Nom</label>
        <input type="text" id="lastnameInput" class="form-control">
        <label for="emailInput" class="form-label">Adresse email</label>
        <input type="email" id="emailInput" class="form-control">
        <label for="pwdInput" class="form-label">Mot de passe</label>
        <input type="password" class="form-control" id="pwdInput">
        <button type="submit" class="btn btn-primary mt-3 end">Créer un compte</button>
    </form>
    <form v-else>
        <label for="emailInput" class="form-label">Adresse email</label>
        <input type="email" id="emailInput" class="form-control">
        <label for="pwdInput" class="form-label">Mot de passe</label>
        <input type="password" class="form-control" id="pwdInput">
        <button type="submit" class="btn btn-primary mt-3 end">Se connecter</button>
    </form>
</div>




</template>

<script>
export default {
    name: "ConnectionForm",
    props: {
        signup: { type: Boolean }
    }
}
</script>

<style>

</style>