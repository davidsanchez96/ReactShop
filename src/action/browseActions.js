import NetUtils from "../utils/NetUtils";
import {BrowseAddUrl, BrowseCleanUrl, BrowseListUrl, FollowDeleteUrl, URL} from "../utils/Constant";
import {
    BrowseListLoading, BrowseListShowMore, FollowAdd, FollowDelete, FollowListDelete, BrowseListLoaded, FollowState,
    NetError, BrowseListClean
} from "../utils/actionTypes";
import {AsyncStorage,} from 'react-native';


export function browseList(pageNum) {
    return (dispatch) => {
        if (pageNum > 0) {
            dispatch({type: BrowseListShowMore});
        } else {
            dispatch({type: BrowseListLoading});
        }

        AsyncStorage.getItem('KStoreApp@defaultRegion', (error, result) => {
            NetUtils.get(BrowseListUrl+ JSON.parse(result).districtId,
                (result) => {
                    // console.log(result);
                    let hasMore = false;
                    if (result.data.length < 10) {
                        hasMore = false;
                    } else {
                        hasMore = true;
                    }
                    dispatch({type: BrowseListLoaded, data: result.data, hasMore: hasMore, page: pageNum});
                },
                (error) => {
                    console.log(error);
                    dispatch({type: NetError});
                });
        });


    }
}

export function browseClean() {
    return (dispatch) => {
        dispatch({type: BrowseListLoading});
        NetUtils.delete(BrowseCleanUrl,
            (result) => {
                console.log(result);
                dispatch({type: BrowseListClean,});
            },
            (error) => {
                console.log(error);
                dispatch({type: NetError});
            });


    }
}
export function browseAdd(data) {
    return (dispatch) => {
        NetUtils.post(BrowseAddUrl,data,
            (result) => {
                console.log(result);
            },
            (error) => {
                console.log(error);
                dispatch({type: NetError});
            });


    }
}
export function followType(id,type) {
    return (dispatch) => {
        switch (type){
            case 'add':
                NetUtils.post(URL+`/goods/${id}/follower`,null,
                    (result) => {
                        console.log(result);
                        dispatch({type: FollowAdd});
                    },
                    (error) => {
                        console.log(error);
                        dispatch({type: NetError});
                    });
                break;
            case 'delete':
                NetUtils.delete(URL+`/goods/${id}/follower`,
                    (result) => {
                        console.log(result);
                        dispatch({type: FollowDelete});
                    },
                    (error) => {
                        console.log(error);
                        dispatch({type: NetError});
                    });
                break;
            case 'get':
                NetUtils.get(URL+`/goods/${id}/follower`,
                    (result) => {
                        console.log(result);
                        dispatch({type: FollowState, data: result});
                    },
                    (error) => {
                        console.log(error);
                        dispatch({type: NetError});
                    });
                break;
        }



    }
}

