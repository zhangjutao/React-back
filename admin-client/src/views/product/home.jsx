import React, { Component } from 'react';
import {
  Card,
  Select,
  Input,
  Button,
  Icon,
  Table
} from 'antd';

/** 
 * Product的默认子路由组件
*/
const Option = Select.Option;

export default class ProductHome extends Component {
  state = {
    product:[],  //商品的数组
  }

  //初始化表格列的数据
  initColumns = () => {
    
  }

  componentWillMount(){
    this.initColumns();
  }

  render() {
    //取出状态数据
    const {products} = this.state;

    const title = (
      <span>
        <Select value='1'>
          <Option value='1'>按名称搜索</Option>
          <Option value='2'>按描述搜索</Option>
        </Select>
        <Input placeholder='关键字' style={{width:150, margin:'0 15px'}} />
        <Button type='primary'>搜索</Button>
      </span>
    );
    const extra = (
      <Button type='primary'>
        <Icon type='plus'/>
        添加商品
      </Button>
    )

    return (
      <Card title={title} extra={extra}>
        <Table>

        </Table>
      </Card>
    )
  }
}