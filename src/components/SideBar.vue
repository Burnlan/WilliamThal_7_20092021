<template>
    <button class="nav-toggler btn btn-primary d-md-none p-2" @click="toggleGroups"><p> <i class="fas fa-bars"></i>  Changer de groupe</p></button>
    <ul :class="{ 'd-none': !showGroups}" class="d-md-block nav navbar nav-pills nav-fill text-end p-2">
        <li @click="directFeed(group.id)" v-for="group in groups" :key="group.id"  class="nav-item p-0 mb-1">
            <span class="nav-link p-3" :class="{ active: group.id == currentGroup }" >{{ group.name }}</span>
        </li>
    </ul>
</template>

<script>

export default {
    name: "SideBar",
    props: {
        groups: Array,
        currentGroup: Number
    },
    data() {
        return {
            showGroups: false
        }
    },
    methods: {
        //method that adds the relevant query to the url
        directFeed(groupId) {
            this.$router.push({ path: "/", query: {groupid: groupId} });
        },
        toggleGroups() {
            //simple method to hide/show groups nav on mobile
            if(this.showGroups) {
                this.showGroups = false;
            } else {
                this.showGroups = true;
            }
        }
    },
}
</script>

<style lang="scss" scoped>
ul, button {
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