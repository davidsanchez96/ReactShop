import * as types from '../utils/actionTypes';
import Immutable, {OrderedSet} from 'immutable';

const initialState = Immutable.fromJS({
    loading: true,
    data: [],
    propName: null,
    displayPropName: null,
    singleSelect: '',
    selectedValue: {},
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
        case types.SelectSingle:
            if (action.data == undefined || action.data == null) {
                return state.update('selectedValue', (selectedValue) => {
                    return selectedValue.clear();
                });

            }

            return state.update('selectedValue', (selectedValue) => {
                return selectedValue.clear().set(action.data, 1);
            });
        case types.SelectMultiple:
            if(action.has){
                return state.update('selectedValue', (selectedValue) => {
                    return selectedValue.delete(action.data);
                });
            }else {
                return state.update('selectedValue', (selectedValue) => {
                    return selectedValue.set(action.data, 1);
                });
            }


        case types.SelectLoaded:
            return state.withMutations((state) => {
                if (action.data.selectedValue) {
                    state.setIn(['selectedValue', action.data.selectedValue], 1)
                }
                state
                    .set('propName', action.data.propName)
                    .set('displayPropName', action.data.displayPropName)
                    .set('valueList', action.data.valueList)
                    .set('loading', false);
            });

        case types.NetError:
            return state.set('loading', false);
        case types.SelectClean:
            return initialState;
        default:
            return state;
            break;
    }
}