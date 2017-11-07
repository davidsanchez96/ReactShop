import * as types from '../utils/actionTypes';

const initialState = {
    loading: true,
    data: {
        "sliders": [],
        "floors": [],
    },
    show: true,
    change: 'rgba(0,0,0,.3)',

}
export default function main(state = initialState, action) {
    switch (action.type) {
        case types.Loading:
            return {
                ...state,
                loading: true,
            };
            break;
        case types.Loaded:
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
        case  types.Show:
            return {
                ...state,
                show: action.show,
            }
            break;
        case  types.Change:
            return {
                ...state,
                change: action.change,
            }
            break;
        default:
            return state;
            break;
    }
}