import {LIST_ERROR} from "../actions/ListRequest";

const initialState = {};

const movieListReducer = (state = initialState, action) => {
    switch (action.type) {
        case LIST_ERROR:
            return action.errors;
        default:
            return state;
    }
};

export default movieListReducer;