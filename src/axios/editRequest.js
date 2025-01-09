import instance from './instance.js'

export const queryQuestionById = (value) => {
    return instance({
        method: 'get',
        url: `/think/query/questions?id=${value}`,
    });
}

export const updateQuestion = (value) => {
    return instance({
        method: 'post',
        url: '/edit/update/question',
        data: value
    });
}

export const addQuestion = (value) => {
    return instance({
        method: 'post',
        url: '/edit/add/question',
        data: value
    })
}
