import * as types from '../utils/actionTypes';
import Immutable, {fromJS} from 'immutable';

const initialState = Immutable.fromJS({
    form: {
        id: '',
        name: '',
        mobile: '',
        province: '',
        city: '',
        country: '',
        detail: '',
        defaultAddress: false
    },
    region: '',
    loading: false,
    isSuccess: false,
});

export default function addAddressReducer(state = initialState, action) {
    switch (action.type) {
        case types.AddAddressLoading:
            return state.set('loading', true);
        case types.AddAddressLoaded:
            return state.set('isSuccess', true).set('loading', false);
        case types.AddressValue:
            return state.setIn(['form', action.field], action.value);
        case types.AddAddressGet:
            const {provinceName, cityName, districtName, ...form} = action.data;
            return  state.withMutations((cursor) => {
                cursor
                    .set('form', fromJS(form))
                    .set('loading', false)
                    .set('region', provinceName + cityName + districtName);
            });

        case types.AddAddressSelect:
            const {
                provinceId,
                cityId,
                districtId,
            } = action.data;
            return state.withMutations((cursor) => {
                //FIXED: required校验规则
                cursor
                    .setIn(['form', 'province'], provinceId + '')
                    .setIn(['form', 'city'], cityId + '')
                    .setIn(['form', 'country'], districtId + '')
                    .set('region', action.data.provinceName + action.data.cityName + action.data.districtName);
            });
        case types.NetError:
            return state.set('loading', false);
        case types.AddAddressClean:
            return initialState;
        default:
            return state;
    }
}
