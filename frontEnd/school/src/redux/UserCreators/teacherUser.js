import * as ActionTypes from '../ActionTypes';

export const TeacherUsers = (state = {
    isLoading: true,
    errMess: null,
    teacherUsers: []
}, action) => {
    switch(action.type){
        case ActionTypes.ADD_TEACHER_USER:
            return {...state, isLoading: false, errMess: null, teacherUsers: action.payload};
         
        case ActionTypes.TEACHER_USER_LOADING:
            return {...state, isLoading: true, errMess: null, teacherUsers:[]};
        
            case ActionTypes.TEACHER_USER_FAILED:
            return {...state, isLoading: false, errMess: action.payload, teacherUsers:[]};
 
        default:
            return state;
    }
}