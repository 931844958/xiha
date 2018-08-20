<template>
  <div class="clients">
    <div class="sort-wrapper">
      <div class="manager">
        <img class="icon" src="./icon_dailishanng_orange@2x.png"/>
        <div class="count  ">经理（2）</div>
      </div>
      <div class="manager">
        <img class="icon" src="./icon_dailishanng_orange@2x.png"/>
        <div class="count  ">经理（2）</div>
      </div>
    </div>
    <div class="search-wrapper">
      <div class="search">
        <div class="icon-input">
          <img class="icon" src="./icon_search@2x.png"/>
          <input class="input" placeholder="请输入手机号或工号"/>
        </div>
        <span class="btn  ">搜索</span>
      </div>
    </div>
    <div class="clients-wrapper">
      <div class="client">
        <div class="head-icon-wrapper">
          <img class="head-icon" src="https://cn.bing.com/az/hprichbg/rb/BulgariaPerseids_ZH-CN11638911564_480x800.jpg"/>
        </div>
        <div class="desc">
          <h5 class="position  ">社会精英</h5>
          <p class=" ">工号：123456</p>
          <p class=" ">客户人数：0</p>
          <p class=" ">加入时间：2018-02-02 15:22</p>
        </div>
        <div class="btn-wrapper">
          <img  src="./dianhualiao@2x.png"/>
          <img  src="./weixinliao@2x.png"/>
        </div>
      </div>
      <div class="client">
        <div class="head-icon-wrapper">
          <img class="head-icon" src="https://cn.bing.com/az/hprichbg/rb/BulgariaPerseids_ZH-CN11638911564_480x800.jpg"/>
        </div>
        <div class="desc">
          <h5 class="position  ">社会精英</h5>
          <p class=" ">工号：123456</p>
          <p class=" ">客户人数：0</p>
          <p class=" ">加入时间：2018-02-02 15:22</p>
        </div>
        <div class="btn-wrapper">
          <img  src="./dianhualiao@2x.png"/>
          <img  src="./weixinliao@2x.png"/>
        </div>
      </div>
      <div class="client">
        <div class="head-icon-wrapper">
          <img class="head-icon" src="https://cn.bing.com/az/hprichbg/rb/BulgariaPerseids_ZH-CN11638911564_480x800.jpg"/>
        </div>
        <div class="desc">
          <h5 class="position  ">社会精英</h5>
          <p class=" ">工号：123456</p>
          <p class=" ">客户人数：0</p>
          <p class=" ">加入时间：2018-02-02 15:22</p>
        </div>
        <div class="btn-wrapper">
          <img  src="./dianhualiao@2x.png"/>
          <img  src="./weixinliao@2x.png"/>
        </div>
      </div>
    </div>
    
  </div>
</template>
<script>
export default {

}
</script>
<style scoped lang="less">
.clients{
  min-height: 100vh;
  background-color: #eeeeee;
}
.sort-wrapper{
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  height: 140px;
  padding: 20px 150px;
  background-color: #ffffff;
  .manager{
    flex: 1;
    text-align: center;
    .icon{
      width: 58px;
      height:60px;
    }
    .count{
      text-align: center;
      line-height: 1.8;
      color: #666666;
      font-family: PingFang-SC-Medium;
      font-size: 26px;
      
    }
  }
}
.search-wrapper{
  margin-top:20px;
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
      font-size: 24px;
      border:none;
    }
    .btn{
      color: #fd8049;
      font-family: PingFang-SC-Medium;
      font-size: 24px;
      padding:10px;
    }
  }
}
.clients-wrapper{
  background-color: #ffffff;
  .client{
    padding: 30px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    height: 188px;
    border-bottom: 1px solid #eeeeee;
    &:last-of-type{
      border-bottom: none;
    }
    .head-icon-wrapper{
      width: 94px;
      height:94px;
      .head-icon{
        width: 100%;
        height:100%;
      }
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
    .btn-wrapper{
      width: 143px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      img{
        width: 100%;
        height: 50px;
      }
    }
  }
}
</style>
