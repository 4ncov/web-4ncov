<template>
    <div id="chinamap"></div>
</template>

<script>
import echarts from 'echarts';
import map_json from 'echarts/map/json/china.json';

export default {
    name: 'chinamap',
    data() {
        return {
            echartObj: null
        };
    },
    created() {},
    mounted() {
        this.echartObj = echarts.init(document.getElementById('chinamap'));
        echarts.registerMap('china', map_json);
        this.echartObj.on('rendered', () => {
            this.echartObj.resize();
        });
        let option = {
            // title: {
            //     text: '中国地图',
            //     left: 'right'
            // },
            tooltip: {
                trigger: 'item',
                showDelay: 0,
                transitionDuration: 0.2,
                formatter: function(params) {
                    return params.name + ': 123';
                }
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
        };

        this.echartObj.setOption(option);
        this.echartObj.on('click', this.mapclick);
    },
    methods: {
        mapclick(params) {
            this.$emit('onClick', {
                name: params.name,
                value: params.value
            });
        }
    }
};
</script>

<style>
#chinamap {
    height: 7rem;
}
</style>
