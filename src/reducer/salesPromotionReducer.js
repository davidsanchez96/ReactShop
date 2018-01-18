import * as types from '../utils/actionTypes';
import Immutable, {fromJS} from 'immutable';

const initialState = Immutable.fromJS({
    loading: true,
    marketingList: [],
    checked: false,

});
export default function salesPromotionReducer(state = initialState, action) {
    switch (action.type) {
        case types.SalesPromotionLoading:
            return state.set('loading', true);
        case types.SalesPromotionLoaded:
            return state.withMutations((cursor) => {
                cursor.set('marketingList', fromJS(action.data));
                cursor.set('loading', false);
            });
        case types.SalesPromotionSelect:
            return state.withMutations((cursor) => {
                cursor.set('checked', true);
                // msg.emit('cart:changeMarketing', activeId, shoppingCartId);
            });
        case types.NetError:
            return state.set('loading', false);
        default:
            return state;
    }
}