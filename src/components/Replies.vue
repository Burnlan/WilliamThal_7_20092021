<template>
    <div class="reply pt-2 pb-2 mb-2">
        <button @click="archive(reply.id)" class="deleteBtn"><i class="fas fa-trash-alt"></i></button>
        <h2>{{ reply.firstname +" "+reply.lastname }}</h2>
        <p>{{ reply.content }}</p>
    </div>
</template>

<script>
export default {
    name: "replies",
    props: {
        reply: Object
    },
    methods: {
        async archive(replyId) {
            let response = await fetch("http://localhost:3000/api/archivereply", {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Accept": 'application/json', 
                    "Content-Type": "application/json",
                },
                //Sends the data in json format
                body: JSON.stringify({ replyId: replyId })
            })
            if(response.ok) {
                //if the post was archived, we reload the feed
                this.$emit("archive");
            }
        },
    }
}
</script>

<style lang="scss">
.reply {
    padding-left: 3rem;
    border-bottom: 1px solid $clr-blue;
    //this is to treat /n and /t as line breaks and tabulations
    white-space: pre-wrap;
    position: relative;
    h2 {
        font: $latoBold;
        font-size: 1.2rem;
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
</style>