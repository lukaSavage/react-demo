/*
 * @Descripttion: 用于创建真实DOM元素的模块(函数组件)
 * @Author: lukasavage
 * @Date: 2021-11-12 20:37:26
 * @LastEditors: lukasavage
 * @LastEditTime: 2021-11-13 00:43:51
 */

import { REACT_ELEMENT, REACT_TEXT } from './constants'

function render(vdom, container) {
    let realDom = createDOM(vdom);
    realDom.appendChild(realDom);
}


function createDOM(vdom) {
    let { props, type } = vdom;
    let dom;
    // 函数组件则需要在此继续分类
    if (type === REACT_TEXT) {
        dom = document.createTextNode(props.content);
    } else if (typeof type === 'function') {
        // ①、说明这是一个函数组件
        return mountFunctionComponent(vdom);
    } else if(typeof type === 'string') {
        dom = document.createElement(type);


    }
    if (props) {
        updateProps(dom, {}, props);
    }
    const children = props.children;
    if (typeof children === 'object' && children.type) {
        render(children, dom);
    } else if (Array.isArray(children)) {
        dealWithChildren(children, dom);
    }


    vdom.dom = dom;


    return vdom;
}

function mountFunctionComponent(vdom) {
    let { type, props } = vdom;     // ②、type: FuncCom函数组件，props是其属性
    let renderVdom = type(props);  // 调用变成虚拟dom
    return createDOM(renderVdom)   // 最后直接返回真实DOM(递归)
}

function dealWithChildren(children, dom) {
    children.forEach(item => render(item, dom))
}

function updateProps(dom, oldProps, newProps) {
    for (const key in newProps) {
        if (key === 'children') {
            continue;
        } else if (key === 'style') {
            let styleObj = newProps[key];
            for (const attr in styleObj) {
                dom.style[attr] = styleObj[attr];
            }
        } else {
            dom[key] = newProps[key];
        }
    }

    for (const key in oldProps) {
        if (!newProps.hasOwnProperty(key)) {
            dom[key] = null;
        }
    }
}





const ReactDOM = {
    render
}

export {
    ReactDOM
}



/*
    当前的传递进来的vdom





*/