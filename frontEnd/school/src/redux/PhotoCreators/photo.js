import * as ActionTypes from '../ActionTypes';
 
export const Photo = (state = {
    isLoading: true,
    errMess: null,
    photo: ''
}, action) => {
    switch(action.type){
        case ActionTypes.ADD_PHOTO:
            return {...state, isLoading: false, errMess: null, photo: action.payload};
 
        case ActionTypes.PHOTO_LOADING:
            return {...state, isLoading: true, errMess: null, photo:''};
 
        case ActionTypes.PHOTO_FAILED:
            return {...state, isLoading: false, errMess: action.payload, photo:''};
 
        default:
            return state;
    }
}