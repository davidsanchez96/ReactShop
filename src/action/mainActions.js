import NetUtils from "../utils/NetUtils";
import {URL} from "../utils/Constant";
import {Change, Loaded, Loading, NetError, Show} from "../utils/actionTypes";

export function getMain() {
    return (dispatch) => {
        dispatch({type: Loading});
        NetUtils.get(URL,
            (result) => {
                console.log(URL);
                dispatch({type: Loaded, data: result});
            },
            (error) => {
                console.log('---------'+error);
                dispatch({type: NetError});
            });
    }
}

export function show(index) {
    return {
        type: Show,
        show: index,
    }
}

export function change(index) {
    return {
        type: Change,
        change: index,
    }
}