import NetUtils from "../utils/NetUtils";
import {DetailUrl} from "../utils/Constant";
import {DetailLoaded, DetailLoading, NetError} from "../utils/actionTypes";

export function detail(districtId,goodsInfoId) {
    return (dispatch) => {
        dispatch({type: DetailLoading});
        let url=DetailUrl + `${districtId}/${goodsInfoId}/detail`;
        NetUtils.get(url,
            (result) => {
                console.log(url+result.data);
                dispatch({type: DetailLoaded, data: result});
            },
            (error) => {
                console.log(error);
                dispatch({type: NetError});
            });
    }
}

