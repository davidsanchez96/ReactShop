import {combineReducers} from 'redux-immutable';
import nav from './navigation';
import categoryReducer from './categoryReducer';
import mainReducer from './mainReducer';
import searchReducer from './searchReducer';
import goodsListReducer from './goodsListReducer';
export default combineReducers({
    nav,
    categoryReducer,
    mainReducer,
    searchReducer,
    goodsListReducer,
});