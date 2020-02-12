<template>
    <div id="reg">
        <img class="top-img" src="http://resource.guofangchao.com/4ncov/u213.png" />
        <div class="button-group">
            <el-button-group>
                <el-button size="mini" @click="activeIndex = 0" :type="activeIndex === 0 ? 'primary' : 'info'">供应方注册申请</el-button>
                <el-button size="mini" @click="activeIndex = 1" :type="activeIndex === 1 ? 'primary' : 'info'">物资寻求方注册申请</el-button>
            </el-button-group>
        </div>
        <div class="formBox active0" v-if="activeIndex === 0">
            <el-form ref="suppForm" :model="suppForm" label-position="left" label-width="2rem" size="mini">
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
                <el-form-item label="身份证号">
                    <el-input v-model="suppForm.identificationNumber"></el-input>
                </el-form-item>
                <el-form-item>
                    <template slot="label"><span class="switch-label">是否自备物流</span></template>
                    <div class="left">
                        <el-switch v-model="suppForm.haveLogistics" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                    </div>
                </el-form-item>
                <el-form-item label="公司资质">
                    <UploadImg v-model="imgs.img1" />
                </el-form-item>
                <!-- <el-form-item> -->
                <el-button :loading="disable" @click="signSupp" class="btnCls" type="primary" size="mini" style="width:100%">提交</el-button>
                <!-- </el-form-item> -->
            </el-form>
        </div>
        <div class="formBox active1" v-if="activeIndex === 1">
            <el-form ref="hospForm" :model="hospForm" label-width="2rem" size="mini">
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
                    <UploadImg v-model="imgs.img2" />
                </el-form-item>
            </el-form>
            <el-button @click="hospBtn" class="btnCls" style="width:100%" size="mini" type="primary">提交</el-button>
        </div>
    </div>
</template>

<script>
import UploadImg from '../components/UploadImg'
import request from '../services/request'
import Bus from '../utils/bus'

export default {
    components: { UploadImg },
    data() {
        return {
            disable: false,
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
    mounted() {
        Bus.$on('registerFileUpload', e => {
            if (e === 1) {
                this.disable = true
            } else {
                this.disable = false
            }
        })
    },
    methods: {
        //供应方注册
        async signSupp() {
            const data = Object.assign({}, this.suppForm)
            data.imageUrls = [this.imgs.img1]
            try {
                const res = await request.post('/suppliers/sign-up', data)
                this.$message.success('注册成功')
                this.$router.push(`/login?redirectTo=${encodeURIComponent(this.$route.query.redirectTo)}`)
            } catch (error) {
                // console.log(error)
                // this.$message.error(error.message)
            }
        },
        async hospBtn() {
            const data = Object.assign({}, this.hospForm)
            data.imageUrls = [this.imgs.img2]
            try {
                const res = await request.post('/hospitals/sign-up', data)
                this.$message.success('注册成功')
                this.$router.push(`/login?redirectTo=${encodeURIComponent(this.$route.query.redirectTo)}`)
            } catch (error) {
                // console.log(error)
                // this.$message.error(error.message)
            }
        }
    }
}
</script>

<style scoped>
#reg {
    text-align: center;
}
.button-group {
    margin-top: 0.5rem;
}
.top-img {
    width: 100%;
}

.formBox {
    padding: 1rem 0.8rem;
    /* margin-right: 0.4rem; */
}

.btnCls {
    /* margin-top: 0.2rem;
    padding: 0.3rem 2rem; */
}

/* .uploadBox {
    width: 100%;
    height: 3rem;
    background: #fefefe;
    border: solid 1px #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    border-radius: 10%;
} */

.uploadImg {
    max-width: 5rem;
    max-height: 3rem;
}

.left {
    width: 3rem;
    /* text-align: center; */
}
.el-form >>> .el-form-item__label {
    text-align: left;
    font-size: 0.35rem;
}
.switch-label {
    text-align: left;
    font-size: 0.35rem;
    display: inline-block;
    /* width: 7rem; */
    white-space: nowrap;
}
</style>
