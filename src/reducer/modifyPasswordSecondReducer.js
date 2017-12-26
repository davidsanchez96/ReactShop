import * as types from '../utils/actionTypes';
import Immutable from 'immutable';
import UUID from 'uuid-js';
import {PasswordSetCode} from "../utils/actionTypes";

const initialState = Immutable.fromJS({
    loading: false,
    //密码
    password: '',
    //是否显示密码
    isHide: true,
    isSuccess:false,
});

export default function modifyPasswordSecondReducer(state = initialState, action) {
    switch (action.type) {
        case types.PasswordSetLoading:
            return state.set('loading', true).set('isSuccess', false);
        case types.PasswordSetCode:
            return state.set('password', action.data);
        case types.PasswordSet:
            return state.set('loading', false).set('isSuccess', true);
        case types.PasswordShow:
            return state.set('isHide', !state.get('isHide'));
        case types.NetError:
            return state.set('loading', false);
        case types.ModifyPasswordSecondClean:
            return initialState;
        default:
            return state;
    }
}
