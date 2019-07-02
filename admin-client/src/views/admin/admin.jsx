import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import LeftNav from './../../components/left-nav/left-nav';
import Header from './../../components/header/header';

import memoryUtils from '../../utils/memoryUtils';

import { Layout } from 'antd';

const {Footer, Sider, Content } = Layout;
export default class Admin extends Component {
  render() {
    const user = memoryUtils.user;
    //如果内存中没有存储user,当前没有登录
    if(!user || !user._id){
      //自动跳转到登录
      return <Redirect to="/path"/>
    }else{

    }
    return (
      <Layout style={{height:"100%"}}>
        <Sider>
          <LeftNav/>
        </Sider>
        <Layout>
          <Header>Header</Header>
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    )
  }
}
