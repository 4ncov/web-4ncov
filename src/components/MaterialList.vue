<template>
    <div class="material-list">
        <div>
            <el-card v-for="item in materials" class="material-item"
                     :body-style="{ padding: '0px' }"
                     shadow="never">
                <el-row class="material-item__section">
                    <el-col :span="6">
                        <el-image style="width: 100%; height: 100%"
                                  :src="item.imageUrls && item.imageUrls[0]"
                                  :fit="'fill'">
                            <div slot="error" class="image-slot">
                                暂无图片
                            </div>
                        </el-image>
                    </el-col>
                    <el-col :span="18" class="material-item__title">
                        <p><strong>{{item.material.name}}</strong></p>
                        <p class="material-item__title_standard">执行标准: {{item.material.standard}}</p>
                    </el-col>
                </el-row>
                <hr class="material-item__separator"/>
                <div class="material-item__section">
                    <p><strong>{{item.organisationName}}</strong></p>
                    <p class="material-item__section__quantity"><strong>需：{{item.material.quantity}}件</strong></p>
                    <p>收货地址: {{item.address}}</p>
                    <p>联系人: {{item.contactorName}}</p>
                    <p>联系方式: {{item.contactorPhone}}</p>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'material-list',
        props: {
            materials: {
                type: Array,
                default: () => []
            },
            categories: {
                type: Array,
                default: () => []
            }
        }
    }
</script>

<style scoped>
    .material-item {
        margin-bottom: 0.25rem;
        border: 1px solid #aaa;
    }

    .material-item__title {
        padding-left: 0.4rem;
    }

    .material-item__title_standard {
        color: #aaa;
    }

    .material-item__separator {
        border-top: 1px solid #ddd;
    }

    .material-item__section {
        padding: 0.5rem;
    }

    .material-item__section__quantity {
        color: #f00;
        margin-bottom: 0.3rem;
    }
</style>
