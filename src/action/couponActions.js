import NetUtils from "../utils/NetUtils";
import {CategoryUrl, CouponListUrl} from "../utils/Constant";
import {CouponLoaded, CouponLoading, NetError} from "../utils/actionTypes";

export function couponList() {
    return (dispatch) => {
        dispatch({type: CouponLoading});
        NetUtils.get(CouponListUrl+1,
            (result) => {
                console.log(CategoryUrl);
                dispatch({type: CouponLoaded, data: result});
            },
            (error) => {
                console.log(error);
                dispatch({type: NetError});
            });
    }
}

