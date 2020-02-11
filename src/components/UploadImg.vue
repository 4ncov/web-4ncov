<template>
    <div>
        <!-- v-show="status !== 1" -->
        <el-upload
            v-loading="status === 1"
            class="uploadBox"
            :data="{ category: type }"
            name="image"
            action="/api/images"
            :before-upload="handleBefore"
            :on-success="handleUploadSuccess"
            :on-error="handleError"
            :on-progress="handleProgress"
            :show-file-list="false"
        >
            <img v-if="value !== ''" class="uploadImgEnd" :src="value" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </div>
</template>

<script>
import Bus from '../utils/bus'
export default {
    props: {
        value: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: '身份验证'
        }
    },
    data() {
        return {
            status: 0, //当前状态0：待上传，1：上传中，2：上传完毕
            tmp: '',
            percent: 0
        }
    },
    mounted() {
        if (this.value !== '') this.status = 2
    },
    methods: {
        handleError() {
            this.status = 0
            this.tmp = ''
            this.percent = 0
        },
        handleProgress(event) {
            if (event.percent < 100) {
                this.percent = event.percent
            }
        },
        handleBefore(file) {
            this.status = 1
            this.percent = 0
            const reader = new FileReader()
            reader.onload = () => {
                this.tmp = reader.result
            }
            reader.readAsDataURL(file)
        },
        handleUploadSuccess(res) {
            this.status = 2
            this.percent = 100
            const url = res.data.url
            this.$emit('input', url)
        }
    },
    watch: {
        status(newVal) {
            Bus.$emit('registerFileUpload', newVal)
        }
    }
}
</script>

<style scoped>
.uploadBox {
    width: 100%;
    height: 3rem;
    background: #fefefe;
    border: solid 1px #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    border-radius: 0.2rem;
}
.uploadImg {
    width: auto;
    height: 3rem;
}
.uploadImg img {
    width: auto;
    height: 3rem;
}
.uploadImgEnd {
    height: 2.5rem;
}
</style>
