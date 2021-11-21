/*
 * @Descripttion: react-router核心库————Route
 * @Author: lukasavage
 * @Date: 2021-11-21 10:33:36
 * @LastEditors: lukasavage
 * @LastEditTime: 2021-11-21 21:08:15
 */
import React, { Component } from 'react'
import RouterContext from './routerContext'
import matchPath from './matchPath'


export default class Route extends Component {
    static contextType = RouterContext;
    render() {
        const { history, location } = this.context;
        const { path, component: RootComponent } = this.props;
        // const match = location.pathname === path
        const match = matchPath(location.pathname, this.props);
        // 需要传递给子组件的三大属性
        const rootProps = { history, location };
        let element = null;
        if(match) {
            rootProps.match = match;
            element = <RootComponent {...rootProps}/>
        }
        return element;
    }
}
