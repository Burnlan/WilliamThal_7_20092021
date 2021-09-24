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
        isConnected: Boolean
    },
    data() {
        return {
            //by default, we have no user info
            user: {
                firstname: "",
                lastname: "",
                pictureUrl: ""
            }
        }
    },
    methods: {
        //this function loads/unloads userdata depending on isConnected boolean
        setCurrentUser(){
            //if a user isConnected
            if(this.isConnected) {
                
                this.user = userdata;
            } else {
                //if isConnected is false we empty our data
                let blanckUser = {firstname: "", lastname:"", pictureUrl:""};
                this.user = blanckUser;
            }
        }
    },
    //we watch for changes in the isConnected prop to load or not data from ls
    watch: {
        isConnected: function() {
            this.setCurrentUser();
        }
    },
    mounted() {
        this.setCurrentUser();
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