import * as types from '../utils/actionTypes';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    data: [],
    showData: [],
    loading: true,
});

export default function addressReducer(state = initialState, action) {
    switch (action.type) {
        case types.AddressLoading:
            return state.set('loading', true);
        case types.AddressLoaded:
            return state.set('loading', false).set('data', action.data).set('showData', action.data);
        case types.AddressSelect:
            return state.set('showData', action.data);
        case types.NetError:
            return state.set('loading', false);
        default:
            return state;
    }
}
