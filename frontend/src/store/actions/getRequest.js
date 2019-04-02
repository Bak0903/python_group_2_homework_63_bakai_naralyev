import axios from "axios";
import {catchError} from './actionError';
import {requestStatus} from './actionLoading';
import {successRequest} from './actionSuccess';


export const request = (url) => {
    return dispatch => {
        dispatch(requestStatus());
        return axios.get(url).then(response => {
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

export const deleteRequest = (url) => {
    return dispatch => {
        dispatch(requestStatus());
        return axios.delete(url, {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('auth-token')
            }
        }).then(this.props.history.push('/halls/'))
        .catch(error => {
            dispatch(requestStatus());
            console.log(error);
            console.log(error.response);
            return dispatch(catchError(error.response));
        });
    }
};
