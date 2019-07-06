import React,{Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import ProductHome from './home';
import ProductAddUpdate from './add-update';
import ProductDetail from './detail';
//import Loadable from 'react-loadable'  //动态加载路由组件

import './product.less';

export default class Product extends Component{

    //动态路由尝试
    // state = {
    //   routeList:[
    //     {
    //       path:'/product',
    //       exact:true,
    //       component:Loadable({
    //         loader: () => import('./home'),
    //         loading: () => null
    //       })
    //     },
    //     {
    //       path:'/product/addupdate',
    //       exact:true,
    //       component:Loadable({
    //         loader: () => import('./add-update'),
    //         loading: () => null
    //       }),
    //     },
    //     {
    //       path:'/product/detail',
    //       exact:true,
    //       component:Loadable({
    //         loader: () => import('./detail'),
    //         loading: () => null
    //       }),
    //     }
    //   ]
    // }

    render(){
      //const {routeList} = this.state
        return (
            <Switch>
              {/* {
                routeList.map(route => (
                   <Route path={route.path} key={route.path} exact={route.exact} component={route.component} />
                ))
              } */}
              <Route path='/product' exact component={ProductHome} />
              <Route path='/product/addupdate' exact component={ProductAddUpdate} />
              <Route path='/product/detail' exact component={ProductDetail} />
              <Redirect to='/product'/>
            </Switch>
        )
    }
}