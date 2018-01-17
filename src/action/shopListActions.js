import NetUtils from "../utils/NetUtils";
import {
    FollowListUrl, ShopListCountUrl, ShopListDeleteUrl, ShopListUpdateUrl, ShopListUrl,
    SuggestionUrl
} from "../utils/Constant";
import {
    CategorySelected, NetError, SuggestionLoading,
    SuggestionLoaded, FollowListLoaded, ShopListLoading, ShopListLoaded, ShopListUpdate, ShopListCount
} from "../utils/actionTypes";
import {AsyncStorage} from 'react-native';

export function shopList() {
    return (dispatch) => {
        dispatch({type: ShopListLoading});
        AsyncStorage.getItem('KStoreApp@defaultRegion', (error, result) => {
            NetUtils.get(ShopListUrl + JSON.parse(result).districtId,
                (result) => {
                    console.log(result);
                    dispatch(shopListCount());
                    dispatch({type: ShopListLoaded, data: result});
                },
                (error) => {
                    console.log(error);
                    dispatch({type: NetError});
                });
        });
    }
}

export function shopListUpdate(shoppingCartId, goodsNum) {
    return (dispatch) => {
        NetUtils.get(ShopListUpdateUrl + `${shoppingCartId}&goodsNum=${goodsNum}`,
            (result) => {
                console.log(result);
                dispatch({type: ShopListUpdate, shoppingCartId: shoppingCartId, goodsNum: goodsNum});
                dispatch(shopListCount())
            },
            (error) => {
                console.log(error);
                dispatch({type: NetError});
            });
    }
}


export function shopListCount() {
    return (dispatch) => {
        NetUtils.get(ShopListCountUrl,
            (result) => {
                console.log(result);
                dispatch({type: ShopListCount, data: result});
            },
            (error) => {
                console.log(error);
                dispatch({type: NetError});
            });
    }
}

export function shopListDelete(checkedList) {
    return (dispatch) => {
        NetUtils.get(ShopListDeleteUrl + `${checkedList.toArray()}`,
            (result) => {
                console.log(result);
                dispatch(shopList());
            },
            (error) => {
                console.log(error);
                dispatch({type: NetError});
            });
    }
}

