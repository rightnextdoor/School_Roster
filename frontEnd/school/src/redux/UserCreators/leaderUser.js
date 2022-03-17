import * as ActionTypes from '../ActionTypes';

export const LeaderUsers = (state = {
    isLoading: true,
    errMess: null,
    leaderUsers: []
}, action) => {
    switch(action.type){
        case ActionTypes.ADD_LEADER_USER:
            return {...state, isLoading: false, errMess: null, leaderUsers: action.payload};
         
        case ActionTypes.LEADER_USER_LOADING:
            return {...state, isLoading: true, errMess: null, leaderUsers:[]};
        
            case ActionTypes.LEADER_USER_FAILED:
            return {...state, isLoading: false, errMess: action.payload, leaderUsers:[]};
 
        default:
            return state;
    }
}