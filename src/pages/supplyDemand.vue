<template>
  <section></section>
</template>

<script>
import mapRefreshMixin from '../utils/mapRefreshMixin'
export default {
  name: 'supply-demand',
  mixins: [mapRefreshMixin],
  data() {
    return {}
  },
  computed: {},
  methods: {
    dataProcessor() {
      this.option.tooltip = {
        trigger: 'item',
        showDelay: 0,
        transitionDuration: 0.2,
        formatter: function(params) {
          return params.name + ': 123'
        }
      }
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
    }
  }
}
</script>

<style></style>
