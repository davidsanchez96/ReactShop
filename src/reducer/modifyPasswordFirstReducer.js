import * as types from '../utils/actionTypes';
import Immutable from 'immutable';
import UUID from 'uuid-js';

const initialState = Immutable.fromJS({
    loading: false,
    //帐号
    phone: '',
    //验证码
    captcha: '',
    uuid: UUID.create().toString(),
    nickname: '',
    isSuccess: false,
    smsReFlag: false,
});

export default function modifyPasswordFirstReducer(state = initialState, action) {
    switch (action.type) {
        case types.CodeSet:
            return state.set('smsVerifyCode', action.data);
        case types.GetCodeSet:
            return state.set('smsReFlag', true);
        case types.VerifyCodeSuccess:
            return state.set('isSuccess', true);
        case types.VerifyCodeReset:
            return state.set('isSuccess', false);
        case types.NetError:
            return state.set('smsReFlag', false);
        case types.ModifyPasswordFirstClean:
            return initialState;
        default:
            return state;
    }
}
