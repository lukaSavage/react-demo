/*
 * @Descripttion: react-router核心库————Router
 * @Author: lukasavage
 * @Date: 2021-11-21 10:33:31
 * @LastEditors: lukasavage
 * @LastEditTime: 2021-11-21 21:11:10
 */
import React, { Component } from 'react'

import RouterContext from './routerContext'

export default class Router extends Component {
    static computeRootMatch(pathname) {
        return { path: '/', url: '/', params: {}, isExact: pathname === '/' };
    }
    constructor(props) {
        super(props);
        this.state = {
            location: props.history.location
        }

        // 最后一步：调用history.listen方法，实现UI视图更新
        this.unListen = props.history.listen((location)=>{
            console.log(location);
            this.setState({location});
        })
        console.log(this.unListen);
    }

    render() {
        const value = {
            history: this.props.history,
            location: this.state.location,
            match: Router.computeRootMatch(this.state.location.pathname)
        }
        return (
            <RouterContext.Provider value={value}>
                {this.props.children}
            </RouterContext.Provider>
        )
    }
}
