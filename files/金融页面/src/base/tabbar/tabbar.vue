<template>
  <div class="tabbar">
    <div class="item" @click="tabChange(index)" v-for="(item,index) in tabData" :key="index">
      <img  :src="item.icon">
      <span >{{item.text}}</span>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      tabData:[{
        icon:require('./icon_gerenzhongxin@2x.png'),
        text:'个人中心'
      },{
        icon:require('./icon_jinduchaxun@2x.png'),
        text:'进度查询'
      }]
    }
  },
  methods:{
    tabChange(index){
      this.$emit('switchTab',index)
    }
  }
}
</script>
<style scoped lang="less">
.tabbar{
  position: fixed;
  bottom: 0;
  left:0;
  right:0;
  height: 98px;
  font-size: 32px;
  background: #fd5f19;
  display: flex;
  .item{
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &:first-child::after{
      content: ' ';
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 0;
      height: 70px;
      width: 2px;
      background: #ffffff;
    }
    img{
      width: 44px;
      margin-right: 28px;
    }
    &:first-of-type img{
      height: 44px;
    }
    &:last-of-type img{
      height: 33px;
    }
    span{
      font-family: PingFang-SC-Medium;
      color: #ffffff;
      font-size: 32px;
    }
  }
}
</style>
