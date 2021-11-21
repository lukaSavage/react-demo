/*
 * @Descripttion: history中的createHashHistory
 * @Author: lukasavage
 * @Date: 2021-11-21 15:31:06
 * @LastEditors: lukasavage
 * @LastEditTime: 2021-11-21 18:06:55
 */
function createHashHistory() {
    let historyStack = [];   // 创建一个历史站,里面存放多个location对象
    let current = -1;
    let action = 'POP';
    let state;
    let listeners = [];

    function listen(listener) {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter(item => item !== listener);
        }
    }
    function push(path, nextState) {
        action = 'PUSH';
        if (typeof path === 'object') {
            state = path.state;
            path = path.pathname;
        } else {
            state = nextState;
        }
        // 更改hash值(之后会触发一个hashchange事件)
        window.location.hash = path;

    }
    window.addEventListener('hashchange', hashChangeHandler)
    function hashChangeHandler() {
        const pathname = window.location.hash.slice(1);   // 去除'#'
        const location = { pathname, state };
        Object.assign(window.history, { action, location });
        if (action === 'PUSH') {
            historyStack[++current] = location;
        }
        listeners.forEach(item => item(window.history.location));
    }
    function go(n) {
        action = 'POP';
        current += n;
        let nextLocation = historyStack[current];
        state = nextLocation.state;
        window.location.hash = nextLocation.pathname;
    }

    function goBack() {
        go(-1);
    }
    function goForward() {
        go(1);
    }


    if (window.location.hash) {
        action = 'PUSH';
        hashChangeHandler();
    } else {
        window.location.hash = '/'
    }
    return {
        action,           // pushState -> PUSH,  go,forward,back -> POP    replaceState -> REPLACE
        push,
        listen,
        go,
        goBack,
        goForward,
        location: { pathname: '/', state: undefined }
    }
}

export default createHashHistory;
