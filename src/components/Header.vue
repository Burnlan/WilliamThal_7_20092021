<template>
    <header>
        <div class="container-md m-auto row h-100">
            <div class="col-6 d-flex h-100 align-items-center">
                <div class="user-info">
                    <h1>{{ user.firstname+" "+user.lastname }}</h1>
                </div>
            </div>
            <div class="col-6">

            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: "Header",
    props: {
        user: Object
    },
    data() {
        return {

        }
    }
}
</script>

<style lang="scss">
header {
    background: $clr-darkblue;
    width: 100%;
    height: 100px;
}
.user-info {
    color: white;
    text-align: right;
}


</style>