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
    imageNum: 5,
    isSuccess: false,

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
        case types.CommentDetailSuccess:
            return state.set('isSuccess', true).set('loading', false);
        case types.CommentDetailClean:
            return initialState;
        case types.NetError:
            return state.set('loading', false);
        default:
            return state;
    }
}