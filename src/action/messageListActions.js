import NetUtils from "../utils/NetUtils";
import {MessageListUrl, MessageReadUrl} from "../utils/Constant";
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

export function messageRead(id) {
    return (dispatch) => {
        NetUtils.put(MessageReadUrl + id, null,
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



