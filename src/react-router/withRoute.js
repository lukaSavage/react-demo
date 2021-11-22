/*
 * @Descripttion: 
 * @Author: lukasavage
 * @Date: 2021-11-22 21:06:41
 * @LastEditors: lukasavage
 * @LastEditTime: 2021-11-22 21:20:10
 */
import React from 'react';
import RouterContext from './routerContext';
function withRouter(OldComponent) {
    return props => {
        return (
            <RouterContext.Consumer>
                {
                    contextValue => {
                        return <OldComponent {...props} {...contextValue} />
                    }
                }
            </RouterContext.Consumer>
        )
    }
}

export default withRouter;