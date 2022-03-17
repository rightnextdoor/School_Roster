import * as ActionTypes from '../ActionTypes';

export const StudentUsers = (state = {
    isLoading: true,
    errMess: null,
    studentUsers: []
}, action) => {
    switch(action.type){
        case ActionTypes.ADD_STUDENT_USER:
            return {...state, isLoading: false, errMess: null, studentUsers: action.payload};
         
        case ActionTypes.STUDENT_USER_LOADING:
            return {...state, isLoading: true, errMess: null, studentUsers:[]};
        
            case ActionTypes.STUDENT_USER_FAILED:
            return {...state, isLoading: false, errMess: action.payload, studentUsers:[]};
 
        default:
            return state;
    }
}