import NetUtils from "../utils/NetUtils";
import {AddressUrl, LoginUrl} from "../utils/Constant";
import {
    NetError, AddressLoading, AddressLoaded, LoginLoading, LoginLoaded
} from "../utils/actionTypes";
import {AsyncStorage} from 'react-native';

export function login(user, password) {
    return (dispatch) => {
        dispatch({type: LoginLoading});
        NetUtils.login(LoginUrl,user,password,
            (result) => {
                // console.log(result);
                if (result.token) {
                    window.token = result.token;
                    AsyncStorage.setItem('hkshop@data', JSON.stringify(result));
                    dispatch({type: LoginLoaded});
                } else {

                }
            },
            () => {
                dispatch({type: NetError});
            });
    }
}




