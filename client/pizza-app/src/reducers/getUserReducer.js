import { GET_USER } from '../constants';

export default (state={}, action) => {
    switch (action.type) {
        case GET_USER:
            return { ...state, user: action.payload };
        default:
            return state;
    }
}