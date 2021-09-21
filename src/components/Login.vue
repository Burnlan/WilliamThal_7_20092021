<template>
    <form>
        <label for="emailInput" class="form-label">Adresse email</label>
        <input type="email" id="emailInput" class="form-control">
        <label for="pwdInput" class="form-label">Mot de passe</label>
        <input type="password" class="form-control" id="pwdInput">
        <button class="btn btn-primary mt-3 end">Se connecter</button>
    </form>
</template>

<script>
export default {
    name: "Login",
}
</script>

<style>

</style>