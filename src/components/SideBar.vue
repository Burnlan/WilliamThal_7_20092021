<template>
<ul class="nav nav-pills nav-fill text-end">
    <li v-for="group in groups" :key="group.id"  class="nav-item mt-1 mb-1 p-3">
        <a href="" class="nav-link">{{ group.name }}</a>
    </li>
</ul>
</template>

<script>
export default {
    name: "SideBar",
    props: {
        groups: Array,
    },
    methods: {

    }
}
</script>

<style lang="scss">
ul {
    width: 100%;
}

li {
    text-align: end;
    padding: 10px;
    &:hover {
        cursor: pointer;
    }
}


</style>