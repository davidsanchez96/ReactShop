import * as types from '../utils/actionTypes';
import Immutable from 'immutable';

const initialState = Immutable.Map({
    loading: true,
    loadingMore: false,
    hasMore: false,
    data: [],
    //默认全部评价
    commentsType: '3'
});
export default function commentReducer(state = initialState, action) {
    switch (action.type) {
        case types.CommentLoading:
            return state.set('loading', true);
        case types.CommentLoaded:
            if (action.page == 0) {
                return state.set('loading', false).set('loadingMore', false)
                    .set('hasMore', action.hasMore).set('data',action.data);
            } else {
                return state.set('loading', false).set('loadingMore', false)
                    .set('hasMore', action.hasMore).set('data', state.get('data').concat((action.data)));
            }
        case types.NetError:
            return state.set('loading', false);
        case types.CommentClean:
            return initialState;
        default:
            return state;
    }
}