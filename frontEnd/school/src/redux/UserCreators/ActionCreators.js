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
            dispatch(login(data.username, data.password));
            history.push('/profile');
            return {success: true};
        } catch (error) {
            error.response && dispatch(userFailed(error.response.data));
            return {success: false};
        }
    }
}
 
export const login = (username, password) =>
    {return async (dispatch) => {
        dispatch(userLoading());
 
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