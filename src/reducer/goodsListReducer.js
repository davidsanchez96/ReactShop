import * as types from '../utils/actionTypes';

const initialState = {
    loading: true,
    loadingMore:false,
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
}
export default function goodList(state = initialState, action) {
    switch (action.type) {
        case types.GoodsListLoading:
            return {
                ...state,
                loading: true,
            };
            break;
        case types.GoodsListLoaded:
            if (action.page == 0) {
                return {
                    ...state,
                    loading: false,
                    data: action.data,
                    hasMore: action.hasMore,
                    loadingMore: false,
                }
            } else {
                return {
                    ...state,
                    loading: false,
                    data: state.data.concat(action.data),
                    hasMore: action.hasMore,
                    loadingMore: false,
                }
            }

            break;
        case types.NetError:
            return {
                ...state,
                loading: false,
            }
            break;
        case types.GoodsListShow:
            return {
                ...state,
                isTwo: !state.isTwo,
            }
            break;
        case types.GoodsListShowMore:
            return {
                ...state,
                loadingMore: true,
            }
            break;
        default:
            return state;
            break;
    }
}