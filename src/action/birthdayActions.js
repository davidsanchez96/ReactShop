import NetUtils from "../utils/NetUtils";
import {BirthdayUrl, NicknameUrl} from "../utils/Constant";
import {BirthdaySet, NetError, NicknameLoaded, NicknameLoading} from "../utils/actionTypes";

export function changeBirthday(birthday) {
    return (dispatch) => {
        NetUtils.put(BirthdayUrl,birthday,
            (result) => {
                console.log(result);
                dispatch({type: BirthdaySet, data: birthday});
            },
            (error) => {
                console.log(error);
                dispatch({type: NetError});
            });
    }
}




