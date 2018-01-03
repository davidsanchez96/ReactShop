import * as types from '../utils/actionTypes';
import Immutable from 'immutable';

const initialState = Immutable.Map({
    loading: true,
    reloading: false,
    loadingMore: false,
    hasMore: false,
    data: [],
    status: '1',
    totalPoint: '',
});
export default function integrationReducer(state = initialState, action) {
    switch (action.type) {
        case types.IntegrationLoading:
            return state.set('loading', true);
        case types.IntegrationLoaded:
            if (action.page == 0) {
                return state.set('loading', false).set('loadingMore', false)
                    .set('hasMore', action.hasMore).set('data', Immutable.fromJS(action.data));
            } else {
                return state.set('loading', false).set('loadingMore', false)
                    .set('hasMore', action.hasMore).set('data', state.get('data').concat(Immutable.fromJS(action.data)));
            }
        case types.NetError:
            return state.set('loading', false);
        case types.IntegrationType:
            return state.set('status', action.data);
        case types.IntegrationTotal:
            return state.set('totalPoint', action.data);
        case types.IntegrationShowMore:
            return state.set('loadingMore', true);
        default:
            return state;
    }
}