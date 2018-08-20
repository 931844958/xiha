<template>
  <div class="home">
    <img class="bg" src="./BG@3x.jpg"/>
    <div class="user-wrapper">
      <img class="user-img" src="https://cn.bing.com/az/hprichbg/rb/BulgariaPerseids_ZH-CN11638911564_480x800.jpg" alt="" />
      <div class="desc">
        <div class="logo">社会精英</div>
        <div class="posi">
          <span>职务：经理</span>
          <span>工号：123456</span>
        </div>
      </div>
    </div>
    <div class="card-wrapepr">
      <img  class="card-img" src="https://cn.bing.com/az/hprichbg/rb/BulgariaPerseids_ZH-CN11638911564_480x800.jpg" alt="" />
      <div class="desc-wra">
        <div class="name">平安银行卡</div>
        <div class="des">加油88折，全车人员保障,加油88折，全车人员保障</div>
        <div class="btn">立即申请</div>
      </div>
    </div>
    <div class="board-wrapper">
      <img src="./icon_news@2x.png" class="board-icon"/>
      <div class="board-swiper  ">
        <swiper  direction="vertical" :interval=2000  :show-dots="false" auto height="30px">
          <swiper-item class="board-item"><h2>它无孔不入</h2></swiper-item>
          <swiper-item class="board-item"><h2>你无处可藏</h2></swiper-item>
          <swiper-item class="board-item"><h2>不是它可恶</h2></swiper-item>
          <swiper-item class="board-item"><h2>不是它可恶</h2></swiper-item>
        </swiper>
      </div>
    </div>
    <div class="tab-wrapper">
      <tab></tab>
    </div>
    <div class="bank-outer">
      <div class="bank-inner">
        <div class="bank-item">
          <div class="bank-name">
            <img class="icon" src='./pic_jiaotongbank@2x.png'/>
            <div class="name  ">
              <div >交通银行</div>
              <!-- <div>Bank Of Communications</div> -->
            </div>
          </div>
          <div class="advantages">
            <span class=" ">审批快</span>
            <span class=" ">额度高</span>
          </div>
          <div class="bank-advan  ">
            <div>淘宝享积分</div>
            <div>还能当钱花</div>
          </div>
          <div class="a-line"></div>
          <div class="money-wrapper">
            <div class="btn">
              <span>佣金</span>
              <img class="icon" src="./icon_yongjin@2x.png"/>
            </div>
            <div class="money"><span class="num">75%</span> 100元</div>
          </div>
        </div>
        <div class="bank-item">
          <div class="bank-name">
            <img class="icon" src='./pic_jiaotongbank@2x.png'/>
            <div class="name  ">
              <div >交通银行</div>
              <!-- <div>Bank Of Communications</div> -->
            </div>
          </div>
          <div class="advantages">
            <span class=" ">审批快</span>
            <span class=" ">额度高</span>
          </div>
          <div class="bank-advan  ">
            <div>淘宝享积分</div>
            <div>还能当钱花</div>
          </div>
          <div class="a-line"></div>
          <div class="money-wrapper">
            <div class="btn">
              <span>佣金</span>
              <img class="icon" src="./icon_yongjin@2x.png"/>
            </div>
            <div class="money"><span class="num">75%</span> 100元</div>
          </div>
        </div>
        <div class="bank-item">
          <div class="bank-name">
            <img class="icon" src='./pic_jiaotongbank@2x.png'/>
            <div class="name  ">
              <div >交通银行</div>
              <!-- <div>Bank Of Communications</div> -->
            </div>
          </div>
          <div class="advantages">
            <span class=" ">审批快</span>
            <span class=" ">额度高</span>
          </div>
          <div class="bank-advan  ">
            <div>淘宝享积分</div>
            <div>还能当钱花</div>
          </div>
          <div class="a-line"></div>
          <div class="money-wrapper">
            <div class="btn">
              <span>佣金</span>
              <img class="icon" src="./icon_yongjin@2x.png"/>
            </div>
            <div class="money"><span class="num">75%</span> 100元</div>
          </div>
        </div>
        <div class="bank-item">
          <div class="bank-name">
            <img class="icon" src='./pic_jiaotongbank@2x.png'/>
            <div class="name  ">
              <div >交通银行</div>
              <!-- <div>Bank Of Communications</div> -->
            </div>
          </div>
          <div class="advantages">
            <span class=" ">审批快</span>
            <span class=" ">额度高</span>
          </div>
          <div class="bank-advan  ">
            <div>淘宝享积分</div>
            <div>还能当钱花</div>
          </div>
          <div class="a-line"></div>
          <div class="money-wrapper">
            <div class="btn">
              <span>佣金</span>
              <img class="icon" src="./icon_yongjin@2x.png"/>
            </div>
            <div class="money"><span class="num">75%</span> 100元</div>
          </div>
        </div>
      </div>
    </div>
    <tabbar @switchTab="switchTab"></tabbar>
  </div>
</template>
<script>
import Tabbar from 'base/tabbar/tabbar'
import Tab from 'base/tab/tab'
import { Swiper,SwiperItem } from 'vux'
export default {
  components:{
    Swiper,SwiperItem,Tab,Tabbar
  },
  data(){
    return {
      
    }
  },
  methods:{
    switchTab(index){
      console.log('tab=='+index)
    }
  }
}
</script>
<style scoped lang="less">
.home{
  min-height: 100vh;
  position: relative;
  padding-bottom: 158px;
  background-color: rgba(255, 255, 255, 0);
  .bg{
    position: absolute;
    top:0;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index:-11;
  }
  .user-wrapper{
    display: flex;
    padding: 30px;
    .user-img{
      width: 120px;
      height: 120px;
      border-radius: 50%;
      margin-right: 24px;
    }
    .desc{
      color: #ffffff;
      .logo{
        font-size: 30px;
        line-height: 2.55;
      }
      .posi{
        display: flex;
        font-size: 22px;
        line-height: 1.8;
        span{
          margin-right: 50px;
        }
      }
    }

  }
  .card-wrapepr{
    display: flex;
    background-color: #ffffff;
    opacity: 0.8;
    width: 710px;
    height: 248px;
    margin:30px auto;
    box-sizing: border-box;
    padding: 34px 30px;
    .card-img{
      height: 180px;
      width: 284px;
      margin-right: 40px;
      border-radius: 10px;
    }
    .desc-wra{
      flex: 1;
      .name{
        font-family: PingFang-SC-Medium;
        color: #333333;
        font-size: 30px;
      }
      .des{
        font-family: PingFang-SC-Medium;
        color: #999999;
        font-size: 24px;
        line-height: 1.6;
      }
      .btn{
        width: 200px;
        line-height: 2.4;
        font-size: 24px;
        background-color: #ff4e00;
        color:#ffffff;
        border-radius: 10px;
        text-align: center;
      }
    }
  }
  .board-wrapper{
    display: flex;
    align-items: center;
    width: 710px;
    height: 60px;
    margin: 30px auto;
    border: 1px solid #ffffff;
    .board-icon{
      width: 32px;
      height: 32px;
      margin:0 40px 0 20px;
    }
    .board-swiper{
      flex: 1;
      font-family: PingFang-SC-Medium;
      font-size: 12px;
      color: #ffffff;
      .board-item{
        line-height: 60px;
      }
    }
  }
  .tab-wrapper{
    width: 710px;
    margin: 0 auto;
    height: 58px;
  }
  .bank-outer{
    width: 730px;
    margin:0 auto;
    padding: 10px;
    box-sizing: border-box;
    margin-top: 20px;
    border:2px solid #ffffff;
    .bank-inner{
      background-color: #eeeeee;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 0 20px;
      padding-bottom: 40px;
      box-sizing: border-box;
      .bank-item{
        width: 210px;
        height: 360px;
        margin-top: 40px;
        background-color: #ffffff;
        .bank-name{
          display: flex;
          align-items: center;
          margin:20px 0;
          .icon{
            width: 50px;
            height: 50px;
            margin: 0 8px;
          }
          .name{
            flex: 1;
            text-align: center;
            font-family: PingFang-SC-Medium;
            color: #091F5B;
            font-size: 24px;
          }
        }
      }
      .advantages{
        padding:  0 20px ;
        display: flex;
        justify-content: space-between;
        span{
          color: #ffffff;
          font-family: PingFang-SC-Bold;
          background-color: #ff4e00;
          width: 80px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          border-radius: 4px;
          font-size: 20px;
        }
      }
      .bank-advan{
        padding: 30px 0;
        text-align: center;
        color: #666666;
        font-size: 22px;
        font-family: PingFang-SC-Medium;
      }
      .a-line{
        background-color:#e5e5e5;height:2px;width:200px;margin:0 auto;
      }
      .money-wrapper{
        display: flex;
        align-items: center;
        flex-direction: column;
        text-align: center;
        padding: 20px;
        .btn{
          background-color: #ff4e00;
          width: 120px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 20px;
          color: #ffffff;
          font-size: 24px;
          font-family: PingFang-SC-Bold;
          .icon{
            width: 22px;
            height: 22px;
          }
        }
        .money{
          color: #ff4e00;
          font-size: 20px;
          line-height: 2.22;
          .num{
            font-size: 24px;
          }
        }
      }
    }
  }
  .weui-tabbar .weui-tabbar__item{
    display: flex;
    align-items: center;
    justify-content: center;
    
  }
  .weui-tabbar img{
    width: 22px;
    display: inline-block;
    margin-right: 14px;
  }
}
</style>