import * as types from '../utils/actionTypes';
import Immutable from 'immutable';
import UUID from 'uuid-js';

const initialState = Immutable.fromJS({
    loading: false,
    isSuccess: false,
    password:''
});

export default function setPhoneFirstReducer(state = initialState, action) {
    switch (action.type) {
        case types.SetPhoneFirstLoading:
            return state.set('loading', true);
        case types.SetPhoneFirstSet:
            return state.set('password', action.data);
        case types.SetPhoneFirstSuccess:
            return state.set('isSuccess', true).set('loading', false);
        case types.SetPhoneFirstReset:
            return state.set('isSuccess', false).set('loading', false);
        case types.NetError:
            return state.set('loading', false);
        case types.SetPhoneFirstClean:
            return initialState;
        default:
            return state;
    }
}
