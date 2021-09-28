<template>
<div class="OP">
    <h2>{{ post.user_id }}</h2>
    <p>{{ post.content }}</p>
</div>
</template>

<script>
export default {
    name: "Post",
    props: {
        post: Object,
    },
}
</script>

<style lang="scss">
.OP {
    width: 100%;
    color: black;
}


</style>