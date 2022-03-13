import * as ActionTypes from '../ActionTypes';
import {baseUrl} from '../baseUrl';
import { history } from '../../components/MainComponent'; 
import {post, get} from '../api';

export const initiateProfile = (profile) => {
    return async (dispatch) => {
       
        try{
            const token = localStorage.getItem('user_token');
            if(token){
            await post(`${baseUrl}/profile`, profile);
           
            history.push('/home');
            }
        } catch (error){
            error.response && dispatch(profileFailed(error.response.data));
        }
    };
}

export const fetchProfile = () => {
    return async (dispatch) => {
        dispatch(profileLoading());
        try{
            const token = localStorage.getItem('user_token');
            if(token){
                const profile = await get(`${baseUrl}/profile`, true, true);
            dispatch(addProfile(profile.data));
            }
        }catch (error){
            error.response && dispatch(profileFailed(error.response.data));
        }
    } 
}

export const profileUpdate = (profile) => {
    return async (dispatch) => {
        
        try{
            const token = localStorage.getItem('user_token');
            if(token){
                
                await post(`${baseUrl}/profile/update`, profile, true, true);
            dispatch(fetchProfile());
            }
        }catch (error){
            error.response && dispatch(profileFailed(error.response.data));
        }
    }
}

export const addAddress = (address) => {
    return async (dispatch) => {
        
        try{
            const token = localStorage.getItem('user_token');
            if(token){
                
                await post(`${baseUrl}/profile/address`, address, true, true);
            dispatch(fetchProfile());
            }
        }catch (error){
            error.response && dispatch(profileFailed(error.response.data));
        }
    }
}

export const deleteAddress = (address) => {
    return async (dispatch) => {
        
        try{
            const token = localStorage.getItem('user_token');
            if(token){
                
                await post(`${baseUrl}/profile/delete/address`, address, true, true);
            dispatch(fetchProfile());
            }
        }catch (error){
            error.response && dispatch(profileFailed(error.response.data));
        }
    }
}

export const addPhoneNumber = (phone) => {
    return async (dispatch) => {
        
        try{
            const token = localStorage.getItem('user_token');
            if(token){
                
                await post(`${baseUrl}/profile/phoneNumber`, phone, true, true);
            dispatch(fetchProfile());
            }
        }catch (error){
            error.response && dispatch(profileFailed(error.response.data));
        }
    }
}

export const deletePhoneNumber = (phone) => {
    return async (dispatch) => {
        
        try{
            const token = localStorage.getItem('user_token');
            if(token){
                
                await post(`${baseUrl}/profile/delete/phoneNumber`, phone, true, true);
            dispatch(fetchProfile());
            }
        }catch (error){
            error.response && dispatch(profileFailed(error.response.data));
        }
    }
}

export const profileLoading = () => ({
    type: ActionTypes.PROFILE_LOADING
});
 
export const profileFailed = (errmess) => ({
    type: ActionTypes.PROFILE_FAILED,
    payload: errmess
});

export const addProfile = (profile) => ({
    type: ActionTypes.ADD_PROFILE,
    payload: profile
})