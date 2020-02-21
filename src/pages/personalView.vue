<template>
    <div>
        <Nav/>
        <section>
            <div class="me-button">
                <el-button type="primary">账户信息</el-button>
            </div>
            <div class="me-button">
                <el-button type="primary">我发布的</el-button>
            </div>
            <div class="me-button">
                <router-link :to="{ path: '/contact-us' }">
                    <el-button type="primary">使用反馈</el-button>
                </router-link>
            </div>
        </section>
    </div>
</template>
<script>
    import Nav from '../components/Nav'

    export default {
        name: 'me',
        components: { Nav },
        data() {
            return {}
        }
    }
</script>
<style scoped>
    section {
        padding-top: 1.2rem;
    }

    .me-button {
        padding: 0.6rem;
        text-align: center;
    }
</style>
