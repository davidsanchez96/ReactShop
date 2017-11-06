import * as types from '../utils/actionTypes';

const initialState={
    loading:true,
    data:{
        "sliders": [],
        "floors": [],
    },

}
export default function main(state=initialState, action) {
    switch (action.type) {
        case types.Loading:
            return {
                ...state,
                loading:true,
            };
            break;
        case types.Loaded:
            return {
                ...state,
                loading:false,
                data:action.data,
            }
            break;
        case types.NetError:
            return {
                ...state,
                loading:false,
            }
        default:
            return state;
            break;
    }
}