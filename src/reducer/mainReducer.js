import * as types from '../utils/actionTypes';
import Immutable from 'immutable';
const initialState = Immutable.Map({
    loading: true,
    data: {
        "sliders": [],
        "floors": [],
    },
    show: true,
    change: 'rgba(0,0,0,.3)',

});
export default function main(state = initialState, action) {
    switch (action.type) {
        case types.Loading:
            return state.set('loading',true);
        case types.Loaded:
            return state.set('loading',false).set('data',action.data);
        case types.NetError:
            return state.set('loading',false);
        case  types.Show:
            return state.set('show',action.show);
        case  types.Change:
            return state.set('change',action.change);
        default:
            return state;
    }}
// export default function main(state = initialState, action) {
//     switch (action.type) {
//         case types.Loading:
//             return {
//                 ...state,
//                 loading: true,
//             };
//             break;
//         case types.Loaded:
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
//         case  types.Show:
//             return {
//                 ...state,
//                 show: action.show,
//             }
//             break;
//         case  types.Change:
//             return {
//                 ...state,
//                 change: action.change,
//             }
//             break;
//         default:
//             return state;
//             break;
//     }
// }