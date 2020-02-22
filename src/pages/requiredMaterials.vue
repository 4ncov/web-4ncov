<style scoped>
    .topImg {
        width: 100%;
    }
</style>

<template>
    <div class="required-materials">
        <img class="topImg" src="http://resource.guofangchao.com/4ncov/u213.png"/>
        <PostMaterials :labels="labels" :handleGoBack="handleGoBack" @submit="handleSubmit"></PostMaterials>
    </div>
</template>

<script>
    import PostMaterials from '../components/PostMaterials.vue'
    import request from '../services/request'

    export default {
        name: 'required-materials',
        data() {
            return {
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
        methods: {
            handleSubmit(formData) {
                request.post('/required-materials', formData).then(res => {
                    this.$message({ type: 'success', message: '物资需求信息发布成功' })
                    this.$router.push({ name: 'required-materials-overview' })
                })
            },
            handleGoBack() {
                this.$router.push('/required-materials-overview')
            }
        },
        components: { PostMaterials }
    }
</script>
