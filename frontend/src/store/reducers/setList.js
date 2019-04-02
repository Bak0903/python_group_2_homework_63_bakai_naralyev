import {LIST_SUCCESS} from "../actions/ListRequest";

const initialState = {
    movies: {},
    halls: {}
};

const listReducer = (state = initialState, action) => {
    switch (action.type) {
        case LIST_SUCCESS:
            if (action.url === 'halls') return {...state, halls: action.data};
            else if (action.url === 'movies') return {...state,  movies: action.data};
            else return null;
        default:
            return state;
    }
};

export default listReducer;