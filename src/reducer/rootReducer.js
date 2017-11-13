import {combineReducers} from 'redux';
import nav from './navigation';
import categoryReducer from './categoryReducer';
import mainReducer from './mainReducer';
import searchReducer from './searchReducer';
export default combineReducers({
    nav,
    categoryReducer,
    mainReducer,
    searchReducer,
});