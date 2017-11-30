import * as types from '../utils/actionTypes';
import Immutable,{OrderedSet} from 'immutable';
const initialState = Immutable.fromJS({
    loading: true,
    data: [],
    propName: null,
    displayPropName: null,
    selectedValue: OrderedSet(),
    valueList: [],
    brandViewType: 'recommend',
    sortBrandSelected: OrderedSet(),
});
export default function selectReducer(state = initialState, action) {
    switch (action.type) {
        case types.SuggestionLoading:
            return state.set('loading',true);
        case types.SuggestionLoaded:
            return state.set('loading',false).set('data',action.data);
        case types.NetError:
            return state.set('loading',false);
        default:
            return state;
            break;
    }
}