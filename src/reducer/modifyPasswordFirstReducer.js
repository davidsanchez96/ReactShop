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
    nickname:'',
    isSuccess:false,
    smsReFlag: false,
});

export default function modifyPasswordFirstReducer(state = initialState, action) {
    switch (action.type) {
        case types.FindPasswordLoading:
            return state.set('loading', true).set('isSuccess', false);
        case types.FindPasswordCaptcha:
            return state.set('captcha', action.captcha);
        case types.FindPasswordPhone:
            return state.set('phone', action.phone);
        case types.FindPasswordUUID:
            return state.set('uuid', UUID.create().toString());
        case types.FindPasswordLoaded:
            return state.set('loading', false).set('isSuccess', true).set('nickname',action.data);
        case types.NetError:
            return state.set('loading', false);
        case types.FindPasswordClean:
            return initialState;
        default:
            return state;
    }
}
