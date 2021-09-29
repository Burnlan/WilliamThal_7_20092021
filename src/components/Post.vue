<template>
<div class="OP">
    <h2>{{ post.user_id }}</h2>
    <p>{{ post.content }}</p>
    <button @click="archive(post.id)">archive post</button>
</div>
</template>

<script>
export default {
    name: "Post",
    props: {
        post: Object,
    },
    methods: {
        async archive(postId) {
            let response = await fetch("http://localhost:3000/api/archivepost", {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Accept": 'application/json', 
                    "Content-Type": "application/json",
                },
                //Sends the data in json format
                body: JSON.stringify({ postId: postId })
            })
            if(response.ok) {
                //if the post was archived, we reload the feed
                this.$emit("archive");
            }
        }
    }
}
</script>

<style lang="scss">
.OP {
    width: 100%;
    color: black;
}


</style>