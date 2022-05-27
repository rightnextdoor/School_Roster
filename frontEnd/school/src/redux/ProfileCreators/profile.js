import * as ActionTypes from '../ActionTypes';

export const Profile = (state = {
    isLoading: true,
    errMess: null,
}, action) => {
    switch (action.type) {
        case ActionTypes.PROFILE_LOADING:
            return { ...state, isLoading: true, errMess: null,};

        case ActionTypes.PROFILE_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, };

        default:
            return state;
    }
}