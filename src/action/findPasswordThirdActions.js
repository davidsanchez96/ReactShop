import NetUtils from "../utils/NetUtils";
import {CheckPhoneUrl, SendPhoneUrl, SetPasswordUrl, VerifyPhoneUrl} from "../utils/Constant";
import {
    FindPasswordLoaded, FindPasswordLoading, LoginLoaded, NetError, PasswordSet,
    PasswordSetLoading
} from "../utils/actionTypes";
import Toast from 'react-native-root-toast';

export function setPassword(data) {
    return (dispatch) => {
        dispatch({type: PasswordSetLoading});
        NetUtils.postForm(SetPasswordUrl, data,
            (result) => {
                console.log(result);
                Toast.show(`重置密码成功`);
                dispatch({type: PasswordSet});
            },
            () => {
                dispatch({type: NetError});
            });
    }
}






