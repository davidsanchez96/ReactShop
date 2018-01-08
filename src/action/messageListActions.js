import NetUtils from "../utils/NetUtils";
import {
    MessageDeleteAllUrl, MessageDeleteUrl, MessageListUrl, MessageReadAllUrl,
    MessageReadUrl
} from "../utils/Constant";
import {
    MessageListClean,
    MessageListEdit,
    MessageListLoaded, MessageListLoading, MessageListShowMore, MessageListTotal,
    NetError
} from "../utils/actionTypes";


export function messageList(pageNum) {
    return (dispatch) => {
        if (pageNum > 0) {
            dispatch({type: MessageListShowMore});
        } else {
            dispatch({type: MessageListLoading});
        }

        NetUtils.get(MessageListUrl + '?pageNum=' + pageNum,
            (result) => {
                console.log(result);
                dispatch({
                    type: MessageListLoaded,
                    data: result.data,
                    hasMore: result.data.length >= 10,
                    page: pageNum
                });
                dispatch({type: MessageListTotal, data: result.total});
            },
            (error) => {
                console.log(error);
                dispatch({type: NetError});
            });
    }
}

export function messageRead(id,refresh) {
    return (dispatch) => {
        NetUtils.put(MessageReadUrl + id, null,
            (result) => {
                console.log(result);
                if(refresh){
                    dispatch({type: MessageListClean});
                    dispatch(messageList(0));
                }

            },
            (error) => {
                console.log(error);
                dispatch({type: NetError});
            });
    }
}

export function messageReadAll() {
    return (dispatch) => {
        NetUtils.put(MessageReadAllUrl, null,
            (result) => {
                console.log(result);
                dispatch({type: MessageListClean});
                dispatch(messageList(0));
            },
            (error) => {
                console.log(error);
                dispatch({type: NetError});
            });
    }
}

export function messageDelete(id) {
    return (dispatch) => {
        NetUtils.delete(MessageDeleteUrl + id,
            (result) => {
                console.log(result);
                dispatch({type: MessageListClean});
                dispatch(messageList(0));
            },
            (error) => {
                console.log(error);
                dispatch({type: NetError});
            });
    }
}

export function messageDeleteAll() {
    return (dispatch) => {
        NetUtils.delete(MessageDeleteAllUrl,
            (result) => {
                console.log(result);
                dispatch({type: MessageListClean});
                dispatch(messageList(0));
            },
            (error) => {
                console.log(error);
                dispatch({type: NetError});
            });
    }
}



