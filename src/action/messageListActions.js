import NetUtils from "../utils/NetUtils";
import {MessageListUrl} from "../utils/Constant";
import {
    MessageListLoaded, MessageListLoading, MessageListShowMore, MessageListTotal,
    NetError
} from "../utils/actionTypes";


export function messageList(pageNum,status) {
    return (dispatch) => {
        if (pageNum > 0) {
            dispatch({type: MessageListShowMore});
        } else {
            dispatch({type: MessageListLoading});
        }

        NetUtils.get(MessageListUrl +'?pageNum=' + pageNum,
            (result) => {
                console.log(result);
                dispatch({type: MessageListLoaded, data: result.data, hasMore: result.data.length >= 10, page: pageNum});
                dispatch({type: MessageListTotal, data: result.total});
            },
            (error) => {
                console.log(error);
                dispatch({type: NetError});
            });


    }
}



