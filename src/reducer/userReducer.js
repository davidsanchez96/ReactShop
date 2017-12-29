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
    pointIsOpen: false
});

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case types.UserLoading:
            return state.set('loading', true);
        case types.UserLoaded:
            return state.set('customer', Immutable.fromJS(action.data)).set('loading', false);
        case types.UserLevel:
            return state.set('point', action.data);
        case types.UserFollow:
            return state.set('follows', Immutable.fromJS(action.data));
        case types.UserRecord:
            return state.set('browserecord', Immutable.fromJS(action.data));
        case types.UserBrowseRecord:
            return state.setIn(['browserecord', 'total'], JSON.parse(action.data).map(function (t) {
                return t.goodsId
            }).filter(onlyUnique).length);

        case types.UserStatus:
            return state.set('orderCounts', Immutable.fromJS(action.data));
        case types.UserUnread:
            return state.set('message', action.data);
        case types.LoginUser:
            return state.set('user', action.user);
        case types.LoginPass:
            return state.set('isHide', !state.get('isHide'));
        case types.LoginLoaded:
            return state.set('loading', false).set('isSuccess', true);
        case types.NetError:
            return state.set('loading', false);
        case types.LoginClean:
            return initialState;
        default:
            return state;
    }
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}