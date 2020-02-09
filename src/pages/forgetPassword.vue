<template>
    <div id="reg">
        <img class="top-img" src="http://resource.guofangchao.com/4ncov/u213.png" />
        <div class="outmost">
            <div>
                <div class="close-icon">
                    <i class="el-icon-close" @click="login"></i>
                </div>
                <div class="title">
                    密码重置
                </div>
                <div class="notification" v-if="showable">身份信息验证失败，登录名不匹配身份证号</div>
            </div>
            <div class="formBox">
                <el-form ref="forgetForm" :model="forgetForm" :rules="rules" label-width="3rem" label-position="top">
                    <el-form-item label="请输入登录名（手机号/邮箱）" prop="telephone" :show-message="false">
                        <el-input v-model="forgetForm.telephone"></el-input>
                    </el-form-item>
                    <el-form-item label="请输入注册人身份证号" prop="identificationNumber" :show-message="false">
                        <el-input v-model="forgetForm.identificationNumber"></el-input>
                    </el-form-item>
                    <el-form-item label="请输入新密码" prop="password">
                        <el-input type="password" v-model="forgetForm.password"></el-input>
                    </el-form-item>
                    <el-form-item label="请再次确认密码" prop="confirmPassword">
                        <el-input type="password" v-model="forgetForm.confirmPassword"></el-input>
                    </el-form-item>
                </el-form>

                <el-button @click="ok('forgetForm')" class="btnCls" type="primary">确定</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import UploadImg from '../components/UploadImg'
import request from '../services/request'

export default {
    components: { UploadImg },
    data() {
        var checkPhone = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入用户名'))
            } else {
                callback()
            }
        }
        var checkPass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'))
            } else {
                if (this.forgetForm.cofirmPassword !== '') {
                    this.$refs.forgetForm.validateField('checkPass')
                }
                callback()
            }
        }
        var checkConfirmPass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'))
            } else if (value !== this.forgetForm.password) {
                callback(new Error('两次密码输入不一致！'))
            } else {
                callback()
            }
        }
        return {
            showable: false,
            forgetForm: {
                //登录名
                telephone: '',
                //身份证号
                identificationNumber: '',
                password: '',
                confirmPassword: ''
            },
            newObj: {
                //登录名
                telephone: '',
                //身份证号
                identificationNumber: '',
                password: '',
            },
            rules: {
                telephone: [
                    {
                        required: true,
                        validator: checkPhone,
                        trigger: 'blur'
                    }
                ],
                identificationNumber: [
                    {
                        required: true,
                        message: ' ',
                        trigger: 'blur'
                    },
                ],
                password: [
                    {
                        required: true,
                        validator: checkPass,
                        trigger: 'blur'
                    }
                ],
                confirmPassword: [
                    {
                        required: true,
                        validator: checkConfirmPass,
                        trigger: 'blur'
                    }
                ]
            }
        }
    },
    methods: {
        //供应方注册
        async ok(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.submit()
                }
            })
        },
        async submit() {
            try {
                const res = await request.post('/users/reset-password', {
                    telephone: this.forgetForm.telephone,
                    identificationNumber: this.forgetForm.identificationNumber,
                    password: this.forgetForm.password
                })
                this.$message.success('密码重置成功')
                setTimeout(() => {
                    this.$router.push('/login')
                }, 3000)
            } catch (error) {
                this.showable = true
                console.log(error)
                this.$message.error(error.message)
            }
        },
        login() {
            this.$router.push('/login')
        }
    }
}
</script>

<style scoped>
#reg {
    text-align: center;
}
.outmost {
    margin-left: 20%;
    margin-right: 20%;
    text-align: center;
}
.notification {
    color: red;
    font-size: 14px;
}
.close-icon {
    text-align: right;
    cursor: pointer;
}
.title {
    font-size: 20px;
    background-color: lightskyblue;
}
.top-img {
    width: 100%;
}
.formBox {
    padding: 1rem 0.2rem;
    margin-right: 0.4rem;
}
.btnCls {
    margin-top: 0.2rem;
    padding: 0.3rem 2rem;
}

.uploadBox {
    width: 5rem;
    height: 3rem;
    background: #fefefe;
    border: solid 1px #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
}
.uploadImg {
    max-width: 5rem;
    max-height: 3rem;
}
.left {
    text-align: left;
}
</style>
