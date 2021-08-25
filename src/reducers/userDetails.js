import { FETCH_DATA, CREATE, DELETE } from "../constants/actionType"

const State = (state = { isLoading: true, data: [] }, action) => {
    switch (action.type) {
        case 'START_LOADING':
            return { ...state, isLoading: true };
        case 'END_LOADING':
            return { ...state, isLoading: false };

        case FETCH_DATA:
            return { ...state, data: action.payload };

        case DELETE:
            return state.filter((s) => s._id !== action.payload);

        case CREATE:
            return { ...state, data: [...state.data, action.payload] };
        default:
            return state;
    }
};

export default State