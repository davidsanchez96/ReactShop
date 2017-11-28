import NetUtils from "../utils/NetUtils";
import {FilterUrl} from "../utils/Constant";
import {
    NetError, GoodsListLoading, GoodsListLoaded, GoodsListShow, GoodsListShowMore, GoodsListSearch, GoodsListReset,
    GoodsListDescending, FilterLoading, FilterLoaded
} from "../utils/actionTypes";



export function filter(params) {
    return (dispatch) => {
        dispatch({type: FilterLoading});
        console.log(_getPostBody(params));
        NetUtils.post(FilterUrl, _getPostBody(params),
            (result) => {
                // console.log(result);
                dispatch({type: FilterLoaded, data: result.aggResultMap});
            },
            (error) => {
                console.log(error);
                dispatch({type: NetError});
            });
    }
}


/**
 * 获取搜索POST请求Body
 * @private
 */
function _getPostBody(params) {

    var postBody = {};
    if (params.searchText) {
        postBody.queryString = params.searchText;
    }

    if (params.cates && params.cates.length > 0) {
        postBody.cateName = params.cates[0];
    }

    postBody.priceAutoSectionNum = 6;
    return postBody;
}

