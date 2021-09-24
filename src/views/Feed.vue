<template>

<div class="row">
    <div class="col-2 p-0">
        <SideBar />
    </div>
    <div class="col-7">
        <div class="new-post">Écrivez ici un nouveau poste</div>
        <Post />
    </div>
</div>
</template>

<script>
import SideBar from '@/components/SideBar.vue'
import Post from '@/components/Post.vue'

export default {
    name: "Feed",
    components: {
        SideBar,
        Post
    },
    data() {
        return {

        }
    }
}
</script>

<style>

</style>