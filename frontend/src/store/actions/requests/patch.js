import axios from "axios";
import {catchError} from '../statuses/actionError';
import {requestStatus} from '../statuses/actionLoading';
import {successRequest} from "../statuses/actionSuccess";


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
            return dispatch(successRequest(response.data, url));
        }).catch(error => {
            dispatch(requestStatus());
            console.log(error);
            console.log(error.response);
            return dispatch(catchError(error.response));
        });
    }
};