import axios from "axios";
import {catchError} from '../statuses/actionError';
import {requestStatus} from '../statuses/actionLoading';


export const postRequest = (url, formData) => {
    return dispatch => {
        dispatch(requestStatus());
        return axios.post(url, formData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Token ' + localStorage.getItem('auth-token')
            }
        }).then(dispatch(requestStatus())
        ).catch(error => {
            dispatch(requestStatus());
            console.log(error);
            console.log(error.response);
            return dispatch(catchError(error.response));
        });
    }
};