import * as types from '../utils/actionTypes';
import Immutable, {OrderedSet} from 'immutable';
import Toast from 'react-native-root-toast';


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
            if (action.data === undefined || action.data === null) {
                return state.update('selectedValue', (selectedValue) => {
                    return selectedValue.clear();
                });
            }
            return state.update('selectedValue', (selectedValue) => {
                return selectedValue.clear().set(action.data, 1);
            });
        case types.SelectMultiple:
            if (action.data === undefined || action.data === null) {
                return state.update('selectedValue', (selectedValue) => {
                    return selectedValue.clear();
                });
            }
            if (action.has) {
                return state.update('selectedValue', (selectedValue) => {
                    return selectedValue.delete(action.data);
                });
            } else if (state.get('selectedValue').size >= 5) {
                Toast.show('最多选择5个哦~');
                return state;
            } else {
                return state.update('selectedValue', (selectedValue) => {
                    return selectedValue.set(action.data, 1);
                });
            }
        case types.SelectBrand:
            if (action.data === undefined || action.data === null) {
                return state.update('sortBrandSelected', (selectedValue) => {
                    return selectedValue.clear();
                });
            }
            if (action.has) {
                return state.update('sortBrandSelected', (selectedValue) => {
                    return selectedValue.delete(action.data);
                });
            } else if (state.get('sortBrandSelected').size >= 5) {
                Toast.show('最多选择5个哦~');
                return state;
            } else {
                return state.update('sortBrandSelected', (selectedValue) => {
                    return selectedValue.add(action.data);
                });
            }


        case types.SelectLoaded:
            return state.withMutations((state) => {
                if (action.data.selectedValue) {
                    for (let i = 0; i < action.data.selectedValue.length; i++) {
                        if(action.data.selectedValue[i]){
                            state.setIn(['selectedValue', action.data.selectedValue[i]], 1);
                            state.update('sortBrandSelected', (selectedValue) => {
                                return selectedValue.add(action.data.selectedValue[i]);
                            });
                        }
                    }

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
    }
}