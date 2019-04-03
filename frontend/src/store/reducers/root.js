import {combineReducers} from 'redux';
import errorReducer from "./reducerError";
import loadingReducer from "./reducerLoading";
import listReducer from "./setList";
import itemReducer from './setItem';
import showReducer from './setShows';
import userReducer from './setUser';

const rootReducer = combineReducers({
    errors: errorReducer,
    loading: loadingReducer,
    lists: listReducer,
    item: itemReducer,
    shows: showReducer,
    user: userReducer
});

export default rootReducer;