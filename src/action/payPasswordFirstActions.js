import NetUtils from "../utils/NetUtils";
import {PayGetUrl, PayVerifyUrl} from "../utils/Constant";
import {GetCodeSet, NetError, PayCodeLoading, PayCodeSuccess} from "../utils/actionTypes";
import Toast from 'react-native-root-toast';

export function payCode(phone) {
    return (dispatch) => {
        NetUtils.post(PayGetUrl, null,
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
export function payVerifyCode(data) {
    return (dispatch) => {
        dispatch({type: PayCodeLoading});
        NetUtils.postForm(PayVerifyUrl, data,
            (result) => {
                console.log(result);
                dispatch({type: PayCodeSuccess});
            },
            () => {
                dispatch({type: NetError});
            });
    }
}




