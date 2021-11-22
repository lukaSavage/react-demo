/*
 * @Descripttion: react-router中的Switch组件
 * @Author: lukasavage
 * @Date: 2021-11-21 21:31:39
 * @LastEditors: lukasavage
 * @LastEditTime: 2021-11-21 21:41:36
 */

import React, { Component } from 'react'

import RouterContext from './routerContext'
import matchPath from './matchPath'

export default class Switch extends Component {
    static contextType = RouterContext;
    render() {
        const { location } = this.context;
        let element, match;
        React.Children.forEach(this.props.children, route => {
            // 如果还没有匹配上，并且当前的Route是一个React元素的话
            // 如果已经匹配过了，后面的元素都跳过了，不在匹配
            if(!match && React.isValidElement(route)) {
                element = route;
                match = matchPath(location.pathname, route.props);
            }
        })
        return match ? React.cloneElement(element, { computedMatch: match }) : null;
    }
}

