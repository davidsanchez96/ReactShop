import NetUtils from "../utils/NetUtils";
import {CategoryUrl, OrderDetailUrl, UserUrl} from "../utils/Constant";
import {
    CommentDetailLoaded, CommentDetailLoading, CommentDetailScore, CommentDetailSuccess, NetError,
} from "../utils/actionTypes";
import {fromJS} from "immutable";
import {DeviceEventEmitter} from 'react-native';
import {user} from "./userActions";
import Toast from "react-native-root-toast";

export function commentDetail(orderId) {
    return (dispatch) => {
        dispatch({type: CommentDetailLoading});
        let url = OrderDetailUrl + `/${orderId}/goods/comment`;
        NetUtils.get(url,
            (result) => {
                console.log(url + result.data);

                const orderGoodsList = fromJS(result);
                let resultMap = new Map();
                (orderGoodsList == null ? [] : orderGoodsList.toJS()).forEach((v, k) => {
                    let comment = v.comment;
                    let score = comment ? Math.round(comment.commentScore) : 1;
                    let text = comment ? comment.commentContent : '';
                    let picArray = [];
                    //是否已经评价
                    let persistentComment = comment ? true : false;
                    if (comment && comment.shareList) {
                        comment.shareList.map(function (share) {
                            if (share.shareImgList) {
                                share.shareImgList.map(function (shareImage) {
                                    if (shareImage.imageName) {
                                        picArray.push(shareImage.imageName);
                                    }
                                });
                            }
                        });
                    }

                    //是否已经晒单
                    let persistentShare = picArray.length > 0 ? true : false;
                    resultMap.set(v.orderGoodsId, {
                        'pic': picArray,
                        'score': score,
                        'text': text,
                        'goodsId': v.goodsId,
                        'persistentComment': persistentComment,
                        'persistentShare': persistentShare
                    });
                });

                dispatch({type: CommentDetailLoaded, data: orderGoodsList, map: resultMap});
            },
            (error) => {
                console.log(error);
                dispatch({type: NetError});
            });
    }
}

export function submitComment(orderId, data) {
    return (dispatch) => {
        dispatch({type: CommentDetailLoading});
        let url = OrderDetailUrl + `/${orderId}/share`;
        NetUtils.post(url, data,
            (result) => {
                console.log(CategoryUrl + result);
                dispatch({type: CommentDetailSuccess});
                DeviceEventEmitter.emit('userRefresh','1');
            },
            (error) => {
                console.log(error);
                dispatch({type: NetError});
            });
    }
}

export function uploadImage(data,index, orderGoodsId, goodsId,pic_map) {
    return (dispatch) => {
        NetUtils.uploadFile(OrderDetailUrl + '/proof/upload', data,
            (result) => {
                Toast.show('上传成功!');
                // let pic_map = commentDetailReducer.get('picMaps');
                let orderInfos = pic_map.get(orderGoodsId);
                if (orderInfos === undefined || orderInfos == null) {
                    orderInfos = {'pic': [], 'score': 1, 'text': '', 'goodsId': goodsId};
                }
                orderInfos.pic[index] = result.data;
                pic_map.set(orderGoodsId, orderInfos);
                dispatch({type: CommentDetailScore, data: pic_map});
                console.log(result);
            },
            (error) => {
                console.log(error);
                Toast.show('修改失败')
            })

    }
}