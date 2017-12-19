import NetUtils from "../utils/NetUtils";
import {CheckPhoneUrl} from "../utils/Constant";
import {FindPasswordLoaded, FindPasswordLoading, NetError} from "../utils/actionTypes";
import Toast from 'react-native-root-toast';

export function checkPhone(data) {
    return (dispatch) => {
        dispatch({type: FindPasswordLoading});
        NetUtils.postForm(CheckPhoneUrl,data,
            (result) => {
                console.log(result);
                const slurPhone = (data.phone ? (data.phone.substring(0, 3) + '****'+ data.phone.substring(7)) : '');
                Toast.show(`验证码已发送到${slurPhone}的手机上,请查收`);
                dispatch({type: FindPasswordLoaded,data:result.nickname});
            },
            () => {
                dispatch({type: NetError});
            });
    }
}




