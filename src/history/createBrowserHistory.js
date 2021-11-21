/*
 * @Descripttion: history库中的createBrowserHistory
 * @Author: lukasavage
 * @Date: 2021-11-21 15:31:06
 * @LastEditors: lukasavage
 * @LastEditTime: 2021-11-21 17:40:21
 */
function createBrowserHistory() {
    let action = 'POP';        // action表示是由于什么样的动作引起了路径的变更
    let state;                 // 当前history上携带的state
    let listeners = [];

    function listen(listener) {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter(item => item != listener);
        }
    }

    function notify(newState) {
        Object.assign(window.history, newState);
        listeners.forEach(item => item(window.history.location))

    }

    function push(pathName, nextState) {
        /*  
            注意：push传参有两种方式
            push('/user', { id: 1, name: '张三' });
            push({pathname: '/user', state: {id: 1, name: '张三'}})
        */
        action = 'PUSH';
        if (typeof pathName === 'object') {
            state = pathName.state;
            pathName = pathName.pathname;
        } else {
            state = nextState;
        }
        // 再调用原生的pushState方法跳转路径
        window.history.pushState(state, null, pathName);
        // 调用listen(封装套notify函数中)更新UI视图
        let location = { pathname: pathName, state };
        notify({ action, location });
    }
    function go(n) {
        window.history.go(n);
    }
    function goBack() {
        go(-1);
    }
    function goForward() {
        go(1);
    }

    // 最后一步：直接修改url地址触发onpopstate事件
    window.addEventListener('popstate', () => {//TODO
        let location = { state: window.location.state, pathname: window.location.pathname };
        //当路径改变之后应该让history的监听函数执行，重新刷新组件
        notify({ action: "POP", location });
    });

    return {
        action,           // pushState -> PUSH,  go,forward,back -> POP    replaceState -> REPLACE
        push,
        listen,
        go,
        goBack,
        goForward,
        location: { pathname: window.location.pathname, state: window.location.state }
    }
}

export default createBrowserHistory;