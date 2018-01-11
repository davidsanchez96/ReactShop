'use strict';

import React, {Component} from 'react';
import {
    Dimensions, Image, InteractionManager, PixelRatio, Platform, ScrollView, StyleSheet, Text, TextInput,
    TouchableOpacity, View
} from 'react-native';
import {CommentDetailClean, CommentDetailScore} from "../../utils/actionTypes";
import {connect} from "react-redux";
import {commentDetail, submitComment} from "../../action/commentDetailActions";
import Loading from "../components/Loading";
import Rating from "../components/Rating";
import Toast from 'react-native-root-toast';


const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const placeholderText = '长度在1-500个字之间\n写下购买体会或使用过程中带来的帮助\n可以为其他小伙伴提供参考~';

const processImagePattern = /^[\d\D]*![\d]+$/;

class CommentDetail extends Component {
    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.viewable ? '评价' : '发表评价',
    });

    constructor(props) {
        super(props);
        this.state = {
            comment: '',
            score: 1,
            bigImgUrl: null
        }
    }


    componentDidMount() {
        const {navigation, dispatch} = this.props;
        if (navigation.state.params.id) {
            InteractionManager.runAfterInteractions(() => {
                dispatch(commentDetail(navigation.state.params.id))
            });
        }


    }

    componentDidUpdate() {
        const {commentDetailReducer, navigation} = this.props;
        if (commentDetailReducer.get('isSuccess')) {
            navigation.goBack();
            navigation.setParams({id:null})
        }
    }

    componentWillUnmount() {
        this.props.dispatch({type: CommentDetailClean})
    }

    render() {
        const {commentDetailReducer, dispatch, navigation} = this.props;
        if (!navigation.state.params.id) {
            return
        }
        let order_Goods = commentDetailReducer.get('orderGoods') == null ? [] : commentDetailReducer.get('orderGoods').toJS();
        let imageNum = commentDetailReducer.get('imageNum');

        //上传的图片信息
        let pic_map = commentDetailReducer.get('picMaps');

        //图片信息
        let picArray;
        //填写的内容
        let content;
        //评分值
        let scoreValue;

        let _this = this;


        return (
            <View style={styles.container}>
                <Loading visible={commentDetailReducer.get('loading')}/>
                <ScrollView bounces={false} style={{flex: 1}}
                            ref={(scrollView) => this._scrollView = scrollView}>

                    {
                        order_Goods.map((v, k) => {

                            if (pic_map.get(v.orderGoodsId) === undefined) {
                                picArray = [];
                                content = '';
                                scoreValue = 1;
                            } else {
                                picArray = pic_map.get(v.orderGoodsId).pic === undefined ? [] : pic_map.get(v.orderGoodsId).pic;
                                content = pic_map.get(v.orderGoodsId).text === undefined ? '' : pic_map.get(v.orderGoodsId).text;
                                scoreValue = pic_map.get(v.orderGoodsId).text === undefined ? 1 : pic_map.get(v.orderGoodsId).score;
                            }

                            let comment = pic_map.get(v.orderGoodsId);
                            comment = comment ? comment : {'persistentComment': false, 'persistentShare': false};

                            return (
                                <View style={styles.commentItem} key={k}>
                                    <View style={{paddingLeft: 20}}>
                                        <View style={styles.scoreContent}>
                                            <Image style={styles.thumb} source={{uri: v.goodsImg}}/>
                                            <View style={{paddingVertical: 10}}>
                                                <Text allowFontScaling={false}>评分：</Text>
                                                <Rating
                                                    rating={scoreValue}
                                                    style={{marginTop: 5}}
                                                    editable={!comment.persistentComment && !navigation.state.params.viewable}
                                                    callbackParent={(newState) => this.onChildChanged(dispatch, newState, v.orderGoodsId, v.goodsId, pic_map)}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                    {
                                        k == order_Goods.length - 1 && order_Goods.length >= 2 ?
                                            <TextInput
                                                style={styles.commentInput}
                                                placeholder={placeholderText}
                                                placeholderTextColor='#ddd'
                                                underlineColorAndroid='transparent'
                                                multiline={true}
                                                value={content}
                                                editable={!comment.persistentComment && !navigation.state.params.viewable}
                                                ref={component => this['_textInput' + k] = component}
                                                onFocus={() => this._changeScrollView(this['_textInput' + k])}
                                                onBlur={() => this._changeScrollHide(this['_textInput' + k])}
                                                onChangeText={(text) => this.onContentChanged(dispatch, text, v.orderGoodsId, v.goodsId)}/>
                                            :
                                            <TextInput
                                                style={styles.commentInput}
                                                placeholder={placeholderText}
                                                placeholderTextColor='#ddd'
                                                underlineColorAndroid='transparent'
                                                multiline={true}
                                                value={content}
                                                editable={!comment.persistentComment && !navigation.state.params.viewable}
                                                onChangeText={(text) => this.onContentChanged(dispatch, text, v.orderGoodsId, v.goodsId)}/>
                                    }
                                    <View style={styles.addImg}>
                                        <Text
                                            allowFontScaling={false}>{!comment.persistentComment && !navigation.state.params.viewable ? '添加晒单图片' : '晒单图片'}</Text>
                                        {/* 用之前的应该就行了吧 */}
                                        <View style={{marginTop: 10, flexDirection: 'row'}}>
                                            {
                                                this._getShareComps(v, picArray, comment.persistentComment, imageNum)
                                            }
                                        </View>
                                    </View>
                                </View>
                            )
                        })
                    }
                </ScrollView>

                {!navigation.state.params.viewable ?
                    <TouchableOpacity
                        style={styles.button}
                        activeOpacity={0.8}
                        onPress={() => this._handleSubmit(dispatch, navigation)}>
                        <Text style={styles.buttonText} allowFontScaling={false}>提交</Text>
                    </TouchableOpacity>
                    : null
                }
                {
                    this.state.bigImgUrl ?
                        <View style={styles.mask}>
                            <Image style={[styles.bigImg]} resizeMode='stretch' source={{uri: this.state.bigImgUrl}}/>
                            <TouchableOpacity
                                style={styles.closeBtn}
                                activeOpacity={0.8}
                                onPress={() => this.setState({bigImgUrl: ''})}
                            >
                                <Image style={styles.closeIcon} source={require('../components/img/plus.png')}/>
                            </TouchableOpacity>
                        </View> : null
                }
            </View>
        )
    }

    onChildChanged(dispatch, newState, orderGoodsId, goodsId, pic_map) {
        let parames = {score: newState, orderGoodsId: orderGoodsId, goodsId: goodsId};
        let orderInfos = pic_map.get(parames.orderGoodsId);
        if (orderInfos === undefined || orderInfos == null) {
            orderInfos = {'pic': [], 'score': 1, 'text': '', 'goodsId': parames.goodsId};
        }
        orderInfos.score = parames.score;
        pic_map.set(parames.orderGoodsId, orderInfos);
        dispatch({type: CommentDetailScore, data: pic_map});
        // appStore.cursor().set('picMaps', pic_map);
        // msg.emit('order:comment:score', {score: newState, orderGoodsId: orderGoodsId, goodsId: goodsId});
    }

    /**
     * 内容填写
     */
    onContentChanged(dispatch, text, orderGoodsId, goodsId) {
        let pic_map = this.props.commentDetailReducer.get('picMaps');
        let parames = {text: text, orderGoodsId: orderGoodsId, goodsId: goodsId};
        let orderInfos = pic_map.get(parames.orderGoodsId);
        if (orderInfos === undefined || orderInfos == null) {
            orderInfos = {'pic': [], 'score': 1, 'text': '', 'goodsId': parames.goodsId};
        }
        orderInfos.text = parames.text;
        pic_map.set(parames.orderGoodsId, orderInfos);
        dispatch({type: CommentDetailScore, data: pic_map});

        // msg.emit('order:comment:content', {text: text, orderGoodsId: orderGoodsId, goodsId: goodsId});
    }

    /**
     * 提交评论
     * @private
     */
    _handleSubmit(dispatch, navigation) {

        let resultMap = this.props.commentDetailReducer.get('picMaps');
        if (resultMap.size > 0) {
            let parames = [];
            let index = 0;
            let mustWrite = false;//评价内容必填
            let contentLength = false;//评价内容长度

            resultMap.forEach((v, k) => {
                if (v.text == '' || v.text == null) {
                    mustWrite = true;
                } else {
                    if (v.text.length > 500) {
                        contentLength = true;
                    }
                }

                parames[index] = {
                    orderGoodsId: k,
                    score: v.score,
                    imageNames: v.pic,
                    content: v.text,
                    goodsId: v.goodsId
                };
                index++;
            });

            if (mustWrite) {
                Toast.show('请填写评价内容!');

            }

            else if (contentLength) {
                Toast.show('填写内容的长度不能超过500个!');

            } else {
                dispatch(submitComment(navigation.state.params.id, parames))
                // //如果是从订单详情页过来,则重新跳转到订单详情页
                // if (paramesObj.level === 2) {
                //     //查询订单基础信息(重新刷新订单详细)
                //     msg.emit('order:evaluateFlag', '1');
                // }
                // msg.emit('route:backToLast');
                // msg.emit('order:list:refresh');
                // msg.emit('customers:account');
            }


        } else {
            Toast.show('请填写评价内容!');
        }


        // msg.emit('order:comment:submit', {orderId: this.props.orderId, level: this.props.level});
    }

    /**
     * 上传图片
     */
    uploadPic(index, orderGoodsId, goodsId) {
        //图片选项
        const options = {
            title: '',
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍照',
            chooseFromLibraryButtonTitle: '我的相册',
            customButtons: {},
            quality: 0.2,
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        //显示按钮
        UIImagePickerManager.showImagePicker(options, async (didCancel, response) => {

            if (didCancel) {

            } else { //点击'拍照'或者'我的相册'或者'自定义按钮'
                if (response.customButton) {
                } else {
                    if (__DEV__) {
                        console.log('response => ', response);
                    }
                    if (response.notImage) {
                        msg.emit('app:tip', "图片格式有误,请重新选择!");
                        return;
                    } else {
                        if (__DEV__) {
                            console.log('response uri ==>', response.uri);
                        }
                        try {
                            let path = response.uri.replace('file://', '');

                            if (Platform.OS !== 'ios') {
                                path = 'file://' + path;
                            }
                            const result = await ImageCrop.crop(path);
                            this._fileTransfer(result, index, orderGoodsId, goodsId);
                        } catch (err) {
                            if (__DEV__) {
                                console.log(err);
                            }
                            if (err.message != 'cancel') {
                                msg.emit('app:tip', '系统错误，请重试!');
                            }
                        }
                    }
                }
            }
        });
    }

    /**
     * 文件上传
     * @param uri
     * @private
     */
    _fileTransfer(uri, index, orderGoodsId, goodsId) {
        if (__DEV__) {
            console.log('uri======>', uri);
        }
        const fileName = uri.substring(uri.lastIndexOf('/') + 1);
        //FileUpload
        const obj = {
            uploadUrl: `${QMConfig.HOST}/order/proof/upload`,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + (window.token || '')
            },
            fields: {},
            files: [{
                name: 'image',
                filename: fileName,
                filepath: uri.replace('file://', ''),
            }]
        };
        msg.emit('app:tip', '正在上传请稍后...');
        FileUpload.upload(obj, function (err, result) {
            if (__DEV__) {
                console.log('upload:', err);
                console.log('upload:', result);
            }
            if (err) {
                msg.emit('app:tip', '上传失败');
            } else if (result && (result.status > 400 || result.status == 0)) {
                if (result.data != "") {
                    const errData = JSON.parse(result.data);
                    msg.emit('app:tip', errData.message);
                } else {
                    msg.emit('app:tip', '图片过大或者网络异常');
                }
            } else if (result) {
                msg.emit('app:tip', '上传成功!');
                msg.emit('order:comment:img:show', {
                    picUrl: JSON.parse(result.data).data,
                    index: index,
                    orderGoodsId: orderGoodsId,
                    goodsId: goodsId
                });
            }
        })
    }

    /**
     * 将原图换成缩微图,如果已经是小图,则不处理
     * @param originPicUrl
     * @private
     */
    _formatPicUrl(originPicUrl) {
        if (!originPicUrl) {
            return '';
        }

        //正则表达式匹配又拍云小图
        if (originPicUrl.match(processImagePattern)) {
            return originPicUrl;
        }

        return originPicUrl + '!' + QMConfig.RETURN_GOODS_PROOF_SIZE;
    }

    /**
     * 获取商品晒单图片显示空间
     * @param orderGoodsInfo
     * @param picArray
     * @param persistentShare
     * @param imageNum
     * @private
     */
    _getShareComps(orderGoodsInfo, picArray, persistentShare, imageNum) {
        let _this = this;
        let imageComps;
        if (!persistentShare && !this.props.navigation.state.params.viewable) {
            imageComps = new Array(imageNum).fill(0).map(function (_, i) {
                return (<View key={i}>
                    {
                        (picArray[i] === undefined || picArray[i] == '') ?
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={styles.addPic}
                                onPress={_this.uploadPic.bind(_this, i, orderGoodsInfo.orderGoodsId, orderGoodsInfo.goodsId)}>
                                <Image style={styles.addIcon} source={require('../components/img/plus.png')}/>
                            </TouchableOpacity> :
                            <View style={{marginRight: 20}}>
                                <TouchableOpacity onPress={() => _this._showBigImg(picArray[i])}>
                                    <Image source={{uri: _this._formatPicUrl(picArray[i])}} style={styles.pic}/>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.deletePic} activeOpacity={0.8} onPress={() => {
                                    msg.emit('order:comment:img:show', {
                                        picUrl: '', index: i,
                                        orderGoodsId: orderGoodsInfo.orderGoodsId, goodsId: orderGoodsInfo.goodsId
                                    });
                                }}>
                                    <Image style={styles.deleteIcon} source={require('../components/img/plus.png')}/>
                                </TouchableOpacity>
                            </View>
                    }
                </View>)
            })
        }
        else {
            if (!picArray || picArray.length == 0) {
                imageComps = (
                    <Text allowFontScaling={false}>无</Text>
                )
            }
            else {
                imageComps = picArray.map(function (picUrl) {
                    return (
                        <View style={{marginRight: 20}} key={picUrl}>
                            <TouchableOpacity onPress={() => _this._showBigImg(picUrl)}>
                                <Image source={{uri: _this._formatPicUrl(picUrl)}} style={styles.pic}/>
                            </TouchableOpacity>
                        </View>
                    );
                });
            }
        }

        return imageComps;
    }

    _changeScrollView(comp) {
        console.log('_changeScrollView is called', comp);
        comp.measure((fx, fy, width, height, px, py) => {
            if (SCREEN_HEIGHT - py <= (250 + height)) {
                UIManager.measure(this._scrollView.getInnerViewNode(), (...data) => {
                    this._scrollView.scrollTo(data[3] - SCREEN_HEIGHT + 110 + height, 0);
                });
            }
        })
    }

    _changeScrollHide(comp) {
        console.log('_changeScrollHide is called', comp);
        UIManager.measure(this._scrollView.getInnerViewNode(), (...data) => {
            this._scrollView.scrollTo(data[3] - SCREEN_HEIGHT + 110, 0);
        });
    }

    _showBigImg(url) {
        let originUrl = url.indexOf('!') === -1 ? url : url.substring(0, url.indexOf('!'));
        this.setState({
            bigImgUrl: originUrl
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee'
    },
    commentItem: {
        marginBottom: 10,
        backgroundColor: '#fff'
    },
    scoreContent: {
        borderBottomWidth: 1 / PixelRatio.get(),
        borderBottomColor: '#eee',
        paddingVertical: 15,
        flexDirection: 'row'
    },
    thumb: {
        width: 60,
        height: 60,
        marginRight: 15,
        borderWidth: 1 / PixelRatio.get(),
        borderColor: '#ddd',
        borderRadius: 5,
    },
    commentInput: {
        height: 110,
        fontSize: 14,
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1 / PixelRatio.get(),
        borderBottomColor: '#eee'
    },
    addImg: {
        paddingVertical: 15,
        paddingHorizontal: 20
    },
    button: {
        height: 50,
        flexDirection: 'row',
        backgroundColor: '#E43A58',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
        alignSelf: 'center'
    },
    pic: {
        width: 50,
        height: 50
    },
    addPic: {
        width: 50,
        height: 50,
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: (SCREEN_WIDTH - 280) / 5
    },
    addIcon: {
        width: 15,
        height: 15,
        tintColor: '#999'
    },
    deletePic: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#eee',
        position: 'absolute',
        top: -10,
        right: -10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    deleteIcon: {
        tintColor: '#999',
        width: 10,
        height: 10,
        transform: [{rotate: '45deg'}]
    },
    mask: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        backgroundColor: 'rgba(0, 0, 0, .5)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    bigImg: {
        width: SCREEN_WIDTH * 0.8,
        height: SCREEN_HEIGHT * 0.6,
    },
    closeBtn: {
        position: 'absolute',
        top: 20,
        right: 10
    },
    closeIcon: {
        transform: [{rotate: '45deg'}],
        tintColor: '#fff',
        width: 20,
        height: 20
    }
});

const mapStateToProps = (state) => ({
    commentDetailReducer: state.get('commentDetailReducer')
});
export default connect(mapStateToProps)(CommentDetail);
