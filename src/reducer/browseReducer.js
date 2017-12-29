import * as types from '../utils/actionTypes';
import Immutable from 'immutable';
import {FollowListLoading} from "../utils/actionTypes";
import {FollowListShowMore} from "../utils/actionTypes";
import {FollowListLoaded} from "../utils/actionTypes";
import {BrowseListLoading} from "../utils/actionTypes";

const initialState = Immutable.Map({
    loading: true,
    reloading: false,
    loadingMore: false,
    hasMore: false,
    data: [],

});
export default function browseReducer(state = initialState, action) {
    switch (action.type) {
        case types.BrowseListLoading:
            return state.set('loading', true);
        case types.BrowseListLoaded:
            if (action.page === 0) {
                return state.set('loading', false).set('loadingMore', false)
                    .set('hasMore', action.hasMore).set('data', Immutable.fromJS(action.data));
            } else {
                return state.set('loading', false).set('loadingMore', false)
                    .set('hasMore', action.hasMore).set('data', state.get('data').concat(Immutable.fromJS(action.data)));
            }
        case types.BrowseListDelete:
            return state.withMutations((state) => {
                state.set('loading', false);
                state.set('loadingMore', false);
                state.deleteIn(['data', action.data],);
            });
        case types.BrowseListClean:
            return state.set('data', []).set('loading', false);
         case types.NetError:
            return state.set('loading', false);
        case types.BrowseListShowMore:
            return state.set('loadingMore', true);
        case types.GoodsListReset:
            return initialState.set('loading', false).set('reloading', true);
        default:
            return state;
    }
}