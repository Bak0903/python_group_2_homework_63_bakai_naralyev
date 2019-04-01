import {LIST_ERROR, LIST_REQUEST, LIST_SUCCESS} from "./actions/ListRequest";


const initialState = {
    loading: false,
    errors: {},
    login: {

    },
    register: {

    },
    hallList: {
    },
    movieList: {

    },
    movieDetail: {

    },
    movieAdd: {

    },
    movieEdit: {

    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LIST_REQUEST:
            return {...state, hallList: {}, errors: {}, loading: true};
        case LIST_SUCCESS:
            if (action.url === 'halls')
                {return {...state, hallList: action.data, errors: {}, loading: false};}
            else if (action.url === 'movies')
                {return {...state,  movieList: action.data, errors: {}, loading: false};}
            else return null;
        case LIST_ERROR:
            return {...state, hallList: {}, errors: action.errors, loading: false};
        default:
            return state;
    }
};

export default reducer;