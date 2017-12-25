import NetUtils from "../utils/NetUtils";
import {AddressUrl, ReceiveAddressUrl} from "../utils/Constant";
import {
    NetError, AddressLoading, AddressLoaded, AddAddressLoading, AddAddressLoaded, AddAddressGet
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
export function addAddress(data) {
    return (dispatch) => {
        dispatch({type: AddAddressLoading});
        NetUtils.post(ReceiveAddressUrl,data,
            () => {
                // console.log(result);
                dispatch({type: AddAddressLoaded});
            },
            (error) => {
                console.log(error);
                dispatch({type: NetError});
            });
    }
}

export function getAddress(id) {
    return (dispatch) => {
        dispatch({type: AddAddressLoading});
        NetUtils.get(ReceiveAddressUrl+`/${id}`,
            (result) => {
                // console.log(result);
                dispatch({type: AddAddressGet, data: result});
            },
            (error) => {
                console.log(error);
                dispatch({type: NetError});
            });
    }
}

export function updateAddress(data) {
    return (dispatch) => {
        dispatch({type: AddAddressLoading});
        NetUtils.put(ReceiveAddressUrl,JSON.stringify(data),
            () => {
                dispatch({type: AddAddressLoaded});
            },
            (error) => {
                console.log(error);
                dispatch({type: NetError});
            });
    }
}




