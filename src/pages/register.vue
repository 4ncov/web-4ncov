<template>
    <div id="reg">
        <img class="top-img" src="http://resource.guofangchao.com/4ncov/u213.png" />
        <div>
            <el-button-group>
                <el-button @click="activeIndex = 0" :type="activeIndex === 0 ? 'primary' : 'info'">供应方注册申请</el-button>
                <el-button @click="activeIndex = 1" :type="activeIndex === 1 ? 'primary' : 'info'">物资寻求方注册申请</el-button>
            </el-button-group>
        </div>
        <div class="formBox active0" v-if="activeIndex === 0">
            <el-form ref="form" :model="form" label-width="3rem">
                <el-form-item label="公司名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="联系人">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="登录密码">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="申请人身份证号">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="是否自备物流">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="公司资质">
                    <UploadImg v-model="form.img" />
                </el-form-item>
            </el-form>

            <el-button class="btnCls" type="primary">提交</el-button>
        </div>
        <div class="active1" v-if="activeIndex === 1">
            <el-form ref="form" :model="form" label-width="3rem">
                <el-form-item label="机构名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="联系人">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="登录密码">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="18位社会统一信用代码">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="身份证号">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="申请人身份证明">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </el-form>
            <el-button class="btnCls" type="primary">提交</el-button>
        </div>
    </div>
</template>

<script>
import UploadImg from '../components/UploadImg'

export default {
    components: { UploadImg },
    data() {
        return {
            activeIndex: 0,
            form: {
                name: '',
                img: ''
            },
            labels: {}
        }
    },
    methods: {
        handleBefore(file) {
            console.log(file)
            const reader = new FileReader()
            reader.onload = () => {
                this.form.img = reader.result
            }
            reader.readAsDataURL(file)
        },
        handleUploadSuccess(res) {
            const url = res.data.url
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
</style>
