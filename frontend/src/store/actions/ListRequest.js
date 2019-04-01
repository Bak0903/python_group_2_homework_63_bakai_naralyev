import axios from "axios";

export const LIST_REQUEST = "LIST_REQUEST";
export const LIST_SUCCESS = "LIST_SUCCESS";
export const LIST_ERROR = "LIST_ERROR";

export const listRequest = () => {
    return {type: LIST_REQUEST}
};

export const listSuccess = (data) => {
    return {type: LIST_SUCCESS, data}
};

export const listError = (errors) => {
    return {type: LIST_ERROR, errors}
};

export const list = (url) => {
    return dispatch => {
        dispatch(listRequest());
        return axios.get(url).then(response => {
            return dispatch(listSuccess(response.data));
        }).catch(error => {
            console.log(error);
            console.log(error.response);
            return dispatch(listError(error.response.data));
        });
    }
};