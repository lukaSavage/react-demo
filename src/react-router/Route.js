/*
 * @Descripttion: react-router核心库————Route
 * @Author: lukasavage
 * @Date: 2021-11-21 10:33:36
 * @LastEditors: lukasavage
 * @LastEditTime: 2021-11-21 11:54:45
 */
import React, { Component } from 'react'
import RouterContext from './routerContext'


export default class Route extends Component {
    static contextType = RouterContext;
    componentDidMount() {
        console.log(111111111111111111111);
    }
    render() {
        const { location } = this.context;
        const { path, component: RootComponent } = this.props;
        const match = location.pathname === path
        let element = null;
        if(match) {
            element = <RootComponent {...this.context}/>
        }
        return element;
    }
}
