import React, { Component } from 'react';
import {
  Form,
  Icon,
  Input,
  Button
} from 'antd';

import './login.less';
import logo from '../../assets/images/logo.png';

class Login extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('提交登陆的ajax请求', values)
        // 请求登陆
      }
    });

    //const form = this.props.form;
    //const values = form.getFieldsValue();
    //console.log(values);
  }

  //对密码进行验证
  validatePwd = (rule, value, callback) => {
    if(!value){
      callback('密码必须输入'); //验证失败，并指定提示文本
    }else if(value.length < 4){
      callback('密码长度不能小于4位'); //验证失败，并指定提示文本
    }else if(value.length > 12){
      callback('密码长度不能大于12位 '); //验证失败，并指定提示文本
    }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
      callback('密码必须时英文，数字或下划线组成'); //验证失败，并指定提示文本
    }else{
      callback()  //验证通过
    }
  }

  render() {
    const {getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="login" />
          <h1>React项目: 后台管理系统</h1>
        </header>
        <section className="login-content">
          <h2>用户登录</h2>
          <div>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                {
                  getFieldDecorator('username',{
                    //声明式验证：直接使用别人定义好的规则进行验证
                    rules: [
                      {required: true, whitespace: true,message: '用户名必须输入!'},
                      {min: 4,message: '用户名至少4位'},
                      {max: 12,message: '用户名最多12位'},
                      {pattern:/^[a-zA-Z0-9_]+$/, message:"用户名必须时英文，数字或下划线组成"}
                    ],
                  })(
                    <Input
                      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder="用户名"
                    />
                  )
                }
                  
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      //自定义规则验证
                      validator: this.validatePwd
                    }
                  ],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  登录
                </Button>
              </Form.Item>
            </Form>
          </div>
        </section>
      </div>
    )
  }
}

/*
1. 高阶函数
    1). 一类特别的函数
        a. 接受函数类型的参数
        b. 返回值是函数
    2). 常见
        a. 定时器: setTimeout()/setInterval()
        b. Promise: Promise(() => {}) then(value => {}, reason => {})
        c. 数组遍历相关的方法: forEach()/filter()/map()/reduce()/find()/findIndex()
        d. 函数对象的bind()
        e. Form.create()() / getFieldDecorator()()
    3). 高阶函数更新动态, 更加具有扩展性

2. 高阶组件
    1). 本质就是一个函数
    2). 接收一个组件(被包装组件), 返回一个新的组件(包装组件), 包装组件会向被包装组件传入特定属性
    3). 作用: 扩展组件的功能
    4). 高阶组件也是高阶函数: 接收一个组件函数, 返回是一个新的组件函数
 */
/*
包装Form组件生成一个新的组件: Form(Login)
新组件会向Form组件传递一个强大的对象属性: form
 */
const WrapLogin = Form.create()(Login);
export default WrapLogin;