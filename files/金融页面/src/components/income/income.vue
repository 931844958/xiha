<template>
  <div class="income">
    <header>
      <div class="user-desc">
        <div class="type  ">收入总额(元)</div>
        <div class="position  ">9990.00</div>
      </div>
      <div class="card-wrapper">
        <div>
          <p class="money">9990.00</p>
          <div class="desc">已结算</div>
        </div>
        <div>
          <p class="money">9990.00</p>
          <div class="desc">已结算</div>
        </div>
      </div>
    </header>
    <div class="bank-list">
      <div class="bank">
        <div class="from">
          <span>评级奖励</span>
        </div>
        <div class="desc">
          <h5 class="position  ">社会精英</h5>
          <p class=" ">工号：123456</p>
          <p class=" ">客户人数：0</p>
          <p class=" ">加入时间：2018-02-02 15:22</p>
        </div>
      </div>
    </div>
    <div class="btn">结算</div>
  </div>
</template>
<script>
export default {

}
</script>
<style scoped lang="less">
.income{
  min-height: 100vh;
  background-color: #eeeeee;
}
header{
  font-family: PingFang-SC-Bold;
  background-color: #ffffff;
}
.user-desc{
  padding:40px 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  .type{
    color: #333333;
    font-size: 24px;
    line-height: 2;
  }
  .position{
    color: #fd8049;
    font-size: 60px;
  }
}
.card-wrapper{
  display: flex;
  justify-content: space-between;
  padding: 30px 85px;
  box-sizing: border-box;
  div{
    text-align: center;
    .money{
      color: #fd8049;
      font-size: 48px;
    }
    .desc{
      color: #666666;
      font-size: 24px;
    }
  }
}
.bank-list{
  background-color: #ffffff;
  .bank{
    display: flex;
    height: 224px;
    padding: 30px;
    box-sizing: border-box;
    border-bottom: 1px solid #eeeeee;
    margin-top: 20px;
    &:last-of-type{
      border-bottom: none;
    }
    .from{
      writing-mode:vertical-rl;
      width: 34px;
      height: 128px;
      text-align: center;
      border-radius: 17px;
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
        font-size: 26px;
      }
      p{
        color: #666666;
        font-family: PingFang-SC-Medium;
        font-size: 24px;
        margin-left: 30px;
      }
    }
  }
}
.btn{
  background-color: #fd8049;
  width: 690px;
  line-height: 2.55;
  font-family: PingFang-SC-Medium;
  font-size: 30px;
  color: #ffffff;
  text-align: center;
  margin:50px auto;
}
</style>
