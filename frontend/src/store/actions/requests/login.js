import axios from "axios";
import {catchError} from '../statuses/actionError';
import {requestStatus} from '../statuses/actionLoading';
import {successLogin} from '../statuses/successLogin';


export const login = (url, loginData) => {
    return dispatch => {
        dispatch(requestStatus());
        return axios.post(url, loginData).then(response => {
            dispatch(requestStatus());
            localStorage.setItem('auth-token', response.data.token);
            return dispatch(successLogin(response.data));
        }).catch(error => {
            dispatch(requestStatus());
            console.log(error);
            console.log(error.response);
            return dispatch(catchError(error.response.data));
        });
    }
};