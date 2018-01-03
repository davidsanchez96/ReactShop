import * as types from '../utils/actionTypes';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    loading: true,
    coupons: {
        total: 0,
        data: []
    },
    couponsUsed: {
        total: 0,
        data: []
    },
    couponsExpired: {
        total: 0,
        data: []
    },
});
export default function couponReducer(state = initialState, action) {
    switch (action.type) {
        case types.CouponLoading:
            return state.set('loading', true);
        case types.CouponLoaded:
            return state.set('loading', false).set('coupons', Immutable.fromJS(action.data));
        case types.NetError:
            return state.set('loading', false);
        default:
            return state;
    }
}