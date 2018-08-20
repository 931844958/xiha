<template>
  <div class="notice">
    <div class="card-wrapper">
      <div>
        <img class="icon" src="./icon_xitongxiaoxi@2x.png">
        <div class="btn">给我打电话</div>
      </div>
      <div>
        <img class="icon" src="./icon_changjianwenti@2x.png">
        <div class="btn">加我微信</div>
      </div>
    </div>
    <div class="note-item">
      <p>关于浦发银行和平安银行展开深度合作问题</p>
      <div>2018-02-22</div>
    </div>
    <div class="note-item">
      <p>关于浦发银行和平安银行展开深度合作问题</p>
      <div>2018-02-22</div>
    </div>
    <div class="note-item">
      <p>关于浦发银行和平安银行展开深度合作问题</p>
      <div>2018-02-22</div>
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
.note-item{
  background: #ffffff;
  margin: 0 12px ;
  margin-top: 10px;
  padding: 30px;
  box-sizing: border-box;
  p{
    color: #333333;
    font-family: PingFang-SC-Medium;
    font-size: 30px;
  }
  div{
    color: #666666;
    font-family: PingFang-SC-Medium;
    font-size: 26px;
  }
}
.card-wrapper{
  display: flex;
  justify-content: space-between;
  padding:56px 100px;
  background: #ffffff;
  div{
    text-align: center;
    .icon{
      width: 36px;
      height: 36px;
    }
    .btn{
      padding: 6px 20px;
      color: #333333;
      font-family: PingFang-SC-Medium;
      font-size: 22px;
    }
  }
}
</style>
