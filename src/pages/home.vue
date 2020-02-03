<template>
  <div id="home">
    <Nav />
    <dataMap :title="title" :dataTime="dataTime" />
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
import Nav from '../components/Nav'
import dataMap from '../components/dataMap'
export default {
  name: 'Home',
  components: { Nav, dataMap },
  data() {
    return {
      title: '医疗物资需求分布地图',
      dataTime: '2020.01.29 15:30'
    }
  }
}
</script>
