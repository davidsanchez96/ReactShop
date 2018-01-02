import NetUtils from "../utils/NetUtils";
import {CheckDepositUrl, PreDepositUrl} from "../utils/Constant";
import {NetError, PreDepositCheck, PreDepositCode, PreDepositLoaded, PreDepositLoading} from "../utils/actionTypes";


export function preDepositInfo() {
    return (dispatch) => {
        dispatch({type: PreDepositLoading});
        NetUtils.post(PreDepositUrl, null,
            (result) => {
                // console.log(result);
                dispatch({type: PreDepositLoaded,data:result});
            },
            () => {
                dispatch({type: NetError});
            });
    }
}
export function preDepositCheck() {
    return (dispatch) => {
        dispatch({type: PreDepositLoading});
        NetUtils.post(CheckDepositUrl, null,
            (result) => {
                // console.log(result);
                dispatch({type: PreDepositCode,data:result.data.errorCode});
            },
            () => {
                dispatch({type: NetError});
            });
    }
}





