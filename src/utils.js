/*
 * @Descripttion: 为了更方便进行 ★★虚拟DOM的对比★★，我们把虚拟DOM进行一次封装
 * @Author: lukasavage
 * @Date: 2021-11-10 22:28:41
 * @LastEditors: lukasavage
 * @LastEditTime: 2021-11-10 22:56:56
 */

import { REACT_ELEMENT, REACT_TEXT } from './constants'

export function wrapToVDOM(element) {
    // 统一将数字、字符串等转换成对象形式
    return typeof element === 'string' || typeof element === 'number' ? { $$typeof: REACT_ELEMENT, type: REACT_TEXT, props: { content: element } } : element;
}