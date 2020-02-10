<template>
    <section class="map">
        <div id="chinamap"></div>
        <p class="bottom-tip">数据来源: xxx</p>
    </section>
</template>

<script>
import echarts from 'echarts'
import mapJSON from 'echarts/map/json/china.json'

import Bus from '../utils/bus'

export default {
    name: 'chinamap',
    data() {
        return {}
    },
    mounted() {
        let echartObj = echarts.init(document.getElementById('chinamap'))
        echarts.registerMap('china', mapJSON)
        echartObj.on('rendered', () => {
            echartObj.resize()
        })
        const opts = {
            tooltip: {
                trigger: 'item',
                showDelay: 0,
                transitionDuration: 0.2,
                formatter: this.formater
            },
            visualMap: {
                left: 'right',
                min: 0,
                max: 500,
                inRange: {
                    color: ['#169bd5', '#fff', '#a50026']
                },
                text: ['缺口', '富余'], // 文本，默认为数值文本
                calculable: true,
                itemWidth: 10,
                itemHeight: 100
            },
            series: [
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
                        { name: '北京', value: 10 },
                        { name: '山东', value: 10 },
                        { name: '湖北', value: 100 },
                        { name: '海南', value: 1 }
                    ]
                }
            ]
        }
        Bus.$on('mapChange', option => {
            console.log('map收到数据进行更新', option)
            echartObj.setOption(option)
        })
        echartObj.setOption(opts)
    },
    methods: {
        formater(params) {
            this.$emit('onClick', {
                name: params.name,
                value: params.value
            })
            return params.name + ':123'
        }
    }
}
</script>

<style>
.map {
    padding: 0.03rem 0.5rem;
}
#chinamap {
    height: 7rem;
}
.bottom-tip {
    border-top: 1px solid #797979;
    font-size: 0.2rem;
    color: #666666;
}
</style>
