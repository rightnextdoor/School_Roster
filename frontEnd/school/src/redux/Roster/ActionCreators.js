import axios from 'axios';
import * as ActionTypes from '../ActionTypes';
import {baseUrl} from '../baseUrl';
import {post, get} from '../api';
import { getErrors } from '../Errors/ActionCreators';
import { fetchUser } from '../UserCreators/ActionCreators';

export const fetchAllRoster = () => {
    return async (dispatch) => {
        dispatch(allRosterLoading());
        try{
            const token = localStorage.getItem('user_token');
            if(token){
                const allRoster = await get(`${baseUrl}/roster`, true, true);
                
            dispatch(addAllRoster(allRoster.data));
            }
        }catch (error){
            
            error.response && dispatch(allRosterFailed(error.response.data));
        }
    } 
}


export const allRosterLoading = () => ({
    type: ActionTypes.ALL_ROSTER_LOADING
});
 
export const allRosterFailed = (errmess) => ({
    type: ActionTypes.ALL_ROSTER_FAILED,
    payload: errmess
});

export const addAllRoster = (profile) => ({
    type: ActionTypes.ADD_ALL_ROSTER,
    payload: profile
})