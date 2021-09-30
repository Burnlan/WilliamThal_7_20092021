<template>
    <form class="d-flex flex-column">
        <textarea class="new-post mb-1" maxlength="20000" placeholder="Partagez avec vos collègues !" required v-model="content" ref="textArea"></textarea>
        <button type="submit" @click="createPost" class="btn btn-primary" :class="{ disabled: !canPost }">Partager</button>
    </form>
</template>

<script>
export default {
    name: "PostForm",
    data() {
        return {
            content: "",
            canPost: false
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
            if(response.ok) {
                //if we posted we refresh the feed
                this.$emit("posted");
                //we also wipe the form
                this.content = "";
            }
        }
    },
    watch: {
        content() {
            if(this.content){
                this.canPost = true;
            } else {
                this.canPost = false;
            }
        }
    },
    mounted() {
        //we listen for focus change on textarea
        this.$refs.textArea.addEventListener("focusin", (e) => {
            //we add the "active" class
            e.target.classList.add("active");
        })
        this.$refs.textArea.addEventListener("focusout", (e) => {
            //We remove the "active" class
            e.target.classList.remove("active");
        })
    }
}
</script>

<style lang="scss">
form {
    .new-post {
        width: 100%;
        height: 2rem;
        resize: none;
        transition: height 0.5s ease-in-out;
    }
    .active {
        height: 20rem;
    }
}



</style>