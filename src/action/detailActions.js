import NetUtils from "../utils/NetUtils";
import {DetailUrl} from "../utils/Constant";
import {
    DetailLoaded, DetailLoading, DetailStock, ImageDetailLoaded, NetError,
    SpecsDetailLoaded
} from "../utils/actionTypes";

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
export function goodsStock(goodsInfoId,districtId) {
    return (dispatch) => {
        let url = DetailUrl + `${goodsInfoId}/${districtId}/goodsStock`;
        NetUtils.get(url,
            (result) => {
                console.log(url + result.data);
                dispatch({type: DetailStock, data: result});
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
            (result1) => {
                console.log(url + result1);
                NetUtils.get(DetailUrl + `${goodsInfoId}/skuSpecs`,
                    (result) => {
                        dispatch({type: SpecsDetailLoaded, data1: result1, data2: result});
                    },
                    (error) => {
                        console.log(error);
                        dispatch({type: NetError});
                    });

            },
            (error) => {
                console.log(error);
                dispatch({type: NetError});
            });
    }
}

