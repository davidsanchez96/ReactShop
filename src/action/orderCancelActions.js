import NetUtils from "../utils/NetUtils";
import {OrderListUrl} from "../utils/Constant";
import {NetError, OrderCancelLoaded, OrderCancelLoading} from "../utils/actionTypes";


export function orderCancel(orderId,encodeRequestParam) {
    return (dispatch) => {
        dispatch({type: OrderCancelLoading});
        let url = OrderListUrl + `/${orderId}?${encodeRequestParam}`;
        NetUtils.delete(url,
            (result) => {
                console.log(result);
                dispatch({type: OrderCancelLoaded});
            },
            (error) => {
                console.log(error);
                dispatch({type: NetError});
            });


    }
}





