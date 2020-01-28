<template>
    <div id="home">
        <div class="banner">
            <el-carousel height="3rem" trigger="click">
                <el-carousel-item v-for="item in 4" :key="item">
                    <h3 class="small">{{ item }}</h3>
                </el-carousel-item>
            </el-carousel>
        </div>
        <div id="navs">
            <a>物资寻求</a>
            <a>物资供应</a>
            <a>车辆供应</a>
            <a>物资动态</a>
        </div>
        <div class="tabs">
            全部
        </div>
        <div class="list">
            内容
        </div>
        <div class="footer">
             <el-button type="primary" round>添加供应服务</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'app',
    components: {}
};
</script>

<style>
.banner {
    background: #ccc;
}
#navs {
    margin-top: 0.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: .2rem 0;
    background: #ccc;
}
#navs a {
    width: 2rem;
}
.footer{
    position: fixed;
    bottom: .2rem;
    width: 100%;
    text-align: center;
}
</style>
