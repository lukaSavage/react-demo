/*
 * @Descripttion: 
 * @Author: lukasavage
 * @Date: 2021-11-10 21:10:26
 * @LastEditors: lukasavage
 * @LastEditTime: 2021-11-22 20:29:39
 */
import React from 'react'
import reactDOM from 'react-dom'
import { HashRouter as Router, Link } from './react-router-dom'
import { Redirect, Route, Switch } from './react-router'
import { NavLink } from './react-router-dom'
import Home from './pages/Home';
import Abort from './pages/Abort';
import Index from './pages/Index';





reactDOM.render((
    <Router>
        <ul>
            <li><NavLink to="/">首页</NavLink></li>
            <li><NavLink to="/home">用户</NavLink></li>
            <li><NavLink to="/abort">关于</NavLink></li>
        </ul>
        <Switch>
            <Route path="/" exact component={Index}></Route>
            <Route path="/home" exact component={Home}></Route>
            <Route path="/abort" exact component={Abort}></Route>
            <Redirect to="/home" />
        </Switch>
    </Router>
), document.getElementById('root'));

