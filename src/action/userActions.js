import NetUtils from "../utils/NetUtils";
import {SuggestionUrl, UserUrl} from "../utils/Constant";
import {
    CategorySelected, NetError, SuggestionLoading,
    SuggestionLoaded, UserLoading, UserLoaded
} from "../utils/actionTypes";

export function user() {
    return (dispatch) => {
        dispatch({type: UserLoading});
        NetUtils.get(UserUrl ,
            (result) => {
                console.log(result);
                dispatch({type: UserLoaded, data: result});
            },
            (error) => {
                console.log(error);
                dispatch({type: NetError});
            });
    }
}

