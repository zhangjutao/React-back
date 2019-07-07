import React,{Component} from 'react';
import {Link, withRouter} from 'react-router-dom'
import {Menu, Icon} from 'antd';


import './index.less';
import logo from '../../assets/images/logo.png';
import menuList from '../../config/menuConfig';

const SubMenu = Menu.SubMenu;

class LeftNav extends Component{
  
  //根据menu的数据数组生成对应的标签数组

  //1.map + 递归 实现
  getMenuNodes = (menuList) => {
    //得到当前请求的路由路径
    const path = this.props.location.pathname;

    return menuList.map(item => {
      if(!item.children){
        return (<Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon}/>
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      }else{
        //查找一个与当前请求路径匹配的子Item
        //const cItem = item.children.find(cItem => cItem.key === path);
        const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0);   //针对product页面的子路由修改，只要在product子路由下，侧边商品栏就应该展开
        //如果存在，说明当前item的子列表需要打开
        if(cItem){
          this.openKey = item.key;
        }

        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon}/>
                <span>{item.title}</span>
              </span>
            }
          >
          {
            this.getMenuNodes(item.children)
          }
          </SubMenu>
        )
      }
    })
  }

  //2.reduce + 递归 实现
  getMenuNodesReduce = (menuList) => {
    return menuList.reduce((prev,item) => {
      //向prev添加<Menu.Item>
      if(!item.children){
        prev.push((
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon}/>
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        ))
      }else{
        prev.push((
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon}/>
                <span>{item.title}</span>
              </span>
            }
          >
          {
            this.getMenuNodesReduce(item.children)
          }
          </SubMenu>
        ))
      }
      return prev;
    },[])
  }

  //在第一次render()之前执行一次
  //为第一个render()准备数据(必须是同步的)
  componentWillMount(){
    this.menuNodes = this.getMenuNodes(menuList)
  }

  render(){
    //得到当前请求的路由路径
    let path = this.props.location.pathname;
    if(path.indexOf('/product')===0){
      //当前请求的是商品或其子路由界面,侧边显示的还是product
      path = '/product';
    }
    //得到需要打开菜单项的key
    const openKey = this.openKey
    return (
      <div to="/" className="left-nav">
        <Link to="/" className="left-nav-header">
          <img src={logo} alt="logo"/>
          <h1>硅谷后台</h1>
        </Link>
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[path]}
          defaultOpenKeys = {[openKey]}
        >
          {/* <Menu.Item key="/home">
            <Link to="/home">
              <Icon type="pie-chart"/>
              <span>首页</span>
            </Link>
          </Menu.Item >
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="mail"/>
                <span>商品</span>
              </span>
            }
          >
            <Menu.Item key="/category">
              <Link to="/category">
                  <Icon type="mail"/>
                  <span>品类管理</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/product">
              <Link to="/product">
                  <Icon type="mail"/>
                  <span>商品管理</span>
              </Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="/user">
            <Link to="/user">
              <Icon type="pie-chart"/>
              <span>用户管理</span>
            </Link>
          </Menu.Item >
          <Menu.Item key="/role">
            <Link to="/role">
              <Icon type="pie-chart"/>
              <span>角色管理</span>
            </Link>
          </Menu.Item> */}
          {
            this.menuNodes
          }
        </Menu>
      </div>
    )
  }
}


/*
withRouter高阶组件：
包装非路由组件，返回一个新的组件
新的组件向非路由组件传递三个属性：history/match/location
*/
export default withRouter(LeftNav)