<template>
  <div class="row">
    <div v-if="!imageList.length">
      <div class="row">
        <div @click="timeEnReserved" :class="reserveChange ? 'blue-back' : ''">
          时间排序
        </div>
        <div @click="typeReserved">
          分类排序
        </div>
      </div>
      <div class="row">
        <div class="cloumn item"
             v-for="item of baseList"
             :key="item.id">
          <div>{{item.type}}</div>
          <div>{{item.name}}</div>
          <img class="img" :src="item.img">
          <div>{{item.creatTime}}</div>
        </div>
      </div>
    </div>
    <div class="cloumn"
         v-else
         v-for="(item, index) in imageList"
         :key="index">
      <div class="button" @click="typeListenReserved(index)">正序</div>
      <div class="button" @click="typeListdeReserved(index)">倒序</div>
      <draggable :list="item.imageList" class="cloumn item list-group-item" draggable=".item" group="people" @change="log">
        <transition-group type="transition" name="flip-list">
          <div
            class="cloumn item"
            v-for="item1 in item.imageList"
            :key="item1.id">
            <div>{{item.type}}</div>
            <div>{{item1.name}}</div>
            <img class="img" :src="item1.img">
            <div>{{item1.creatTime}}</div>
          </div>
        </transition-group>
      </draggable>
    </div>
  </div>
</template>

<script>
import LIST from '../assets/json/imageList'
// import BASELIST from '../assets/json/baseList'
import draggable from 'vuedraggable'
export default {
  name: 'index',
  components: {draggable},
  mounted () {
    this.init()
    // 为了防止火狐浏览器拖拽的时候以新标签打开，此代码真实有效
    document.body.ondrop = function (event) {
      event.preventDefault()
      event.stopPropagation()
    }
  },
  updated () {
    console.log(this.imageList)
  },
  data () {
    return {
      imageList: '', // 被拖拽列表
      reserveChange: false, // 初始排序flag
      // imageList: LIST,
      // baseList: BASELIST,
      baseList: [] // 初始列表
    }
  },
  methods: {
    init () {
      let list = []
      LIST.forEach(item => {
        list = list.concat(item.imageList)
      })
      this.baseList = list
      this.$forceUpdate()
    },
    // 类别时间正序
    typeListenReserved (index) {
      this.imageList[index].imageList = this.enReserved(this.imageList[index].imageList)
      this.$forceUpdate()
    },
    // 类别时间倒叙
    typeListdeReserved (index) {
      this.imageList[index].imageList = this.deReserved(this.imageList[index].imageList)
      this.$forceUpdate()
    },
    // 类别列表
    typeReserved () {
      this.imageList = LIST
    },
    // 首页时间正序
    timeEnReserved () {
      this.reserveChange = !this.reserveChange
      this.baseList = this.reserveChange ? this.enReserved(this.baseList) : this.deReserved(this.baseList)
      this.$forceUpdate()
    },
    // 正序
    enReserved (list) {
      return list.sort((a, b) => {
        return new Date(a['creatTime']).getTime() - new Date(b['creatTime']).getTime()
      })
    },
    // 倒叙
    deReserved (list) {
      return list.sort((a, b) => {
        return new Date(b['creatTime']).getTime() - new Date(a['creatTime']).getTime()
      })
    },
    // 变化时
    log (add, to) {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .img{
    width: 40px;
  }
  .row{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .cloumn{
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .button{
    width: 100px;
  }
  .item{
    margin: 10px;
  }
  .blue-back{
    color: blue;
  }
  span {
    min-width: 50px;
    min-height: 50px;
  }
</style>
