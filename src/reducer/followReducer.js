import * as types from '../utils/actionTypes';
import Immutable from 'immutable';
import {FollowListLoading} from "../utils/actionTypes";
import {FollowListShowMore} from "../utils/actionTypes";
import {FollowListLoaded} from "../utils/actionTypes";

const initialState = Immutable.Map({
    loading: true,
    reloading: false,
    loadingMore: false,
    hasMore: false,
    data: [],

});
export default function followReducer(state = initialState, action) {
    switch (action.type) {
        case types.FollowListLoading:
            return state.set('loading', true);
        case types.FollowListLoaded:
            if (action.page == 0) {
                return state.set('loading', false).set('loadingMore', false)
                    .set('hasMore', action.hasMore).set('data', Immutable.fromJS(action.data));
            } else {
                return state.set('loading', false).set('loadingMore', false)
                    .set('hasMore', action.hasMore).set('data', state.get('data').concat(Immutable.fromJS(action.data)));
            }
            case types.FollowListDelete:
                return state.withMutations((state)=>{
                    state.set('loading', false);
                    state.set('loadingMore', false);
                    state.deleteIn(['data',action.data],);
                });
        case types.NetError:
            return state.set('loading', false);
        case types.GoodsListShow:
            return state.set('isTwo', !state.get('isTwo'));
        case types.GoodsListNumber:
            return state.updateIn(['data'], list => list.update(action.index,()=> action.item));
        case types.FollowListShowMore:
            return state.set('loadingMore', true);
        case types.GoodsListSearch:
            return state.set('searchParam', action.searchParam);
        case types.GoodsListDescending:
            return state.set('viewOption', Immutable.Map(state.get('viewOption')).merge(action.viewOption));
        case types.GoodsListReset:
            return initialState.set('loading', false).set('reloading', true);
        default:
            return state;
    }
}