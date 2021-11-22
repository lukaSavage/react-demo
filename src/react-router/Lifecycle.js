/*
 * @Descripttion: 
 * @Author: lukasavage
 * @Date: 2021-11-21 22:09:05
 * @LastEditors: lukasavage
 * @LastEditTime: 2021-11-21 22:09:06
 */
import React, { Component } from 'react'

export default class Lifecycle extends Component {
    componentDidMount() {
        this.props.onMount && this.props.onMount(this);
    }
    render() {
        return null
    }
}
