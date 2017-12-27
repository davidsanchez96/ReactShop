import NetUtils from "../utils/NetUtils";
import {PayPasswordUrl} from "../utils/Constant";
import {NetError, PayPasswordLoading, PayPasswordSuccess} from "../utils/actionTypes";
import Toast from 'react-native-root-toast';

export function payPassword(data) {
    return (dispatch) => {
        dispatch({type: PayPasswordLoading});
        NetUtils.postForm(PayPasswordUrl, data,
            (result) => {
                console.log(result);
                Toast.show(`修改密码成功`);
                dispatch({type: PayPasswordSuccess});
            },
            () => {
                dispatch({type: NetError});
            });
    }
}






