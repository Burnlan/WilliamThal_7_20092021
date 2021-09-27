<template>
    <form class="d-flex flex-column new-post">
        <textarea id="newPost" maxlength="20000" placeholder="Partagez avec vos collègues !" required v-model="content"></textarea>
        <button type="submit" @click="createPost" class="btn btn-primary m-3">Partager</button>
    </form>
</template>

<script>
export default {
    name: "PostForm",
    data() {
        return {
            content: ""
        }
    },
    methods: {
                //this method creates a new post
        async createPost(e){
            e.preventDefault();
            const body = {
                content: this.content,
                groupId: this.$route.query.groupid
            };
            let response = await fetch("http://localhost:3000/api/createpost", {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Accept": 'application/json', 
                    "Content-Type": "application/json",
                },
                //Sends the data in json format
                body: JSON.stringify(body)
            })
            console.log(response);
        }
    }
}
</script>

<style>

</style>