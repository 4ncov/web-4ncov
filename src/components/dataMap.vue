<template>
    <section>
        <div class="title">
            <h2>{{ title }}</h2>
            <span>(统计截至 {{ dataTime }})</span>
        </div>
        <div class="cls">
            <label v-for="item of property" :key="item.id" :for="item.id">
                <input :name="item.id" type="radio" :value="item" v-model="selectedProperty" @click="handlePropertyChange(item)" />
                <span :style="{ color: selectedProperty.id === item.id ? '#09f' : '#000' }">
                    {{ item.name }}
                </span>
            </label>
        </div>
        <ChinaMap @onClick="mapChange" />
    </section>
</template>

<script>
import ChinaMap from '../components/ChinaMap'
export default {
    components: { ChinaMap },
    props: {
        title: {
            type: String,
            required: true
        },
        dataTime: {
            type: String
        }
    },
    data() {
        return {
            property: [
                { id: 0, name: '口罩' },
                { id: 1, name: '医用帽' },
                { id: 2, name: '核算检测试剂' },
                { id: 3, name: '防护服' },
                { id: 4, name: '防护眼镜' },
                { id: 5, name: '防护面罩' }
            ],
            selectedProperty: null
        }
    },
    created() {
        this.selectedProperty = this.property[0]
    },
    methods: {
        handlePropertyChange(item) {
            this.$emit('propertyChange', item)
        },
        mapChange(name) {
            console.log(name)
        }
    }
}
</script>

<style></style>
