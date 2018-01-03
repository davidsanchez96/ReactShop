import NetUtils from "../utils/NetUtils";
import {BirthdayUrl} from "../utils/Constant";
import {BirthdaySet, NetError} from "../utils/actionTypes";

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




