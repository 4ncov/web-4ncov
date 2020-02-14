<template>
    <div class="material-list">
        <div>
            <el-card v-for="(item, index) in materials" v-bind:key="item.id" class="material-item" :body-style="{ padding: '0px' }" shadow="never">
                <el-row class="material-item__section">
                    <el-col :span="6">
                        <img
                            v-if="item.imageUrls"
                            style="height: 1.6rem; width: 1.6rem;object-fit:cover"
                            :src="item.imageUrls && item.imageUrls[0]"
                        />
                        <div v-else style="height: 1.6rem; width: 1.6rem">
                            暂无图片
                        </div>
                    </el-col>
                    <el-col :span="18" class="material-item__title">
                        <img :src="getImgUrl(index)" class="material-item__title__tag" alt="" />

                        <span class="material-item__title__index">{{ index + 1 }}</span>
                        <p>{{ item.material.name }}</p>
                        <p class="material-item__title_standard">执行标准: {{ item.material.standard }}</p>
                    </el-col>
                </el-row>
                <hr class="material-item__separator" />
                <div class="material-item__section material-item__bottom">
                    <div>
                        <p class="material-item__section__name">
                            <strong>{{ item.organisationName }}</strong>
                        </p>
                        <p><img src="/imgs/icon_avataor@2x.webp" class="avataor" alt="" />{{ item.contactorName }} | {{ item.contactorPhone }}</p>
                        <p><img src="/imgs/icon-adress@2x.webp" class="avataor" alt="" />{{ item.address }}</p>
                    </div>
                    <div class="material-item__section__quantity">
                        <p>
                            <strong>{{ item.material.quantity }}</strong>
                        </p>
                        <p>
                            所需该物资数量
                        </p>
                    </div>
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
        },
        quantityTitle: {
            type: String,
            default: () => ''
        },
        addressTitle: {
            type: String,
            default: () => ''
        }
    },
    methods: {
        getImgUrl(index) {
            switch (index) {
                case 0:
                    return '/imgs/tag_one@2x.webp'
                    break

                case 1:
                    return '/imgs/tag_two@2x.webp'
                    break

                case 2:
                    return '/imgs/tag_three@2x.webp'
                    break
                default:
                    return ''
                    break
            }
        }
    }
}
</script>

<style scoped>
.material-list .el-card {
    overflow: unset;
}
.material-list {
    margin-top: 0.3rem;
}
.material-item {
    margin-bottom: 0.25rem;
    border: 1px solid rgba(255, 229, 202, 1);
    box-shadow: 0px 0px 5px 2px rgba(175, 135, 95, 0.26);
}

.material-item__title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    /* padding-left: 0.4rem; */
}

.material-item__title__tag {
    position: absolute;
    top: -0.2rem;
    right: 0.5rem;
    width: 0.67rem;
    height: 1.15rem;
}

.material-item__title__index {
    /* position: absolute; */
    /* top: 10px; */
    /* right: 12px; */
    font-size: 0.32rem;
    font-family: Source Han Sans CN;
    color: #fff;
    font-weight: bold;
}

.material-item__title p {
    font-size: 0.32rem;
    font-weight: bold;
}

.material-item__title .material-item__title_standard {
    color: #aaa;
    font-size: 0.27rem;
    font-weight: 400;
}

.material-item__separator {
    border-top: 1px solid #ddd;
}

.material-item__section {
    padding: 0.27rem 0.55rem;
}
.material-item__section__name {
    margin-bottom: 0.14rem;
}
.material-item__bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.material-item__bottom p strong {
    font-size: 0.37rem;
    color: #000;
}
.material-item__bottom .avataor {
    width: 0.35rem;
    height: 0.35rem;
}
.material-item__bottom p {
    font-size: 0.32rem;
    color: #666666;
    height: 0.59rem;
    line-height: 0.59rem;
    vertical-align: middle;
}
.material-item__bottom img {
    vertical-align: middle;
    padding-right: 0.1rem;
}
.material-item__section__quantity p strong {
    font-size: 0.45rem;
    font-family: Microsoft YaHei UI;
    font-weight: bold;
    color: rgba(240, 83, 58, 1);
}
.material-item__section__quantity p {
    text-align: center;
    font-size: 0.27rem;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #999;
}
</style>
