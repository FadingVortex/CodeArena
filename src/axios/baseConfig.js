export default {
    method: 'get',
    // 暂时没有用，当建立后端时粘贴后端网址
    baseURL: '/hello-mycross',
    // 基础url前缀，便于为axios实例的方法传递相对URL
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },
    timeout: 10000,
    withCredentials: true,      // 携带凭证
    responseType: 'json',       // 返回数据类型
}