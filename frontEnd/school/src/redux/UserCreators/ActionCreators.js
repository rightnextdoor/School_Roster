import axios from 'axios';
import * as ActionTypes from '../ActionTypes';
import {baseUrl} from '../baseUrl';
import { history } from '../../components/MainComponent'; 
import {post, get} from '../api';
import { fetchProfile } from '../ProfileCreators/ActionCreators';
import { getErrors } from '../Errors/ActionCreators';

export const initiateLogin = (username, password) =>
    {return async (dispatch) => {
        dispatch(userLoading(true));
            try{
            const result = await axios.post(`${baseUrl}/login`,{
                username,
                password
            });
            const token = result.data;
            localStorage.setItem('user_token', token.jwt);
            dispatch(fetchUser());
            dispatch(fetchProfile());
                history.push('/home');
        } catch (error){
            var errorMess = new Error('Error ' + error.response.status + ': username/password is wrong' );
            error.response && dispatch(getErrors(errorMess.message));
            //console.log('error: ', errorMess.message);
        }
    };
 };

 export const fetchUser = () =>  {
    return async (dispatch) => {
        try{
            const token = localStorage.getItem('user_token');
            if(token){
                const user = await get(`${baseUrl}/user`, true, true);
                dispatch(addUser(user.data));
            }
        } catch (error) {
            error.response && dispatch(userFailed(error.response.data));
        }
     }
     
 } 
 
export const initiateLogout = () => {
    return async (dispatch) => {
        try{
            localStorage.removeItem('user_token');
          history.push('/');
            return dispatch(signOut());
        } catch (error) {
            error.response && dispatch(userFailed(error.response.data));
        }
    }
}
 
export const registerNewUser = (data) => {
    return async (dispatch) => {
        try {
            await axios.post(`${baseUrl}/createUser`, data);
            localStorage.setItem('user', JSON.stringify(data));
            history.push('/createProfile');
            return {success: true};
        } catch (error) {
            error.response && dispatch(userFailed(error.response.data));
            return {success: false};
        }
    }
}
 
export const login = (username, password) =>
    {return async (dispatch) => {
        dispatch(userLoading(true));
 
        try{
            const result = await axios.post(`${baseUrl}/login`,{
                username,
                password
            });
            const token = result.data;
            localStorage.setItem('user_token', token.jwt);
            const user = await get(`${baseUrl}/user`, true, true);
                dispatch(addUser(user.data));
               
        } catch (error){
            error.response && dispatch(userFailed(error.response.data));
        }
    };
 };

 export const fetchAllStudents = () => {
    return async (dispatch) => {
        dispatch(studentUserLoading(true));
        try{
            const token = localStorage.getItem('user_token');
            if(token){
                const role = 'STUDENT'
                const allStudents = await post(`${baseUrl}/profile/roles?role=${role}`, true, true);
                
                dispatch(addStudentUser(allStudents.data));
            }
        } catch (error){
            error.response && dispatch(studentUserFailed(error.response.data));
        }
    };
}

export const fetchAllTeachers = () => {
    return async (dispatch) => {
        dispatch(teacherUserLoading(true));
        try{
            const token = localStorage.getItem('user_token');
            if(token){
                const role = 'TEACHER'
                const allTeachers = await post(`${baseUrl}/profile/roles?role=${role}`, true, true);
                
                dispatch(addTeacherUser(allTeachers.data));
            }
        } catch (error){
            error.response && dispatch(teacherUserFailed(error.response.data));
        }
    };
}

export const fetchAllLeaders = () => {
    return async (dispatch) => {
        dispatch(leaderUserLoading());
        try{
            const token = localStorage.getItem('user_token');
            if(token){
                const role = 'TEACHER_LEADER'
                const allLeaders = await post(`${baseUrl}/profile/roles?role=${role}`, true, true);
                
                dispatch(addLeaderUser(allLeaders.data));
            }
        } catch (error){
            error.response && dispatch(leaderUserFailed(error.response.data));
        }
    };
}
 
export const signIn = (user) => ({
    type: ActionTypes.SIGN_IN,
    payload: user
});
 
export const userLoading = () => ({
    type: ActionTypes.USER_LOADING
});
 
export const userFailed = (errmess) => ({
    type: ActionTypes.USER_FAILED,
    payload: errmess
});
 
export const addUser = (user) => ({
    type: ActionTypes.ADD_USER,
    payload: user
});

export const signOut = () => ({
    type: ActionTypes.SIGN_OUT
});

export const studentUserLoading = () => ({
    type: ActionTypes.STUDENT_USER_LOADING
});
 
export const studentUserFailed = (errmess) => ({
    type: ActionTypes.STUDENT_USER_FAILED,
    payload: errmess
});
 
export const addStudentUser = (user) => ({
    type: ActionTypes.ADD_STUDENT_USER,
    payload: user
});

export const teacherUserLoading = () => ({
    type: ActionTypes.TEACHER_USER_LOADING
});
 
export const teacherUserFailed = (errmess) => ({
    type: ActionTypes.TEACHER_USER_FAILED,
    payload: errmess
});
 
export const addTeacherUser = (user) => ({
    type: ActionTypes.ADD_TEACHER_USER,
    payload: user
});

export const leaderUserLoading = () => ({
    type: ActionTypes.LEADER_USER_LOADING
});
 
export const leaderUserFailed = (errmess) => ({
    type: ActionTypes.LEADER_USER_FAILED,
    payload: errmess
});
 
export const addLeaderUser = (user) => ({
    type: ActionTypes.ADD_LEADER_USER,
    payload: user
});