import {SUCCESS_LOGIN} from "../actions/statuses/successLogin";
import {SUCCESS_EDIT} from "../actions/statuses/successEdit";
import {LOGOUT} from "../actions/logout";

const initialState = {};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUCCESS_LOGIN:
            console.log(action.data);
            return action.data;
        case SUCCESS_EDIT:
            console.log(action.data);
            return action.data;
        case LOGOUT:
            return {};
        default:
            return state;
    }
};

export default userReducer;