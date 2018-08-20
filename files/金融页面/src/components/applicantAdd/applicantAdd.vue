<template>
  <div class="applicant-add">
    <div class="banner-wrapper">
      <img src="./banner@2x.png"/>
    </div>
    <div class="title">填写申请人信息</div>
    <div class="form-group">
      <div class="group">
        <div>姓名：</div>
        <div ><input placeholder="请输入申请人姓名"/></div>
      </div>
      <div class="group">
        <div>身份证号：</div>
        <div ><input placeholder="请输入申请人姓名"/></div>
      </div>
      <div class="group">
        <div>手机号码：</div>
        <div ><input placeholder="请输入申请人姓名"/></div>
      </div>
      <div class="group">
        <div>验证码：</div>
        <div ><input class="code-btn-b-input" placeholder="请输入验证码"/><span class="code-btn">获取验证码</span></div>
      </div>
    </div>
    <div class="explain">
      <p>1、请务必填写申请人真实信息</p>
      <p>1、请务必填写申请人真实信息</p>
      <p>1、请务必填写申请人真实信息</p>
      <p>1、请务必填写申请人真实信息</p>
      <p>1、请务必填写申请人真实信息</p>
      <p>1、请务必填写申请人真实信息</p>
    </div>
    <div class="contract">
      <img src="./icon_select@2x.png"/>
      <span>本人已阅读并同意以下条款</span>
      <a>《同城金服平台用户协议》</a>
    </div>
    <div class="aggre">下一步</div>
  </div>
</template>
<script>
export default {

}
</script>
<style scoped lang="less">
.applicant-add{
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
  .form-group{
    width: 710px;
    margin: 0 auto;
    box-sizing: border-box;
    background: #ffffff;
    padding: 0 50px;
    .group{
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 78px;
      border-bottom: 1px solid #eeeeee;
      &:last-of-type{
        border-bottom: none;
      }
      input{
        border: none;
        text-align: right;
      }
      .code-btn{
        padding:10px 20px;
        background: #ff9b24;
        color:#ffffff;
        font-family: PingFang-SC-Medium;
        font-size: 24px;
        margin-left: 12px;
      }
      .code-btn-b-input{
        width: 240px;
      }
    }
  }
  .explain{
    width: 710px;
    margin: 20px auto;
    box-sizing: border-box;
    background: #ffffff;
    padding: 20px 50px;
    font-family: PingFang-SC-Medium;
    line-height: 2;
    font-size: 24px;
    color: #333333;
  }
  .contract{
    margin-top: 50px;
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
</style>
