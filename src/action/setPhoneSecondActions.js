import NetUtils from "../utils/NetUtils";
import {GetCodeUrl, GetPhoneCodeUrl, VerifyCodeUrl, VerifyPhoneCodeUrl} from "../utils/Constant";
import {
    GetCodeSet, NetError, SetPhoneSecondLoading, SetPhoneSecondSet, SetPhoneSecondSuccess, VerifyCodeLoading,
    VerifyCodeSuccess
} from "../utils/actionTypes";
import Toast from 'react-native-root-toast';

export function getPhoneCode(data) {
    return (dispatch) => {
        NetUtils.postForm(GetPhoneCodeUrl, data,
            (result) => {
                console.log(result);
                Toast.show(`已向您的新手机号${data.phone}发送验证码`);
                dispatch({type: SetPhoneSecondSet});
            },
            () => {
                dispatch({type: NetError});
            });
    }
}
export function verifyPhoneCode(data) {
    return (dispatch) => {
        dispatch({type: SetPhoneSecondLoading});
        NetUtils.postForm(VerifyPhoneCodeUrl, data,
            (result) => {
                console.log(result);
                dispatch({type: SetPhoneSecondSuccess});
            },
            () => {
                dispatch({type: NetError});
            });
    }
}




