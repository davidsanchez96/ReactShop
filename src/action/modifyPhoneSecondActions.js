import NetUtils from "../utils/NetUtils";
import {ModifyPhoneNewCodeUrl, ModifyPhoneVerifyUrl} from "../utils/Constant";
import {ModifyPhoneFirstLoading, ModifyPhoneSecondSet, ModifyPhoneSecondSuccess, NetError} from "../utils/actionTypes";
import Toast from 'react-native-root-toast';

export function getModifyNewCode(data) {
    return (dispatch) => {
        NetUtils.postForm(ModifyPhoneNewCodeUrl, data,
            (result) => {
                console.log(result);
                Toast.show(`已向您的新手机号${data.phone}发送验证码`);
                dispatch({type: ModifyPhoneSecondSet});
            },
            () => {
                dispatch({type: NetError});
            });
    }
}
export function verifyModifyNewCode(data) {
    return (dispatch) => {
        dispatch({type: ModifyPhoneFirstLoading});
        NetUtils.postForm(ModifyPhoneVerifyUrl, data,
            (result) => {
                console.log(result);
                dispatch({type: ModifyPhoneSecondSuccess});
            },
            () => {
                dispatch({type: NetError});
            });
    }
}




