import axios from 'axios';
import {catchError} from '../statuses/actionError';
import {requestStatus} from '../statuses/actionLoading';
import {tokenLogin} from '../statuses/successTokenLogin';

export const tokenLoginRequest = () => {
    return dispatch => {
        dispatch(requestStatus());
        const token = localStorage.getItem('auth-token');
        if (!token) {
            localStorage.removeItem('auth-token');
            dispatch(catchError({'token': "Token does not exist."}));
        }
        return axios.post('token-login/', {token}).then(response => {
            dispatch(requestStatus());
            return dispatch(tokenLogin(response.data));
        }).catch(error => {
            console.log(error);
            console.log(error.response);
            localStorage.removeItem('auth-token');
            return dispatch(catchError(error.response.data));
        });
    }
};