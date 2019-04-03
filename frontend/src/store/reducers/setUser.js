import {SUCCESS} from "../actions/statuses/actionSuccess";

const initialState = {};

const itemReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUCCESS:
            return action.data;
        default:
            return state;
    }
};

export default itemReducer;