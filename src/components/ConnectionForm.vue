<template>
<div>
    <form>
        <label for="emailInput" class="form-label">Adresse email</label>
        <input type="email" id="emailInput" class="form-control">
        <label for="pwdInput" class="form-label">Mot de passe</label>
        <input type="password" class="form-control" id="pwdInput">
        <button v-if="signup" type="submit" class="btn btn-primary mt-3 end">Créer un compte</button>
        <button v-else type="submit" class="btn btn-primary mt-3 end">Se connecter</button>
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