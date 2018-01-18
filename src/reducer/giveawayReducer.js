import * as types from '../utils/actionTypes';
import Immutable, {fromJS, List, OrderedSet} from 'immutable';
import {GiveawayLoading} from "../utils/actionTypes";

const initialState = Immutable.fromJS({
    loading: true,
    //赠品查询列表
    presentList: new List,
    //赠品选中列表索引
    presentCheckedIndexList: new OrderedSet([]),
    //赠品选中列表
    presentCheckedList: new List,

    //presentMode 0 全赠,1 赠一种
    presentMode: 0

});
export default function giveawayReducer(state = initialState, action) {
    switch (action.type) {
        case types.GiveawayLoading:
            return state.set('loading', true);
        case types.GiveawayLoaded:
            return state.withMutations((cursor) => {
                cursor.set('loading', false);
                //店铺下标
                cursor.set('store_index', action.store_index);
                //促销下标
                cursor.set('marketing_index', action.marketing_index);
                //赠品集合
                cursor.set('presentList', fromJS(action.data));
                //初始化已选中的
                cursor.set('presentCheckedList', fromJS(action.data).filter(val => val.get('checked') == true));
                //初始化选中index
                cursor.set('presentCheckedIndexList', fromJS(action.data).map((val, index) => {
                    if (val.get('checked') == true) {
                        return index;
                    }
                }).toSet());
                //设置促销赠送方式
                cursor.set('presentMode', fromJS(action.result).get('presentMode'));
            });
        case types.NetError:
            return state.set('loading', false);
        default:
            return state;
    }
}