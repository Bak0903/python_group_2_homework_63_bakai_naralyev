import {LIST_REQUEST} from "../actions/ListRequest";

const initialState = false;

const movieListReducer = (state = initialState, action) => {
    switch (action.type) {
        case LIST_REQUEST:
            return !state;
        default:
            return state;
    }
};

export default movieListReducer;