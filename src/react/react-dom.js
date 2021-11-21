/*
 * @Descripttion: 用于创建真实DOM元素的模块
 * @Author: lukasavage
 * @Date: 2021-11-12 20:37:26
 * @LastEditors: lukasavage
 * @LastEditTime: 2021-11-21 09:46:58
 */

import { REACT_ELEMENT, REACT_TEXT } from '../constants'

/**
 * 将虚拟DOM变成真实DOM
 * @param {object} vdom react.createElement创建出来的虚拟DOM
 * @param {*} container 要放入的容器
 */
function render(vdom, container) {
    // ①、把虚拟DOM变成真实DOM
    let realDom = createDOM(vdom);
    // ②、将真实dom插入到container中
    realDom.appendChild(realDom);
}


function createDOM(vdom) {
    let { props, type } = vdom;
    let dom; // 真实dom
    if (type === REACT_TEXT) {
        // 说明是子元素里面的type
        dom = document.createTextNode(props.content);
    } else {
        dom = document.createElement(type);
    }
    // ⑤、处理儿子们
    if (props) {
        // ⑥、更新DOM的属性
        updateProps(dom, {}, props);
    }
    // ⑦、反过来再来处理下面的key为children的情况
    const children = props.children;
    // children 是一个元素的话
    if (typeof children === 'object' && children.type) {
        render(children, dom);   // 继续插入到真实dom里面
    } else if (Array.isArray(children)) {
        // children 是一个数组的话,例如<div> 123 <span>呵呵哒</span> </div>,则把他们一一的挂在到父节点上
        dealWithChildren(children, dom);
    }


    vdom.dom = dom;   // ③、在虚拟DOM挂载对应的真实dom上去


    return vdom;    // ④、将vdom直接返回
}

function dealWithChildren(children, dom) {
    children.forEach(item => render(item, dom))
}


/**
 * 
 * @param {HTMLElement} dom 真实DOM
 * @param {object} oldProps 真实dom上的老属性
 * @param {object} newProps 真实dom上的新属性
 */
function updateProps(dom, oldProps, newProps) {
    for (const key in newProps) {
        // newProps主要有children、style、className等等属性
        if (key === 'children') {
            // 如果碰到children，暂时先不处理
            continue;
        } else if (key === 'style') {
            // 继续遍历style对象上得属性
            let styleObj = newProps[key];
            for (const attr in styleObj) {
                dom.style[attr] = styleObj[attr];
            }
        } else {
            dom[key] = newProps[key];
        }
    }

    // 如果oldProps里面的属性在newProps里面没有，则需要删除掉
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