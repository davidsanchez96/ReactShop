import NetUtils from "../utils/NetUtils";
import {CheckPhoneUrl, GetCodeUrl, VerifyCodeUrl} from "../utils/Constant";
import {FindPasswordLoaded, FindPasswordLoading, GetCodeSet, NetError, VerifyCodeSuccess} from "../utils/actionTypes";
import Toast from 'react-native-root-toast';

export function getCode(phone) {
    return (dispatch) => {
        NetUtils.post(GetCodeUrl, null,
            (result) => {
                console.log(result);
                const slurPhone = (phone ? (phone.substring(0, 3) + '****' + phone.substring(7)) : '');
                Toast.show(`验证码已发送到${slurPhone}的手机上,请查收`);
                dispatch({type: GetCodeSet});
            },
            () => {
                dispatch({type: NetError});
            });
    }
}
export function verifyCode(data) {
    return (dispatch) => {
        NetUtils.postForm(VerifyCodeUrl, data,
            (result) => {
                console.log(result);
                dispatch({type: VerifyCodeSuccess});
            },
            () => {
                dispatch({type: NetError});
            });
    }
}




