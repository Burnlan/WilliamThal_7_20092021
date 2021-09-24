<template>
    <header>
        <div v-if="isConnected" class="container-md m-auto row h-100">
            <div class="col-6 d-flex h-100 align-items-center">
                <div class="user-info">
                    <h1>{{ user.firstname+" "+user.lastname }}</h1>
                </div>
                
            </div>
            <div class="col-6">
                <div class="disconnectBtn"><i class="far fa-times-circle" title="Se déconnecter" @click="disconnect"></i></div>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: "Header",
    props: {
        user: Object,
        isConnected: Boolean
    },
    data() {
        return {

        }
    },
    methods: {
        disconnect() {
            console.log("disconnected");
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

.disconnectBtn {
    color: $clr-red;
    i {
        font-size: 1rem;
        &:hover {
            cursor: pointer;
        }
    }
    
}

</style>