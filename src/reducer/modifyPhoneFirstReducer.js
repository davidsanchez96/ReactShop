import * as types from '../utils/actionTypes';
import Immutable from 'immutable';
import UUID from 'uuid-js';

const initialState = Immutable.fromJS({
    loading: false,
    isSuccess: false,
    smsReFlag: false,
});

export default function modifyPhoneFirstReducer(state = initialState, action) {
    switch (action.type) {
        case types.ModifyPhoneFirstLoading:
            return state.set('loading', true);
        case types.ModifyPhoneFirstCode:
            return state.set('smsVerifyCode', action.data);
        case types.ModifyPhoneFirstSet:
            return state.set('smsReFlag', true);
        case types.ModifyPhoneFirstSuccess:
            return state.set('isSuccess', true);
        case types.ModifyPhoneFirstReset:
            return state.set('isSuccess', false);
        case types.NetError:
            return state.set('loading', false);
        case types.ModifyPhoneFirstClean:
            return initialState;
        default:
            return state;
    }
}
