import * as types from '../utils/actionTypes';
import Immutable from 'immutable';
import {FollowListLoading} from "../utils/actionTypes";
import {FollowListShowMore} from "../utils/actionTypes";
import {FollowListLoaded} from "../utils/actionTypes";
import {PreDepositLoading} from "../utils/actionTypes";

const initialState = Immutable.Map({
    loading: true,
    preDeposit: 0,
    freezePreDeposit: 0,
    sumDeposit: 0,
    phone: '',

});
export default function preDepositReducer(state = initialState, action) {
    switch (action.type) {
        case types.PreDepositLoading:
            return state.set('loading', true);
        case types.PreDepositLoaded:
            let r1 = decimalLength(action.data.preDeposit);
            let r2 = decimalLength(action.data.freezePreDeposit);
            let max = Math.max(r1, r2);
            let n1 = suffixInteger(action.data.preDeposit, max);
            let n2 = suffixInteger(action.data.freezePreDeposit, max);

            return state.set('loading', false)
                .set('preDeposit', action.data.preDeposit)
                .set('freezePreDeposit', action.data.freezePreDeposit)
                .set('sumDeposit', Number(((n1 + n2) / Math.pow(10, max)).toFixed(max)));

        case types.NetError:
            return state.set('loading', false);
        case types.PreDepositCode:
            return state.set('errorCode', action.data).set('loading', false);
        default:
            return state;
    }
}

function decimalLength(num) {
    let str = num.toString();
    let index = str.indexOf('.');
    return index == -1 ? 0 : str.substr(index + 1).length;
}

function suffixInteger(num, length) {
    let str = num.toString();
    let decimalLen = decimalLength(num);
    str += Math.pow(10, length - decimalLen).toString().substr(1);
    return Number(str.replace('.', ''));
}