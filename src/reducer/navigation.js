import React from 'react';
import {AppNavigator} from "../page/App";

export default function nav(state, action) {
    const newState = AppNavigator.router.getStateForAction(action, state);
    return newState || state;
}