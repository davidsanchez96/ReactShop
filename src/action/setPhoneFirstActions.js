import NetUtils from "../utils/NetUtils";
import {PasswordCheckUrl, PayGetUrl, PayVerifyUrl} from "../utils/Constant";
import {GetCodeSet, NetError, PayCodeLoading, PayCodeSuccess, SetPhoneFirstSuccess} from "../utils/actionTypes";
import Toast from 'react-native-root-toast';

export function passwordCheck(password) {
    return (dispatch) => {
        NetUtils.get(PasswordCheckUrl+password,
            (result) => {
                console.log(result);
                dispatch({type: SetPhoneFirstSuccess});
            },
            () => {
                dispatch({type: NetError});
            });
    }
}





