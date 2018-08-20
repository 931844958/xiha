<template>
  <div class="notice">
    <div class="card-wrapper">
      <div>
        <img class="icon icon1" src="./icon_tuiguanghaibao_gray@2x.png">
        <div class="btn">给我打电话</div>
      </div>
      <div>
        <img class="icon icon2" src="./icon_xinyongkahaibao_gray@2x.png">
        <div class="btn">加我微信</div>
      </div>
    </div>
    <div class="poster-wrapper">
      <img class="post" src="./pic_xinyongka@2x.png"/>
    </div>
    <div class="btn-wrapper">
      <div class="btn btn1"><span>选择银行</span></div>
      <div class="btn btn2"><span>复制推广链接</span></div>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style scoped lang="less">
.notice{
  min-height: 100vh;
  background-color: #eeeeee;
}
.card-wrapper{
  display: flex;
  justify-content: space-between;
  padding:20px 100px;
  background: #ffffff;
  div{
    text-align: center;
    .icon1{
      width: 46px;
      height: 43px;
    }
    .icon2{
      width: 50px;
      height: 50px;
    }
    .btn{
      padding: 6px 20px;
      color: #333333;
      font-family: PingFang-SC-Medium;
      font-size: 22px;
    }
  }
}
.poster-wrapper{
  padding: 0 30px;
  .post{
    width: 690px;
    height: 1122px;
  }
}
.btn-wrapper{
  padding: 30px;
  display: flex;
  justify-content: space-between;
  .btn{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 320px;
    height: 70px;
    color: #ffffff;
    font-family: PingFang-SC-Medium;
    font-size: 24px;
    border-radius: 8px;
  }
  .btn1{
    background: #fd5f19;
  }
  .btn2{
    background: #fbbb20;
  }
}
</style>
