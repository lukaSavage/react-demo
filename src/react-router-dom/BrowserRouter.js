/*
 * @Descripttion: 
 * @Author: lukasavage
 * @Date: 2021-11-21 10:32:24
 * @LastEditors: lukasavage
 * @LastEditTime: 2021-11-21 11:32:55
 */
import React, { Component } from 'react'
import { createBrowserHistory } from 'history'

import { Router } from '../react-router'

export default class BrowserRouter extends Component {
    history = createBrowserHistory();
    render() {
        return (
            <Router history={this.history}>
                { this.props.children }
            </Router>
        )
    }
}
