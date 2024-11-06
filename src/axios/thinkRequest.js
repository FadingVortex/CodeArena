import instance from './instance.js'

export const options = () => {
    return instance(
        {
            method: 'get',
            url: '/think/options'
        }
    );
}

export const queryQuestion = (value) => {
    return instance({
        method: 'get',
        url: `/think/query/questions?LMC=${value}`,
    });
}

export const deleteQueryQuestions = (value) => {
    //第一步： 对形参value进行判断，数值还是数组
    let data = (value instanceof Array) ? { ids: value } : { ids: [value] };
    //通过instance发送请求
    let url = '/think/delete/questions';
    return instance({
        url,
        method: 'post',
        data: data,
    });
}

export const queryQuestionByPage = (data) => {
    return instance({
        url: '/think/query/page/questions',
        method: 'post',
        data
    });
}

export const modules = (data)=> {
    return instance(
        {
            method: 'get',
            url: '/think/options'
        }
    );
}

export const chapters = (data)=> {
    return instance(
        {
            method: 'get',
            url: '/think/options'
        }
    );
}

export const queryJobs = (data) => {
    return instance(
        {
            method: 'post',
            url: '/think/jobs/query',
            data,
        }
    );
}

export const ThinkJobDelete = (data) => {
    return instance({
        method: 'post',
        url: '/thinkhome/jobs/delete',
        data: data
    });
}

