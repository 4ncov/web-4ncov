<style scoped>
    .topImg {
        width: 100%;
    }
</style>

<template>
    <div class="required-materials">
        <img class="topImg" src="http://resource.guofangchao.com/4ncov/u213.png"/>
        <PostMaterials :labels="labels" @submit="handleSubmit"></PostMaterials>
    </div>
</template>

<script>
    import PostMaterials from '../components/PostMaterials.vue'
    import request from '../services/request'
    import user from '../services/user'

    export default {
        name: 'required-materials',
        data() {
            return {
                // 如果required-materials和supplied-materials接口字段不一样才需要传
                // formData: {
                //   address: '',
                //   comment: '',
                //   contactorName: '',
                //   contactorPhone: '',
                //   hospitalName: '',
                //   imageUrls: [],
                //   materials: [
                //     {
                //       category: '',
                //       name: '',
                //       quantity: '',
                //       standard: ''
                //     }
                //   ]
                // },
                labels: {
                    title: '物资寻求信息发布',
                    materials: '所需医疗物资信息',
                    contactor: '收货信息',
                    organisationName: '发布机构名称',
                    contactorName: '联系人',
                    contactorPhone: '联系方式',
                    address: '收货地址',
                    uploadTip: '点击上传物资图片（可选）'
                }
            }
        },
        created() {
            if (!user.isLogin()) {
                this.$router.push(`/login?redirectTo=${encodeURIComponent('/required-materials')}`)
            }
        },
        methods: {
            handleSubmit(formData) {
                request.post('/required-materials', formData).then(res => {
                    this.$message({ type: 'success', message: '物资需求信息发布成功' })
                    this.$router.push({ name: 'required-materials-overview' })
                })
            }
        },
        components: { PostMaterials }
    }
</script>
