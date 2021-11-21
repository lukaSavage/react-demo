/*
 * @Descripttion: 
 * @Author: lukasavage
 * @Date: 2021-11-10 21:10:26
 * @LastEditors: lukasavage
 * @LastEditTime: 2021-11-21 11:55:50
 */
import React from 'react'
import reactDOM from 'react-dom'
import { HashRouter as Router } from './react-router-dom'
import { Route } from './react-router'
import Home from './pages/Home';
import Abort from './pages/Abort';





reactDOM.render((
    <Router>
        <Route path="/home" component={Home}></Route>
        <Route path="/abort" component={Abort}></Route>
    </Router>
), document.getElementById('root'));

