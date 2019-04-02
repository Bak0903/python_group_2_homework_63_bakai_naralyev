import {SUCCESS} from "../actions/actionSuccess";

const initialState = {
    movie: {},
    hall: {}
};

const itemReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUCCESS:
            console.log(action.url);
            const url = action.url.substring(0, 4);
            if (url === 'hall') return {...state, hall: action.data};
            else if (url === 'movi') return {...state,  movie: action.data};
            else return state;
        default:
            return state;
    }
};

export default itemReducer;