<style scoped>
.topImg {
    width: 100%;
}
</style>

<template>
    <div class="supplied-materials">
        <img class="topImg" src="http://resource.guofangchao.com/4ncov/u213.png" />
        <PostMaterials :labels="labels" @submit="handleSubmit"></PostMaterials>
    </div>
</template>

<script>
import PostMaterials from '../components/PostMaterials.vue'
import request from '../services/request'
import user from '../services/user'

export default {
    name: 'supplied-materials',
    data() {
        return {
            // 如果supplied-materials和required-materials接口字段不一样才需要传
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
                title: '物资供应信息发布',
                materials: '可供应医疗物资信息',
                contactor: '供应商信息',
                hospitalName: '供货机构名称',
                contactorName: '联系人',
                contactorPhone: '联系方式',
                address: '发货地址',
                uploadTip: '点击上传物资图片（可选）'
            }
        }
    },
    created() {
        if (!user.isLogin()) {
            this.$router.push('/login')
        }
    },
    methods: {
        handleSubmit(formData) {
            console.log(formData)
            request.post('/supplied-materials', formData).then(res => {
                console.log(res)
                // TODO：提交成功后的行为
                alert('post supplied-materials success')
            })
        }
    },
    components: { PostMaterials }
}
</script>
