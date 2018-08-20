<template>
  <div class="orders">
    <div class="search-wrapper">
      <div class="search">
        <div class="icon-input">
          <img class="icon" src="./icon_search@2x.png"/>
          <input class="input" placeholder="请输入手机号或工号"/>
        </div>
        <span class="btn ignore">搜索</span>
      </div>
    </div>
    <div class="tab-wrapper">
      <tab class="tab-com ignore" :line-width="1" custom-bar-width="30px" bar-active-color="#ff4e00" active-color="#ff4e00">
        <tab-item class="tab-item" selected>热门</tab-item>
        <tab-item class="tab-item">审批快</tab-item>
        <tab-item class="tab-item">额度高</tab-item>
        <tab-item class="tab-item">佣金高</tab-item>
      </tab>
    </div>
    <div class="bank-list">
      <div class="bank-wrapper">
        <div class="bank">
          <div class="from">评级奖励</div>
          <div class="desc">
            <h5 class="position ignore">社会精英</h5>
            <p class="ignore">工号：123456</p>
            <p class="ignore">客户人数：0</p>
            <p class="ignore">加入时间：2018-02-02 15:22</p>
          </div>
        </div>
        <div class="btn-wrapper">
          <span class="btn yl">移至待再查</span>
          <span class="btn gr">移至待再查</span>
          <span class="btn bl">移至待再查</span>
        </div>
      </div>
      <div class="bank-wrapper">
        <div class="bank">
          <div class="from">评级奖励</div>
          <div class="desc">
            <h5 class="position ignore">社会精英</h5>
            <p class="ignore">工号：123456</p>
            <p class="ignore">客户人数：0</p>
            <p class="ignore">加入时间：2018-02-02 15:22</p>
          </div>
        </div>
        <div class="btn-wrapper">
          <span class="btn yl">移至待再查</span>
          <span class="btn gr">移至待再查</span>
          <span class="btn bl">移至待再查</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {Tab, TabItem} from 'vux'
export default {
  components:{
    Tab, TabItem
  }
}
</script>
<style scoped lang="less">
.orders{
  min-height: 100vh;
  background-color: #eeeeee;
  .search-wrapper{
    background-color: #ffffff;
    margin-bottom: 2px;
    .search{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding:0 30px;
      height: 80px;
      .icon-input{
        display: flex;
        align-items: center;
      }
      .icon{
        width:38px;
        height:34px;
        margin-right: 50px;
      }
      .input{
        color: #cccccc;
        font-family: PingFang-SC-Medium;
        font-size: 12px;
        border:none;
      }
      .btn{
        color: #fd8049;
        font-family: PingFang-SC-Medium;
        font-size: 12px;
        padding:10px;
      }
    }
  }
  .bank-list{
    background-color: #ffffff;
    .bank-wrapper{
      height: 296px;
      border-bottom: 1px solid #eeeeee;
      padding:0 30px;
      box-sizing: border-box;
      &:last-of-type{
        border-bottom: none;
      }
    }
    .bank{
      display: flex;
      padding: 30px 0;
      box-sizing: border-box;
      .from{
        writing-mode:  vertical-rl;
        width: 34px;
        height: 128px;
        vertical-align: middle;
        background-color: #ff4e00;
        color: #fefefe;
        font-family: PingFang-SC-Medium;
        font-size: 22px;
      }
      .desc{
        flex: 1;
        .position{
          margin-left: 20px;
          color: #333333;
          font-family: PingFang-SC-Medium;
          font-size: 14px;
        }
        p{
          color: #666666;
          font-family: PingFang-SC-Medium;
          font-size: 12px;
          margin-left: 30px;
        }
      }
    }
  }
  .btn-wrapper{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .btn{
      margin-left: 10px;
      padding: 10px 20px;
      color: #ffffff;
      font-family: PingFang-SC-Medium;
      font-size: 22px;
    }
    .yl{
      background: #fd8049;
    }
    .gr{
      background: #999999;
    }
    .bl{
      background: #00a0e9;
    }
  }
}
</style>
