import {SUCCESS} from "../actions/actionSuccess";

const initialState = {
    movies: {},
    halls: {}
};

const listReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUCCESS:
            if (action.url === 'halls') return {...state, halls: action.data};
            else if (action.url === 'movies') return {...state,  movies: action.data};
            else return state;
        default:
            return state;
    }
};

export default listReducer;