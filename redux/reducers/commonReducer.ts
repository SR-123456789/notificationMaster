import { Action } from 'redux';
import { SET_DELETE_MODE,CommonActions } from '../actions/commonActions';

// Define action types
// Define the state interface
interface CommonState {
    isDeleteMode: boolean;
}

// Define the initial state
const initialState: CommonState = {
    isDeleteMode: false,
};

// Define the reducer
const commonReducer = (state = initialState, action: CommonActions): CommonState => {
    switch (action.type) {
        case SET_DELETE_MODE:
            return {
                ...state,
                isDeleteMode: action.payload,
            };
        default:
            return state;
    }
};

export default commonReducer;
