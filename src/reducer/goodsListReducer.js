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
        descending: false,
    },
    searchParam: {
        searchText: ''
    },
    isTwo: true,
});
export default function goodList(state = initialState, action) {
    switch (action.type) {
        case types.GoodsListLoading:
            return state.set('loading',true);
        case types.GoodsListLoaded:
            if (action.page == 0) {
                return state.set('loading',false).set('loadingMore',false)
                    .set('hasMore',action.hasMore).set('data',action.data);
            } else {
                return state.set('loading',false).set('loadingMore',false)
                    .set('hasMore',action.hasMore).set('data',state.get('data').concat((action.data)));
                // return Object.assign({}, state, {
                //     loading: false,
                //     data: state.data.concat(action.data),
                //     hasMore: action.hasMore,
                //     loadingMore: false,
                // })
            }

            break;
        case types.NetError:
            return state.set('loading',false);
        case types.GoodsListShow:
            return state.set('isTwo',!state.get('isTwo'));
        case types.GoodsListShowMore:
            return state.set('loadingMore',true);

        case types.GoodsListSearch:
            let state1= state.set('searchParam',action.searchParam);
            return state1;
        // case types.GoodsListDescending:
        //     state.viewOption.descending = true;
        //     state.viewOption.selectedFilter = 'salesFilter';
        //     return {
        //         ...state,
        //     }
        //     break;
        case types.GoodsListReset:
            return initialState.set('loading',false).set('reloading',true);
            break;
        default:
            return state;
            break;
    }
}