import * as types from '../utils/actionTypes';
import Immutable from 'immutable';

const initialState = Immutable.Map({
    loading: true,
    reloading: false,
    loadingMore: false,
    hasMore: false,
    refresh:false,
    data: [],
    orders: [],
    orderSetting: {},
    //默认选中地区
    region: {
        province: '',
        city: '',
        district: '',
        districtId: null
    },
    shoppingCartForm: {
        orderId: '',
        districtId: '',
    },
});
export default function orderListReducer(state = initialState, action) {
    switch (action.type) {
        case types.OrderListLoading:
            return state.set('loading', true).set('refresh', false);
        case types.OrderListLoaded:
            if (action.page === 0) {
                return state.set('loading', false).set('loadingMore', false).set('refresh', false)
                    .set('hasMore', action.hasMore).set('data', Immutable.fromJS(action.data));
            } else {
                return state.set('loading', false).set('loadingMore', false).set('refresh', false)
                    .set('hasMore', action.hasMore).set('data', state.get('data').concat(Immutable.fromJS(action.data)));
            }
        case types.NetError:
            return state.set('loading', false);
        case types.OrderListSetting:
            return state.set('orderSetting', action.data);
        case types.OrderListShowMore:
            return state.set('loadingMore', true).set('refresh', false);
        case types.OrderListStatus:
            return state.set('refresh', true);
        case types.OrderListClean:
            return initialState;
        default:
            return state;
    }
}