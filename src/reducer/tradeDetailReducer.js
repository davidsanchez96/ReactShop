import * as types from '../utils/actionTypes';
import Immutable from 'immutable';

const initialState = Immutable.Map({
    loading: true,
    reloading: false,
    loadingMore: false,
    hasMore: false,
    data: [],
    status: '0',
});
export default function tradeDetailReducer(state = initialState, action) {
    switch (action.type) {
        case types.TradeDetailLoading:
            return state.set('loading', true);
        case types.TradeDetailLoaded:
            if (action.page == 0) {
                return state.set('loading', false).set('loadingMore', false)
                    .set('hasMore', action.hasMore).set('data', Immutable.fromJS(action.data));
            } else {
                return state.set('loading', false).set('loadingMore', false)
                    .set('hasMore', action.hasMore).set('data', state.get('data').concat(Immutable.fromJS(action.data)));
            }
        case types.NetError:
            return state.set('loading', false);
         case types.TradeDetailType:
            return state.set('status',action.data);
        case types.TradeDetailShowMore:
            return state.set('loadingMore', true);
        default:
            return state;
    }
}