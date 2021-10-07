<template>
<div class="post-and-replies">
    <div class="OP mt-4 p-2 pb-5">
        <h2>{{ post.lastname +" "+ post.firstname }}</h2>
        <p>{{ post.content }}</p>
        <div v-if="hasPreview" class="row g-2">
            <a :href="preview.url" class="card preview col-md-6">
                <div class="card-body">
                    <h3 class="card-title">{{ preview.title }}</h3>
                    <p class="card-text">{{ preview.description }}</p>
                </div>
                <img :src="preview.image" alt="preview.description" class="card-img-bottom">
            </a>
        </div>
        <button @click="archive(post.id)" class="deleteBtn"><i class="fas fa-trash-alt"></i></button>
        <button v-if="!showReplies" @click="getReplies(post.id)" class="repliesBtn" value="Afficher les réponses">Afficher les réponses <i class="fas fa-arrow-alt-circle-down"></i></button>
        <button v-else @click="hideReplies" class="repliesBtn" value="Masquer les réponses">Masquer les réponses <i class="fas fa-arrow-alt-circle-up"></i></button>
    </div>
    <ReplyForm :postId="post.id" v-on:replied="getReplies(post.id)"/>
    <Replies v-for="reply in replies" :key="reply.id" :reply="reply" v-on:archive="getReplies(post.id)"/>
    <div v-if="noReplies" class="no-replies p-1"><p>Il n'existe aucune réponse pour cette publication</p></div>
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
            noReplies: false,
            showReplies: false,
            replies: [],
            hasPreview: false,
            preview: "",
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
                //We load the replies in our replies array and set that we are showing replies
                this.replies = await response.json();
                this.showReplies = true;
                //if we didn't get anything, then we trigger the "noReplies" sqtatus to be true
                if(this.replies == null) {
                    this.noReplies = true;
                }
            }
        },
        hideReplies() {
            this.noReplies = false;
            this.showReplies = false;
            this.replies = [];
        },
        //this method parses the content of the post and looks for urls to eventually preview
        findUrls() {
            //we use a regex to get an array of all urls in the content of the post
            const urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
            const urls = this.post.content.match(urlRegex);
            //we the  check if there are urls, and if so we call the getpreview function for the first one.
            if(urls) {
                this.getPreview(urls[0]);
            }
        },
        //this function takes a url and returns a preview
        async getPreview(url) {
            //We call the preview API 
            let response = await fetch("http://api.linkpreview.net/?key=4d0f71449764c124839e1c46e4098e52&q="+url);
            if (response.ok) {
                let preview = await response.json();
                this.preview = preview;
                this.hasPreview = true;
            }
        }
    },
    mounted() {
        //once the content is there, we check it for urls we should preview
        this.findUrls();
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
    //this is to treat /n and /t as line breaks and tabulations
    white-space: pre-wrap;
    h2 {
        font: $latoBold;
        font-size: 1.4rem;
    }
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
.no-replies {
    color: $clr-red;
}

.preview {
    color: black;
    text-decoration: none;
    .card-title {
        font: $latoBold;
        font-size: 1.2rem;
    }
    img {
        max-height: 200px;
        object-fit: contain;
    }
}

</style>