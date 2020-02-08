<template>
    <div class="material-list">
        <div>
            <el-card v-for="item in materials" class="material-item"
                     :body-style="{ padding: '0px' }"
                     shadow="never">
                <el-row class="material-item__section">
                    <el-col :span="8">image</el-col>
                    <el-col :span="16">
                        <p><strong>{{item.material.name}}</strong></p>
                        <p>执行标准: {{item.material.standard}}</p>
                    </el-col>
                </el-row>
                <hr/>
                <div class="material-item__section">
                    <p><strong>{{item.organisationName}}</strong></p>
                    <p>需：{{item.material.quantity}}件</p>
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

    .material-item__section {
        padding: 0.3rem 0.5rem;
    }
</style>
