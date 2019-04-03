import axios from "axios";
import {catchError} from '../statuses/actionError';
import {requestStatus} from '../statuses/actionLoading';
import {successRequest} from '../statuses/actionSuccess';



export const getMovie = (url) => {
    return dispatch => {
        dispatch(requestStatus());
        return axios.get(url).then(response => {
            const categories = response.data.genre.map(element => {
                return axios.get('categories/' + element).then(response => {
                    return response.data;
                });
            });
            return Promise.all(categories)
                .then(genre => {
                    const info = {...response.data, categories: [...genre]};
                    dispatch(requestStatus());
                    dispatch(successRequest(info, url));
        })}).catch(error => {
            dispatch(requestStatus());
            console.log(error);
            console.log(error.response);
            return dispatch(catchError(error.response));
        });
    }
};
