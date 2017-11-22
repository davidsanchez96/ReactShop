import React from 'react';
import {AppNavigator} from "../page/App";
import Immutable from 'immutable';
import {NavigationActions} from 'react-navigation';



const initialState =Immutable.Map(
    // AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('GoodsDetail')));
    AppNavigator.router.getStateForAction( NavigationActions.init()));

export default function nav(state = initialState, action) {

    const newState = state.merge(AppNavigator.router.getStateForAction(action, state.toJS()));
    return newState || state;
}
// export default function nav(state, action) {
//     const newState = AppNavigator.router.getStateForAction(action, state);
//     return newState || state;
// }npm