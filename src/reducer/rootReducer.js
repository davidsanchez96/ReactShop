import {combineReducers} from 'redux';
import nav from './navigation';
import categoryReducer from './categoryReducer';
export default combineReducers({
    nav,
    categoryReducer,
});