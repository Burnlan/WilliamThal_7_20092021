<template>
    <div class="group d-flex justify-content-between align-items-center p-3">
        <h3>{{ group.name }}</h3>
        <button v-if="!isIn" @click="joinGroup(group.id)" class="btn btn-primary"> Rejoindre ce groupe</button>
        <button v-else @click="quitGroup(group.id)" class="btn btn-danger">Quitter ce groupe</button>
    </div>
</template>

<script>
export default {
    name: "GroupList",
    props: {
        group: Object
    },
    data() {
        return {
            isIn: false
        }
    },
    methods: {
        async isInGroup(groupId) {
            let response = await fetch("http://localhost:3000/api/isingroup", {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Accept": 'application/json', 
                    "Content-Type": "application/json",
                },
                //Sends the data in json format
                body: JSON.stringify({ groupId: groupId })
            })
            if(response.ok) {
                this.isIn = true;
            } else {
                this.isIn = false;
            }
        },
        async joinGroup(groupId){
            let response = await fetch("http://localhost:3000/api/joingroup", {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Accept": 'application/json', 
                    "Content-Type": "application/json",
                },
                //Sends the data in json format
                body: JSON.stringify({ groupId: groupId })
            })
            if(response.ok) {
                this.isIn = true;
            }
        },
        async quitGroup(groupId){
            let response = await fetch("http://localhost:3000/api/quitgroup", {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Accept": 'application/json', 
                    "Content-Type": "application/json",
                },
                //Sends the data in json format
                body: JSON.stringify({ groupId: groupId })
            })
            if(response.ok) {
                this.isIn = false;
            }
        },
    },
    mounted() {
        this.isInGroup(this.group.id);
    }
}
</script>

<style>

</style>