/*
 * @Descripttion: 用于创建一个自己的react.js库
 * @Author: lukasavage
 * @Date: 2021-11-10 21:48:58
 * @LastEditors: lukasavage
 * @LastEditTime: 2021-11-13 00:53:46
 */
import { REACT_ELEMENT } from './constants'
import { wrapToVDOM } from './utils'
import Component from './component'

/**
 * react基本的createElement方法
 * @param {string} type 代表创建dom的标签类型，例如：'h1', 'span'
 * @param {object} config 代表配置对象，通常是组件/标签的属性
 * @param {string | number | object} children 组件或者标签的儿子们
 * @returns 返回虚拟对象，内部通常有$$typeof、typeof、props、key、ref、
 */
function createElement(type, config, children) {
    let key = null, ref = null;         // 由于key、ref会传入到config里面，而源码则需要放在外面，故做特俗处理
    if (config) {
        key = config.key; 
        ref = config.ref;
        // 删除config里面的key、ref
        delete config.ref;        // 用来做DOM-DIFF的
        delete config.key;        // 用于获取真实DOM的
    }
    const props = { ...config };
    if (arguments.length > 3) {                                                      // 说明有2个以及以上的儿子
        props.children = Array.prototype.slice.call(arguments, 2).map(wrapToVDOM);  // 截取儿子们          -->(这里得做一下map映射，使其children都变成对象形式)
    } else if (arguments.length === 3) {                                           // 说明只有一个儿子
        props.children = wrapToVDOM(children);                                    // 字符串 数字 React元素 -->(这里得做一下map映射，使其children都变成对象形式)
    }

    return {
        $$typeof: REACT_ELEMENT,     // 指的是元素的类型
        key,
        ref,
        type,                        // dom标签类型，例如h1、span、div
        props,                       // dom的属性 
    }

}

/**
 
    // jsx  ==>   babel转成React.createElement(...)形式   ==> createElement转换成如下虚拟DOM形式
{
    $$typeof: Symbol(react.element)
    key: null
    props: {style: {…}, className: 'my-ele', children: 'hello'}
    ref: null
    type: "div"
    _owner: null
    _store: {validated: false}
    _self: null
    _source: null
    [[Prototype]]: Object
}

    // 具体步骤梳理：
    1.createElement接受三个参数type、config、children，return制为一个虚拟dom，包含$$typeof、type、ref、key、props
    2.针对于arguments参数做处理
        ·如果大于3...
        ·如果等于3...
    3.为了方便后续做dom-diff，对现有的children做了一层包装，包装成{$$type: xxx, type: xxx, props: {content: xxx}}的形式
    4.去除config中的ref、key，把它们移到顶级对象的里面

 */

const react = {
    createElement,
    component
}

export default react;