import NetUtils from "../utils/NetUtils";
import {CategoryUrl} from "../utils/Constant";
import {CategoryLoaded, CategoryLoading, CategorySelected, NetError} from "../utils/actionTypes";

export function get() {
    return (dispatch) => {
        dispatch({type: CategoryLoading});
        NetUtils.get(CategoryUrl,
            (result) => {
                console.log(CategoryUrl);
                dispatch({type: CategoryLoaded, data: result.data});
            },
            (error) => {
                console.log(error);
                dispatch({type: NetError});
            });
    }
}

export function select(index) {
    return {
        type: CategorySelected,
        index: index,
    }
}