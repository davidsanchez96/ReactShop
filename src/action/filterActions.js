import NetUtils from "../utils/NetUtils";
import {FilterUrl} from "../utils/Constant";
import {
    NetError, FilterLoading, FilterLoaded
} from "../utils/actionTypes";


export function filter(params,catePara) {
    return (dispatch) => {
        dispatch({type: FilterLoading});
        console.log(_getPostBody(params));
        NetUtils.post(FilterUrl, _getPostBody(params),
            (result) => {
                // console.log(result);
                dispatch({type: FilterLoaded, data: result.aggResultMap,value:catePara});
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

    if (params.cates) {
        if (Object.prototype.toString.call(params.cates) === '[object Array]') {
            if (params.cates.length > 0) {
                postBody.cateName = params.cates[0];
            }
        } else {
            postBody.cateName = params.cates;
        }

    }

    postBody.priceAutoSectionNum = 6;
    return postBody;
}

