import * as types from '../utils/actionTypes';
import Immutable from 'immutable';
import UUID from 'uuid-js';

const initialState = Immutable.fromJS({
    loading: false,
    // 短信验证码
    smsVerifyCode: '',
    isSuccess:false,
});

export default function findPasswordSecondReducer(state = initialState, action) {
    switch (action.type) {
        case types.VerifyPasswordLoading:
            return state.set('loading', true).set('isSuccess', false);
        case types.VerifyPasswordCode:
            return state.set('smsVerifyCode', action.data);
        case types.VerifyPasswordLoaded:
            return state.set('loading', false).set('isSuccess', true);
        case types.NetError:
            return state.set('loading', false);
        case types.FindPasswordClean:
            return initialState;
        default:
            return state;
    }
}
