<template>
    <div id="contact">
        <img class="top-img" src="http://resource.guofangchao.com/4ncov/u213.png"/>
        <section>
            <div class="contact-us__title">
                <h3>联系我们</h3>
            </div>
            <el-form>
                <el-form-item label="联系电话">
                    <el-input v-model="contactForm.telephone"/>
                </el-form-item>
                <el-form-item label="内容">
                    <el-input type="textarea" v-model="contactForm.content"/>
                </el-form-item>
                <el-button type="info" @click="handleBack">返回</el-button>
                <el-button type="primary" @click="handleSubmit">提交</el-button>
            </el-form>
        </section>
    </div>
</template>
<script>
    import ContactMessageService from '../services/ContactMessage'
    import UserService from '../services/user'

    export default {
        data() {
            return {
                contactForm: {
                    telephone: '',
                    content: ''
                }
            }
        },
        async created() {
            const me = await UserService.getMyDetail()
            this.contactForm.telephone = me.phone
        },
        methods: {
            async handleSubmit() {
                const response = await ContactMessageService.create(this.contactForm)
                this.$message.success(response.message)
            },
            handleBack() {
                this.$router.back()
            }
        }
    }
</script>
<style scoped>
    section {
        text-align: center;
        padding: 0 0.3rem;
    }

    .top-img {
        width: 100%;
    }

    .contact-us__title {
        text-align: center;
        margin-bottom: 0.5rem;
    }

    .contact-us__title h3 {
        font-size: 0.5rem;
        font-weight: normal;
        background-color: rgba(0, 153, 255, 0.117647058823529);
    }
</style>
