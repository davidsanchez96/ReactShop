import * as types from '../utils/actionTypes';

const initialState = {
    loading: true,
    data: [],
    index: 0,

}
export default function category(state = initialState, action) {
    switch (action.type) {
        case types.Loading:
            return {
                ...state,
                loading: true,
            };
            break;
        case types.CategoryLoaded:
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
        case types.CategorySelected:
            return {
                ...state,
                loading: false,
                index: action.index,
            }
            break;
        default:
            return state;
            break;
    }
}