import * as types from '../utils/actionTypes';
import Immutable from 'immutable';
import UUID from 'uuid-js';

const initialState = Immutable.fromJS({
    loading: false,
    isSuccess: false,
    smsReFlag: false,
    newPhone: '',
    time: 60,
});

export default function modifyPhoneSecondReducer(state = initialState, action) {
    switch (action.type) {
        case types.ModifyPhoneSecondLoading:
            return state.set('loading', true);
        case types.ModifyPhoneSecondCode:
            return state.set('smsVerifyCode', action.data);
        case types.ModifyPhoneSecondPhone:
            return state.set('newPhone', action.data);
        case types.ModifyPhoneSecondSet:
            return state.set('smsReFlag', true);
        case types.ModifyPhoneSecondSuccess:
            return state.set('isSuccess', true);
        case types.ModifyPhoneSecondReset:
            return state.set('isSuccess', false);
        case types.NetError:
            return state.set('loading', false);
        case types.ModifyPhoneSecondClean:
            return initialState;
        default:
            return state;
    }
}
