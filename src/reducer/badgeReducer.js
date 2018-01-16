import * as types from '../utils/actionTypes';
import Immutable, {fromJS, OrderedSet} from 'immutable';
import {ShopListLoaded} from "../utils/actionTypes";

const initialState = Immutable.fromJS({
    count: 0,
});
export default function badgeReducer(state = initialState, action) {
    switch (action.type) {
        case types.ShopListCount:
            return state.set('count', action.data);
        default:
            return state;
    }
}

