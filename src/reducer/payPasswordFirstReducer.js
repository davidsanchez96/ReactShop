import * as types from '../utils/actionTypes';
import Immutable from 'immutable';
import UUID from 'uuid-js';
import {PayCodeSuccess} from "../utils/actionTypes";

const initialState = Immutable.fromJS({
    loading: false,
    isSuccess: false,
    smsReFlag: false,
});

export default function payPasswordFirstReducer(state = initialState, action) {
    switch (action.type) {
        case types.PayCodeSet:
            return state.set('smsVerifyCode', action.data);
        case types.GetCodeSet:
            return state.set('smsReFlag', true);
        case types.PayCodeSuccess:
            return state.set('isSuccess', true);
        case types.PayCodeReset:
            return state.set('isSuccess', false);
        case types.NetError:
            return state.set('smsReFlag', false);
        case types.ModifyPasswordFirstClean:
            return initialState;
        default:
            return state;
    }
}
