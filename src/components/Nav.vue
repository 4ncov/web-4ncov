<template>
    <div class="box">
        <div class="banner">
            <img src="/imgs/img@2x.webp" />
            <div class="nav-title">
                <p>疫情防护</p>
                <p>物资供需发布平台</p>
                <div class="nav-title__sub">
                    <p>新型冠状病毒肺炎医疗物资</p>
                    <p>供需需求信息共享</p>
                </div>
            </div>
            <div id="navs">
                <!-- <router-link v-if="featureToggle" :to="{ path: '/real-time-data' }">实时数据</router-link> -->
                <router-link
                    tag="div"
                    :to="{ path: '/required-materials-overview' }"
                    class="nav-tabs"
                    :class="getTabClass('required-materials-overview')"
                >
                    <img src="imgs/icon_qiu@2x.webp" alt="" />
                    <span>物资寻求</span>
                </router-link>
                <router-link
                    tag="div"
                    :to="{ path: '/supplied-materials-overview' }"
                    class="nav-tabs"
                    :class="getTabClass('supplied-materials-overview')"
                >
                    <img src="imgs/icon_gong@2x.webp" alt="" />
                    <span>物资供应</span>
                </router-link>
            </div>
        </div>
        <div class="supply-info">
            <div class="supply-info__content">
                <p class="supply-info__title">新增需求数量（个）</p>
                <p>6688</p>
            </div>
            <div class="supply-info__content">
                <p class="supply-info__title">今日最紧缺物资</p>
                <p>口罩</p>
            </div>
        </div>
    </div>
</template>

<script>
import featureToggle from '../utils/FeatureToggle'

export default {
    data() {
        return {
            active: 0,
            featureToggle,
            choosedImg: ''
        }
    },
    methods: {
        getTabClass(routerName) {
            if (this.$route.name === routerName) return 'selected'
            else return ''
        },
        getTabBgc(routerName) {
            if (this.$route.name === routerName) {
                return '/imgs/tab_select@2x.png'
            } else {
                return '/imgs/tab_normal@2x.png'
            }
        }
    }
}
</script>

<style scoped>
.box {
    position: relative;
}

.banner {
    position: relative;
}

.banner img {
    width: 100%;
}
.nav-title {
    position: absolute;
    top: 1.09rem;
    left: 0.83rem;
}
.nav-title p {
    width: 5.35rem;
    font-size: 0.67rem;
    font-family: YouSheBiaoTiHei;
    font-weight: 400;
    line-height: 0.95;
    color: rgba(255, 243, 231, 1);
    text-shadow: 0.02rem 0.02rem 0.02rem rgba(176, 55, 2, 0.4);
}
.nav-title .nav-title__sub {
    margin-top: 0.35rem;
}
.nav-title .nav-title__sub p {
    font-size: 0.32rem;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(255, 243, 231, 1);
    line-height: 0.45rem;
    text-shadow: 0.02rem 0.02rem 0.02rem rgba(176, 55, 2, 0.4);
}
.nav-tabs {
    position: absolute;
    width: 3.15rem;
    height: 1.15rem;
    left: 0.36rem;
    bottom: 0.1rem;
    background-color: #fbba8a;
    border-radius: 0.2rem 0.2rem 0 0;
    /* background-position: center; */
    display: flex;
    justify-content: center;
    align-items: center;
}
.nav-tabs img {
    width: 0.71rem;
    height: auto;
}
.selected {
    background-color: #fff3eb;
}
.nav-tabs:last-child {
    left: 3.6rem;
}
.nav-tabs span {
    /* width: 1.48rem; */
    /* height: 0.36rem; */
    font-size: 0.37rem;
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: #ffe9d9;
    /* line-height: 0.36rem; */
    text-align: center;
    text-decoration: none;
    margin-left: 0.2rem;
}
.selected span {
    color: rgba(252, 137, 47, 1);
}
.supply-info {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0.37rem 0.4rem 0;
}
.supply-info__content {
    width: 4.4rem;
    height: 1.45rem;
    background: linear-gradient(-90deg, rgba(109, 151, 244, 1), rgba(76, 194, 224, 1));
    border-radius: 0.18rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.supply-info__content:last-child {
    background: linear-gradient(-90deg, rgba(45, 200, 194, 1), rgba(78, 223, 153, 1));
}

.supply-info__content p {
    font-size: 0.4rem;
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
}
.supply-info__content .supply-info__title {
    font-size: 0.32rem;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
}
</style>
