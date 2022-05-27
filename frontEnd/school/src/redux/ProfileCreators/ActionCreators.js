import { baseUrl } from '../baseUrl';
import * as ActionTypes from '../ActionTypes';
import { history } from '../../components/MainComponent';
import { post } from '../api';


export const initiateProfile = (profile) => {
    return async (dispatch) => {
        dispatch(profileLoading(true));
        try {
            const token = localStorage.getItem('user_token');
            if (token) {
                await post(`${baseUrl}/profile`, profile, true, true);

                localStorage.removeItem('user');
                history.push('/home');
            }
        } catch (error) {
            var errorMess = new Error('Error ' + error.response.status + ': failed to load profile');
            error.response && dispatch(profileFailed(errorMess.message));
        }
    };
}

export const profileUpdate = (profile) => {
    return async (dispatch) => {
        dispatch(profileLoading(true));
        try {
            const token = localStorage.getItem('user_token');
            if (token) {

                await post(`${baseUrl}/profile/update`, profile, true, true);
                window.location.reload()

            }
        } catch (error) {
            var errorMess = new Error('Error ' + error.response.status + ': failed to update profile');
            error.response && dispatch(profileFailed(errorMess.message));
        }
    }
}

export const addAddress = (address) => {
    return async (dispatch) => {
        dispatch(profileLoading(true));
        try {
            const token = localStorage.getItem('user_token');
            if (token) {

                await post(`${baseUrl}/profile/address`, address, true, true);
                window.location.reload()

            }
        } catch (error) {
            var errorMess = new Error('Error ' + error.response.status + ': failed to add address');
            error.response && dispatch(profileFailed(errorMess.message));
        }
    }
}

export const deleteAddress = (address) => {
    return async (dispatch) => {
        dispatch(profileLoading(true));
        try {
            const token = localStorage.getItem('user_token');
            if (token) {

                await post(`${baseUrl}/profile/delete/address`, address, true, true);
                window.location.reload()

            }
        } catch (error) {
            var errorMess = new Error('Error ' + error.response.status + ': failed to delete address');
            error.response && dispatch(profileFailed(errorMess.message));
        }
    }
}

export const addPhoneNumber = (phone) => {
    return async (dispatch) => {
        dispatch(profileLoading(true));
        try {
            const token = localStorage.getItem('user_token');
            if (token) {

                await post(`${baseUrl}/profile/phoneNumber`, phone, true, true);
                window.location.reload()
            }
        } catch (error) {
            var errorMess = new Error('Error ' + error.response.status + ': failed to add phone number');
            error.response && dispatch(profileFailed(errorMess.message));
        }
    }
}

export const deletePhoneNumber = (phone) => {
    return async (dispatch) => {
        dispatch(profileLoading(true));
        try {
            const token = localStorage.getItem('user_token');
            if (token) {

                await post(`${baseUrl}/profile/delete/phoneNumber`, phone, true, true);
                window.location.reload()
            }
        } catch (error) {
            var errorMess = new Error('Error ' + error.response.status + ': failed to delete phone number');
            error.response && dispatch(profileFailed(errorMess.message));
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
