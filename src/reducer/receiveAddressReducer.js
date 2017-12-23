import * as types from '../utils/actionTypes';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    loading: true,
    addrList: [],
});
export default function receiveAddressReducer(state = initialState, action) {
    switch (action.type) {
        case types.ReceiveAddressLoading:
            return state.set('loading', true);
        case types.ReceiveAddressLoaded:
            return state.withMutations((state)=>{
                state.set('loading', false);
                state.set('addrList', Immutable.fromJS(action.data));
            });
        case types.NetError:
            return state.set('loading', false);
        default:
            return state;
    }
}