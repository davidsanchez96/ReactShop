import NetUtils from "../utils/NetUtils";
import {CategoryUrl} from "../utils/Constant";
import {Loaded, Loading, Selected} from "../utils/actionTypes";

export function get() {
    return (dispatch) => {
        dispatch({type: Loading});
        NetUtils.get(CategoryUrl,
            (result) => {
                console.log(result.data);
                dispatch({type: Loaded, data: result.data});
            },
            (error) => {
                console.log(error);
            });
    }
}

export function select(index) {
    return {
        type: Selected,
        index: index,
    }
}