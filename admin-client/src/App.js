import React,{Component} from 'react';
import {Button,message} from 'antd';
class App extends Component{

  handleClick = () => {
    message.success("成功")
  }
  render(){
    return (
      <div className="App">
        APP
        <Button type="primary" onClick=
        {this.handleClick}>Primary</Button>
      </div>
    );
  }
}

export default App;
