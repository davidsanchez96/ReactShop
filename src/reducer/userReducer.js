import * as types from '../utils/actionTypes';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    loading: false,
    customer: {},
    follows: {},
    browserecord: {},
    isLogin: false,
    orderCounts: {},
    message: 0,
    point: {},
    guessUserLikeVisible: false,
    guessUserLikeBarVisible: false,
    storage: {},
    showDefault: false,
    pointIsOpen: false,
    refresh: false,
});

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case types.UserLoading:
            return state.set('loading', true);
        case types.Refresh:
            return state.set('refresh', true);
        case types.UserLoaded:
            return state.set('customer', Immutable.fromJS(action.data)).set('loading', false).set('refresh', false);
        case types.UserLevel:
            return state.set('point', action.data);
        case types.UserFollow:
            return state.set('follows', Immutable.fromJS(action.data));
        case types.UserRecord:
            return state.set('browserecord', Immutable.fromJS(action.data));
        case types.UserBrowseRecord:
            return state.set('refresh', false).setIn(['browserecord', 'total'], JSON.parse(action.data).map(function (t) {
                return t.goodsId
            }).filter(onlyUnique).length);
        case types.UserStatus:
            return state.set('orderCounts', Immutable.fromJS(action.data));
        case types.UserUnread:
            return state.set('message', action.data);
        case types.NetError:
            return state.set('loading', false);
        default:
            return state;
    }
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}