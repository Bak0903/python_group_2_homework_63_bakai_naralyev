import axios from "axios";
import {catchError} from '../statuses/actionError';
import {requestStatus} from '../statuses/actionLoading';
import {successRequest} from '../statuses/actionSuccess';


export const login = (url, loginData) => {
    return dispatch => {
        dispatch(requestStatus());
        return axios.post(url, loginData).then(response => {
            dispatch(requestStatus());
            localStorage.setItem('auth-token', response.data.token);
            return dispatch(successRequest(response.data));
        }).catch(error => {
            dispatch(requestStatus());
            console.log(error);
            console.log(error.response);
            return dispatch(catchError(error.response));
        });
    }
};