'use strict'
import React, {Component} from 'react';
import {
    ActivityIndicator, Dimensions, FlatList, Image, InteractionManager, StyleSheet, Text, TouchableOpacity,
    View, Alert,
} from 'react-native';

import Immutable from "immutable";
import {connect} from "react-redux";
import {orderList, orderListUpdateStatus, orderSetting} from "../../action/orderListActions";
import {orderDataDict} from "../../utils/orderstatus";
import {OrderListClean} from "../../utils/actionTypes";
import {messageDeleteAll} from "../../action/messageListActions";
import {orderUpdateStatus} from "../../action/orderDetailActions";

const {width: SCREEN_WIDTH} = Dimensions.get('window');
//dp: 相当于数据字典
const PAY_STATUS = {
    1: '在线支付',
    0: '货到付款',
};
let page = 0, status;

class Order extends Component {
    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.title,
    });

    shouldComponentUpdate(nextProps, nextState) {
        return !Immutable.is(this.props.orderListReducer, nextProps.orderListReducer) ||
            !Immutable.is(Immutable.Map(this.state), Immutable.Map(nextState));
    }

    /**
     * 首页加载成功之后,通知调用apis中的ajax,获取ajax对象
     */
    componentDidMount() {
        page = 0;
        status = this.props.navigation.state.params.status;
        this.props.dispatch(orderSetting());
        InteractionManager.runAfterInteractions(() => {
            this.props.dispatch(orderList(page, status))
        });
    }

    componentDidUpdate() {
        if (this.props.orderListReducer.refresh) {
            page = 0;
            InteractionManager.runAfterInteractions(() => {
                this.props.dispatch(orderList(page, status))
            });
        }
    }

    /**
     * destroy
     */
    componentWillUnmount() {
        this.props.dispatch({type: OrderListClean})
    }


    /**
     * 点击详细按钮
     *
     * @private
     */
    rowPressed(orderInfo, navigation) {
        let status = orderInfo.orderStatus;
        let isBack = orderInfo.isBack;
        //所有的退款状态
        if (status === '15' || status === '18' || (isBack === '2' && status === '13') || (isBack === '2' && status === '11')) {
            msg.emit('route:goToNext', {
                sceneName: 'BackMoney', orderId: orderInfo.orderId,
                status: status, orderCode: orderInfo.orderCode, isBack: isBack
            });
            //所有的退货状态
        } else if (status === '9' || status === '10' || (isBack === '1' && status === '13')
            || status === '14' || status === '17' || (isBack === '1' && status === '11') || status === '16') {
            msg.emit('route:goToNext', {
                sceneName: 'BackGoodsDetail', orderId: orderInfo.orderId,
                status: status, orderCode: orderInfo.orderCode, isBack: isBack
            });
        } else if (status === '8') {//填写回寄信息
            msg.emit('route:goToNext', {sceneName: 'BackGoodsDetail', orderId: orderInfo.orderId});
        } else if (status === '3' && navigation.state.params.status == 3) {
            //如果是从待评价页面过去的,需要加个flag标志进行区分,只展示评价按钮
            // msg.emit('route:goToNext', {sceneName: 'OrderDetail', orderId: orderInfo.orderId, status: status, flag: 1});
            navigation.navigate('OrderDetail', {id: orderInfo.orderId, status: status, flag: 1})
        } else {
            // msg.emit('route:goToNext', {sceneName: 'OrderDetail', orderId: orderInfo.orderId, status: status});
            navigation.navigate('OrderDetail', {id: orderInfo.orderId, status: status})
        }

    }

    /**
     * 再次购买
     * @param orderId
     */
    addCart(orderId) {
        msg.emit('order:list:addCart', orderId);
    }

    /**
     * 申请退货
     * @param orderId
     */
    supplyBackGoods(orderInfo, flag) {
        msg.emit('order:list:supplyBackGoods', orderInfo, flag);
    }

    /**
     * 查看物流信息
     * @param orderId
     */
    expressDetail(orderId) {
        msg.emit('route:goToNext', {sceneName: 'Express', orderId: orderId});
    }

    /**
     * 确认收货
     * @param orderId
     */
    affirmGoods(orderId, status) {

        Alert.alert('提示', '是否确认收货?', [
            {text: '取消'},
            {
                text: '确定', onPress: () => {
                    dispatch(orderListUpdateStatus(orderId, status));
                }
            }
        ]);


        // msg.emit('app:alert', {
        //     title: '提示',
        //     msgContent: '是否确认收货?',
        //     okHandle: () => {
        //         msg.emit('order:list:update', {orderId: orderId, status: status});
        //     }
        // });
    }

    /**
     * 查看退货进度
     * @param orderInfo
     */
    backLogs(orderInfo) {
        msg.emit('route:goToNext', {sceneName: 'BackLog', orderId: orderInfo.orderId, isBack: orderInfo.isBack});
    }

    /**
     * 取消订单
     * @param orderInfo
     */
    orderCancel(navigation, dispatch, orderId) {
        navigation.navigate('OrderCancel', {
            orderId: orderId, level: 1, callBack: () => {
                page = 0;
                dispatch(orderList(page, status));
            }
        });

        // msg.emit('route:goToNext', {sceneName: 'OrderCancel', orderId: orderId, level: 1});
    }

    /**
     * 填写回寄地址
     * @param orderCode
     * @param orderId
     */
    addBackAddress(orderCode, orderId) {
        msg.emit('route:goToNext', {sceneName: 'BackAddress', orderNo: orderCode, level: 1, orderId: orderId});
    }


    /**
     * 支付
     */
    payOrder(orderPrice, orderCode) {
        //调用原生的
        msg.emit('route:goToNext', {sceneName: 'PayOrder', orderPrice: orderPrice, orderCode: orderCode});
    }


    /**
     * 评价
     */
    waitAppraise(navigation, dispatch, orderId, viewable) {
        navigation.navigate('CommentDetail', {
            id: orderId, viewable: viewable ? true : false, callBack: () => {
                InteractionManager.runAfterInteractions(() => {
                    page = 0;
                    dispatch(orderList(page, status));
                });
            }
        });
        // msg.emit('route:goToNext', {sceneName: 'MakeComment', orderId: orderId, viewable: viewable ? true : false});
    }

    render() {

        //查询数据的url
        // var url;
        // if (this.props.status === undefined) {
        //     url = `${QMConfig.HOST}/orders`;
        // } else if (this.props.status === 3) {
        //     url = `${QMConfig.HOST}/orders/unappraised`;
        // } else {
        //     url = `${QMConfig.HOST}/orders/${this.props.status}`;
        // }

        // var titlename;
        // if (this.props.status == 0) {
        //     titlename = '待付款订单';
        // } else if (this.props.status == 2) {
        //     titlename = '待收货订单';
        // } else if (this.props.status == 19) {
        //     titlename = '退款/退货订单';
        // } else if (this.props.status == 3) {
        //     titlename = '待评价订单';
        // } else {
        //     titlename = '全部订单';
        // }
        const {orderListReducer, dispatch, navigation} = this.props;
        const loading = orderListReducer.loading;
        const reloading = orderListReducer.reloading;
        const hasMore = orderListReducer.hasMore;
        const loadingMore = orderListReducer.loadingMore;
        return (
            <View style={{flex: 1, backgroundColor: '#eee'}}>
                <FlatList
                    renderItem={({item}) => this._renderItem(item, orderListReducer, navigation, dispatch)}
                    ListEmptyComponent={() => {
                        if (loading || reloading) {
                            return null;
                        } else {
                            return <View style={styles.noDataContainer}>
                                <Image style={styles.emptyIcon}
                                       source={require('../components/img/list.png')}/>
                                <Text style={styles.txt}
                                      allowFontScaling={false}>暂无相关订单！</Text>
                            </View>

                        }
                    }}
                    ListFooterComponent={() => {
                        if (loading || orderListReducer.data.length === 0)
                            return null;
                        if (hasMore) {
                            return (
                                <View style={styles.footer}>
                                    <ActivityIndicator/>
                                    <Text>正在加载更多数据...</Text>
                                </View>
                            );
                        } else {
                            return (
                                <View style={styles.footer}>
                                    <Text>
                                        没有更多数据了
                                    </Text>
                                </View>

                            );
                        }
                    }}
                    keyExtractor={item => item.orderId}
                    removeClippedSubviews={false}
                    data={orderListReducer.data}
                    onRefresh={() => {
                        page = 0;
                        dispatch(orderList(page, status));
                    }}
                    refreshing={loading}
                    onEndReached={() => {
                        if (hasMore && !loading && !loadingMore) {
                            page++;
                            dispatch(orderList(page, status));
                        }
                    }}
                    onEndReachedThreshold={10}
                />


            </View>
        );
    }

    /**
     * 订单row row表示当前行记录的对象
     */
    _renderItem(row, orderListReducer, navigation, dispatch) {
        let status = orderDataDict.getOrderStatusDesc(row);
        var buttonContents;

        if (row.orderStatus === '0' && row.orderLinePay === 1) {
            buttonContents = (
                <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>


                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={[styles.btnContainer, styles.expressbutton]}
                        onPress={() => {

                        }}>
                        <Text
                            style={[styles.text, styles.expressbuttonText]}
                            allowFontScaling={false}>
                            取消订单
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={[styles.btnContainer, styles.button]}
                        onPress={() => {
                            this.payOrder(row.orderPrice, row.orderOldCode)
                        }}>
                        <Text
                            style={[styles.text, styles.buttonText]}
                            allowFontScaling={false}>
                            支付
                        </Text>
                    </TouchableOpacity>


                </View>
            )
            status = PAY_STATUS[row.orderLinePay];
        } else if ((row.orderStatus === '1' || row.orderStatus === '5' || row.orderStatus === '6') && row.orderLinePay === 1) {
            buttonContents = (
                orderListReducer.orderSetting.canBackOrder == '1'
                    ?

                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={[styles.btnContainer, styles.button]}
                        onPress={() => {
                            this.supplyBackGoods.bind(this, row, 1)
                        }}>
                        <Text
                            style={[styles.text, styles.buttonText]}
                            allowFontScaling={false}>
                            申请退款
                        </Text>
                    </TouchableOpacity>
                    :
                    null
            )
        } else if (row.orderStatus === '0' && row.orderLinePay === 0) {//等于0同意支付方式是货到付款的
            buttonContents = (
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[styles.btnContainer, styles.expressbutton]}
                    onPress={() => {
                        this.orderCancel(navigation, dispatch, row.orderId)
                    }}>
                    <Text
                        style={[styles.text, styles.expressbuttonText]}
                        allowFontScaling={false}>
                        取消订单
                    </Text>
                </TouchableOpacity>

            )
            status = '待发货';
        } else if (row.orderStatus === '3') {

            //先判断是否是待评价页面,flag 不为空表示进入待评价页面
            //flag =1 表示进入待评价页面,2 表示进入退款对货页面(不能有评价按钮),3 表示进入全部订单(可以有评价按钮,评价后可以查看)

            if (navigation.state.params.flag == 1) {
                buttonContents = (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={[styles.btnContainer, styles.button]}
                        onPress={() => {
                            this.waitAppraise(navigation, dispatch, row.orderId)
                        }}>
                        <Text
                            style={[styles.text, styles.buttonText]}
                            allowFontScaling={false}>
                            评价
                        </Text>
                    </TouchableOpacity>
                )
            } else if (navigation.state.params.flag == 2) {

                buttonContents = (
                    orderListReducer.orderSetting.canBackOrder == '1'
                        ?
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={[styles.btnContainer, styles.button]}
                            onPress={() => {
                                this.supplyBackGoods.bind(this, row, 2)
                            }}>
                            <Text
                                style={[styles.text, styles.buttonText]}
                                allowFontScaling={false}>
                                申请退货
                            </Text>
                        </TouchableOpacity>
                        :
                        null)
            } else {

                if (row.appraise) {//可以评价
                    buttonContents = (
                        orderListReducer.orderSetting.canBackOrder == '1'
                            ?
                            <View style={{flexDirection: 'row'}}>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={[styles.btnContainer, styles.button]}
                                    onPress={() => {
                                        this.waitAppraise(navigation, dispatch, row.orderId)
                                    }}>
                                    <Text
                                        style={[styles.text, styles.buttonText]}
                                        allowFontScaling={false}>
                                        评价
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={[styles.btnContainer, styles.button]}
                                    onPress={() => {
                                        this.supplyBackGoods.bind(this, row, 2)
                                    }}>
                                    <Text
                                        style={[styles.text, styles.buttonText]}
                                        allowFontScaling={false}>
                                        申请退货
                                    </Text>
                                </TouchableOpacity>

                            </View>
                            :
                            <View style={{flexDirection: 'row'}}>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={[styles.btnContainer, styles.button]}
                                    onPress={() => {
                                        this.waitAppraise(navigation, dispatch, row.orderId)
                                    }}>
                                    <Text
                                        style={[styles.text, styles.buttonText]}
                                        allowFontScaling={false}>
                                        评价
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={[styles.btnContainer, styles.button]}
                                    onPress={() => {
                                        this.addCart.bind(this, row.orderId, 2)
                                    }}>
                                    <Text
                                        style={[styles.text, styles.buttonText]}
                                        allowFontScaling={false}>
                                        再次购买
                                    </Text>
                                </TouchableOpacity>
                            </View>
                    )
                } else { //不能评价,评价过的,可以查看的
                    buttonContents = (
                        orderListReducer.orderSetting.canBackOrder == '1'
                            ?
                            <View style={{flexDirection: 'row'}}>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={[styles.btnContainer, styles.expressbutton]}
                                    onPress={() => {
                                        this.waitAppraise(navigation, dispatch, row.orderId, true)
                                    }}>
                                    <Text
                                        style={[styles.text, styles.expressbuttonText]}
                                        allowFontScaling={false}>
                                        查看评价
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={[styles.btnContainer, styles.button]}
                                    onPress={() => {
                                        this.supplyBackGoods.bind(this, row, 2)
                                    }}>
                                    <Text
                                        style={[styles.text, styles.buttonText]}
                                        allowFontScaling={false}>
                                        申请退货
                                    </Text>
                                </TouchableOpacity>

                            </View>
                            :
                            <View style={{flexDirection: 'row'}}>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={[styles.btnContainer, styles.expressbutton]}
                                    onPress={() => {
                                        this.waitAppraise(navigation, dispatch, row.orderId, true)
                                    }}>
                                    <Text
                                        style={[styles.text, styles.expressbuttonText]}
                                        allowFontScaling={false}>
                                        查看评价
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={[styles.btnContainer, styles.button]}
                                    onPress={() => {
                                        this.addCart.bind(this, row.orderId, 2)
                                    }}>
                                    <Text
                                        style={[styles.text, styles.buttonText]}
                                        allowFontScaling={false}>
                                        再次购买
                                    </Text>
                                </TouchableOpacity>
                            </View>

                    )
                }
            }
        } else if (row.orderStatus === '2') {
            buttonContents = (
                <View style={{flexDirection: 'row'}}>
                    {/*<QMButton*/}
                    {/*style={styles.expressbutton}*/}
                    {/*textStyle={styles.expressbuttonText}*/}
                    {/*onPress={this.expressDetail.bind(this,row.orderId)}*/}
                    {/*disabled={false}*/}
                    {/*activeOpacity={0.8}>*/}
                    {/*查看物流*/}
                    {/*</QMButton>*/}
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={[styles.btnContainer, styles.button]}
                        onPress={() => {
                            Alert.alert('提示', '是否确认收货?', [
                                {text: '取消'},
                                {
                                    text: '确定', onPress: () => {
                                        dispatch(orderListUpdateStatus(row.orderId, 3));
                                    }
                                }
                            ]);
                        }}>
                        <Text
                            style={[styles.text, styles.buttonText]}
                            allowFontScaling={false}>
                            确认收货
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        } else if (row.orderStatus === '14'
            || row.orderStatus === '10' || row.orderStatus === '15') {
            buttonContents = (
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[styles.btnContainer, styles.button]}
                    onPress={() => {
                        this.backLogs.bind(this, row)
                    }}>
                    <Text
                        style={[styles.text, styles.buttonText]}
                        allowFontScaling={false}>
                        查看进度
                    </Text>
                </TouchableOpacity>
            )
        }
        else if (row.orderStatus === '8') {
            buttonContents = (
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[styles.btnContainer, styles.longbutton]}
                    onPress={() => {
                        this.addBackAddress.bind(this, row.orderCode, row.orderId)
                    }}>
                    <Text
                        style={[styles.text, styles.buttonText]}
                        allowFontScaling={false}>
                        填写回寄信息
                    </Text>
                </TouchableOpacity>
            )
        }

        //判断退货和退款的文本显示
        if (row.isBack === '2' && row.orderStatus === '13') {
            status = '拒绝退款';
        } else if (row.isBack === '1' && row.orderStatus === '13') {
            status = '商家拒绝收货';
        }

        return (
            <View style={{marginBottom: 10, backgroundColor: '#fff'}}>
                <TouchableOpacity
                    onPress={() => this.rowPressed(row, navigation)}
                    activeOpacity={0.8}
                    style={styles.orderBox}>
                    <View>
                        <View style={styles.orderTitle}>
                            <Text allowFontScaling={false}>{row.orderCode}</Text>
                            <Text numberOfLines={1} style={{color: '#E43A58'}} allowFontScaling={false}>{status}</Text>
                        </View>
                        <View style={styles.orderCont}>
                            {row.orderGoodsList ? row.orderGoodsList.map((v, k) => {
                                if (row.orderGoodsList.length > 1) {
                                    return (
                                        k < 4 ?
                                            <View key={k} style={{flexDirection: 'row', marginRight: 10}}>
                                                <Image key={v} style={styles.thumb} source={{uri: v.goodsImg}}/>
                                            </View> : <View key={k}/>
                                    );
                                } else {
                                    return (
                                        <View key={k}
                                              style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1}}>
                                            <Image key={v} style={styles.thumb} source={{uri: v.goodsImg}}/>
                                            <View style={{flex: 1}}>
                                                <Text numberOfLines={3} style={styles.orderName}
                                                      allowFontScaling={false}>{v.goodsName} {v.specDesc}</Text>
                                            </View>
                                        </View>
                                    );
                                }
                            }) : null}
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.orderBottom}>
                    <Text style={{color: '#E43A58'}}
                          allowFontScaling={false}>实付款：￥&nbsp;{orderDataDict.formatPrice(row.orderPrice)}</Text>
                    {buttonContents}
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    listView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'space-between'
    },
    thumb: {
        width: 60,
        height: 60,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
    },
    textContainer: {
        flex: 1
    },
    title: {
        fontSize: 14,
        color: '#656565'
    },
    rowContainer: {
        padding: 10
    },
    buttonText: {
        fontSize: 14,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        width: 70,
        height: 25,
        backgroundColor: '#E43A58',
        borderRadius: 3,
        justifyContent: 'center',
        marginLeft: 10
    },
    longbutton: {
        width: 100,
        height: 25,
        backgroundColor: '#E43A58',
        borderRadius: 3,
        justifyContent: 'center'
    },
    expressbutton: {
        width: 70,
        height: 25,
        backgroundColor: 'white',
        borderRadius: 3,
        borderColor: '#999',
        borderWidth: 1,
        justifyContent: 'center',
        marginLeft: 10,
    },
    expressbuttonText: {
        fontSize: 14,
        color: '#666',
        alignSelf: 'center'
    },
    orderBox: {
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    orderTitle: {
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 15,
        paddingBottom: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    orderCont: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    orderBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 15,
        paddingBottom: 15,
    },
    orderName: {
        marginLeft: 15,
        color: '#666',
        lineHeight: 20,
        paddingRight: 30,
    },
    btnContainer: {
        borderRadius: 5,
        height: SCREEN_WIDTH <= 320 ? 40 : 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e63a59',
    },
    text: {
        fontSize: SCREEN_WIDTH <= 320 ? 16 : 18,
        color: '#fff',
    },
    noDataContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyIcon: {
        width: 110,
        height: 110,
        marginTop: 120,
        marginBottom: 50
    },
    txt: {
        flex: 1,
        fontSize: 16,
        color: '#666'
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
});

const mapStateToProps = (state) => ({
    orderListReducer: state.get('orderListReducer').toJS()
});
export default connect(mapStateToProps)(Order);
