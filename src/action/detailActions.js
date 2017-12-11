import NetUtils from "../utils/NetUtils";
import {DetailUrl} from "../utils/Constant";
import {DetailLoaded, DetailLoading, ImageDetailLoaded, NetError, SpecsDetailLoaded} from "../utils/actionTypes";

export function detail(districtId, goodsInfoId) {
    return (dispatch) => {
        dispatch({type: DetailLoading});
        let url = DetailUrl + `${districtId}/${goodsInfoId}/detail`;
        NetUtils.get(url,
            (result) => {
                console.log(url + result.data);
                dispatch({type: DetailLoaded, data: result});
            },
            (error) => {
                console.log(error);
                dispatch({type: NetError});
            });
    }
}

export function imageDetail(goodsInfoId) {
    return (dispatch) => {
        let url = DetailUrl + `${goodsInfoId}/imagesDetail`;
        NetUtils.get(url,
            (result) => {
                console.log(url + result.data);
                dispatch({type: ImageDetailLoaded, data: result});
            },
            (error) => {
                console.log(error);
                dispatch({type: NetError});
            });
    }
}
export function specsDetail(goodsInfoId) {
    return (dispatch) => {
        let url = DetailUrl + `${goodsInfoId}/specs`;
        NetUtils.get(url,
            (result) => {
                console.log(url + result.data);
                dispatch({type: SpecsDetailLoaded, data: result});
            },
            (error) => {
                console.log(error);
                dispatch({type: NetError});
            });
    }
}

