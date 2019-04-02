import axios from "axios";
import {catchError} from './actionError';
import {requestStatus} from './actionLoading';

export const LIST_SUCCESS = "LIST_SUCCESS";

export const listSuccess = (data, url) => {
    return {type: LIST_SUCCESS, data, url}
};

export const list = (url) => {
    return dispatch => {
        dispatch(requestStatus());
        return axios.get(url + '/').then(response => {
            dispatch(requestStatus());
            return dispatch(listSuccess(response.data, url));
        }).catch(error => {
            dispatch(requestStatus());
            console.log(error);
            console.log(error.response);
            return dispatch(catchError(error.response.data));
        });
    }
};
