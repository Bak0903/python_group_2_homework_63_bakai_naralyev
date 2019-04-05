import {SUCCESS_LOGIN} from "../actions/statuses/successLogin";
import {SUCCESS_EDIT} from "../actions/statuses/successEdit";
import {LOGOUT} from "../actions/logout";
import {TOKEN_LOGIN} from "../actions/statuses/successTokenLogin";

const initialState = {};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUCCESS_LOGIN:
            return action.data;
        case SUCCESS_EDIT:
            return action.data;
        case TOKEN_LOGIN:
            return action.data;
        case LOGOUT:
            return {};
        default:
            return state;
    }
};

export default userReducer;