import * as types from '../utils/actionTypes';
import Immutable from 'immutable';
const initialState = Immutable.Map({
    loading: true,
    data: [],
    index: 0,

});
export default function category(state = initialState, action) {
    switch (action.type) {
        case types.CategoryLoading:
            return state.set('loading',true);
        case types.CategoryLoaded:
            return state.set('loading',false).set('data',action.data);
        case types.NetError:
            return state.set('loading',false);
        case types.CategorySelected:
            return state.set('loading',false).set('index',action.index);
        default:
            return state;
    }
}
// export default function category(state = initialState, action) {
//     switch (action.type) {
//         case types.CategoryLoading:
//             return {
//                 ...state,
//                 loading: true,
//             };
//             break;
//         case types.CategoryLoaded:
//             return {
//                 ...state,
//                 loading: false,
//                 data: action.data,
//             }
//             break;
//         case types.NetError:
//             return {
//                 ...state,
//                 loading: false,
//             }
//             break;
//         case types.CategorySelected:
//             return {
//                 ...state,
//                 loading: false,
//                 index: action.index,
//             }
//             break;
//         default:
//             return state;
//             break;
//     }
// }