import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/home/home'
import User from 'components/user/user'
import Clients from 'components/clients/clients'
import Income from 'components/income/income'
import Applicant from 'components/applicant/applicant'
import ApplicantAdd from 'components/applicantAdd/applicantAdd'
import Orders from 'components/orders/orders'
import Server from 'components/server/server'
import Notice from 'components/notice/notice'
import Poster from 'components/poster/poster'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
    {//客户管理
      path: '/clients',
      name: 'clients',
      component: Clients
    },
    {//收入明细
      path: '/income',
      name: 'income',
      component: Income
    },
    {//添加申请人
      path: '/applicant',
      name: 'applicant',
      component: Applicant
    },
    {//填写申请人信息
      path: '/applicantAdd',
      name: 'applicantAdd',
      component: ApplicantAdd
    },
    {//我的订单
      path: '/orders',
      name: 'orders',
      component: Orders
    },
    {//专属客服
      path: '/server',
      name: 'server',
      component: Server
    },
    {//系统通知
      path: '/notice',
      name: 'notice',
      component: Notice
    },
    {//信用卡海报
      path: '/poster',
      name: 'poster',
      component: Poster
    }
  ]
})
