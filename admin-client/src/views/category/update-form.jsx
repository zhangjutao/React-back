import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Input
} from 'antd';

const Item = Form.Item;

class UpdateForm extends Component{
  static propTypes = {
    categoryName: PropTypes.string.isRequired
  }


  componentWillMount(){
    //将form对象通过setForm()传递给父组件
    this.props.setForm(this.props.form);
  }

  
  render(){
    const {categoryName} = this.props;
    const { getFieldDecorator} = this.props.form
    return (
      <Form>
        <Item>
          {
            getFieldDecorator('categoryName', {
              initialValue: categoryName,
            })(
              <Input placeholder='请输入分类名称'/>
            )
          }
        </Item>
      </Form>
    )
  }
}

export default Form.create()(UpdateForm)