import NetUtils from "../utils/NetUtils";
import {SearchUrl} from "../utils/Constant";
import {
    NetError, GoodsListLoading, GoodsListLoaded
} from "../utils/actionTypes";

const BASIC_PROP_NAMES = ['brands', 'added', 'thirdStatus', 'thirdShopId', 'showStock', 'freeShipment',
    'isCustomerDismount', 'districtId'];

export function goodsList(pageNum,queryString,viewOption,searchParam) {
    return (dispatch) => {
        dispatch({type: GoodsListLoading});
        NetUtils.post(SearchUrl, _getPostBody(pageNum,queryString,viewOption,searchParam),
            (result) => {
                console.log(result.data);
                dispatch({type: GoodsListLoaded, data: result.data});
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
function _getPostBody(pageNum,queryString,viewOption,searchParam) {

    var postBody = {};
    postBody['queryString'] = queryString?queryString:'';
    postBody['pageNum'] = pageNum ? pageNum : 0;

    if (viewOption) {
        const selectedFilterName = viewOption.get('selectedFilter');
        var sorts = [];
        if (selectedFilterName == 'typeFilter') {
            const filterSubName = viewOption.get('filterChecked');
            if (filterSubName == '综合') {
                //根据得分排序,不需要添加排序字段到服务端
            }
            else if (filterSubName == '新品') {
                sorts.push({
                    field: 'goodsInfoCreateTime',
                    order: viewOption.get('descending') ? 1 : 0,
                });
            }
        }
        else if (selectedFilterName == 'salesFilter') {
            sorts.push({
                field: 'saleCount',
                order: viewOption.get('descending') ? 1 : 0,
            });
        }
        else if (selectedFilterName == 'priceFilter') {
            sorts.push({
                field: 'price',
                order: viewOption.get('descending') ? 1 : 0,
            });
        }

        if (sorts.length > 0) {
            postBody['sorts'] = sorts;
        }
    }
    if (searchParam) {
        searchParam.map((v, k) => {
            if (BASIC_PROP_NAMES.indexOf(k) !== -1) {
                postBody[k] = v;
            }
            else if (k === 'searchText') {

            }
            else if (k === 'cates') {
                postBody['cateName'] = v.size > 0 ? v.get(0) : null;
            }
            else if (k === 'priceAutoSectionNum') {
                return;
            }
            else if (k == 'prices') {
                postBody['prices'] = _getPricePostData(v);
            }
            else {
                postBody['paramMap'][k] = v;
            }
        });
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
    priceStrArray.toJS().map((priceStr) => {
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