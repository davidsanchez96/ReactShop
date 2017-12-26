import NetUtils from "../utils/NetUtils";
import {SetPasswordUrl} from "../utils/Constant";
import {NetError, PasswordSet, VerifyPasswordLoading} from "../utils/actionTypes";
import Toast from 'react-native-root-toast';

export function setPassword(data) {
    return (dispatch) => {
        dispatch({type: VerifyPasswordLoading});
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






