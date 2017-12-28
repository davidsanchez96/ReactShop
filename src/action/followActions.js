import NetUtils from "../utils/NetUtils";
import {FollowDeleteUrl, FollowListUrl, SearchUrl} from "../utils/Constant";
import {
    NetError, GoodsListLoading, GoodsListLoaded, GoodsListShow, GoodsListShowMore, GoodsListSearch, GoodsListReset,
    GoodsListDescending, FollowListShowMore, FollowListLoading, FollowListLoaded, FollowListDelete
} from "../utils/actionTypes";
import {
    AsyncStorage,
} from 'react-native';


export function followList(pageNum) {
    return (dispatch) => {
        if (pageNum > 0) {
            dispatch({type: FollowListShowMore});
        } else {
            dispatch({type: FollowListLoading});
        }

        AsyncStorage.getItem('KStoreApp@defaultRegion', (error, result) => {
            NetUtils.get(FollowListUrl + JSON.parse(result).districtId,
                (result) => {
                    // console.log(result);
                    let hasMore = false;
                    if (result.data.length < 10) {
                        hasMore = false;
                    } else {
                        hasMore = true;
                    }
                    dispatch({type: FollowListLoaded, data: result.data, hasMore: hasMore, page: pageNum});
                },
                (error) => {
                    console.log(error);
                    dispatch({type: NetError});
                });
        });


    }
}

export function followDelete(id,index) {
    return (dispatch) => {

        NetUtils.delete(FollowDeleteUrl + id,
            (result) => {
                console.log(result);
                dispatch({type: FollowListDelete, data: index});
            },
            (error) => {
                console.log(error);
                dispatch({type: NetError});
            });


    }
}

