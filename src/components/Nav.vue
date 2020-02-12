<template>
    <div class="box">
        <div class="banner">
            <!-- <el-carousel height="3.5rem" trigger="click">
        <el-carousel-item v-for="item in 4" :key="item">
          <img src="http://resource.guofangchao.com/4ncov/u213.png" />
        </el-carousel-item>
      </el-carousel> -->
            <img src="http://resource.guofangchao.com/4ncov/u213.png"/>
        </div>
        <div id="navs">
            <router-link v-if="featureToggle" :to="{ path: '/real-time-data' }">实时数据</router-link>
            <router-link :to="{ path: '/required-materials-overview' }">物资寻求</router-link>
            <router-link :to="{ path: '/supplied-materials-overview' }">物资供应</router-link>
        </div>
    </div>
</template>

<script>
    import featureToggle from '../utils/FeatureToggle'

    export default {
        data() {
            return {
                active: 0,
                featureToggle
            }
        }
    }
</script>

<style scoped>
    .box {
        background: #ccc;
        padding-bottom: 0.1rem;
    }

    .banner {
        background: #ccc;
    }

    .banner img {
        width: 100%;
    }

    #navs {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 0.25rem 0.2rem 0.1rem 0.2rem;
        background: #fff;
        border-radius: 0.3rem 0.3rem 0 0;
    }

    #navs a {
        display: inline-block;
        text-decoration: none;
        color: #333;
        padding: 0 0.1rem 0.05rem 0.1rem;
        border-bottom: solid 0.05rem #fff;
    }

    #navs .router-link-exact-active {
        color: #169bd5;
        border-bottom: solid 0.05rem #169bd5;
    }
</style>
