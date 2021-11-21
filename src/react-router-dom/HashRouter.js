/*
 * @Descripttion: 
 * @Author: lukasavage
 * @Date: 2021-11-21 10:32:33
 * @LastEditors: lukasavage
 * @LastEditTime: 2021-11-21 11:58:19
 */
import React, { Component } from 'react'
import { createHashHistory } from 'history'

import { Router } from '../react-router'

export default class HashRouter extends Component {
    history = createHashHistory();
    render() {
        return (
            <Router history={this.history}>
                { this.props.children }
            </Router>
        )
    }
}