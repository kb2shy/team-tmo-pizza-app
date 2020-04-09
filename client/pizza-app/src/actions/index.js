import { 
    GET_USER, 
    SET_MENU, 
} from '../constants';

export const setUser = (user) => {
    return {
        type: GET_USER,
        payload: user
    }
}

export const setMenu = (step) => {
    return {
        type: SET_MENU,
        payload: step
    }
}