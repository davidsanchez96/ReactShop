import * as types from '../utils/actionTypes';
import Immutable from 'immutable';
import UUID from 'uuid-js';
import {PayCodeSuccess} from "../utils/actionTypes";

const initialState = Immutable.fromJS({
    loading: false,
    isSuccess: false,
    firstPassword: '',
    nextPassword:'',
});

export default function payPasswordSecondReducer(state = initialState, action) {
    switch (action.type) {
        case types.PayPasswordLoading:
            return state.set('loading', true);
        case types.PayPasswordFirstSet:
            return state.set('firstPassword', action.data);
        case types.PayPasswordSecond:
            return state.set('nextPassword', action.data);
        case types.PayPasswordSuccess:
            return state.set('isSuccess', true).set('loading', false);
        case types.PayPasswordReset:
            return state.set('isSuccess', false);
        case types.NetError:
            return state.set('loading', false);
        case types.PayPasswordSecondClean:
            return initialState;
        default:
            return state;
    }
}
