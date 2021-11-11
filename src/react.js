/*
 * @Descripttion: 用于创建一个自己的react.js库
 * @Author: lukasavage
 * @Date: 2021-11-10 21:48:58
 * @LastEditors: lukasavage
 * @LastEditTime: 2021-11-10 23:02:48
 */
import { REACT_ELEMENT } from './constants'
import { wrapToVDOM } from './utils'


function createElement(type, config, children) {
    let key, ref;         // 由于key、ref会传入到config里面，而源码则需要放在外面，故做特俗处理
    if (config) {
        key = config.key;
        ref = config.ref;
        // 删除config里面的key、ref
        delete key;        // 用来做DOM-DIFF的
        delete ref;        // 用于获取真实DOM的
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


 */


export {
    createElement
}