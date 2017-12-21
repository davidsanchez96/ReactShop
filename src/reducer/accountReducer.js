import * as types from '../utils/actionTypes';
import Immutable from 'immutable';
import {UserLoaded} from "../utils/actionTypes";
const initialState = Immutable.Map({
    loading: true,
    showDefault: false,

});
export default function accountReducer(state = initialState, action) {
    switch (action.type) {
        case types.SuggestionLoading:
            return state.set('loading',true);
        case types.UserLoaded:
            return state.set('customer', Immutable.fromJS(action.data)).set('loading', false);
        case types.NetError:
            return state.set('loading',false);
        default:
            return state;
            break;
    }
}