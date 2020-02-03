<template>
  <section class="hospital-list">
    <div class="gap"></div>
    <p class="hospital-list__title">查询物资寻求方</p>
  </section>
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

<style scoped>
.hospital-list {
  padding: 0 0.5rem;
  /* background-color: skyblue; */
  height: 10rem;
}
.gap {
  margin-top: 0.2rem;
  height: 0.2rem;
  background-color: rgba(242, 242, 242, 1);
}
.hospital-list__title {
  border-left: 0.08rem solid #09f;
  font-size: 0.35rem;
  padding-left: 0.08rem;
  margin-top: 0.2rem;
}
</style>
