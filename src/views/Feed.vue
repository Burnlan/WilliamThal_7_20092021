<template>

<div class="row">
    <div class="col-2 p-0">
        <SideBar :groups="groups"/>
    </div>
    <div class="col-7">
        <div class="new-post">Écrivez ici un nouveau poste</div>
        <Post />
    </div>
</div>
</template>

<script>
import SideBar from '@/components/SideBar.vue'
import Post from '@/components/Post.vue'

export default {
    name: "Feed",
    components: {
        SideBar,
        Post
    },
    data() {
        return {
            groups: []
        }
    },
    methods: {
        //this method gets the groups the user is part of to display them
        async displayGroups() {
            let response = await fetch("http://localhost:3000/api/getgroups", {
                method: "GET",
                credentials: 'include'
            })   
            if (response.ok) {
                response = await response.json();
                //the response is an array filled with group objects, that each have a name and an id
                //we store this group array in our groups data
                this.groups = response;
            }
        }
    },
    mounted() {
        this.displayGroups();
    }
}
</script>

<style>

</style>