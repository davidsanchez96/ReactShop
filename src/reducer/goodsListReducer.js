import * as types from '../utils/actionTypes';
import Immutable from 'immutable';

const initialState = Immutable.Map({
    loading: true,
    reloading: false,
    loadingMore: false,
    hasMore: false,
    data: [],
    viewOption: {
        bigView: true,
        filterOpen: false,
        selectedFilter: 'typeFilter',
        filterChecked: '综合',
        descending: true,
    },
    searchParam: {
        searchText: ''
    },
    isTwo: true,
});
export default function goodList(state = initialState, action) {
    switch (action.type) {
        case types.GoodsListLoading:
            return state.set('loading', true);
        case types.GoodsListLoaded:
            if (action.page == 0) {
                return state.set('loading', false).set('loadingMore', false)
                    .set('hasMore', action.hasMore).set('data', Immutable.fromJS(action.data));
            } else {
                return state.set('loading', false).set('loadingMore', false)
                    .set('hasMore', action.hasMore).set('data', state.get('data').concat((action.data)));
            }

            break;
        case types.NetError:
            return state.set('loading', false);
        case types.GoodsListShow:
            return state.set('isTwo', !state.get('isTwo'));
        case types.GoodsListNumber:
            return state.updateIn(['data'], list => list.update(action.index,()=> action.item));
        case types.GoodsListShowMore:
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