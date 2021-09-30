<template>
<div class="OP mt-5 p-2">
    <h2>{{ post.lastname +" "+ post.firstname }}</h2>
    <p>{{ post.content }}</p>
    <button @click="archive(post.id)" class="deleteBtn"><i class="fas fa-trash-alt"></i></button>
</div>
<ReplyForm />
</template>

<script>
import ReplyForm from '@/components/ReplyForm.vue'

export default {
    name: "Post",
    components: {
        ReplyForm,
    },
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
    border: 2px solid $clr-teal;
    border-radius: 10px;
    position: relative;
}
.deleteBtn {
    position: absolute;
    top : 0;
    right: 0;
    border: none;
    background-color: rgba(255, 255, 255, 0);
    transition: color 0.2s ease-in-out;
    &:hover {
        color: $clr-red;
    }
}


</style>