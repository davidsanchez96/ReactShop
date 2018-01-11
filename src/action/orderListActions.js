import NetUtils from "../utils/NetUtils";
import {OrderDetailUrl, OrderListUrl} from "../utils/Constant";
import {
    NetError, OrderListLoaded, OrderListLoading, OrderListSetting, OrderListShowMore,

} from "../utils/actionTypes";
import {AsyncStorage,} from 'react-native';
import {DeviceEventEmitter} from 'react-native';

export function orderList(pageNum, status) {
    return (dispatch) => {
        if (pageNum > 0) {
            dispatch({type: OrderListShowMore});
        } else {
            dispatch({type: OrderListLoading});
        }
        let url;
        if (status === undefined) {
            url = OrderListUrl + '?pageNum=' + pageNum;
        } else if (status === 3) {
            url = OrderListUrl + '/unappraised?pageNum=' + pageNum;
        } else {
            url = OrderListUrl + '/' + status + '?pageNum=' + pageNum;
        }
        NetUtils.get(url,
            (result) => {
                console.log(result);
                dispatch({type: OrderListLoaded, data: result.data, hasMore: result.data.length >= 10, page: pageNum});
            },
            (error) => {
                console.log(error);
                dispatch({type: NetError});
            });


    }
}

export function orderListUpdateStatus(id, status) {
    return (dispatch) => {
        let url = OrderDetailUrl + `/${id}/status/${status}`;
        NetUtils.put(url, null,
            (result) => {
                console.log(result);
                DeviceEventEmitter.emit('userRefresh');
            },
            (error) => {
                console.log(error);
                dispatch({type: NetError});
            });


    }
}

export function orderSetting() {
    return (dispatch) => {
        AsyncStorage.getItem('hkshop@orderSetting', (err, data) => {
            if (data) {
                dispatch({type: OrderListSetting, data: JSON.parse(data)});
            }
        });
    }
}




