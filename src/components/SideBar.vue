<template>
<ul class="nav nav-pills nav-fill text-end">
    <li @click="directFeed(group.id)" v-for="group in groups" :key="group.id"  class="nav-item mt-1 mb-1 p-3">
        <span class="nav-link">{{ group.name }}</span>
    </li>
</ul>
</template>

<script>

export default {
    name: "SideBar",
    props: {
        groups: Array,
    },
    data() {
        return {
        }
    },
    methods: {
        //method that adds the relevant query to the url
        directFeed(groupId) {
            this.$router.push({ path: "/", query: {groupid: groupId} });
        }
    },
}
</script>

<style lang="scss">
ul {
    width: 100%;
}

li {
    text-align: end;
    padding: 10px;
    width: 100%;
    &:hover {
        cursor: pointer;
    }
}


</style>