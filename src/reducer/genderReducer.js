import * as types from '../utils/actionTypes';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    loading: false,
    gender: '0',
    isSuccess: false,

});
export default function genderReducer(state = initialState, action) {
    switch (action.type) {
        case types.GenderLoading:
            return state.set('loading', true);
        case types.GenderChange:
            return state.set('gender', action.data);
        case types.GenderLoaded:
            return state.set('isSuccess', true).set('loading', false);
        case types.GenderClean:
            return initialState;
        case types.NetError:
            return state.set('loading', false);
        default:
            return state;
    }
}