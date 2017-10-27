import * as types from '../utils/actionTypes';

const initialState={
    loading:true,
    data:[]

}
export default function category(state=initialState, action) {
    switch (action.type) {
        case types.Loading:
            return state;
            break;
        case types.Loaded:
            return {
                loading:false,
                data:action.data,
            }
            break;
        default:
            return state;
            break;
    }
}