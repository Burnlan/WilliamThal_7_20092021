<template>
<ul class="navbar-nav text-end">
    <li v-for="group in groups" :key="group.id"  class="nav-item">{{ group.name }}</li>
</ul>
</template>

<script>
export default {
    name: "SideBar",
    props: {
        groups: Array,
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
    color: white;
    background-color: $clr-blue;
}


</style>