import NetUtils from "../utils/NetUtils";
import {AsyncStorage,} from 'react-native';
import {
    UserFollowUrl, UserLevelUrl, UserOrderUrl, UserRecordUrl, UserStatusUrl, UserUnreadUrl,
    UserUrl
} from "../utils/Constant";
import {NetError, UserFollow, UserLevel, UserLoaded, UserLoading, UserRecord, UserUnread} from "../utils/actionTypes";

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
                dispatch({type: UserRecord, data: result});
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

