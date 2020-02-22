<style scoped>
    .post-materials {
        padding: 0 0.3rem;
    }

    .el-button {
        padding: 0.1rem 0.2rem;
    }

    .el-button > span {
        font-size: 0.25rem;
    }

    .add-materials,
    .remove-materials {
        float: right;
        color: #409eff;
        cursor: pointer;
    }

    .add-materials >>> span,
    .remove-materials >>> span {
        font-size: 0.35rem;
    }

    .el-form-item {
        margin-bottom: 0.2rem;
    }

    .submit {
        display: block;
        width: 100%;
        margin: 0.5rem 0;
    }

    .post-materials {
        position: relative;
    }

    .post-materials > p {
        margin-top: 0.3rem;
        text-align: right;
        font-weight: bold;
    }

    .post-materials > p > i {
        margin-bottom: 0.1rem;
        font-weight: bold;
        cursor: pointer;
    }

    .post-materials > .post-materials__title {
        text-align: center;
        margin-bottom: 0.5rem;
    }

    .post-materials > .post-materials__title > h3 {
        font-size: 0.5rem;
        font-weight: normal;
        background-color: rgba(0, 153, 255, 0.117647058823529);
    }

    .materials-item__label {
        font-weight: bold;
        margin-bottom: 0.3rem;
        display: inline-block;
    }

    .el-form-item >>> .el-form-item__label {
        text-align: left;
    }

    .el-upload__tip {
        font-size: 16px;
    }
</style>

<template>
    <div class="post-materials">
        <p>
            <i class="el-icon-close" @click="handleGoBack"></i>
        </p>
        <div class="post-materials__title">
            <h3 v-text="labels.title"></h3>
        </div>
        <el-form ref="form" :model="formData" label-width="2.5rem" size="mini">
            <label class="materials-item__label" v-text="labels.materials"></label>
            <!-- 物资列表开始 -->
            <div class="materials">
                <div class="materials-item" v-for="(material, i) in formData.materials" :key="i">
                    <label class="materials-item__label" v-text="`物资${i + 1}`"></label>
                    <el-form-item label="种类">
                        <el-select v-model="material.category" style="width:100%">
                            <el-option v-for="category in categoryList" :key="category.id" :label="category.name"
                                       :value="category.name"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="品名">
                        <el-input v-model="material.name"></el-input>
                    </el-form-item>
                    <el-form-item label="数量">
                        <el-input v-model="material.quantity"></el-input>
                    </el-form-item>
                    <el-form-item label="执行标准">
                        <el-input v-model="material.standard"></el-input>
                    </el-form-item>
                    <el-form-item label="物资图片(可选)">
                        <el-upload
                                :disabled="material.imageUrls.length > 0"
                                :multiple="false"
                                :show-file-list="false"
                                :headers="{ Authorization: getAuthorizationHeader() }"
                                :on-error="handleUploadError"
                                :data="{ category }"
                                name="image"
                                action="/api/images"
                                :on-progress="handleUploadInProgress"
                                :on-success="(res) => handleUploadSuccess(res, material)"
                        >
                            <el-button :disabled="material.imageUrls.length > 0" type="primary">
                                上传物资图片
                            </el-button>
                        </el-upload>
                        <el-button :disabled="material.imageUrls.length === 0" type="danger"
                                   @click="() => handleClearImage(material)">清除物资图片
                        </el-button>
                        <el-image v-if="material.imageUrls.length > 0" :src="material.imageUrls[0]"/>
                    </el-form-item>
                    <div type="primary" class="remove-materials" @click="handleRemoveMaterial(i)"
                         v-show="formData.materials.length > 1">
                        <i class="el-icon-remove"></i>
                    </div>
                </div>
                <div v-if="isAddAllowed" type="primary" size="mini" class="add-materials"
                     @click="handleAddMaterial">
                    <i class="el-icon-circle-plus"></i>
                </div>
            </div>
            <!-- 物资列表结束 -->
            <!-- 用户信息开始 -->
            <label class="materials-item__label" v-text="labels.contactor"></label>
            <div class="other">
                <el-form-item :label="labels.organisationName">
                    <el-input v-model="formData.organisationName"></el-input>
                </el-form-item>
                <el-form-item :label="labels.contactorName">
                    <el-input v-model="formData.contactorName"></el-input>
                </el-form-item>
                <el-form-item :label="labels.contactorPhone">
                    <el-input v-model="formData.contactorPhone"></el-input>
                </el-form-item>
                <el-form-item :label="labels.address">
                    <el-col :span="8">
                        <el-select v-model="formData.address.province" placeholder="省" @change="handleProvinceChange">
                            <el-option v-for="province in location.provinces" :key="province" :label="province"
                                       :value="province"/>
                        </el-select>
                    </el-col>
                    <el-col :span="8">
                        <el-select v-model="formData.address.city" placeholder="市" @change="handleCityChange">
                            <el-option v-for="city in location.cities" :key="city" :label="city" :value="city"/>
                        </el-select>
                    </el-col>
                    <el-col :span="8">
                        <el-select v-model="formData.address.district" placeholder="区县">
                            <el-option v-for="district in location.districts" :key="district" :label="district"
                                       :value="district"/>
                        </el-select>
                    </el-col>
                    <el-col :span="24">
                        <el-input v-model="formData.address.streetAddress" placeholder="街道地址"/>
                    </el-col>
                </el-form-item>
            </div>
            <!-- 用户信息结束 -->
            <label class="materials-item__label">其他信息</label>
            <el-form-item label="备注">
                <el-input v-model="formData.comment"></el-input>
            </el-form-item>
            <el-button class="submit" type="primary" @click="handleSubmit"
                       v-bind:disabled="isUploading" v-bind:loading="isUploading">
                提交
            </el-button>
        </el-form>
    </div>
</template>

<script>
    import MaterialCategoryService from '../services/MaterialCategory'
    import MasterDataService from '../services/MasterData'
    import Cookie from 'js-cookie'

    export default {
        name: 'post-materials',
        props: {
            postType: {
                type: String,
                default: 'required'
            },
            labels: {
                type: Object,
                default: () => ({})
            },
            materialToEdit: {
                type: Object
            },
            isAddAllowed: {
                type: Boolean,
                default: true
            },
            handleGoBack: {
                type: Function
            }
        },
        data() {
            return {
                formData: {
                    // 发布/供货机构名称
                    organisationName: '',
                    // 联系人
                    contactorName: '',
                    // 联系电话
                    contactorPhone: '',
                    // 收货/发货地址
                    address: {
                        province: '',
                        city: '',
                        district: '',
                        streetAddress: ''
                    },
                    // 物资图片, 支持多张
                    imageUrls: [],
                    // 物资信息
                    materials: [
                        {
                            // 物资类别
                            category: '',
                            // 物资名称
                            name: '',
                            // 物资数量
                            quantity: '',
                            // 执行标准
                            standard: '',
                            imageUrls: []
                        }
                    ],
                    // 备注
                    comment: ''
                },
                categoryList: [],
                isUploading: false,
                location: {
                    provinces: [],
                    cities: [],
                    districts: []
                }
            }
        },
        async created() {
            if (this.materialToEdit) {
                Object.assign(this.formData, this.materialToEdit)
            }
            this.categoryList = await MaterialCategoryService.getAllCategories()
            this.location.provinces = await MasterDataService.listProvinces()
        },
        computed: {
            // eslint-disable-next-line vue/return-in-computed-property
            category() {
                if (this.postType === 'required') {
                    return '寻求图片'
                } else if (this.postType === 'supplied') {
                    return '供应图片'
                }
            }
        },
        methods: {
            async handleProvinceChange() {
                this.formData.address.city = ''
                this.formData.address.district = ''
                this.location.cities = await MasterDataService.listCities(this.formData.address.province)
            },
            async handleCityChange() {
                this.formData.address.district = ''
                this.location.districts = await MasterDataService.listDistricts(
                    this.formData.address.province, this.formData.address.city)
            },
            getAuthorizationHeader() {
                return `Bearer ${Cookie.get('token')}`
            },
            handleUploadInProgress() {
                this.isUploading = true
            },
            handleUploadSuccess(res, material) {
                const url = res.data.url
                material.imageUrls.push(url)
                this.isUploading = false
            },
            handleUploadError(err, file, fileList) {
                err = JSON.parse(err.message)
                this.$message({
                    type: 'error',
                    message: err.message
                })
                this.isUploading = false
            },
            handleClearImage(material) {
                material.imageUrls = []
            },
            handleSubmit() {
                this.$emit('submit', this.formData)
            },
            handleAddMaterial() {
                this.formData.materials.push({
                    category: '',
                    name: '',
                    quantity: '',
                    standard: '',
                    imageUrls: []
                })
            },
            handleRemoveMaterial(i) {
                this.formData.materials.splice(i, 1)
            }
        }
    }
</script>
