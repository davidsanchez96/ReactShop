import * as types from '../utils/actionTypes';
import Immutable from 'immutable';
const initialState = Immutable.Map({
    loading: true,
    data: [],

});
export default function suggestion(state = initialState, action) {
    switch (action.type) {
        case types.SuggestionLoading:
            return {
                ...state,
                loading: true,
            };
            break;
        case types.SuggestionLoaded:
            return {
                ...state,
                loading: false,
                data: action.data,
            }
            break;
        case types.NetError:
            return {
                ...state,
                loading: false,
            }
            break;
        default:
            return state;
            break;
    }
}