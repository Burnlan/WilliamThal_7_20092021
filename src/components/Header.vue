<template>
    <header class="mb-1 p-3">
        <div v-if="isConnected" class="container-fluid m-auto row h-100 p-0">
            <div class="col-2 d-none d-md-block"></div>
            <div class="col-4 d-flex h-100 align-items-center">
                <router-link to="/settings" class="settings">
                <div class="user-info d-flex align-items-center">
                    <div class="profilBtns d-flex flex-column">
                        <span class="disconnect"><i class="far fa-times-circle" title="Se déconnecter" @click="disconnect"></i></span>
                        <i class="fas fa-cog mt-2" title="Paramètres"></i>
                    </div>
                    <img :src="'http://localhost:8080/favicon.png'" alt="user picture" class="profile-picture">
                    <h3><span class="firstname">{{ user.firstname }}</span> <br> {{user.lastname }}</h3>    
                </div>
                </router-link>
            </div>
            <div class="col-3">
                <router-link to="/"><h1>GROUPOMANIA</h1></router-link>
            </div>
            <div class="col-3 d-none d-md-block"></div>
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
    a {
        text-decoration: none;
    }
    h1 {
        color: white;
        font-size: 2rem;
        text-decoration: none;
        text-align: right;
    }
}
.user-info {
    color: white;
    h3 {
        align-self: end;
        .firstname {
            font-weight: 400;
        }
    }
}

.profile-picture {
    width: 80px;
}

.profilBtns {
    align-self: start;
    .disconnect {
        color: $clr-red;
    }
    .settings {
        color: white;
    }
    i {
        font-size: 1rem;
        &:hover {
            cursor: pointer;
        }
        
    }
    
}

</style>