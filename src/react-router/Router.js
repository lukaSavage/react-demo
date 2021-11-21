/*
 * @Descripttion: react-router核心库————Router
 * @Author: lukasavage
 * @Date: 2021-11-21 10:33:31
 * @LastEditors: lukasavage
 * @LastEditTime: 2021-11-21 11:56:23
 */
import React, { Component } from 'react'

import RouterContext from './routerContext'

export default class Router extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: props.history.location
        }

        // 最后一步：调用history.listen方法，实现UI视图更新
        props.history.listen((location)=>{
            console.log(location);
            this.setState({location});
        })
    }

    render() {
        const value = {
            history: this.props.history,
            location: this.state.location
        }
        return (
            <RouterContext.Provider value={value}>
                {this.props.children}
            </RouterContext.Provider>
        )
    }
}
