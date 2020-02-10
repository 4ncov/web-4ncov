<template>
    <div id="reg">
        <img class="top-img" src="http://resource.guofangchao.com/4ncov/u213.png"/>
        <div>
            <el-button-group>
                <el-button @click="activeIndex = 0" :type="activeIndex === 0 ? 'primary' : 'info'">供应方注册申请</el-button>
                <el-button @click="activeIndex = 1" :type="activeIndex === 1 ? 'primary' : 'info'">物资寻求方注册申请</el-button>
            </el-button-group>
        </div>
        <div class="formBox active0" v-if="activeIndex === 0">
            <el-form ref="suppForm" :model="suppForm" label-width="3rem">
                <el-form-item label="公司名称">
                    <el-input v-model="suppForm.name"></el-input>
                </el-form-item>
                <el-form-item label="联系人">
                    <el-input v-model="suppForm.contactorName"></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input v-model="suppForm.contactorTelephone"></el-input>
                </el-form-item>
                <el-form-item label="登录密码">
                    <el-input v-model="suppForm.password"></el-input>
                </el-form-item>
                <el-form-item label="申请人身份证号">
                    <el-input v-model="suppForm.identificationNumber"></el-input>
                </el-form-item>
                <el-form-item label="是否自备物流">
                    <div class="left">
                        <el-switch v-model="suppForm.haveLogistics" active-color="#13ce66"
                                   inactive-color="#ff4949"></el-switch>
                    </div>
                </el-form-item>
                <el-form-item label="公司资质">
                    <UploadImg v-model="imgs.img1"/>
                </el-form-item>
            </el-form>

            <el-button @click="signSupp" class="btnCls" type="primary">提交</el-button>
        </div>
        <div class="active1" v-if="activeIndex === 1">
            <el-form ref="hospForm" :model="hospForm" label-width="3rem">
                <el-form-item label="机构名称">
                    <el-input v-model="hospForm.name"></el-input>
                </el-form-item>
                <el-form-item label="联系人">
                    <el-input v-model="hospForm.contactorName"></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input v-model="hospForm.contactorTelephone"></el-input>
                </el-form-item>
                <el-form-item label="登录密码">
                    <el-input v-model="hospForm.password"></el-input>
                </el-form-item>
                <el-form-item label="18位社会统一信用代码">
                    <el-input v-model="hospForm.uniformSocialCreditCode"></el-input>
                </el-form-item>
                <el-form-item label="身份证号">
                    <el-input v-model="hospForm.identificationNumber"></el-input>
                </el-form-item>
                <el-form-item label="申请人身份证明">
                    <el-input v-model="imgs.img2"></el-input>
                </el-form-item>
            </el-form>
            <el-button @click="hospBtn" class="btnCls" type="primary">提交</el-button>
        </div>
    </div>
</template>

<script>
    import UploadImg from '../components/UploadImg'
    import request from '../services/request'

    export default {
        components: { UploadImg },
        data() {
            return {
                activeIndex: 0,
                suppForm: {
                    //公司名
                    contactorName: '',
                    //联系方式
                    contactorTelephone: '',
                    haveLogistics: true,
                    identificationNumber: '',
                    imageUrls: [''],
                    name: '',
                    password: ''
                },
                hospForm: {
                    //机构名
                    contactorName: '',
                    contactorTelephone: '',
                    identificationNumber: '',
                    imageUrls: [''],
                    name: '',
                    password: '',
                    uniformSocialCreditCode: ''
                },
                imgs: {
                    img1: '',
                    img2: ''
                }
            }
        },
        methods: {
            //供应方注册
            async signSupp() {
                const data = Object.assign({}, this.suppForm)
                data.imageUrls = [this.imgs.img1]
                try {
                    const res = await request.post('/suppliers/sign-up', data)
                    this.$message.success('注册成功')
                    this.$router.push('/login')
                } catch (error) {
                    console.log(error)
                    this.$message.error(error.message)
                }
            },
            async hospBtn() {
                const data = Object.assign({}, this.hospForm)
                data.imageUrls = [this.imgs.img2]
                try {
                    const res = await request.post('/hospitals/sign-up', data)
                    this.$message.success('注册成功')
                    this.$router.push('/login')
                } catch (error) {
                    console.log(error)
                    this.$message.error(error.message)
                }
            }
        }
    }
</script>

<style scoped>
    #reg {
        text-align: center;
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
