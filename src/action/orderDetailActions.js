import NetUtils from "../utils/NetUtils";
import {OrderDetailUrl, OrderListUrl} from "../utils/Constant";
import {
    NetError, OrderDetailLoaded, OrderDetailLoading, OrderDetailSetting,
    OrderDetailStatus
} from "../utils/actionTypes";
import {AsyncStorage,} from 'react-native';


export function orderDetail(id) {
    return (dispatch) => {
        dispatch({type: OrderDetailLoading});
        let url = OrderListUrl + `/${id}/order`;
        NetUtils.get(url,
            (result) => {
                console.log(result);
                dispatch({type: OrderDetailLoaded, data: result});
            },
            (error) => {
                console.log(error);
                dispatch({type: NetError});
            });


    }
}
export function orderUpdateStatus(id,status) {
    return (dispatch) => {
        dispatch({type: OrderDetailLoading});
        let url = OrderDetailUrl + `/${id}/status/${status}`;
        NetUtils.get(url,
            (result) => {
                console.log(result);
                dispatch({type: OrderDetailStatus, status: status});
            },
            (error) => {
                console.log(error);
                dispatch({type: NetError});
            });


    }
}

export function orderDetailSetting(status) {
    return (dispatch) => {
        AsyncStorage.getItem('hkshop@orderSetting', (err, data) => {
            if (data) {
                dispatch({type: OrderDetailSetting, data: JSON.parse(data),status:status});
            }
        });
    }
}



