import {combineReducers} from 'redux';
import listReducer from "./list";
import errorReducer from "./reducerError";
import loadingReducer from "./reducerLoading";

const rootReducer = combineReducers({
    lists: listReducer,
    errors: errorReducer,
    loading: loadingReducer
});

export default rootReducer;