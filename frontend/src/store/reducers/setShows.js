import {SUCCESS} from "../actions/actionSuccess";

const initialState = {
    movieShows: {},
    hallShows: {}
};

const showReducer = (state = initialState, action) => {

    switch (action.type) {
        case SUCCESS:
            const url=action.url.substring(0, 10);
            if (url === 'shows/?hal') return {...state, hallShows: action.data};
            else if (url === 'shows/?mov') return {...state,  movieShows: action.data};
            else return state;
        default:
            return state;
    }
};

export default showReducer;