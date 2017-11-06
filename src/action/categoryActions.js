import NetUtils from "../utils/NetUtils";
import {CategoryUrl} from "../utils/Constant";
import {CategoryLoaded, Loading, CategorySelected} from "../utils/actionTypes";

export function get() {
    return (dispatch) => {
        dispatch({type: Loading});
        NetUtils.get(CategoryUrl,
            (result) => {
                console.log(result.data);
                dispatch({type: CategoryLoaded, data: result.data});
            },
            (error) => {
                console.log(error);
            });
    }
}

export function select(index) {
    return {
        type: CategorySelected,
        index: index,
    }
}