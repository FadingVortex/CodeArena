import HomeEdit from '../HomeEdit.vue';
import EditTopic from './EditTopic.vue';

export const current = shallowRef(HomeEdit);

export const changeCurrentEdit = (name) => {
    if(name === 'HomeEdit') {
        current.value = HomeEdit;
    } else if(name === 'EditTopic') {
        current.value = EditTopic;
    }
}
