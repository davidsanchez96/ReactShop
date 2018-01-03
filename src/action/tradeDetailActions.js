import NetUtils from "../utils/NetUtils";
import {TradeListUrl} from "../utils/Constant";
import {NetError, TradeDetailLoaded, TradeDetailLoading, TradeDetailShowMore} from "../utils/actionTypes";


export function tradeList(pageNum,status) {
    return (dispatch) => {
        if (pageNum > 0) {
            dispatch({type: TradeDetailShowMore});
        } else {
            dispatch({type: TradeDetailLoading});
        }

        NetUtils.get(TradeListUrl +status+'?pageNum=' + pageNum,
            (result) => {
                // console.log(result);
                dispatch({type: TradeDetailLoaded, data: result.data, hasMore: result.data.length >= 10, page: pageNum});
            },
            (error) => {
                console.log(error);
                dispatch({type: NetError});
            });


    }
}

