import * as types from '../utils/actionTypes';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    loading: false,
    user: '',
    password: '',
    isSuccess: false,
    isHide: true, // 密码隐藏按钮标记
});

export default function loginReducer(state = initialState, action) {
    switch (action.type) {
        case types.LoginLoading:
            return state.set('loading', true);
        case types.LoginPassword:
            return state.set('password', action.password);
        case types.LoginUser:
            return state.set('user', action.user);
        case types.LoginPass:
            return state.set('isHide', !state.get('isHide'));
        case types.LoginLoaded:
            return state.set('loading', false).set('isSuccess', true);
        case types.NetError:
            return state.set('loading', false);
        case types.LoginClean:
            return initialState;
        default:
            return state;
    }
}
