<template>
    <div class="box">
        <div class="banner">
            <el-carousel height="3.5rem" trigger="click">
                <el-carousel-item v-for="item in 4" :key="item">
                    <img src="http://resource.guofangchao.com/4ncov/u213.png" />
                </el-carousel-item>
            </el-carousel>
        </div>
        <div id="navs">
            <router-link to="/">实时数据</router-link>
            <router-link to="/foo">物资寻求</router-link>
            <router-link to="/too">车辆供应</router-link>
        </div>
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
.box{
    background: #ccc;
    padding-bottom: .1rem;
}
.banner {
    background: #ccc;
}
.banner img{
    width: 100%;
}
#navs {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.25rem .2rem .1rem .2rem;
    background: #fff;
    border-radius: .3rem .3rem 0 0;
}
#navs a {
    display: inline-block;
    text-decoration: none;
    color: #333;
    padding: 0 .1rem .05rem .1rem;
    border-bottom: solid .05rem #fff;
}
#navs .router-link-exact-active {
    color: #169bd5;
    border-bottom: solid .05rem #169bd5;
}
</style>
