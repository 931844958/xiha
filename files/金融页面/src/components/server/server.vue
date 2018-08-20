<template>
  <div class="server">
    <header>
      <div class="user-desc">
        <div class="user-desc-wrapper">
          <img class="head-img" src="https://cn.bing.com/az/hprichbg/rb/OtterChillin_EN-CN10154811440_480x800.jpg">
        </div>
        <div class="type">社会精英</div>
        <div class="position">职务：经理 工号：123456</div>
      </div>
    </header>
    <div class="card-wrapper">
      <div>
        <img class="icon" src="./icon_dianhua@2x.png">
        <div class="btn">给我打电话</div>
      </div>
      <div>
        <img class="icon" src="./icon_weixin@2x.png">
        <div class="btn">加我微信</div>
      </div>
    </div>
    <div class="desc">
      专属客服经理是同城金服平台面对客户的唯一负责人，专属客服经理是同城金服平台面对客户的唯一负责人，专属客服经理是同城金服平台面对客户的唯一负责人
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style scoped lang="less">
.server{
  background: #ffffff;
  min-height: 100vh;
}
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
  display: flex;
  justify-content: space-between;
  padding:56px 100px;
  div{
    text-align: center;
    .icon{
      width: 56px;
      height: 56px;
    }
    .btn{
      padding: 6px 20px;
      color: #333333;
      background: #eeeeee;
      font-family: PingFang-SC-Medium;
      font-size: 22px;
    }
  }
}
.desc{
  padding:0 56px;
  color: #999999;
  line-height: 2;
  font-family: PingFang-SC-Medium;
  font-size: 26px;
}
</style>
