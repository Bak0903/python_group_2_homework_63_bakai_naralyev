import {LIST_ERROR, LIST_REQUEST, LIST_SUCCESS} from "./actions/ListRequest";


const initialState = {
    login: {

    },
    register: {

    },
    hallList: {
        list: {},
        loading: false,
        errors: {}
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
            return {...state, hallList: {...state.hallList, list: {}, errors: {}, loading: true}};
        case LIST_SUCCESS:
            return {...state, hallList: {...state.hallList, list: action.data, errors: {}, loading: false}};
        case LIST_ERROR:
            return {...state, hallList: {...state.hallList, list: {}, errors: action.errors, loading: false}};
        default:
            return state;
    }
};

export default reducer;