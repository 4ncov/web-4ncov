<template>
    <div id="login">
        <img class="top-img" src="http://resource.guofangchao.com/4ncov/u213.png"/>
        <div class="form">
            <div class="tit">
                用户登录
            </div>
            <div class="item">
                请输入登录名（手机号/邮箱）
                <el-input size="mini" v-model="username" placeholder="请输入登录名"></el-input>
            </div>
            <div class="item">
                请输入登录密码
                <el-input size="mini" v-model="password" placeholder="请输入密码" show-password></el-input>
            </div>
            <div v-if="featureToggle" class="forget">
                <router-link to="/forget-pwd">忘记密码?</router-link>
            </div>
            <div class="forget">
                <a v-on:click="handleRegister">点击实名注册账户</a>
            </div>
            <el-button :loading="loading" size="mini" style="width: 100%" @click="loginTo" class="sub" type="primary">
                确定
            </el-button>
        </div>
    </div>
</template>

<script>
    import Request from '../services/request'
    import User from '../services/user'
    import featureToggle from '../utils/FeatureToggle'

    export default {
        data() {
            return {
                loading: false,
                username: '',
                password: '',
                featureToggle
            }
        },
        methods: {
            async loginTo() {
                if (!this.password || !this.username) {
                    return this.$message.error('请填写登录名和密码')
                }
                try {
                    this.loading = true
                    const res = await Request.post('/users/sign-in', {
                        password: this.password,
                        telephone: this.username
                    })
                    this.loading = false
                    User.setInfo(res.data.token, res.data.expiresAt, res.data.role)
                    let errMsg = ''
                    if (this.$route.query.redirectTo === '/required-materials' && User.isSupplier()) {
                        errMsg = '您登录的账号是供应方账号，无法发布寻求'
                    }
                    if (this.$route.query.redirectTo === '/supplied-materials' && User.isHospital()) {
                        errMsg = '您登录的账号是寻求方账号，无法发布供应'
                    }
                    if (!!errMsg) {
                        alert(errMsg)
                        return this.$router.push('/')
                    }
                    const redirectTo = this.$route.query.redirectTo || '/'
                    this.$router.push(redirectTo)
                } catch (error) {
                    this.loading = false
                    // this.$message.error(error.message)
                }
            },
            handleRegister() {
                this.$router.push(`/register?redirectTo=${this.$route.query.redirectTo}`)
            }
        }
    }
</script>

<style scoped>
    #login {
        text-align: center;
    }

    .top-img {
        width: 100%;
    }

    .form {
        padding: 0.5rem 1.5rem;
    }

    .tit {
        margin-top: 0.5rem;
        font-size: 0.5rem;
    }

    .item {
        text-align: left;
        font-size: 0.33rem;
        margin: 0.3rem 0;
        line-height: 0.6rem;
        color: #606266;
    }

    .forget {
        text-align: right;
    }

    .forget a {
        font-size: 0.2rem;
        text-decoration: none;
    }

    .sub {
        padding: 0.2rem 0.7rem;
        margin-top: 0.2rem;
    }
</style>
