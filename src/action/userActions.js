import NetUtils from "../utils/NetUtils";
import {AsyncStorage,} from 'react-native';
import {
    AreaUrl, OrderDetailUrl,
    URL,
    UserFollowUrl, UserLevelUrl, UserOrderUrl, UserRecordUrl, UserStatusUrl, UserUnreadUrl,
    UserUrl
} from "../utils/Constant";
import {
    Address, CommentDetailScore,
    NetError, UserBrowseRecord, UserFollow, UserLevel, UserLoaded, UserLoading, UserRecord, UserStatus,
    UserUnread
} from "../utils/actionTypes";
import Toast from 'react-native-root-toast';
import {detail} from "./detailActions";

export function user() {
    return (dispatch) => {
        dispatch({type: UserLoading});
        NetUtils.get(UserUrl,
            (result) => {
                console.log(result);
                dispatch({type: UserLoaded, data: result});
            },
            (error) => {
                console.log(error);
                dispatch({type: NetError});
            });
    }
}

export function userLevel() {
    return (dispatch) => {
        NetUtils.get(UserLevelUrl,
            (result) => {
                console.log(result);
                dispatch({type: UserLevel, data: result});
            },
            (error) => {
                console.log(error);
                dispatch({type: NetError});
            });
    }
}

export function userFollow() {
    return (dispatch) => {
        NetUtils.get(UserFollowUrl,
            (result) => {
                console.log(result);
                dispatch({type: UserFollow, data: result});
            },
            (error) => {
                console.log(error);
                dispatch({type: NetError});
            });
    }
}


export function userRecord() {
    return (dispatch) => {
        NetUtils.get(UserRecordUrl,
            (result) => {
                console.log(result);
                dispatch({type: UserRecord, data: result});
            },
            (error) => {
                console.log(error);
                dispatch({type: NetError});
            });
    }
}

export function userStatus() {
    return (dispatch) => {
        NetUtils.get(UserStatusUrl,
            (result) => {
                console.log(result);
                dispatch({type: UserStatus, data: result});
            },
            (error) => {
                console.log(error);
                dispatch({type: NetError});
            });
    }
}

export function userUnread() {
    return (dispatch) => {
        NetUtils.get(UserUnreadUrl,
            (result) => {
                console.log(result);
                dispatch({type: UserUnread, data: result});
            },
            (error) => {
                console.log(error);
                dispatch({type: NetError});
            });
    }
}

export function userOrder() {
    return (dispatch) => {
        NetUtils.get(UserOrderUrl,
            (result) => {
                console.log(result);
                AsyncStorage.setItem('hkshop@orderSetting', JSON.stringify(result));
            },
            (error) => {
                console.log(error);
                dispatch({type: NetError});
            });
    }
}

export function browse() {
    return (dispatch) => {
        AsyncStorage.getItem('hkshop@browseRecord', (error, result) => {
            if (!error) {
                dispatch({type: UserBrowseRecord, data: result ? result : '[]'});
            } else {
                if (__DEV__) {
                    console.log(error);
                }
                Toast.show('获取浏览记录错误');
            }
        });

    }
}

export function uploadAvatar(data) {
    return (dispatch) => {
        NetUtils.uploadFile(UserUrl + '/image', data,
            (result) => {
                Toast.show('修改成功!')
                dispatch(user());
                console.log(result);
            },
            (error) => {
                console.log(error);
                Toast.show('修改失败')
            })

    }
}

