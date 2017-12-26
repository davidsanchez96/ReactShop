import NetUtils from "../utils/NetUtils";
import {SetCodeUrl} from "../utils/Constant";
import {ModifyPasswordLoading, NetError, PasswordSetLoading} from "../utils/actionTypes";
import Toast from 'react-native-root-toast';

export function verifyPassword(data) {
    return (dispatch) => {
        dispatch({type: PasswordSetLoading});
        NetUtils.postForm(SetCodeUrl, data,
            (result) => {
                console.log(result);
                Toast.show(`修改密码成功`);
                dispatch({type: ModifyPasswordLoading});
            },
            () => {
                dispatch({type: NetError});
            });
    }
}






