import * as types from '../utils/actionTypes';

const initialState={
    loading:true,
    data:{
        "sliders": []
    },

}
export default function main(state=initialState, action) {
    switch (action.type) {
        case types.Loading:
            return state;
            break;
        case types.Loaded:
            return {
                ...state,
                loading:false,
                data:action.data,
            }
            break;
        default:
            return state;
            break;
    }
}