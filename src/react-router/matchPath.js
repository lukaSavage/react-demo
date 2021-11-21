/*
 * @Descripttion: 
 * @Author: lukasavage
 * @Date: 2021-11-21 20:46:32
 * @LastEditors: lukasavage
 * @LastEditTime: 2021-11-21 21:14:10
 */

import { pathToRegexp } from 'path-to-regexp';
function compilePath(path, options) {
    let keys = [];  // 用来存储路径参数名的数组
    const regexp = pathToRegexp(path, keys, options);
    return { keys, regexp };
}
function matchPath(pathname, options) {
    // path = 此Route对应的路径 exact是否精确匹配 strict是否严格匹配 sensitive是否大小写敏感
    // 以下解构的参数是用户可能会传递过来的
    const { path = '/', exact = false, strict = false, sensitive = false } = options;
    // 先把路径path编译成正则
    const { keys, regexp } = compilePath(path, { end: exact, strict, sensitive });
    const match = regexp.exec(pathname); // 用路径path转成的正则和当前浏览器中的路径名进行匹配
    if (!match) return null;
    const [url, ...values] = match;
    // 是否精确匹配
    const isExact = pathname === url;
    if (exact && !isExact) return null;
    return {
        path, // Route的路径
        url,  // Route路径转成证则表达式匹配的路径部分
        isExact, // 是否精确匹配
        params: keys.reduce((memo, key, index) => {
            // 路径参数的名字 = 路径参数的值 
            memo[key.name] = values[index];
            return memo;
        }, {})
    }

}

export default matchPath;