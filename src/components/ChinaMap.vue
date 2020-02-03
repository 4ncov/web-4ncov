<template>
  <div id="chinamap"></div>
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
#chinamap {
  height: 7rem;
}
</style>
