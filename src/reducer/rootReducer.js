import {combineReducers} from 'redux';
import nav from './navigation';
import categoryReducer from './categoryReducer';
import mainReducer from './mainReducer';
export default combineReducers({
    nav,
    categoryReducer,
    mainReducer,
});