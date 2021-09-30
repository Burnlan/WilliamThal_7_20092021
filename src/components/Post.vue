<template>
<div class="post-and-replies">
    <div class="OP mt-5 p-2">
        <h2>{{ post.lastname +" "+ post.firstname }}</h2>
        <p>{{ post.content }}</p>
        <button @click="archive(post.id)" class="deleteBtn"><i class="fas fa-trash-alt"></i></button>
        <button @click="getReplies(post.id)" class="repliesBtn" value="Afficher les réponses">Afficher les réponses <i class="fas fa-arrow-alt-circle-down"></i></button>
    </div>
    <ReplyForm :postId="post.id"/>
    <Replies v-for="reply in replies" :key="reply.id" :reply="reply"/>
</div>

</template>

<script>
import ReplyForm from '@/components/ReplyForm.vue'
import Replies from '@/components/Replies.vue'

export default {
    name: "Post",
    components: {
        ReplyForm,
        Replies
    },
    props: {
        post: Object,
    },
    data() {
        return {
            replies: []
        }
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
        },
        async getReplies(postId) {
            let response = await fetch("http://localhost:3000/api/getreplies", {
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
                this.replies = await response.json();
                console.log(this.replies);
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
.repliesBtn {
    position: absolute;
    bottom : 0;
    right: 0;
    border: none;
    border-radius: 3px;
    background-color: rgba(0, 0, 0, 0);
    transition: all 0.2s ease-in-out;
    &:hover {
        color: white;
        background-color: $clr-teal;
    }
}


</style>