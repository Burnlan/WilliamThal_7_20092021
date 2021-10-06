<template>

<div class="row flex-column flex-md-row">
    <div class="col-md-2 p-0">
        <SideBar :groups="groups"/>
    </div>
    <div class="col-md-7 feed">
        <PostForm v-if="$route.query.groupid" v-on:posted="getFeed"/>
        <div v-else class="default p-5"><h2>Aucun groupe n'est selectionné</h2></div>
        <Post v-for="post in posts" :key="post.id" :post="post" v-on:archive="getFeed"/>
    </div>
</div>
</template>

<script>
import SideBar from '@/components/SideBar.vue'
import Post from '@/components/Post.vue'
import PostForm from '@/components/PostForm.vue'

export default {
    name: "Feed",
    components: {
        SideBar,
        Post,
        PostForm
    },
    data() {
        return {
            groups: [],
            posts: []
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
        },
        //this method retrieves the feed data to display
        async getFeed() {
            //we get the groupid in the url
            const groupId = this.$route.query.groupid;
            let response = await fetch("http://localhost:3000/api/getposts", {
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
                const posts = await response.json();
                this.posts = posts;
                console.log(this.posts);
            }
        },
    },
    mounted() {
        this.displayGroups();
    },
    //we watch for changes in the url to call our getFeed function
    watch: {
        $route () {
            this.getFeed();
        }
    }
}
</script>

<style lang="scss">
.default {
    text-align: center;
    h2 {
        font-size: 2rem;
    }
}
.feed {
    margin-bottom: 500px;
}
</style>