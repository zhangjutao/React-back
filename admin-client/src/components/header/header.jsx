import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';

import LinkButton from '../link-button/link-button';
import {Modal} from 'antd';
import menuList from '../../config/menuConfig';
import {reqWeather} from '../../api';
import {formateDate} from '../../utils/dateUtils';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import './index.less';
class Header extends Component{
  state = {
    currentTime: formateDate(Date.now()), //当前时间字符串
    dayPictureUrl: '', //天气图片url
    weather:'',  //天气的文本
  }

  getTime = () => {
    //每隔1s获取当前时间，并更新状态数据currentTime
    this.intervalId = setInterval(() => {
      const currentTime = formateDate(Date.now());
      this.setState({currentTime});
    }, 1000)
  }

  getWeather = async () => {
    //调用接口请求异步获取数据
    const {dayPictureUrl, weather} = await reqWeather('武汉');
    //更新状态
    this.setState({dayPictureUrl, weather});
  }

  getTitle = () => {
    // 得到当前请求路径
    const path = this.props.location.pathname
    let title
    menuList.forEach(item => {
      if (item.key===path) { // 如果当前item对象的key与path一样,item的title就是需要显示的title
        title = item.title
      } else if (item.children) {
        // 在所有子item中查找匹配的
        const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0)
        // 如果有值才说明有匹配的
        if(cItem) {
          // 取出它的title
          title = cItem.title
        }
      }
    })
    return title
  }


  logout = () => {
    //显示确认框
    Modal.confirm({
      //title: 'Do you Want to delete these items?',
      content: '确定退出吗?',
      onOk: () => {
        //console.log('OK');
        //删除保存的user数据
        storageUtils.removeUser();
        memoryUtils.user = {}
        //跳转到login
        this.props.history.replace('/login');
      },
      onCancel() {
        console.log('Cancel');
      },
    })
  }

  /** 
   * 第一次render()之后执行
   * 一般在此执行异步操作: 发ajax请求/启动定时器
  */
  componentDidMount(){
    //获取当前时间
    this.getTime();
    //获取天气
    this.getWeather();
  }

  /** 
   * 当前组件销毁之前
  */
  componentWillUnmount(){
    //清除定时器
    clearInterval(this.intervalId);
  }
  render(){
    const {currentTime, dayPictureUrl, weather} = this.state;
    const username = memoryUtils.user.username;
    const title = this.getTitle();
    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎, {username}</span>
          {/* <a href="javascript:;" onClick={this.logout}>退出</a> */}
          <LinkButton onClick={this.logout}>退出</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>{currentTime}</span>
            <img src={dayPictureUrl} alt="weather"/>
            <span>{weather}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)