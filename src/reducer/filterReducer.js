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
            for (aggKey in action.data) {
                if (aggKey == 'params') {
                    const formattedAggs = _formatParamAggregations(action.data[aggKey]);
                    for (paramAggKey in formattedAggs) {
                        state.setIn(['aggregations', paramAggKey], Immutable.fromJS(formattedAggs[paramAggKey]));
                    }
                }
                else {
                    state.setIn(['aggregations', aggKey], Immutable.fromJS(action.data[aggKey]));
                }
            }
            return state.set('loading', false);
        case types.NetError:
            return state.set('loading', false);
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

    paramAggregations.map((v)=> {
        const key = v['key'];

        if (key == '价格') {
            return;
        }

        const children = v['childs'];
        if (!children || children.length == 0) {
            return;
        }

        var valueList = [];
        children.map((child)=> {
            valueList.push({'key': child['key'], 'count': child['count']});
        });

        formattedAggs[key] = valueList;
    });

    return formattedAggs;
}