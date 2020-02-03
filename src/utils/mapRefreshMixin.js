// 地图数据刷新逻辑mixin
import Bus from '../utils/bus'

const mapRefreshMixin = {
  data() {
    return {
      option: {}
    }
  },
  mounted() {
    // TODO: 数据来了以后对option进行修改，传入map进行重绘,
    // NOTE: 这部操作需要保证map的dom已经准备好
    Bus.$emit('mapChange', this.dataProcessor())
  },
  activated() {
    // TODO:由于组件做了缓存，用户切换tap可以理解为要刷新数据
    // 具体的刷新周期需要接口协商，暂时不做刷新
    Bus.$emit('mapChange', this.dataProcessor())
  },
  methods: {}
}

export default mapRefreshMixin
