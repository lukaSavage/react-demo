/*
 * @Descripttion: 用于创建真实DOM元素的模块(函数组件)
 * @Author: lukasavage
 * @Date: 2021-11-12 20:37:26
 * @LastEditors: lukasavage
 * @LastEditTime: 2021-11-13 01:03:56
 */

import { REACT_ELEMENT, REACT_TEXT } from './constants'

function render(vdom, container) {
    let realDom = createDOM(vdom);
    realDom.appendChild(realDom);
}


function createDOM(vdom) {
    let { props, type } = vdom;
    let dom;
    if (type === REACT_TEXT) {
        dom = document.createTextNode(props.content);
    } else if (typeof type === 'function') {
        if(type.isReactComponent) { // 说明这是一个类组件
            return mountClassComponent(vdom);
        }
        // ①、函数组件必须再次分为是否为类组件
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

function mountClassComponent(vdom) {
    let { type: ClassComponent, props } = vdom;
    let classInstance = new ClassComponent(props);   // ②、new一下类拿到类组件的实例，从而调用render方法return出createDOM(renderVdom)
    let renderVdom = classInstance.render();
    return createDOM(renderVdom);

}
function mountFunctionComponent(vdom) {
    let { type, props } = vdom;     
    let renderVdom = type(props);  
    return createDOM(renderVdom)   
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