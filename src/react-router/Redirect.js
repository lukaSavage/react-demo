/*
 * @Descripttion: 
 * @Author: lukasavage
 * @Date: 2021-11-21 21:58:10
 * @LastEditors: lukasavage
 * @LastEditTime: 2021-11-21 22:11:02
 */

import React from 'react'
import RouterContext from './routerContext';
import Lifecycle from './Lifecycle'

function Redirect({ to }) {
    return (
        <RouterContext.Consumer>
            {
                value => {
                    // value.history.push(to);
                    // return null;
                    // 源码写法
                    return (
                        <Lifecycle onMount={()=>value.history.push(to)} />
                    )
                }
            }
        </RouterContext.Consumer>
    );
}
export default Redirect;