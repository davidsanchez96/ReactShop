import * as types from '../utils/actionTypes';
import Immutable from 'immutable';
import UUID from 'uuid-js';

const initialState = Immutable.fromJS({
    loading: false,
    isSuccess: false,
    smsReFlag: false,
    phone:'',
    smsVerifyCode:''
});

export default function setPhoneSecondReducer(state = initialState, action) {
    switch (action.type) {
        case types.SetPhoneSecondLoading:
            return state.set('loading', true);
        case types.SetPhoneSecondPhone:
            return state.set('phone', action.data);
        case types.SetPhoneSecondCode:
            return state.set('smsVerifyCode', action.data);
        case types.SetPhoneSecondSet:
            return state.set('smsReFlag', true);
        case types.SetPhoneSecondSuccess:
            return state.set('isSuccess', true);
        case types.SetPhoneSecondReset:
            return state.set('isSuccess', false);
        case types.NetError:
            return state.set('loading', false);
        case types.SetPhoneSecondClean:
            return initialState;
        default:
            return state;
    }
}
