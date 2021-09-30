<template>
    <div class="reply pt-2 pb-2 mb-2">
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
}
</script>

<style lang="scss">
.reply {
    padding-left: 3rem;
    border-bottom: 1px solid $clr-blue;
}
</style>