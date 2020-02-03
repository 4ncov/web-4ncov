<template>
  <div id="real-time-data">
    <div class="top_title">
      <div>省市</div>
      <div>口罩供应情况</div>
      <div>按缺口数量排序</div>
    </div>
    <div class="list">
      <div class="item" v-for="item in 20" :key="item">
        <div>{{ item }}.湖北</div>
        <div>-100000</div>
        <Process w="80" class="process" />
      </div>
    </div>
    <div class="footer">
      <div class="more">查看更多地区</div>
      <div class="txt">数据来源:xxxx</div>
    </div>
  </div>
</template>

<script>
import Process from '../components/Process'
import mapRefreshMixin from '../utils/mapRefreshMixin'

export default {
  name: 'real-time-data',
  components: { Process },
  mixins: [mapRefreshMixin],
  data() {
    return {
      menuKey: 'wz',
      count: 0,
      selectedId: 0,
      items: [{ label: '首页' }, { label: '推荐' }, { label: 'Android' }],
      options: {
        activeColor: '#1d98bd'
      }
    }
  },
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
        max: 500,
        inRange: {
          color: ['#19A3FF', '#fff', '#FF6550']
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
            { name: '北京', value: 10 },
            { name: '山东', value: 10 },
            { name: '湖北', value: 100 },
            { name: '海南', value: 1 }
          ]
        }
      ]
      return this.option
    },
    load() {
      if (this.count > 100) return
      this.count += 2
    },
    tab_change(item, index) {
      console.log(item, index)
    },
    onClick(data) {
      console.log(data)
    }
  }
}
</script>

<style scoped>
.footer {
  padding: 0.2rem 0.1rem;
}
.footer .more {
  text-align: center;
  font-size: 0.2rem;
  border-bottom: solid 1px #333;
  padding: 0.1rem 0;
}
.footer .txt {
  font-size: 0.3rem;
  padding: 0.1rem 0;
}
.top_title {
  background: #ccc;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.1rem 0;
}
.item {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0.1rem 0;
}
.process {
  width: 5rem;
}
</style>
