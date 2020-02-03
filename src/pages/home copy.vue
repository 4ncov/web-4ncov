<template>
  <div id="home">
    <div class="banner">
      <el-carousel height="3rem" trigger="click">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3 class="small">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <ChinaMap @onClick="onClick" />
    <div id="navs">
      <router-link to="/foo">物资寻求</router-link>
      <router-link to="/foo">物资供应</router-link>
      <router-link to="/foo">车辆供应</router-link>
      <router-link to="/foo">物资动态</router-link>
    </div>
    <div class="tabs">
      <ly-tab v-model="selectedId" change="tab_change" :items="items" :options="options"> </ly-tab>
    </div>
    <div class="list">
      <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
        <li v-for="i in count" v-bind:key="i" class="infinite-list-item">
          <div class="item1">
            <h3>医用口罩</h3>
            <p>供应量：1万件</p>
            <p>供货单位：某某医疗公司</p>
            <p>湖北省武汉市某某地点</p>
            <p>联系人：王某某</p>
            <div class="item1_foot">
              <span>电话：130000000000</span>
              <span class="date">2020-01-27</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="line"></div>
    <div class="footer">
      <el-button type="primary" round>添加供应服务</el-button>
    </div>
  </div>
</template>

<script>
import ChinaMap from '../components/ChinaMap'

export default {
  name: 'app',
  components: { ChinaMap },
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
.banner {
  background: #ccc;
}
#navs {
  margin-top: 0.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.2rem 0;
  background: #ccc;
}
#navs a {
  width: 2rem;
  text-decoration: none;
  color: #333;
}
.line {
  height: 1.7rem;
}
.footer {
  position: fixed;
  bottom: 0.2rem;
  width: 100%;
  text-align: center;
}
.item1 {
  border-bottom: solid 1px #ccc;
  padding: 5px;
}
.item1_foot {
  font-size: 0.4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.item1_foot .date {
  font-size: 0.2rem;
}
</style>
