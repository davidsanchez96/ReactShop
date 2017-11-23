import * as types from '../utils/actionTypes';
import Immutable from 'immutable';
const initialState = Immutable.Map({
    loading: true,
    data: [],

});
export default function suggestion(state = initialState, action) {
    switch (action.type) {
        case types.SuggestionLoading:
            return state.set('loading',true);
        case types.SuggestionLoaded:
            return state.set('loading',false).set('data',action.data);
        case types.NetError:
            return state.set('loading',false);
        default:
            return state;
            break;
    }
}