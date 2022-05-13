import * as ActionTypes from '../ActionTypes';
 
export const AllRoster = (state = {
    isLoading: true,
    errMess: null,
    allRoster: []
}, action) => {
    switch(action.type){
        case ActionTypes.ADD_ALL_ROSTER:
            return {...state, isLoading: false, errMess: null, allRoster: action.payload};
 
        case ActionTypes.ALL_ROSTER_LOADING:
            return {...state, isLoading: true, errMess: null, allRoster:[]};
 
        case ActionTypes.ALL_ROSTER_FAILED:
            return {...state, isLoading: false, errMess: action.payload, allRoster:[]};
 
        default:
            return state;
    }
}