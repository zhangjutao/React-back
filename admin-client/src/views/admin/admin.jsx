import React, { Component } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';

import LeftNav from './../../components/left-nav/left-nav';
import Header from './../../components/header/header';
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar/bar'
import Line from '../charts/line/line'
import Pie from '../charts/pie/pie'
import Order from '../order/order'

import memoryUtils from '../../utils/memoryUtils';

import { Layout } from 'antd';

const { Footer, Sider, Content } = Layout;
export default class Admin extends Component {
  render() {
    const user = memoryUtils.user;
    //如果内存中没有存储user,当前没有登录
    if (!user || !user._id) {
      //自动跳转到登录
      return <Redirect to="/path" />
    } else {

    }
    return (
      <Layout style={{ height: "100%" }}>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header>Header</Header>
          <Content style={{margin:20,backgroundColor:'#fff'}}>
            <Switch>
              <Route path='/home' component={Home} />
              <Route path='/category' component={Category} />
              <Route path='/product' component={Product} />
              <Route path='/user' component={User} />
              <Route path='/role' component={Role} />
              <Route path="/charts/bar" component={Bar} />
              <Route path="/charts/pie" component={Pie} />
              <Route path="/charts/line" component={Line} />
              <Route path="/order" component={Order}/>
              <Redirect to='/home' />
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center', color: '#cccccc' }}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
        </Layout>
      </Layout>
    )
  }
}
