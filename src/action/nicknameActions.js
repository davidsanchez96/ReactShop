import NetUtils from "../utils/NetUtils";
import {NicknameUrl} from "../utils/Constant";
import {NetError, NicknameLoaded, NicknameLoading} from "../utils/actionTypes";

export function changeNickname(nickname) {
    return (dispatch) => {
        dispatch({type: NicknameLoading});
        NetUtils.put(NicknameUrl,nickname,
            (result) => {
                // console.log(result);
                dispatch({type: NicknameLoaded, data: result});
            },
            (error) => {
                console.log(error);
                dispatch({type: NetError});
            });
    }
}




