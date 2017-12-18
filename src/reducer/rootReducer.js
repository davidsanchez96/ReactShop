import {combineReducers} from 'redux-immutable';
import nav from './navigation';
import categoryReducer from './categoryReducer';
import mainReducer from './mainReducer';
import searchReducer from './searchReducer';
import goodsListReducer from './goodsListReducer';
import filterReducer from './filterReducer';
import addressReducer from './addressReducer';
import selectReducer from './selectReducer';
import detailReducer from './detailReducer';
import commentReducer from './commentReducer';
import loginReducer from './loginReducer';
import findPasswordFirstReducer from './findPasswordFirstReducer';
export default combineReducers({
    nav,
    categoryReducer,
    mainReducer,
    searchReducer,
    goodsListReducer,
    filterReducer,
    addressReducer,
    selectReducer,
    detailReducer,
    commentReducer,
    loginReducer,
    findPasswordFirstReducer,
});