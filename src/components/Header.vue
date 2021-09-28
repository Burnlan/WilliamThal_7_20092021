<template>
    <header class="mb-3">
        <div v-if="isConnected" class="container-md m-auto row h-100">
            <div class="col-6 d-flex h-100 align-items-center">
                <div class="user-info">
                    <img :src="'http://localhost:8080/favicon.png'" alt="user picture" class="profile-picture">
                    <router-link to="/settings">
                    To settings
                    </router-link>
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
            picture: ""
        }
    },
    methods: {
        async disconnect() {
            //to disconnect, we simply call the disconnect route, which will destroy our user session
            let response = await fetch("http://localhost:3000/api/disconnect", {
                method: "GET",
                credentials: 'include'
            })        
            if(response.ok) {
                //we then reload the page
                this.$router.go()
            }
        },
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

.profile-picture {
    width: 80px;
    height: 80px;
}

.disconnectBtn {
    color: $clr-red;
    text-align: right;
    i {
        font-size: 1rem;
        &:hover {
            cursor: pointer;
        }
    }
    
}

</style>