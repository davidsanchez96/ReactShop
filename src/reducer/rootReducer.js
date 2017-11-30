import {combineReducers} from 'redux-immutable';
import nav from './navigation';
import categoryReducer from './categoryReducer';
import mainReducer from './mainReducer';
import searchReducer from './searchReducer';
import goodsListReducer from './goodsListReducer';
import filterReducer from './filterReducer';
import addressReducer from './addressReducer';
export default combineReducers({
    nav,
    categoryReducer,
    mainReducer,
    searchReducer,
    goodsListReducer,
    filterReducer,
    addressReducer,
});