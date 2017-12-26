import NetUtils from "../utils/NetUtils";
import {SetCodeUrl} from "../utils/Constant";
import {ModifyPasswordLoading, NetError, VerifyPasswordSuccess} from "../utils/actionTypes";
import Toast from 'react-native-root-toast';

export function verifyPassword(data) {
    return (dispatch) => {
        dispatch({type: ModifyPasswordLoading});
        NetUtils.postForm(SetCodeUrl, data,
            (result) => {
                console.log(result);
                Toast.show(`修改密码成功`);
                dispatch({type: VerifyPasswordSuccess});
            },
            () => {
                dispatch({type: NetError});
            });
    }
}






