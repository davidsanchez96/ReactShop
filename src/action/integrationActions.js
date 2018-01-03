import NetUtils from "../utils/NetUtils";
import {IntegrationListUrl, IntegrationTotalUrl} from "../utils/Constant";
import {
    IntegrationLoaded, IntegrationLoading, IntegrationShowMore, IntegrationTotal,
    NetError
} from "../utils/actionTypes";


export function integrationList(pageNum,status) {
    return (dispatch) => {
        if (pageNum > 0) {
            dispatch({type: IntegrationShowMore});
        } else {
            dispatch({type: IntegrationLoading});
        }

        NetUtils.get(IntegrationListUrl +status+'&pageNum=' + pageNum,
            (result) => {
                console.log(result);
                dispatch({type: IntegrationLoaded, data: result.data, hasMore: result.data.length >= 10, page: pageNum});
            },
            (error) => {
                console.log(error);
                dispatch({type: NetError});
            });


    }
}


export function integrationTotal() {
    return (dispatch) => {
        NetUtils.get(IntegrationTotalUrl ,
            (result) => {
                console.log(result);
                dispatch({type: IntegrationTotal, data: result});
            },
            (error) => {
                console.log(error);
                dispatch({type: NetError});
            });


    }
}

