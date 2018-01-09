import * as types from '../utils/actionTypes';
import Immutable from 'immutable';
import {OrderDetailLoading} from "../utils/actionTypes";
const initialState = Immutable.fromJS({
    loading: false,
    isSuccess: false,
});
export default function orderCancelReducer(state = initialState, action) {
    switch (action.type) {
        case types.OrderCancelLoading:
            return state.set('loading',true);
        case types.OrderCancelLoaded:
            return state.set('loading',false).set('isSuccess',true);
        case types.OrderCancelClean:
            return initialState;
        case types.NetError:
            return state.set('loading',false);
        default:
            return state;
    }
}