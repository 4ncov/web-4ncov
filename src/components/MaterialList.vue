<template>
    <div class="material-list">
        <div>
            <el-card v-for="(item, index) in materials" v-bind:key="item.id" class="material-item"
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
                        <svg class="material-item__title__tag" xmlns:xlink="http://www.w3.org/1999/xlink"
                             xmlns="http://www.w3.org/2000/svg" version="1.1"
                             width="32px" height="41px">
                            <g transform="matrix(1 0 0 1 -330 -550 )">
                                <path d="M 2.9 0  L 29.1 0  C 29.4833333333333 0  29.85 0.081295439524125  30.2 0.243886318572375  C 30.75 0.478739810530948  31.1875 0.849085701696407  31.5125 1.35492399206874  C 31.8375 1.86076228244106  32 2.42079753249614  32 3.03502974223397  L 32 37.964970257766  C 32 38.5792024675039  31.8375 39.1392377175589  31.5125 39.6450760079313  C 31.1875 40.1509142983036  30.75 40.521260189469  30.2 40.7561136814276  C 29.8833333333333 40.9006389072483  29.5166666666667 40.9729015201586  29.1 40.9729015201586  C 28.3 40.9729015201586  27.6083333333333 40.6838510685173  27.025 40.1057501652346  L 16 28.6159947124917  L 4.975 40.1057501652346  C 4.375 40.7019167217449  3.68333333333333 41  2.9 41  C 2.51666666666667 41  2.15 40.9187045604759  1.8 40.7561136814276  C 1.25 40.521260189469  0.8125 40.1509142983036  0.4875 39.6450760079313  C 0.1625 39.1392377175589  0 38.5792024675039  0 37.964970257766  L 0 3.03502974223397  C 0 2.42079753249614  0.1625 1.86076228244106  0.4875 1.35492399206874  C 0.8125 0.849085701696407  1.25 0.478739810530948  1.8 0.243886318572375  C 2.15 0.081295439524125  2.51666666666667 0  2.9 0  Z "
                                      fill-rule="nonzero" fill="#ff0000" stroke="none"
                                      transform="matrix(1 0 0 1 330 550 )"/>
                            </g>
                        </svg>
                        <span class="material-item__title__index">{{index + 1}}</span>
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

    .material-item__title__tag {
        position: absolute;
        top: 0;
        right: 0;
    }

    .material-item__title__index {
        position: absolute;
        top: 10px;
        right: 12px;
        color: #fff;
        font-weight: bold;
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
