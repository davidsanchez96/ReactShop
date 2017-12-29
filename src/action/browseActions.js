import NetUtils from "../utils/NetUtils";
import {BrowseAddUrl, BrowseCleanUrl, BrowseGetUrl, BrowseListUrl} from "../utils/Constant";
import {BrowseListClean, BrowseListLoaded, BrowseListLoading, BrowseListShowMore, NetError} from "../utils/actionTypes";
import {AsyncStorage,} from 'react-native';
import Toast from 'react-native-root-toast';


export function browseList(pageNum) {
    return (dispatch) => {
        if (window.token) {
            if (pageNum > 0) {
                dispatch({type: BrowseListShowMore});
            } else {
                dispatch({type: BrowseListLoading});
            }

            AsyncStorage.getItem('KStoreApp@defaultRegion', (error, result) => {
                NetUtils.get(BrowseListUrl + JSON.parse(result).districtId,
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
        } else {
            AsyncStorage.getItem('hkshop@browseRecord', (err, data) => {
                if (err || !data) {
                    dispatch({
                        type: BrowseListLoaded,
                        data: [],
                        hasMore: false,
                        page: 0,
                    });
                } else {
                    AsyncStorage.getItem('KStoreApp@defaultRegion', (error, result) => {

                        const idsStr = JSON.parse(data).reverse().map(function (t) {
                            return t.goodsId
                        }).filter(onlyUnique).join(',');
                        if (idsStr !== '') {
                            NetUtils.get(BrowseGetUrl + `/${idsStr}?region=${JSON.parse(result).districtId}`,
                                (result) => {
                                    dispatch({
                                        type: BrowseListLoaded,
                                        data: result.data,
                                        hasMore: false,
                                        page: 0
                                    });
                                },
                                (error) => {
                                    console.log(error);
                                    dispatch({type: NetError});
                                });
                        }else {
                            dispatch({
                                type: BrowseListLoaded,
                                data: [],
                                hasMore: false,
                                page: 0,
                            });
                        }
                    });
                }
            });
        }
    }
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
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
        let storeData = [];
        AsyncStorage.getItem('hkshop@browseRecord', (error, result) => {
            if (error) {
                Toast.show('系统错误，请重试!');
            } else {
                if (result) {
                    storeData = JSON.parse(result);
                } else {
                    storeData = [];
                }
                const record = {
                    goodsId: data[0],
                    createTime: new Date(),
                    sync: false,
                };
                storeData.push(record);
                if (storeData.length > 30) {
                    storeData.shift();
                }

                AsyncStorage.setItem('hkshop@browseRecord', JSON.stringify(storeData));

                if (window.token) {
                    NetUtils.post(BrowseAddUrl, data,
                        (result) => {
                            console.log(result);
                        },
                        (error) => {
                            console.log(error);
                            dispatch({type: NetError});
                        });
                }
            }
        });


    }
}


