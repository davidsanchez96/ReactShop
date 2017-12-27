import NetUtils from "../utils/NetUtils";
import {ModifyPhoneCodeUrl, ModifyPhoneVerifyUrl} from "../utils/Constant";
import {ModifyPhoneFirstLoading, ModifyPhoneFirstSet, ModifyPhoneFirstSuccess, NetError} from "../utils/actionTypes";
import Toast from 'react-native-root-toast';

export function getModifyPhoneCode() {
    return (dispatch) => {
        NetUtils.post(ModifyPhoneCodeUrl, null,
            (result) => {
                console.log(result);
                Toast.show('验证码已发送到您绑定的手机上,请注意查收');
                dispatch({type: ModifyPhoneFirstSet});
            },
            () => {
                dispatch({type: NetError});
            });
    }
}
export function verifyModifyPhoneCode(data) {
    return (dispatch) => {
        dispatch({type: ModifyPhoneFirstLoading});
        NetUtils.postForm(ModifyPhoneVerifyUrl, data,
            (result) => {
                console.log(result);
                dispatch({type: ModifyPhoneFirstSuccess});
            },
            () => {
                dispatch({type: NetError});
            });
    }
}




