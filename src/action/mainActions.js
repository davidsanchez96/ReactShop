import NetUtils from "../utils/NetUtils";
import {URL} from "../utils/Constant";
import {Loaded, Loading} from "../utils/actionTypes";

export function getMain() {
    return (dispatch) => {
        dispatch({type: Loading});
        NetUtils.get(URL,
            (result) => {
                console.log(result);
                dispatch({type: Loaded, data: result});
            },
            (error) => {
                console.log('---------'+error);
                alert(error)
            });
    }
}

