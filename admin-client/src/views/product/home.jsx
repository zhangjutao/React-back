import React, { Component } from 'react';
import {
  Card,
  Select,
  Input,
  Button,
  Icon,
  Table,
  message
} from 'antd';

import LinkButton from '../../components/link-button/link-button';

import {reqProducts, reqSearchProducts, reqUpdateStatus} from '../../api';

import {PAGE_SIZE} from '../../utils/constants';
/** 
 * Product的默认子路由组件
*/
const Option = Select.Option;

export default class ProductHome extends Component {
  state = {
    total:0,   //商品的总数量
    products:[
      // {
      //   "status":1,
      //   "imgs":[
      //     "image-1554636776678.jpg",
      //     "image-1557738385383.jpg"
      //   ],
      //   "_id":"5cafadsfvsdvrertzvdxa",
      //   "name":"联想ThinkPad 翼480",
      //   "desc":"年度重量级新品，X390全新登场 更加轻薄机身设计",
      //   "price": 66000,
      //   "pCategoryId":"5cafadsfvsdvrertzvdxa",
      //   "detail":"<p><span style=\"color:black>测试</span></p>"
      // }
    ],  //商品的数组
    loading:false,  //是否正在加载中
    searchName:'',  //搜索的关键字
    searchType:'productName',  //根据哪个字段搜索
  }

  //初始化表格列的数据
  initColumns = () => {
    this.columns = [
      {
        title:'商品名称',
        dataIndex:'name',
      },
      {
        title:'商品描述',
        dataIndex:'desc',
      },
      {
        title:'价格',
        dataIndex:'price',
        render: (price) => '￥' + price  //dataIndex指定了对应的属性price，传入的就是对应的属性值，而不是product对象
      },
      {
        width:100,
        title:'状态',
        //dataIndex:'status',
        render: (product) => {
          const {status, _id} = product;
          const newStatus = status === 1 ? 2 : 1;
          return (
            <span>
              <Button type="primary" onClick={() => this.updateStatus(_id, newStatus)}>{status === 1 ? '下架':'上架'}</Button>
              <span>{status === 1 ? '在售':'已下架'}</span>
            </span>
          )
        }
      },
      {
        width:100,
        title:'操作',
        render: (product) => {
          return (
            <span>
              <LinkButton onClick={() => this.props.history.push('/product/detail',{product})}>详情</LinkButton>
              <LinkButton onClick={() => this.props.history.push('/product/addupdate', product)}>修改</LinkButton>
            </span>
          )
        }
      },
    ]
  }

  //获取指定页码的列表数据显示、
  getProducts = async (pageNum) => {
    this.pageNum = pageNum;   //保存pageNum,让其他方法可以看到
    this.setState({
      loading:true
    });    //显示loading

    const {searchName, searchType} = this.state;
    let result;
    //如果搜索关键字有值，说明要做搜索分页
    if(searchName){
      result = await reqSearchProducts({pageNum, pageSize:PAGE_SIZE, searchName, searchType})
    }else{
      //一般分页请求
      result = await reqProducts(pageNum, PAGE_SIZE);
    }

    this.setState({
      loading:false
    });    //隐藏loading
    if(result.status === 0){
      //取出分页数据，更新状态，显示分页列表
      const {total, list} = result.data;
      this.setState({
        total,
        products:list
      })
    }else{

    }
  }


  //更新指定商品的状态
  updateStatus = async (productId, status) => {
    const result = await reqUpdateStatus(productId, status);
    if(result.status === 0){
      message.success('更新商品成功');
      this.getProducts(this.pageNum);
    }
  }

  componentWillMount(){
    this.initColumns();
  }

  componentDidMount(){
    this.getProducts(1);
  }

  render() {
    //取出状态数据
    const {products, total, loading, searchName, searchType} = this.state;

    const title = (
      <span>
        <Select value={searchType} onChange={value => this.setState({searchType:value})}>
          <Option value='productName'>按名称搜索</Option>
          <Option value='productDesc'>按描述搜索</Option>
        </Select>
        <Input placeholder='关键字' style={{width:150, margin:'0 15px'}} value={searchName} onChange={event => this.setState({searchName:event.target.value})}/>
        <Button type='primary' onClick={() => this.getProducts(1)}>搜索</Button>
      </span>
    );
    const extra = (
      <Button type='primary' onClick={() => this.props.history.push('/product/addupdate')}>
        <Icon type='plus'/>
        添加商品
      </Button>
    )

    return (
      <Card title={title} extra={extra}>
        <Table
          bordered
          rowKey = "_id"
          loading = {loading}
          dataSource = {products}
          columns = {this.columns}
          pagination={{
            defaultPageSize:PAGE_SIZE, 
            showQuickJumper:true, 
            total,
            onChange:this.getProducts 
          }}
        >
        </Table>
      </Card>
    )
  }
}