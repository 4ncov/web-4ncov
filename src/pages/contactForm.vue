<template>
    <div id="contact">
        <img class="top-img" src="http://resource.guofangchao.com/4ncov/u213.png"/>
        <section>
            <div>
                <p>联系我们</p>
            </div>
            <el-form>
                <el-form-item label="联系电话">
                    <el-input v-model="contactForm.telephone"/>
                </el-form-item>
                <el-form-item label="内容">
                    <el-input type="textarea" v-model="contactForm.content"/>
                </el-form-item>
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
                this.$message.success('提交成功.')
            }
        }
    }
</script>
<style scoped>
    .top-img {
        width: 100%;
    }
</style>
