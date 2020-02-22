<template>
    <div>
        <div>
            <img class="topImg" src="http://resource.guofangchao.com/4ncov/u213.png"/>
            <PostMaterials v-if="material" :isAddAllowed="!$route.params.id" :labels="labels" :materialToEdit="material"
                           :handleGoBack="handleGoBack"
                           @submit="handleSubmit"/>
        </div>
    </div>
</template>
<script>
    import PostMaterials from '../components/PostMaterials'
    import RequiredMaterialService from '../services/RequiredMaterial'
    import SuppliedMaterialService from '../services/SuppliedMaterial'

    export default {
        name: 'edit-material',
        components: { PostMaterials },
        data() {
            return {
                labels: this.$route.name === 'EditRequiredMaterial' ? {
                    title: '物资寻求信息修改',
                    materials: '所需医疗物资信息',
                    contactor: '收货信息',
                    organisationName: '发布机构名称',
                    contactorName: '联系人',
                    contactorPhone: '联系方式',
                    address: '收货地址',
                    uploadTip: '点击上传物资图片（可选）'
                } : {
                    title: '物资供应信息修改',
                    materials: '可供应医疗物资信息',
                    contactor: '供应商信息',
                    organisationName: '供货机构名称',
                    contactorName: '联系人',
                    contactorPhone: '联系方式',
                    address: '发货地址',
                    uploadTip: '点击上传物资图片（可选）'
                },
                material: null
            }
        },
        async created() {
            await this.fetchMaterial()
        },
        watch: {
            '$route.params.id': 'fetchMaterial'
        },
        methods: {
            async fetchMaterial() {
                this.material = null
                if (this.$route.name === 'EditRequiredMaterial') {
                    this.material = await RequiredMaterialService.getDetail(this.$route.params.id)
                } else if (this.$route.name === 'EditSuppliedMaterial') {
                    this.material = await SuppliedMaterialService.getDetail(this.$route.params.id)
                }
                if (this.material) {
                    this.material = Object.assign(this.material, { materials: [this.material.material] })
                }
            },
            async handleSubmit(material) {
                this.$route.name === 'EditRequiredMaterial'
                    ? await RequiredMaterialService.update(this.$route.params.id, material)
                    : await SuppliedMaterialService.update(this.$route.params.id, material)
                this.$message.success('更新成功')
                this.$router.back()
            },
            handleGoBack() {
                this.$router.back()
            }
        }
    }
</script>
<style scoped>
    .topImg {
        width: 100%;
    }
</style>
