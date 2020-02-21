<template>
    <div>
        <Nav/>
        <section>
            <div class="me-button">
                <el-button type="primary">账户信息</el-button>
            </div>
            <div v-if="role === 'HOSPITAL' || role === 'SYSADMIN'" class="me-button">
                <el-button type="primary">我的寻求</el-button>
            </div>
            <div v-if="role === 'SUPPLIER' || role === 'SYSADMIN'" class="me-button">
                <el-button type="primary">我的发布</el-button>
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
    import UserService from '../services/user'

    export default {
        name: 'me',
        components: { Nav },
        data() {
            return {
                role: UserService.getRole()
            }
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
