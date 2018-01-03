import NetUtils from "../utils/NetUtils";
import {DetailUrl} from "../utils/Constant";
import {CommentLoaded, CommentLoading, NetError} from "../utils/actionTypes";

export function comment(goodsInfoId,commentsType,page) {
    return (dispatch) => {
        dispatch({type: CommentLoading});
        let url = DetailUrl + `comments?goodsInfoId=${goodsInfoId}&commentType=${commentsType}&pageNum=${page}`;
        NetUtils.get(url,
            (result) => {
                console.log(url + result.data);
                let hasMore = false;
                if (result.data.length < 10) {
                    hasMore = false;
                } else {
                    hasMore = true;
                }
                dispatch({type: CommentLoaded, data: result.data, hasMore: hasMore, page: page});
            },
            (error) => {
                console.log(error);
                dispatch({type: NetError});
            });
    }
}

