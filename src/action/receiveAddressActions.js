import NetUtils from "../utils/NetUtils";
import {DefaultAddressUrl, DeleteAddressUrl, ReceiveAddressUrl} from "../utils/Constant";
import {NetError, ReceiveAddressLoaded, ReceiveAddressLoading} from "../utils/actionTypes";
import Toast from 'react-native-root-toast';

export function receiveAddress() {
    return (dispatch) => {
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

export function defaultAddress(id) {
    return (dispatch) => {
        NetUtils.put(DefaultAddressUrl + id,null,
            () => {
                // console.log(result);
                Toast.show('设置默认地址成功!');
                dispatch(receiveAddress());
            },
            (error) => {
                console.log(error);
                dispatch({type: NetError});
            });
    }
}

export function deleteAddress(id) {
    return (dispatch) => {
        NetUtils.delete(DeleteAddressUrl + id,
            () => {
                // console.log(result);
                Toast.show('删除地址成功');
                dispatch(receiveAddress());
            },
            (error) => {
                console.log(error);
                dispatch({type: NetError});
            });
    }
}




