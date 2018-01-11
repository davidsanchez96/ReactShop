import * as types from '../utils/actionTypes';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    loading: true,
    status: undefined,
    //订单详情
    orderDetail : [],
    orderSetting: {},
    isLoading: true,
    evaluateFlag : undefined,//是否评价 0:未评价 1:已评价

});
export default function orderDetailReducer(state = initialState, action) {
    switch (action.type) {
        case types.OrderDetailLoading:
            return state.set('loading',true);
        case types.OrderDetailLoaded:
            return state.set('loading',false).set('orderDetail',Immutable.fromJS(action.data));
        case types.OrderDetailSetting:
            return state.set('orderSetting', action.data).set('status',action.status);
        case types.OrderDetailStatus:
            return state.set('status',action.status);
        case types.OrderDetailClean:
            return initialState;
        case types.NetError:
            return state.set('loading',false);
        default:
            return state;
    }
}