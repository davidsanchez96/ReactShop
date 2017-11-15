import NetUtils from "../utils/NetUtils";
import {SuggestionUrl} from "../utils/Constant";
import {
    CategorySelected, NetError, SuggestionLoading,
    SuggestionLoaded
} from "../utils/actionTypes";

export function suggestion(key) {
    return (dispatch) => {
        dispatch({type: SuggestionLoading});
        NetUtils.get(SuggestionUrl + key,
            (result) => {
                console.log(result.data);
                dispatch({type: SuggestionLoaded, data: result.data});
            },
            (error) => {
                console.log(error);
                dispatch({type: NetError});
            });
    }
}

