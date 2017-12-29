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
import findPasswordSecondReducer from './findPasswordSecondReducer';
import findPasswordThirdReducer from './findPasswordThirdReducer';
import userReducer from './userReducer';
import accountReducer from "./accountReducer";
import nicknameReducer from "./nicknameReducer";
import genderReducer from "./genderReducer";
import receiveAddressReducer from "./receiveAddressReducer";
import addAddressReducer from "./addAddressReducer";
import modifyPasswordFirstReducer from "./modifyPasswordFirstReducer";
import modifyPasswordSecondReducer from "./modifyPasswordSecondReducer";
import payPasswordFirstReducer from "./payPasswordFirstReducer";
import payPasswordSecondReducer from "./payPasswordSecondReducer";
import setPhoneFirstReducer from "./setPhoneFirstReducer";
import setPhoneSecondReducer from "./setPhoneSecondReducer";
import modifyPhoneFirstReducer from "./modifyPhoneFirstReducer";
import modifyPhoneSecondReducer from "./modifyPhoneSecondReducer";
import followReducer from "./followReducer";
import browseReducer from "./browseReducer";
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
    findPasswordSecondReducer,
    findPasswordThirdReducer,
    userReducer,
    accountReducer,
    nicknameReducer,
    genderReducer,
    receiveAddressReducer,
    addAddressReducer,
    modifyPasswordFirstReducer,
    modifyPasswordSecondReducer,
    payPasswordFirstReducer,
    payPasswordSecondReducer,
    setPhoneFirstReducer,
    setPhoneSecondReducer,
    modifyPhoneFirstReducer,
    modifyPhoneSecondReducer,
    followReducer,
    browseReducer,
});