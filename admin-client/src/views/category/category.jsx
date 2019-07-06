import React, { Component } from 'react';
import {
  Card,
  Table,
  Button,
  Icon,
  message,
  Modal
} from 'antd';
import LinkButton from '../../components/link-button/link-button';
import AddForm from './add-form';
import UpdateForm from './update-form';
import {reqCategorys, reqUpdateCategory,reqAddCategory} from '../../api';

export default class Category extends Component {

  state = {
    loading: false,  //是否正在获取数据中
    categorys: [],  //一级分类列表
    subCategorys: [], //二级分类列表
    parentId: '0',  //需要显示分分类列表的父分类ID parentId
    parentName: '', //当前需要显示分分类列表的父分类名称
    showStatus: 0,  //标识添加/更新的确认框是否显示。0：都不显示， 1：显示添加， 2：显示更新
  }

  /**
   * 为第一次render()准备数据
   * 初始化Table所有列的数组
   */
  initColumns = () => {
    this.columns =  [
      {
        title: '分类名称',
        dataIndex: 'name',  //指定数据对应的属性名
        //key: 'name',
      },
      {
        title: '操作',
        width: 300,
        render: (category) => (
          //返回需要显示的界面标签
          <span>
            <LinkButton onClick={() => this.showUpdate(category)}>修改分类</LinkButton>
            {/* 如何在向事件回调函数传递参数： 先定义一个匿名函数，在函数调用处理的函数并传入数据（通用做法）*/}
            {this.state.parentId === '0'?<LinkButton onClick={() => this.showSubcategorys(category)}>查看子分类</LinkButton>:null}
          </span>
        )
      }
    ];

  }

  /**
   * 异步获取一级/二级分类列表显示
   */
  getCategorys = async (parentId) => {
    //在发请求前，显示loading
    this.setState({
      laoding: true
    })

    //发送异步ajax请求
    parentId = parentId || this.state.parentId;
    const result = await reqCategorys(parentId);
    
    //在请求完成后，取消loading
    this.setState({
      laoding: false
    })
    if(result.status===0) {
      // 取出分类数组(可能是一级也可能二级的)
      const categorys = result.data
      if(parentId==='0') {
        // 更新一级分类状态
        this.setState({
          categorys
        })
        //console.log('----', this.state.categorys.length)
      } else {
        // 更新二级分类状态
        this.setState({
          subCategorys: categorys
        })
      }
    } else {
      message.error('获取分类列表失败')
    }
  }

  /**
   *显示指定一级分类对象的二级子列表
   *
   */
  showSubcategorys = (category) => {
    //更新状态
    this.setState({
      parentId: category._id,
      parentName: category.name
    }, () => {
        //在状态更新且重新render()后执行
        //console.log('parentId', this.state.parentId) // '0'
        //获取二级分类列表
        this.getCategorys();
    })
  }

  /** 
   * 显示一级分类列表
  */
  showFirstCategorys = () => {
    //更新为初始状态
    this.setState({
      parentId: '0',
      parentName: '',
      subCategorys: []
    })

    
  }

  /** 
   * 相应点击取消：隐藏确认框
  */
  handleCancel = () => {
    //清除输入数据
    this.form.resetFields();
    //隐藏确认框
    this.setState({
      showStatus: 0
    })
  }

  /** 
   * 显示添加的对话框
  */
  showAdd = () => {
    this.setState({
      showStatus:1
    })
  }
  /** 
   * 添加分类
  */
 addCategory = () => {
  this.form.validateFields(async (err, values) => {
    if (!err) {
      // 隐藏确认框
      this.setState({
        showStatus: 0
      })

      // 收集数据, 并提交添加分类的请求
      const {parentId, categoryName} = values
      // 清除输入数据
      this.form.resetFields()
      const result = await reqAddCategory(categoryName, parentId)
      if(result.status===0) {

        // 添加的分类就是当前分类列表下的分类
        if(parentId===this.state.parentId) {
          // 重新获取当前分类列表显示
          this.getCategorys()
        } else if (parentId==='0'){ // 在二级分类列表下添加一级分类, 重新获取一级分类列表, 但不需要显示一级列表
          this.getCategorys('0')
        }
      }
    }
  })
}
  /** 
   * 显示更新的对话框
  */
  showUpdate = (category) => {
    //console.log(category);
    //保存分类对象
    this.category = category;
    //更新状态
    this.setState({
      showStatus:2
    })
  }

  /** 
   * 更新分类
  */
  updateCategory = async () => {
    //1.隐藏确认框
    this.setState({
      showStatus:0
    })

    //准备数据
    const categoryId = this.category._id;
    //console.log(this.form);
    const categoryName = this.form.getFieldValue('categoryName');
    //清除输入数据
    this.form.resetFields();

    //2.发请求更新分类
    const result = await reqUpdateCategory({categoryId, categoryName})
    if(result.status === 0){
      //3.重新显示列表
      this.getCategorys();  
    }
    

  }
  componentWillMount(){
    this.initColumns();
  }

  //发送异步ajax请求
  componentDidMount(){
    this.getCategorys();
  }

  render() {
    //读取状态数据
    const {categorys, subCategorys, loading, parentId, parentName, showStatus} = this.state;
    //读取指定的分类
    const category = this.category || {};  //初始化时指定为空对象

    //card的左侧
    const title = parentId === '0'?'一级分类列表':(
      <span>
        <LinkButton onClick={this.showFirstCategorys}>一级分类列表</LinkButton>
        <Icon type='arrow-right' style={{marginRight:10}}/>
        <span>{parentName}</span>
      </span>
    );
    //card的右侧
    const extra = (
      <Button type='primary' onClick={this.showAdd}>
        <Icon type='plus' />
        添加
      </Button>
    )

    return (
      <Card title={title} extra={extra}>
        <Table
          rowKey = '_id'
          bordered
          loading={loading}
          dataSource={parentId==='0' ? categorys : subCategorys}
          columns={this.columns}
          pagination = {{defaultPageSize:5,showQuickJumper:true}}
        />
        <Modal
          title="添加分类"
          visible={showStatus === 1}
          onOk={this.addCategory}
          onCancel={this.handleCancel}
        >
          <AddForm categorys={categorys} parentId={parentId} setForm={(form) => {this.form = form}} />
        </Modal>
        <Modal
          title="更新分类"
          visible={showStatus === 2}
          onOk={this.updateCategory}
          onCancel={this.handleCancel}
        >
          <UpdateForm categoryName={category.name} setForm = {(form) => {this.form = form}}/>
        </Modal>
      </Card>
    )
  }
}