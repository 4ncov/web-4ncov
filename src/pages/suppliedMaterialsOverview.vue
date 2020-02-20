<template>
    <div>
        <Nav/>
        <dataMap v-if="featureToggle" :title="title" :dataTime="dataTime"/>
        <section class="listing">
            <div class="gap"></div>
            <p class="listing__title">查询物资供应方</p>
            <el-tabs @tab-click="handleTabSwitch">
                <el-tab-pane v-for="cat in categories" :key="cat.id" v-bind:label="cat.name"></el-tab-pane>
            </el-tabs>
            <MaterialList :materials="materials" quantityTitle="可提供" addressTitle="供货地址"></MaterialList>
            <el-button class="materials-loadmore" v-on:click="loadMore" v-bind:loading="loadingMore"
                       v-bind:disabled="!hasNextPage || loadingMore">
                {{ hasNextPage ? '加载更多' : '没有更多' }}
            </el-button>
        </section>
        <div v-if="isSupplier || !isLogin" class="publish-button">
            <a href="/supplied-materials">我要捐赠</a>
        </div>
    </div>
</template>

<script>
    import mapRefreshMixin from '../utils/mapRefreshMixin'
    import Nav from '../components/Nav'
    import dataMap from '../components/dataMap'
    import MaterialList from '../components/MaterialList'
    import SuppliedMaterialService from '../services/SuppliedMaterial'
    import MaterialCategoryService from '../services/MaterialCategory'
    import UserService from '../services/user'
    import featureToggle from '../utils/FeatureToggle'

    export default {
        name: 'supplied-materials-overview',
        components: { Nav, dataMap, MaterialList },
        mixins: [mapRefreshMixin],
        data() {
            return {
                featureToggle,
                title: '医疗物资供应分布地图',
                dataTime: '2020.01.29 15:30',
                materials: [],
                categories: [],
                page: 1,
                size: 10,
                loadingMore: true,
                hasNextPage: true,
                selectedCategory: '',
                isSupplier: UserService.isSupplier(),
                isLogin: UserService.isLogin()
            }
        },
        async created() {
            this.categories = await MaterialCategoryService.getAllCategories()
            this.selectedCategory = this.categories[0].name
            const materials = await SuppliedMaterialService
                .getSuppliedMaterials(this.page, this.size, this.selectedCategory)
            this.loadingMore = false
            this.materials = materials
            if (materials.length < this.size) {
                this.hasNextPage = false
            }
        },
        computed: {},
        methods: {
            dataProcessor() {
                this.option.visualMap = {
                    left: 'right',
                    min: 0,
                    max: 1000,
                    inRange: {
                        color: ['#fff', '#ff3908']
                    },
                    text: ['缺口', '富余'], // 文本，默认为数值文本
                    calculable: true,
                    itemWidth: 10,
                    itemHeight: 100
                }
                this.option.series = [
                    {
                        name: 'china map',
                        type: 'map',
                        roam: false,
                        map: 'china',
                        emphasis: {
                            label: {
                                show: true
                            }
                        },
                        // 文本位置修正
                        textFixed: {
                            Alaska: [20, -20]
                        },
                        data: [
                            { name: '北京', value: 500 },
                            { name: '山东', value: 10 },
                            { name: '湖北', value: 1200 },
                            { name: '上海', value: 1000 }
                        ]
                    }
                ]
                return this.option
            },
            async handleTabSwitch(tab) {
                this.loadingMore = true
                this.materials = []
                this.selectedCategory = tab.label
                this.page = 1
                this.loadingMore = true
                this.hasNextPage = true
                const materials = await SuppliedMaterialService.getSuppliedMaterials(
                    this.page, this.size, this.selectedCategory)
                this.loadingMore = false
                this.materials = materials
                if (materials.length < this.size) {
                    this.hasNextPage = false
                }
            },
            async loadMore() {
                if (!this.hasNextPage) {
                    return
                }
                this.loadingMore = true
                ++this.page
                const materials = await SuppliedMaterialService.getSuppliedMaterials(
                    this.page, this.size, this.selectedCategory)
                this.loadingMore = false
                this.materials = this.materials.concat(materials)
                if (materials.length < this.size) {
                    this.hasNextPage = false
                }
            }
        }
    }
</script>

<style scoped>
    .listing {
        padding: 0 0.5rem;
        height: 10rem;
    }

    .gap {
        margin-top: 0.2rem;
        height: 0.2rem;
        background-color: rgba(242, 242, 242, 1);
    }

    .listing__title {
        border-left: 0.08rem solid #09f;
        font-size: 0.35rem;
        padding-left: 0.08rem;
        margin-top: 0.2rem;
    }

    .materials-loadmore {
        width: 100%;
    }

    .publish-button {
        height: 1.3rem;
        width: 1.3rem;
        padding: 0.1rem;
        display: inline-block;
        position: fixed;
        bottom: 1rem;
        right: 0.2rem;
        border-radius: 50%;
        border: 1px solid #fff;
        text-align: center;
        background-color: #0af;
        z-index: 9999;
    }

    .publish-button a {
        height: 0.8rem;
        width: 0.8rem;
        padding: 0.15rem;
        display: inline-block;
        text-decoration: none !important;
        line-height: 0.5rem;
        color: #fff !important;
        font-size: 0.35rem;
    }
</style>
