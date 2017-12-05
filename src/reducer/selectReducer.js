import * as types from '../utils/actionTypes';
import Immutable, {OrderedSet} from 'immutable';

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
        case types.SelectLoading:
            return state.set('loading', true);
        case types.SelectType:
            return state.set('brandViewType', action.data);
        case types.SelectLoaded:
            return state.withMutations((state) => {
                state
                    .set('propName', action.data.propName)
                    .set('displayPropName', action.data.displayPropName)
                    .set('selectedValue', OrderedSet(action.data.selectedValue))
                    .set('valueList', action.data.valueList)
                    .set('loading', false);
            });

        case types.NetError:
            return state.set('loading', false);
        default:
            return state;
            break;
    }
}