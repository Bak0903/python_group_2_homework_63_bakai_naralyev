import {CATCHERROR} from "../actions/statuses/actionError";

const initialState = {};

const movieListReducer = (state = initialState, action) => {
    switch (action.type) {
        case CATCHERROR:
            if (action.errors)
                return action.errors;
            else
                return null;
        default:
            return state;
    }
};

export default movieListReducer;