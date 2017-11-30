import NetUtils from "../utils/NetUtils";
import {AddressUrl} from "../utils/Constant";
import {
    NetError, AddressLoading, AddressLoaded
} from "../utils/actionTypes";

export function address() {
    return (dispatch) => {
        dispatch({type: AddressLoading});
        NetUtils.get(AddressUrl,
            (result) => {
                // console.log(result);
                dispatch({type: AddressLoaded, data: result});
            },
            (error) => {
                console.log(error);
                dispatch({type: NetError});
            });
    }
}




