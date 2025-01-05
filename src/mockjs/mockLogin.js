/**
 * 处理拦截Login请求后执行的相关函数
 */


const users = [
    {
        username: 'John',
        password: '123'
    },
    {
        username: 'Marry',
        password: '111'
    },
    {
        username: 'Sam',
        password: '123456'
    }
]



export const postlogin = (opt) => {
    let body = JSON.parse(opt.body);
    const {username, password} = body;

    let arr = users.filter(el => el.username===username && el.password===password);
    if(arr.length>0) 
        return {
            code: 200,
            msg: '成功',
            data: {
                username: '1234',
                token: `${username}` + '$#@%$#jflwetpijdsfjldshffldshf&%&%^&%^'
            }
        }
    else 
        return {
            code: 201,
            msg: '用户名或密码错误'
        }
};

export const getLogin = (opt) => {
    console.log("拦截到login的Get请求");
    console.log(opt);
    return {
        code: 200,
        msg: '成功'
    }
};

export const register = (opt) => {
    console.log(opt);
};