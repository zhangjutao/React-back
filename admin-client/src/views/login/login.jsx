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

  }

  render() {
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
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="用户名"
                  />
              </Form.Item>
              <Form.Item>
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="密码"
                  />
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


const WrapLogin = Form.create()(Login);
export default WrapLogin;