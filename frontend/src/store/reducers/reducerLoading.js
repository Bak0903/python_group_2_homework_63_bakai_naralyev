import {REQUEST} from "../actions/statuses/actionLoading";

const initialState = false;

const movieListReducer = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST:
            return !state;
        default:
            return state;
    }
};

export default movieListReducer;