<template>
  <div>
      <div class="title">
          <div>省市</div>
          <div>口罩供应情况</div>
          <div>按缺口数量排序</div>
      </div>
      <div class="list">
          <div class="item">
              <div>
                  1.湖北
              </div>
              <div>
                  -100000
              </div>
              <Process w="80" class="process" />
          </div>
      </div>
  </div>
</template>

<script>
import Process from '../components/Process'

export default {
components: { Process },
}
</script>

<style scoped>
.title{
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.item{
     display: flex;
    justify-content: space-around;
    align-items: center;
}
.process{
    width: 5rem;
}
</style>