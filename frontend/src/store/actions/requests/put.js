import axios from "axios";
import {catchError} from '../statuses/actionError';
import {requestStatus} from '../statuses/actionLoading';


export const putRequest = (url, formData) => {
    return dispatch => {
        dispatch(requestStatus());
        return axios.put(url, formData, {
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