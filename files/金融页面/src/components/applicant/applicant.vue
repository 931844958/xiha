<template>
  <div class="applicant">
    <div class="banner-wrapper">
      <img src="./banner@2x.png"/>
    </div>
    <div class="title">选择或添加申请人信息</div>
    <div class="form-wrapper">
      <div class="info-box">
        <div class="info">
          <p>姓名：王大锤</p>
          <p>身份证号：9999999999999999</p>
          <p>手机号：88888888888</p>
        </div>
        <div class="check-box">
          <img src="./icon_select@2x.png"/>
          <span>未选择</span>
        </div>
      </div>
      <div class="add-btn"><span>+添加申请人信息</span></div>
      <div class="tips"><span>您当前职位最多可以添加3名申请人</span></div>
      <div class="contract">
        <img src="./icon_select@2x.png"/>
        <span>本人已阅读并同意以下条款</span>
        <a>《同城金服平台用户协议》</a>
      </div>
      <div class="aggre">下一步</div>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style scoped lang="less">
.applicant{
  min-height: 100vh;
  background-color: #eeeeee;
  .banner-wrapper{
    height: 308px;
    width: 100%;
    img{
      height: 100%;
      width: 100%;
    }
  }
  .title{
    padding: 40px 50px;
    color: #333333;
    font-family: PingFang-SC-Bold;
    font-size: 30px;
  }
  .form-wrapper{
    background-color: #ffffff;
    width: 710px;
    box-sizing: border-box;
    padding: 40px 30px;
    margin:0 auto;
    .info-box{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .info{
        width: 500px;
        height: 180px;
        background: #ff9b24;
        box-sizing: border-box;
        padding: 20px;
        line-height: 2;
        color: #333333;
        font-family: PingFang-SC-Medium;
        font-size: 24px;
      }
      .check-box{
        img{
          width: 20px;
          height: 20px;
          margin-right: 8px;
        }
        color: #ff5829;
        font-family: PingFang-SC-Medium;
        font-size: 28px;
      }
    }
    .add-btn{
      width: 650px;
      height: 100px;
      margin:40px auto;
      
      display: flex;
      justify-content: center;
      align-items: center;
      border:2px solid #cccccc;
      color: #333333;
      font-family: PingFang-SC-Bold;
      font-size: 28px;
    }
    .tips{
      margin:20px auto;
      text-align: center;
      color: #ff5829;
      font-family: PingFang-SC-Bold;
      font-size: 28px;
    }
    .contract{
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: PingFang-SC-Medium;
      font-size: 22px;
      span{
        color: #666666;
      }
      a{
        color: #333333;
      }
    }
    .aggre{
      background-color: #ff9b24;
      width: 650px;
      line-height: 2.55;
      font-family: PingFang-SC-Medium;
      font-size: 30px;
      color: #ffffff;
      text-align: center;
      margin:50px auto;
    }
  }
}

</style>
