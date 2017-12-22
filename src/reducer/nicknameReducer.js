import * as types from '../utils/actionTypes';
import Immutable from 'immutable';
import {UserLoaded} from "../utils/actionTypes";

const initialState = Immutable.fromJS({
    loading: false,
    form: {
        nickname: ''
    },
    isSuccess:false,

});
export default function nicknameReducer(state = initialState, action) {
    switch (action.type) {
        case types.NicknameLoading:
            return state.set('loading', true);
        case types.NicknameChange:
            return state.setIn(['form', 'nickname'], action.data);
        case types.NicknameLoaded:
            return state.set('isSuccess', true).set('loading', false);
        case types.NetError:
            return state.set('loading', false);
        default:
            return state;
    }
}