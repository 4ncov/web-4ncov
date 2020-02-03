<template>
    <div id="navs">
        <router-link to="/">实时数据</router-link>
        <router-link to="/foo">物资寻求</router-link>
        <router-link to="/foo">车辆供应</router-link>
    </div>
</template>

<script>
export default {
    data() {
        return {
            active: 0
        };
    }
};
</script>

<style scoped>
#navs {
    margin-top: 0.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.2rem 0;
    background: #ccc;
}
#navs a {
    width: 3rem;
    text-decoration: none;
    color: #333;
    text-align: center;
}
</style>
