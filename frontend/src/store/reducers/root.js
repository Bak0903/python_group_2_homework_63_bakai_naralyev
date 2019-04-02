import {combineReducers} from 'redux';
import listReducer from "./list";
import errorReducer from "./errors";
import loadingReducer from "./loading";

const rootReducer = combineReducers({
    lists: listReducer,
    errors: errorReducer,
    loading: loadingReducer
});

export default rootReducer;