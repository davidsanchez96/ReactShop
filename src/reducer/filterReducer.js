import * as types from '../utils/actionTypes';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    aggregations: {
        cates: [],
        brands: [],
        prices: [],
    },
    selectedValues: [],
    address: {
        province: '10',
        city: '74',
        country: '774',
        region: '江苏南京市雨花台区'
    },
    loading: true,
});

export default function filterReducer(state = initialState, action) {
    switch (action.type) {
        case types.FilterLoading:
            return state.set('loading', true);
        case types.FilterLoaded:
            let newState = state;
            for (aggKey in action.data) {
                if (aggKey == 'params') {
                    const formattedAggs = _formatParamAggregations(action.data[aggKey]);
                    for (paramAggKey in formattedAggs) {
                        newState = newState.setIn(['aggregations', paramAggKey], Immutable.fromJS(formattedAggs[paramAggKey]));
                    }
                }
                else {
                    newState = newState.setIn(['aggregations', aggKey], action.data[aggKey]);
                }
            }


            return newState.set('loading', false);
        case types.NetError:
            return state.set('loading', false);
        case types.FilterType:
            if (state.get('selectedValues').includes(action.data)) {
                return state.update('selectedValues', list => list.delete(
                    state.get('selectedValues').findIndex((item) => item === action.data)
                ));
            } else {
                return state.update('selectedValues', list => list.push(action.data));
            }

        case types.FilterAddress:
            const {
                provinceId,
                provinceName,
                cityId,
                cityName,
                districtId,
                districtName
            } = action.data;

            return state.withMutations((state) => {
                state
                    .setIn(['address', 'province'], provinceId + '')
                    .setIn(['address', 'city'], cityId + '')
                    .setIn(['address', 'country'], districtId + '')
                    .setIn(['address', 'region'], provinceName + cityName + districtName);
            });
        default:
            return state;
    }
}

/**
 * 格式化数组
 * @param paramAggregations
 * @private
 */
function _formatParamAggregations(paramAggregations) {
    var formattedAggs = {};
    if (!paramAggregations) {
        return formattedAggs;
    }

    paramAggregations.map((v) => {
        const key = v['key'];

        if (key == '价格') {
            return;
        }

        const children = v['childs'];
        if (!children || children.length == 0) {
            return;
        }

        var valueList = [];
        children.map((child) => {
            valueList.push({'key': child['key'], 'count': child['count']});
        });

        formattedAggs[key] = valueList;
    });

    return formattedAggs;
}