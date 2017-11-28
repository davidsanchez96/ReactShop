import * as types from '../utils/actionTypes';
import Immutable from 'immutable';

const initialState = Immutable.Map({
    aggregations: {
        cates: [],
        brands: [],
        prices: [],
    },
    selectedValues: {},
    address: {
        province: '10',
        city: '74',
        country: '774',
        region: '江苏南京市雨花台区'
    },
    loading: true,
});

export default function filter(state = initialState, action) {
    switch (action.type) {
        case types.FilterLoading:
            return state.set('loading', true);
        case types.FilterLoaded:
            return state.set('loading', false).set('data', action.data);
        case types.NetError:
            return state.set('loading', false);
        default:
            return state;
    }
}