import * as types from '../utils/actionTypes';
import Immutable, {fromJS, OrderedSet} from 'immutable';
import {ShopListLoaded} from "../utils/actionTypes";

const initialState = Immutable.fromJS({
    count: 0,
    editable: false,
});
export default function editReducer(state = initialState, action) {
    switch (action.type) {
        case types.ShopListCount:
            return state.set('count', action.data);
        case types.ShopListEdit:
            return state.set('editable', !state.get('editable'));
        default:
            return state;
    }
}

