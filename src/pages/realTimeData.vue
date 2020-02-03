<template>
  <div id="real-time-data">
    <div class="title">
      <h2>医疗物资供求分布图</h2>
      <span>(统计截至2020.01.29 15:30)</span>
    </div>
    <div class="cls">
      <label> <input type="radio" />口罩 </label>
      <label> <input type="radio" />医用帽 </label>
      <label> <input type="radio" />核算检测试剂 </label>
      <label> <input type="radio" />防护服 </label>
      <label> <input type="radio" />防护眼镜 </label>
      <label> <input type="radio" />防护面罩 </label>
    </div>
    <ChinaMap @onClick="onClick" />
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
import ChinaMap from '../components/ChinaMap'
import Process from '../components/Process'

export default {
  name: 'real-time-data',
  components: { ChinaMap, Process },
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
.title {
  padding: 0.3rem 0.5rem;
}
.title h2 {
  font-size: 0.4rem;
}
.title span {
  font-size: 0.15rem;
  color: #999;
}
.cls {
  padding: 0.1rem 0.5rem;
}
.cls label {
  font-size: 0.2rem;
  margin-right: 0.3rem;
}
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
