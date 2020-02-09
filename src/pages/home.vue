<template>
    <div id="home" v-loading="loading">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>
<script>
import Bus from '../utils/bus'
export default {
    name: 'Home',
    data() {
        return {
            loading: false
        }
    },
    mounted() {
        // TODO: loading最好细分化到按钮，全局loading效果不佳
        // Bus.$on('loading', _ => (this.loading = _))
    }
}
</script>
