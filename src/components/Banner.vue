<template>
    <div class="banner">
        <el-carousel height="3rem" trigger="click">
            <el-carousel-item v-for="item in 4" :key="item">
                <img src="http://resource.guofangchao.com/4ncov/u213.png" />
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
.banner {
    background: #ccc;
}
.banner img{
    width: 100%;
}
</style>
