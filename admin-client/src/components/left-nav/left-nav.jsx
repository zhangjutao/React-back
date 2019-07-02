import React,{Component} from 'react';
import {Link} from 'react-router-dom'
import {Menu, Icon} from 'antd';
import './index.less';
import logo from '../../assets/images/logo.png';

const SubMenu = Menu.SubMenu;

export default class LeftNav extends Component{
  render(){
    return (
      <div to="/" className="left-nav">
        <Link to="/" className="left-nav-header">
          <img src={logo} alt="logo"/>
          <h1>硅谷后台</h1>
        </Link>
        <Menu
          mode="inline"
          theme="black"
        >
          <Menu.Item key="/home">
            <Link to="/home">
              <Icon type="pie-chart"/>
              <span>首页</span>
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}