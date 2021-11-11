/*
 * @Descripttion: 
 * @Author: lukasavage
 * @Date: 2021-11-10 21:10:26
 * @LastEditors: lukasavage
 * @LastEditTime: 2021-11-10 22:49:36
 */
import React from 'react'
import reactDOM from 'react-dom'

const Ele = <div style={{ color: '#f00' }} className='my-ele'>hello<span className='haha'>aaa</span></div>;

const Ele2 = React.createElement('div', { style: { color: '#f00' }, className: 'my-ele' }, 'hello');

console.dir(Ele);
console.dir(Ele2);


reactDOM.render(Ele2, document.getElementById('root'));

