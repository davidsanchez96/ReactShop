import NetUtils from "../utils/NetUtils";
import {CategoryUrl} from "../utils/Constant";
import {Loaded} from "../utils/actionTypes";

export default function get() {
    return (dispatch) => {
        NetUtils.get(CategoryUrl,
            (result) => {
            console.log(result.data);
                dispatch({type: Loaded, data: result});
            },
            (error) => {
                console.log(error);
            });
    }
}