import NetUtils from "../utils/NetUtils";
import {CheckPhoneUrl, SendPhoneUrl, VerifyPhoneUrl} from "../utils/Constant";
import {
    FindPasswordLoaded, FindPasswordLoading, LoginLoaded, NetError,
    VerifyPasswordLoaded, VerifyPasswordLoading
} from "../utils/actionTypes";
import Toast from 'react-native-root-toast';

export function sendPhone(data) {
    return (dispatch) => {
        NetUtils.postForm(SendPhoneUrl, data,
            (result) => {
                console.log(result);
                const slurPhone = (data.phone ? (data.phone.substring(0, 3) + '****' + data.phone.substring(7)) : '');
                Toast.show(`验证码已发送到${slurPhone}的手机上,请查收`);
            },
            () => {
                dispatch({type: NetError});
            });
    }
}

export function verifyPhone(data) {
    return (dispatch) => {
        dispatch({type: VerifyPasswordLoading});
        NetUtils.postForm(VerifyPhoneUrl, data,
            (result) => {
                console.log(result);
                dispatch({type: VerifyPasswordLoaded});
            },
            () => {

                dispatch({type: NetError});
            });
    }
}




