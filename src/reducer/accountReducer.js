import * as types from '../utils/actionTypes';
import Immutable from 'immutable';
import {UserLoaded} from "../utils/actionTypes";
import {UserLoading} from "../utils/actionTypes";

const initialState = Immutable.Map({
    loading: true,
    showDefault: false,

});
export default function accountReducer(state = initialState, action) {
    switch (action.type) {
        case types.UserLoading:
            return state.set('loading', true);
        case types.UserLoaded:
            return state.set('customer', Immutable.fromJS(action.data)).set('loading', false);
        case types.NicknameSet:
            return state.setIn(['customer', 'nickname'], action.data);
        case types.GenderSet:
            return state.setIn(['customer', 'gender'], action.data);
        case types.BirthdaySet:
            return state.setIn(['customer', 'birthday'], action.data);
        case types.NetError:
            return state.set('loading', false);
        default:
            return state;
    }
}