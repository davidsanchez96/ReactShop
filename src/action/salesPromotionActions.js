import NetUtils from "../utils/NetUtils";
import {ShopPromotionUrl} from "../utils/Constant";
import {NetError, SalesPromotionLoaded, SalesPromotionLoading} from "../utils/actionTypes";

export function salesPromotionList(id) {
    return (dispatch) => {
        dispatch({type: SalesPromotionLoading});
        NetUtils.get(ShopPromotionUrl+id,
            (result) => {
                console.log(result);
                dispatch({type: SalesPromotionLoaded, data: result});
            },
            (error) => {
                console.log(error);
                dispatch({type: NetError});
            });
    }
}




