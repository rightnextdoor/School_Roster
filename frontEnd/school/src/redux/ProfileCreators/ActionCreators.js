import {baseUrl} from '../baseUrl';
import { history } from '../../components/MainComponent'; 
import {post, get} from '../api';
import { getErrors, resetErrors } from '../Errors/ActionCreators';

export const initiateProfile = (profile) => {
    return async (dispatch) => {
       
        try{
            const token = localStorage.getItem('user_token');
            if(token){
            await post(`${baseUrl}/profile`, profile, true, true);
          
            localStorage.removeItem('user');
            history.push('/home');
            }
        } catch (error){
            dispatch(resetErrors);
            error.response && dispatch(getErrors(error.response.data));
        }
    };
}

export const profileUpdate = (profile) => {
    return async (dispatch) => {
        
        try{
            const token = localStorage.getItem('user_token');
            if(token){
                
                await post(`${baseUrl}/profile/update`, profile, true, true);
         
            }
        }catch (error){
            dispatch(resetErrors);
            error.response && dispatch(getErrors(error.response.data));
        }
    }
}

export const addAddress = (address) => {
    return async (dispatch) => {
        
        try{
            const token = localStorage.getItem('user_token');
            if(token){
                
                await post(`${baseUrl}/profile/address`, address, true, true);
         
            }
        }catch (error){
            dispatch(resetErrors);
            error.response && dispatch(getErrors(error.response.data));
        }
    }
}

export const deleteAddress = (address) => {
    return async (dispatch) => {
        
        try{
            const token = localStorage.getItem('user_token');
            if(token){
                
                await post(`${baseUrl}/profile/delete/address`, address, true, true);
           
            }
        }catch (error){
            dispatch(resetErrors);
            error.response && dispatch(getErrors(error.response.data));
        }
    }
}

export const addPhoneNumber = (phone) => {
    return async (dispatch) => {
        
        try{
            const token = localStorage.getItem('user_token');
            if(token){
                
                await post(`${baseUrl}/profile/phoneNumber`, phone, true, true);
          
            }
        }catch (error){
            dispatch(resetErrors);
            error.response && dispatch(getErrors(error.response.data));
        }
    }
}

export const deletePhoneNumber = (phone) => {
    return async (dispatch) => {
        
        try{
            const token = localStorage.getItem('user_token');
            if(token){
                
                await post(`${baseUrl}/profile/delete/phoneNumber`, phone, true, true);
            
            }
        }catch (error){
            dispatch(resetErrors);
            error.response && dispatch(getErrors(error.response.data));
        }
    }
}
