import {SUCCESS_LOGIN} from "../actions/statuses/successLogin";
import {LOGOUT} from "../actions/logout";

const initialState = {};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUCCESS_LOGIN:
            return action.data;
        case LOGOUT:
            return {};
        default:
            return state;
    }
};

export default userReducer;