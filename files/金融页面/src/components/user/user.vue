<template>
  <div class="user">
    <div class="header">
      <div class="user-desc">
        <div class="user-desc-wrapper">
          <img class="head-img" src="https://cn.bing.com/az/hprichbg/rb/OtterChillin_EN-CN10154811440_480x800.jpg">
        </div>
        <div class="type">社会精英</div>
        <div class="position">职务：经理 工号：123456</div>
      </div>
      <div class="card-wrapper">
        <card>
          <div slot="content" class="card-demo-flex card-demo-content01">
            <div>
              <div class="desc">总收入</div>
              <div class="money">1130</div>
            </div>
            <div>
              <div class="desc">总收入</div>
              <div class="money">1130</div>
            </div>
            <div>
              <div class="desc">总收入</div>
              <div class="money">1130</div>
            </div>
          </div>
        </card>
      </div>
    </div>
    <div class="footer">
      <div class="f-item">
        <img class="icon" style="width:20px;" src="./icon_wodedingdan@2x.png"/>
        <div class="desc">我的订单</div>
      </div>
      <div class="f-item">
        <img class="icon" style="width:20px;" src="./icon_wodedingdan@2x.png"/>
        <div class="desc">我的订单</div>
      </div>
      <div class="f-item">
        <img class="icon" style="width:20px;" src="./icon_wodedingdan@2x.png"/>
        <div class="desc">我的订单</div>
      </div>
      <div class="f-item">
        <img class="icon" style="width:20px;" src="./icon_wodedingdan@2x.png"/>
        <div class="desc">我的订单</div>
      </div>
      <div class="f-item">
        <img class="icon" style="width:20px;" src="./icon_wodedingdan@2x.png"/>
        <div class="desc">我的订单</div>
      </div>
      <div class="f-item">
        <img class="icon" style="width:20px;" src="./icon_wodedingdan@2x.png"/>
        <div class="desc">我的订单</div>
      </div>
      <div class="f-item">
        <img class="icon" style="width:20px;" src="./icon_wodedingdan@2x.png"/>
        <div class="desc">我的订单</div>
      </div>
      <div class="f-item">
        <img class="icon" style="width:20px;" src="./icon_wodedingdan@2x.png"/>
        <div class="desc">我的订单</div>
      </div>
    </div>
  </div>
</template>
<script>
import {Card } from 'vux'
export default {
  components:{
    Card 
  }
}
</script>
<style scoped lang="less">
.user{
  min-height: 100vh;
  background-color: #eeeeee;
  .header{
    background-color: #ffffff;
    .user-desc{
      padding: 20px;
      display: flex;
      align-items: center;
      flex-direction: column;
      .user-desc-wrapper{
        width: 120px;
        height: 120px;
        border-radius: 50%;
        border: 4px solid #fca252;
        overflow: hidden;
      }
      .head-img{
        width: 100%;
        height: 100%;
      }
      .type{
        color: #ff4e00;
        font-family: PingFang-SC-Medium;
        font-size: 28px;
        line-height: 2;
      }
      .position{
        color: #666666;
        font-family: PingFang-SC-Medium;
        font-size: 24px;
      }
    
    }
    .card-wrapper{
      width: 690px;
      margin:0 auto;
      .card-demo-flex {
        display: flex;
      }
      .card-demo-content01 {
        padding: 10px 0;
      }
      .card-demo-flex > div {
        flex: 1;
        text-align: center;
        font-size: 12px;
      }
      .card-demo-flex .money {
        color: #ff4e00;
        font-family: PingFang-SC-Medium;
        font-size: 36px;
      }
      .card-demo-flex .desc {
        color: #333333;
        font-family: PingFang-SC-Medium;
        font-size: 26px;
      }
    }
    
  }
  .footer{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 20px;
    padding: 20px 50px;
    background-color: #ffffff;
    .f-item{
      display: flex;
      flex-direction: column;
      align-items: center;
      margin:20px;
      .icon{
        height: 44px;
      }
      .desc{
        text-align: center;
        line-height: 2;
        color: #666666;
        font-family: PingFang-SC-Medium;
        font-size: 26px;
      }
    }
  }
}
</style>
