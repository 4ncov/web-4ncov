<template>
  <section class="map">
    <div id="chinamap"></div>
    <p class="bottom-tip">数据来源: xxx</p>
  </section>
</template>

<script>
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
    Bus.$on('mapChange', option => {
      console.log('map收到数据进行更新', option)
      echartObj.setOption(option)
    })
    echartObj.on('click', this.mapclick)
  },
  methods: {
    handleDataChange(e) {
      console.log('地图数据变化', e)
      return {
        title: ''
      }
    },
    mapclick(params) {
      this.$emit('onClick', {
        name: params.name,
        value: params.value
      })
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
