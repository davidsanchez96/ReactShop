import * as types from '../utils/actionTypes';
import Immutable from 'immutable';

const initialState = Immutable.Map({
    loading: true,
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
})
export default function goodList(state = initialState, action) {
    switch (action.type) {
        case types.GoodsListLoading:
            return state.set('loading',true);
        case types.GoodsListLoaded:
            if (action.page == 0) {
                return Object.assign({}, state, {
                    loading: false,
                    data: action.data,
                    hasMore: action.hasMore,
                    loadingMore: false,
                })
            } else {
                return Object.assign({}, state, {
                    loading: false,
                    data: state.data.concat(action.data),
                    hasMore: action.hasMore,
                    loadingMore: false,
                })
            }

            break;
        case types.NetError:
            return state.set('loading',false);
        case types.GoodsListShow:
            return Object.assign({}, state, {
                isTwo: !state.isTwo,
            })
            break;
        case types.GoodsListShowMore:
            return Object.assign({}, state, {
                loadingMore: true,
            })
            break;
        case types.GoodsListSearch:
            const state1 = JSON.parse(JSON.stringify(state))
            Object.assign(state1.searchParam, action.searchParam);
            return state1;
            break;
        case types.GoodsListDescending:
            state.viewOption.descending = true;
            state.viewOption.selectedFilter = 'salesFilter';
            return {
                ...state,
            }
            break;
        case types.GoodsListReset:
            return initialState;
            break;
        default:
            return state;
            break;
    }
}