/*
 * @Descripttion: React.Component模块(class类组件)
 * @Author: lukasavage
 * @Date: 2021-11-13 00:51:43
 * @LastEditors: lukasavage
 * @LastEditTime: 2021-11-14 15:43:33
 */
import { compareTwoVdom } from './react-dom4'
class Updater {
    constructor(classInstance) {
        this.classInstance = classInstance;
        this.pendingStates = [];   // 这里存入多个partialState对象
    }
    addState(partialState) {
        this.pendingStates.push(partialState);
        this.emitUpdate();
    }
    emitUpdate() {
        this.updateComponent();
    }
    updateComponent() {
        const { classInstance, pendingStates } = this;
        if (pendingStates.length > 0) {
            shouldUpdate(classInstance, this.getState());
        }
    }
    // 基于老状态和pendingStates获取新状态
    getState() {
        const { classInstance, pendingStates } = this;
        const { state } = classInstance; // 老状态
        pendingStates.forEach(item => {
            state = {
                ...state,
                ...item
            }
        });
        pendingStates.length = 0; // 清空数组
        return state;
    }
}
function shouldUpdate(classInstance, nextState) {
    classInstance.state = nextState; // 先新状态赋给类的实例this.state上去
    classInstance.forceUpdate(); // 让类的实例强行更新
}

class Component {
    /**
     * 由于函数组件和类组件都会在编译后成为函数
     * 为了区分类组件和函数组件，给类组件的类型加一个静态属性isReactComponent = true
     * 子类继承也会继承父类的静态方法
     */
    static isReactComponent = true;
    constructor(props) {
        this.props = props;
        this.state = {};
        this.updater = new Updater(this);
    }
    // React的setState方法

    /**
     * 
     * @param {object} partialState state的部分状态
     */
    setState(partialState) {
        // ①、setState方法里面有一个更新器updater
        this.updater.addState(partialState);
    }
    forceUpdate() {
        // 在这里重新调用render方法,(render方法在react-dom4中新建一个函数获取)
        const oldRenderVdom = this.oldRenderVdom;
        const oldDom = oldRenderVdom.dom;
        const newRenderVdom = this.render();


        compareTwoVdom(oldDom.parentNode, oldRenderVdom, newRenderVdom);
    }
}

export default Component;

/*
    更新原理
    1.初次挂载的时候，已经在页面上放置了一个div
    2.更新的时候，重新render返回新的状态，重新render返回新的虚拟DOM，在使用新的虚拟DOM生成新的真实DOM
    3.用新的真实DOM替换掉老的div就实现了更新

*/