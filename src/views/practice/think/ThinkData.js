import TestQuestion from '../../TestQuestion.vue';
import HomeThink from '../HomeThink.vue';
import ThinkMyJobs from './ThinkMyJobs.vue';

export const current = shallowRef(HomeThink);

export const changeCurrent = (name) => {
    if(name === 'ThinkMyJobs') {
        current.value = ThinkMyJobs;
    } else if(name === 'HomeThink') {
        current.value = HomeThink;
    } else if(name === 'TestQuestion') {
        current.value = TestQuestion;
    }
}
