import * as types from '../utils/actionTypes';
import Immutable from 'immutable';
import {OrderDetailLoading} from "../utils/actionTypes";

const initialState = Immutable.fromJS({
    loading: true,
    //订单详情
    orderGoods: [],
    isLoading: true,
    //图片url
    picMaps: new Map(),
    //每个商品晒图数目
    imageNum: 5

});
export default function commentDetailReducer(state = initialState, action) {
    switch (action.type) {
        case types.CommentDetailLoading:
            return state.set('loading', true);
        case types.CommentDetailLoaded:
            return state.withMutations((cursor) => {
                cursor.set('orderGoods', action.data);
                cursor.set('loading', false);
                cursor.set('picMaps', action.map);
            });
        case types.CommentDetailScore:
            return state.set('picMaps', action.data);
        case types.CommentDetailContent:
            return state.set('status', action.status);
        case types.OrderDetailClean:
            return initialState;
        case types.NetError:
            return state.set('loading', false);
        default:
            return state;
    }
}