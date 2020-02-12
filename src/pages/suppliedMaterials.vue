<style scoped>
    .topImg {
        width: 100%;
    }
</style>

<template>
    <div class="supplied-materials">
        <img class="topImg" src="http://resource.guofangchao.com/4ncov/u213.png"/>
        <PostMaterials :labels="labels" :postType="'supplied'" @submit="handleSubmit"></PostMaterials>
    </div>
</template>

<script>
    import PostMaterials from '../components/PostMaterials.vue'
    import request from '../services/request'

    export default {
        name: 'supplied-materials',
        data() {
            return {
                labels: {
                    title: '物资供应信息发布',
                    materials: '可供应医疗物资信息',
                    contactor: '供应商信息',
                    organisationName: '供货机构名称',
                    contactorName: '联系人',
                    contactorPhone: '联系方式',
                    address: '发货地址',
                    uploadTip: '点击上传物资图片（可选）'
                }
            }
        },
        methods: {
            handleSubmit(formData) {
                request.post('/supplied-materials', formData).then(res => {
                    this.$message({ type: 'success', message: '物资供应信息发布成功' })
                    this.$router.push({ name: 'supplied-materials-overview' })
                })
            }
        },
        components: { PostMaterials }
    }
</script>
