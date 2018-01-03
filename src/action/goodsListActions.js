import NetUtils from "../utils/NetUtils";
import {SearchUrl} from "../utils/Constant";
import {
    GoodsListDescending, GoodsListLoaded, GoodsListLoading, GoodsListReset, GoodsListSearch, GoodsListShow,
    GoodsListShowMore, NetError
} from "../utils/actionTypes";

const BASIC_PROP_NAMES = ['brands', 'added', 'thirdStatus', 'thirdShopId', 'showStock', 'freeShipment',
    'isCustomerDismount', 'districtId'];

export function goodsList(pageNum, searchParam, viewOption) {
    return (dispatch) => {
        if (pageNum > 0) {
            dispatch({type: GoodsListShowMore});
        } else {
            dispatch({type: GoodsListLoading});
        }
        console.log(_getPostBody(pageNum, searchParam, viewOption));
        NetUtils.post(SearchUrl, _getPostBody(pageNum, searchParam, viewOption),
            (result) => {
                // console.log(result);
                let hasMore = false;
                if (result.data.length < 10) {
                    hasMore = false;
                } else {
                    hasMore = true;
                }
                dispatch({type: GoodsListLoaded, data: result.data, hasMore: hasMore, page: pageNum});
            },
            (error) => {
                console.log(error);
                dispatch({type: NetError});
            });
    }
}

export function showBig() {
    return {
        type: GoodsListShow,
    }
}

export function searchPara(searchParam) {
    return {
        type: GoodsListSearch,
        searchParam: searchParam,
    }
}

export function reset() {
    return {
        type: GoodsListReset,
    }
}

export function descending(pageNum, searchParam,viewOption) {
    return (dispatch) => {
        dispatch({type: GoodsListDescending,viewOption:viewOption});
        dispatch(goodsList(pageNum, searchParam, viewOption))
    }
}

/**
 * 获取搜索POST请求Body
 * @private
 */
function _getPostBody(pageNum, searchParam, viewOption) {

    var postBody = {paramMap: {}};
    postBody['pageNum'] = pageNum ? pageNum : 0;

    if (viewOption) {
        const selectedFilterName = viewOption.selectedFilter;
        var sorts = [];
        if (selectedFilterName == 'typeFilter') {
            const filterSubName = viewOption.filterChecked;
            if (filterSubName == '综合') {
                //根据得分排序,不需要添加排序字段到服务端
            }
            else if (filterSubName == '新品') {
                sorts.push({
                    field: 'goodsInfoCreateTime',
                    order: viewOption.descending ? 1 : 0,
                });
            }
        }
        else if (selectedFilterName == 'salesFilter') {
            sorts.push({
                field: 'saleCount',
                order: viewOption.descending ? 1 : 0,
            });
        }
        else if (selectedFilterName == 'priceFilter') {
            sorts.push({
                field: 'price',
                order: viewOption.descending ? 1 : 0,
            });
        }

        if (sorts.length > 0) {
            postBody['sorts'] = sorts;
        }
    }
    if (searchParam) {
        for (let k in searchParam) {
            if (BASIC_PROP_NAMES.indexOf(k) !== -1) {
                postBody[k] = searchParam[k];
            }
            else if (k === 'searchText') {
                postBody['queryString'] = searchParam[k];
            }
            else if (k === 'cates') {
                postBody['cateName'] = searchParam[k][0];//.size > 0 ? searchParam[k].get(0) : null;
            }
            else if (k === 'priceAutoSectionNum') {
                return;
            }
            else if (k == 'prices') {
                postBody['prices'] = _getPricePostData(searchParam[k]);
            }
            else {
                postBody['paramMap'][k] = searchParam[k];
            }
        }
    }

    return postBody;
}

/**
 * 将价格区间字符串格式化为{min:22, max:666}
 * @param priceStrs
 * @private
 */
function _getPricePostData(priceStrArray) {
    var rangeArray = [];
    priceStrArray.map((priceStr) => {
        const numArray = priceStr.split('-');
        if (numArray.length == 2) {
            rangeArray.push({max: parseInt(numArray[1]), min: parseInt(numArray[0])});
        }
        else {
            rangeArray.push({min: parseInt(numArray[0])});
        }
    });

    return rangeArray;
}