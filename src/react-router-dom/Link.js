/*
 * @Descripttion: 
 * @Author: lukasavage
 * @Date: 2021-11-21 22:49:40
 * @LastEditors: lukasavage
 * @LastEditTime: 2021-11-21 22:56:15
 */
import React from 'react'
import { _RouterContext as RouterContext } from '../react-router'

export default function Link(props) {
    const { to, children } = props;
    return (
        <RouterContext.Consumer>
            {
                value => {
                    return (
                        <a
                            {...props}
                            onClick={(e) => {
                                e.preventDefault();
                                value.history.push(to);
                            }}
                        >{children}</a>
                    )
                }
            }
        </RouterContext.Consumer>
    )
}

