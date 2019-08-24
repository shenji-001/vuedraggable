<template>
  <div class="hello">
    <div class="cloumn"
         v-for="(item, index) in imageList"
         :key="index">
      <div class="button" @click="enReserved(index)">正序</div>
      <div class="button" @click="deReserved(index)">倒序</div>
      <draggable :list="item.imageList" class="cloumn" :draggable="item.imageList.length > 1 ? '.item' : ''" group="a">
        <div
          class="cloumn item"
          v-for="(item1, index1) in item.imageList"
          :key="index1">
          <div>{{item.type}}</div>
          <img class="img" :src="item1.img">
          <div>{{item1.creatTime}}</div>
        </div>
      </draggable>
    </div>
  </div>
</template>

<script>
import LIST from '../assets/json/imageList'
import draggable from 'vuedraggable'
export default {
  name: 'index',
  components: {draggable},
  mounted () {
    // 为了防止火狐浏览器拖拽的时候以新标签打开，此代码真实有效
    document.body.ondrop = function (event) {
      event.preventDefault()
      event.stopPropagation()
    }
  },
  data () {
    return {
      imageList: LIST,
      draging: null, // 被拖拽的对象
      target: null // 目标对象
    }
  },
  methods: {
    enReserved (index) {
      this.imageList[index].imageList = this.imageList[index].imageList.sort((a, b) => {
        return new Date(a['creatTime']).getTime() - new Date(b['creatTime']).getTime()
      })
      this.$forceUpdate()
    },
    deReserved (index) {
      this.imageList[index].imageList = this.imageList[index].imageList.sort((a, b) => {
        return new Date(b['creatTime']).getTime() - new Date(a['creatTime']).getTime()
      })
      this.$forceUpdate()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .img{
    width: 40px;
  }
  .hello{
    display: flex;
    justify-content: space-around;
  }
  .row{
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .cloumn{
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .button{
    width: 100px;
  }
</style>
