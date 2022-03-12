import * as ActionTypes from './ActionTypes';
 
export const Profile = (state = {
    isLoading: true,
    errMess: null,
    profile: []
}, action) => {
    switch(action.type){
        case ActionTypes.ADD_PROFILE:
            return {...state, isLoading: false, errMess: null, profile: action.payload};
 
        case ActionTypes.PROFILE_LOADING:
            return {...state, isLoading: true, errMess: null, profile:[]};
 
        case ActionTypes.PROFILE_FAILED:
            return {...state, isLoading: false, errMess: action.payload, profile:[]};
 
        default:
            return state;
    }
}