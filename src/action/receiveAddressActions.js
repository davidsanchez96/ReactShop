import NetUtils from "../utils/NetUtils";
import {DefaultAddressUrl, DeleteAddressUrl, ReceiveAddressUrl} from "../utils/Constant";
import {NetError, ReceiveAddressLoaded, ReceiveAddressLoading} from "../utils/actionTypes";

export function receiveAddress() {
    return (dispatch) => {
        dispatch({type: ReceiveAddressLoading});
        NetUtils.get(ReceiveAddressUrl,
            (result) => {
                // console.log(result);
                dispatch({type: ReceiveAddressLoaded, data: result});
            },
            (error) => {
                console.log(error);
                dispatch({type: NetError});
            });
    }
}

// export function defaultAddress(id) {
//     return (dispatch) => {
//         dispatch({type: ReceiveAddressLoading});
//         NetUtils.put(DefaultAddressUrl + id,
//             (result) => {
//                 // console.log(result);
//                 // dispatch({type: ReceiveAddressLoaded, data: result});
//             },
//             (error) => {
//                 console.log(error);
//                 dispatch({type: NetError});
//             });
//     }
// }

export function deleteAddress(id) {
    return (dispatch) => {
        dispatch({type: ReceiveAddressLoading});
        NetUtils.delete(DeleteAddressUrl + id,
            (result) => {
                // console.log(result);
                dispatch({type: ReceiveAddressLoaded, data: result});
            },
            (error) => {
                console.log(error);
                dispatch({type: NetError});
            });
    }
}




