import * as types from '../utils/actionTypes';

const initialState = {
    loading: true,
    hasMore: 0,
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
    isTwo: false,
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
            if (action.pageNum == 0) {
                return {
                    ...state,
                    loading: false,
                    data: action.data,
                    hasMore: action.hasMore,
                }
            } else {
                return {
                    ...state,
                    loading: false,
                    data: state.data.concat(action.data),
                    hasMore: action.hasMore,
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
                hasMore: 2,
            }
            break;
        default:
            return state;
            break;
    }
}