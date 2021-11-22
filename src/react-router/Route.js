/*
 * @Descripttion: react-router核心库————Route
 * @Author: lukasavage
 * @Date: 2021-11-21 10:33:36
 * @LastEditors: lukasavage
 * @LastEditTime: 2021-11-22 20:59:41
 */
import React, { Component } from 'react'
import RouterContext from './routerContext'
import matchPath from './matchPath'


class Route extends React.Component {
    static contextType = RouterContext
    render() {
        const { history, location } = this.context;
        const { component: RouteComponent, computedMatch, render } = this.props;
        const match = computedMatch ? computedMatch : matchPath(location.pathname, this.props);
        let routeProps = { history, location };
        let element = null;
        if (match) {
            routeProps.match = match;
            if (RouteComponent) {
                element = <RouteComponent {...routeProps} />
            } else if (render) {
                element = render(routeProps);
            } else {
                element = null;
            }
        } else {
            element = null;
        }
        return (
            <RouterContext.Provider value={routeProps}>
                {element}
            </RouterContext.Provider>
        )
    }
}
export default Route;