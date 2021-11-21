/*
 * @Descripttion: 
 * @Author: lukasavage
 * @Date: 2021-11-10 21:10:26
 * @LastEditors: lukasavage
 * @LastEditTime: 2021-11-21 09:46:36
 */
// import React from 'react'
import reactDOM from 'react-dom'
import React from 'react'


const FuncCom = (props) => {
    return <div className='hello' style={{ color: '#f90' }}>
        {props.name}
    </div>
}
// const Ele = <div style={{ color: '#f00' }} className='my-ele'>hello<Com /><span>ccc</span></div>;


const Ele2 = React.createElement(<FuncCom name='lks' /> , { style: { color: '#f00' }, className: 'aaa' }, 'hello');

console.dir(Ele2);
// console.dir(Ele2);


reactDOM.render(Ele2, document.getElementById('root'));

