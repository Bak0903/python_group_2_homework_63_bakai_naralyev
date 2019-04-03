import axios from "axios";
import {login} from './login';
import {catchError} from '../statuses/actionError';
import {requestStatus} from '../statuses/actionLoading';
import {successRequest} from '../statuses/actionSuccess';


export const register = (url, registerData) => {
    return dispatch => {
        dispatch(requestStatus());
        return axios.post(url, registerData).then(response => {
            dispatch(requestStatus());
            dispatch(login(registerData.username, registerData.password));
            return dispatch(successRequest(response.data));
        }).catch(error => {
            dispatch(requestStatus());
            console.log(error);
            console.log(error.response);
            return dispatch(catchError(error.response));
        });
    }
};