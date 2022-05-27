import axios from 'axios';
import * as ActionTypes from '../ActionTypes';
import { baseUrl } from '../baseUrl';
import { history } from '../../components/MainComponent';
import { get } from '../api';


export const initiateLogin = (username, password) => {
    return async (dispatch) => {

        dispatch(userLoading(true));

        try {
            const result = await axios.post(`${baseUrl}/login`, {
                username,
                password
            });
            const token = result.data;
            localStorage.setItem('user_token', token.jwt);
            dispatch(fetchUser());

            history.push('/home');
        } catch (error) {
            var errorMess = new Error('Error ' + error.response.status + ': username/password is wrong');
            error.response && dispatch(userFailed(errorMess.message));
        }
    };
};

export const fetchUser = () => {
    return async (dispatch) => {
        dispatch(userLoading(true));
        try {
            const token = localStorage.getItem('user_token');
            if (token) {
                const user = await get(`${baseUrl}/user/role`, true, true);
                console.log('fetch user', user)
                if (user.data.student !== null) {
                    dispatch(addUser(user.data.student));
                } else if (user.data.teacher !== null) {
                    dispatch(addUser(user.data.teacher));
                } else {
                    dispatch(addUser(user.data.teacherLeader));
                }

            }
        } catch (error) {
            var errorMess = new Error('Error ' + error.response.status + ': failed to load user');
            error.response && dispatch(userFailed(errorMess.message));
        }
    }

}

export const initiateLogout = () => {
    return async (dispatch) => {
        dispatch(userLoading(true));
        try {
            localStorage.removeItem('user_token');
            history.push('/');
            return dispatch(signOut());
        } catch (error) {
            var errorMess = new Error('Error ' + error.response.status + ': failed to logout');
            error.response && dispatch(userFailed(errorMess.message));
        }
    }
}

export const registerNewUser = (data) => {
    return async (dispatch) => {
        dispatch(userLoading(true));
        try {
            await axios.post(`${baseUrl}/createUser`, data);
            localStorage.setItem('user', JSON.stringify(data));
            history.push('/createProfile');
        } catch (error) {
            error.response && dispatch(userFailed(error.response.data.message));
            
        }
    }
}

export const fetchAllStudents = () => {
    return async (dispatch) => {
        dispatch(studentUserLoading(true));
        try {
            const token = localStorage.getItem('user_token');
            if (token) {
                const allStudents = await get(`${baseUrl}/student`, true, true);

                dispatch(addStudentUser(allStudents.data));
            }
        } catch (error) {
            var errorMess = new Error('Error ' + error.response.status + ': failed to get students ');
            error.response && dispatch(studentUserFailed(errorMess));
        }
    };
}

export const fetchAllTeachers = () => {
    return async (dispatch) => {
        dispatch(teacherUserLoading(true));
        try {
            const token = localStorage.getItem('user_token');
            if (token) {
                const allTeachers = await get(`${baseUrl}/teacher`, true, true);

                dispatch(addTeacherUser(allTeachers.data));
            }
        } catch (error) {
            var errorMess = new Error('Error ' + error.response.status + ': failed to get teacher ');
            error.response && dispatch(teacherUserFailed(errorMess));
        }
    };
}

export const fetchAllLeaders = () => {
    return async (dispatch) => {
        dispatch(leaderUserLoading());
        try {
            const token = localStorage.getItem('user_token');
            if (token) {
                const allLeaders = await get(`${baseUrl}/teacherLeader`, true, true);

                dispatch(addLeaderUser(allLeaders.data));
            }
        } catch (error) {
            var errorMess = new Error('Error ' + error.response.status + ': failed to get leaders ');
            error.response && dispatch(leaderUserFailed(errorMess));
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