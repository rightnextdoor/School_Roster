import * as ActionTypes from '../ActionTypes';
import {baseUrl} from '../baseUrl';
import {post, get} from '../api';

export const initiatePhoto = (photo) => {
    return async (dispatch) => {
       
        try{
            const token = localStorage.getItem('user_token');
            if(token){
            await post(`${baseUrl}/upload`, photo);
           }
        } catch (error){
            error.response && dispatch(photoFailed(error.response.data));
        }
    };
}

export const fetchPhoto = () => {
    return async (dispatch) => {
        dispatch(photoLoading());
        try{
            const token = localStorage.getItem('user_token');
            if(token){
                const photo = await get(`${baseUrl}/files`, true, true);
                
            dispatch(addPhoto(photo.data));
            }
        }catch (error){
            error.response && dispatch(photoFailed(error.response.data));
        }
    } 
}

export const photoUpdate = (photo) => {
    return async (dispatch) => {
        
        try{
            const token = localStorage.getItem('user_token');
            if(token){
                
                await post(`${baseUrl}/upload/replace`, photo, true, true);
            dispatch(fetchPhoto());
            }
        }catch (error){
            error.response && dispatch(photoFailed(error.response.data));
        }
    }
}

export const photoLoading = () => ({
    type: ActionTypes.PHOTO_LOADING
});
 
export const photoFailed = (errmess) => ({
    type: ActionTypes.PHOTO_FAILED,
    payload: errmess
});

export const addPhoto = (photo) => ({
    type: ActionTypes.ADD_PHOTO,
    payload: photo
})