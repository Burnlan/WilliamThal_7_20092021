<template>
    <form class="d-flex mt-2">
        <textarea class="new-reply mb-1" maxlength="20000" placeholder="Rédigez un commentaire" required v-model="content" ref="textArea">  
        </textarea>
        <button type="submit" @click="createReply" class="btn btn-primary mb-3 p-0 send" :class="{ disabled: !canReply }">
            <i class="fa fa-paper-plane" aria-hidden="true"></i>
        </button>    
    </form>
</template>

<script>
export default {
    name: "ReplyForm",
    props: {
        postId: Number
    },
    data() {
        return {
            content: "",
            canReply: false
        }
    },
    methods : {
        async createReply(e){
            e.preventDefault();
            const body = {
                content: this.content,
                postId: this.postId
            }
            let response = await fetch("http://localhost:3000/api/reply", {
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
                this.$emit("replied");
                //we also wipe the form
                this.content = "";
            }
        }
    },
    watch: {
        content() {
            if(this.content){
                this.canReply = true;
            } else {
                this.canReply = false;
            }
        }
    },
}
</script>

<style lang="scss" scoped>
form {
    width: 100%;
    position: relative;
    border-bottom: 1px solid $clr-blue;
}
.new-reply {
    height: 2rem;
    resize: none;
    width: calc(100% - 2rem);
    border: none;
    &:focus {
        outline: none;
    }
}
.send{ 
    position: absolute;
    top: 100;
    right: 0;
    width: 2rem;
    height: 2rem;
}
</style>