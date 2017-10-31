import * as types from '../utils/actionTypes';

const initialState={
    loading:true,
    data:[],
    index:0,

}
export default function category(state=initialState, action) {
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
        case types.Selected:
            return{
                ...state,
                loading:false,
                index:action.index,
            }
        default:
            return state;
            break;
    }
}