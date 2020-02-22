<template>
    <div>
        <div class="banner">
            <img src="http://resource.guofangchao.com/4ncov/u213.png"/>
        </div>
        <p class="close">
            <i class="el-icon-close" @click="handleGoBack"></i>
        </p>
        <div class="title">
            <h3>我的{{ mode === 'MyRequiredMaterials' ? '寻求' : '供应' }}</h3>
        </div>
        <section>
            <MaterialList v-if="categories.length > 0"
                          :mode="mode"
                          :isEditable="true"
                          :categories="categories"
                          :materials="materials"
                          :quantityTitle="mode === 'MyRequiredMaterials' ? '需' : '可提供'"
                          :addressTitle="`${mode === 'MyRequiredMaterials' ? '收货' : '供货'}地址`"
                          :handleEdit="handleEdit"/>

            <el-button v-if="handleEdit" class="materials-loadmore" v-on:click="loadMore"
                       v-bind:loading="pagination.loadingMore"
                       v-bind:disabled="!pagination.hasNextPage || pagination.loadingMore">
                {{ pagination.hasNextPage ? '加载更多' : '没有更多' }}
            </el-button>
        </section>
    </div>
</template>
<script>
    import MaterialList from '../components/MaterialList'
    import MaterialCategoryService from '../services/MaterialCategory'
    import RequiredMaterialService from '../services/RequiredMaterial'
    import SuppliedMaterialService from '../services/SuppliedMaterial'

    export default {
        name: 'myMaterials',
        components: { MaterialList },
        data() {
            return {
                categories: [],
                materials: [],
                mode: this.$route.name,
                pagination: {
                    page: 1,
                    size: 10,
                    hasNextPage: true,
                    loadingMore: true
                },
                handleEdit: null
            }
        },
        async created() {
            this.handleEdit = {
                'MyRequiredMaterials': id => this.$router.push(`/required-materials/${id}?t=${Date.now()}`),
                'MySuppliedMaterials': id => this.$router.push(`/supplied-materials/${id}?t=${Date.now()}`)
            }[this.$route.name]
            await this.fetchCategories()
            await this.fetchMaterials()
        },
        methods: {
            handleGoBack() {
                this.$router.back()
            },
            async fetchCategories() {
                this.categories = await MaterialCategoryService.getAllCategories()
            },
            async fetchMaterials() {
                this.pagination.loadingMore = true
                let materials = []
                if (this.mode === 'MyRequiredMaterials') {
                    materials = await RequiredMaterialService
                        .getMyRequiredMaterials(this.pagination.page, this.pagination.size)
                }
                if (this.mode === 'MySuppliedMaterials') {
                    materials = await SuppliedMaterialService
                        .getMySuppliedMaterials(this.pagination.page, this.pagination.size)
                }
                this.materials = this.materials.concat(materials)
                this.pagination.hasNextPage = materials.length >= this.pagination.size
                this.pagination.loadingMore = false
            },
            async loadMore() {
                ++this.pagination.page
                await this.fetchMaterials()
            }
        }
    }
</script>
<style scoped>
    .banner {
        background: #ccc;
    }

    .banner img {
        width: 100%;
    }

    section {
        padding: 0 0.5rem;
    }

    .title {
        text-align: center;
        margin-bottom: 0.5rem;
    }

    .title > h3 {
        font-size: 0.5rem;
        font-weight: normal;
        background-color: rgba(0, 153, 255, 0.117647058823529);
    }

    .materials-loadmore {
        width: 100%;
    }

    .close {
        text-align: right;
    }
</style>
