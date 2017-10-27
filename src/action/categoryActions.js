import NetUtils from "../utils/NetUtils";
import {CategoryUrl} from "../utils/Constant";
import {Loaded,Loading} from "../utils/actionTypes";

export default function get() {
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