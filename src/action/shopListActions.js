import NetUtils from "../utils/NetUtils";
import {FollowListUrl, ShopListUrl, SuggestionUrl} from "../utils/Constant";
import {
    CategorySelected, NetError, SuggestionLoading,
    SuggestionLoaded, FollowListLoaded, ShopListLoading, ShopListLoaded
} from "../utils/actionTypes";
import {AsyncStorage} from 'react-native';

export function shopList() {
    return (dispatch) => {
        dispatch({type: ShopListLoading});
        AsyncStorage.getItem('KStoreApp@defaultRegion', (error, result) => {
            NetUtils.get(ShopListUrl + JSON.parse(result).districtId ,
                (result) => {
                    console.log(result);

                    dispatch({type: ShopListLoaded, data: result});
                },
                (error) => {
                    console.log(error);
                    dispatch({type: NetError});
                });
        });
    }
}

