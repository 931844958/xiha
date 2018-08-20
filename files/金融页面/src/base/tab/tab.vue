<template>
  <div class="tab">
    <div class="tab-wrapepr">
      <div :class="['item', {'active':tabIndex===index}]" @click="tabChange(index)" v-for="(item,index) in tabData" :key="index">
        <span>{{item}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      tabIndex:0,
      tabData:['热门','审批快','额度高','佣金高']
    }
  },
  methods:{
    tabChange(index){
      this.tabIndex=index
    }
  }
}
</script>
<style scoped lang="less">
.tab-wrapepr{
  background: #ffffff;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  .item{
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #666666;
    font-family: PingFang-SC-Bold;
    padding:0 6px;
    font-size: 32px;
    &::after{
      content: ' ';
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 0;
      height: 20px;
      width: 1px;
      background: #cccccc;
    }
    span{
      padding: 0 10px;
      height: 58px;
      line-height: 58px;
    }
    &.active span{
      color: #ff4e00;
      border-bottom: 2px solid #ff4e00;
    }
  }

}
</style>
