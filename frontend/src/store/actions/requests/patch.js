import axios from "axios";
import {catchError} from '../statuses/actionError';
import {requestStatus} from '../statuses/actionLoading';
import {successEdit} from "../statuses/successEdit";


export const update = (url, formData) => {
    return dispatch => {
        dispatch(requestStatus());
        return axios.patch(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Token ' + localStorage.getItem('auth-token')
            }
        }).then(response => {
            dispatch(requestStatus());
            return dispatch(successEdit(response.data));
        }).catch(error => {
            dispatch(requestStatus());
            console.log(error);
            console.log(error.response);
            return dispatch(catchError(error.response));
        });
    }
};