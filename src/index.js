/*
 * @Descripttion: 
 * @Author: lukasavage
 * @Date: 2021-11-10 21:10:26
 * @LastEditors: lukasavage
 * @LastEditTime: 2021-11-21 17:03:01
 */
import React from 'react'
import reactDOM from 'react-dom'
import { HashRouter as Router } from './react-router-dom'
import { Route } from './react-router'
import Home from './pages/Home';
import Abort from './pages/Abort';
import Index from './pages/Index';





reactDOM.render((
    <Router>
        <div>
            <Route path="/" component={Index}></Route>
            <Route path="/home" component={Home}></Route>
            <Route path="/abort" component={Abort}></Route>
        </div>
    </Router>
), document.getElementById('root'));

