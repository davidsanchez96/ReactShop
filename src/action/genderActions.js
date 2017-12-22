import NetUtils from "../utils/NetUtils";
import {GenderUrl, NicknameUrl} from "../utils/Constant";
import {GenderLoaded, GenderLoading, NetError, NicknameLoaded, NicknameLoading} from "../utils/actionTypes";

export function changeGender(gender) {
    return (dispatch) => {
        dispatch({type: GenderLoading});
        NetUtils.put(GenderUrl,gender,
            (result) => {
                // console.log(result);
                dispatch({type: GenderLoaded, data: result});
            },
            (error) => {
                console.log(error);
                dispatch({type: NetError});
            });
    }
}




