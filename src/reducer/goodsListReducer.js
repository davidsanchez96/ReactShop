import * as types from '../utils/actionTypes';

const initialState = {
    loading: true,
    data: [],

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
            return {
                ...state,
                loading: false,
                data: action.data,
            }
            break;
        case types.NetError:
            return {
                ...state,
                loading: false,
            }
            break;
        default:
            return state;
            break;
    }
}