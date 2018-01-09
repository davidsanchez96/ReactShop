'use strict';

import React, {Component} from 'react';
import {
    Alert, Dimensions, Image, ImageBackground, InteractionManager, ScrollView, StyleSheet, Text, TouchableOpacity,
    View,
} from 'react-native';
import Immutable from "immutable";
import {connect} from "react-redux";
import {orderDetail, orderDetailSetting, orderUpdateStatus} from "../../action/orderDetailActions";
import {orderSetting} from "../../action/orderListActions";
import {orderDataDict} from "../../utils/orderstatus";
import Loading from "../components/Loading";
import {OrderDetailClean} from "../../utils/actionTypes";

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const payType = {
    '1': '在线支付',
    '0': '货到付款',
}

const invoicType = {
    0: '无需发票',
    1: '纸质发票',
    2: '增值税发票',
}

class OrderDetail extends Component {
    static navigationOptions = {
        title: '订单详情',
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !Immutable.is(this.props.orderDetailReducer, nextProps.orderDetailReducer) ||
            !Immutable.is(Immutable.Map(this.state), Immutable.Map(nextState));
    }

    componentDidMount() {
        const {navigation, dispatch} = this.props;
        dispatch(orderDetailSetting(navigation.state.params.status));
        InteractionManager.runAfterInteractions(() => {
            dispatch(orderDetail(navigation.state.params.id))
        });

    }

    componentWillUnmount() {
        this.props.dispatch({type: OrderDetailClean})
    }

    /**
     * 申请退货
     * @param orderId
     */
    supplyBackGoods(orderInfo) {
        msg.emit('order:backGoods', orderInfo);
    }

    /**
     * 点击提交申请退款
     * @private
     */
    _submitBack(orderInfo) {
        msg.emit('order:backMoney', orderInfo);
    }

    /**
     * 确认收货
     * @param orderId
     */
    affirmGoods(orderId, status) {
        msg.emit('app:alert', {
            title: '提示',
            msgContent: '',
            okHandle: () => {
                msg.emit('order:updateOrderStatus', {orderId: orderId, status: status})
            }
        });
    }

    /**
     * 查看物流信息
     * @param orderId
     */
    expressDetail(orderId) {
        msg.emit('route:goToNext', {sceneName: 'Express', orderId: orderId});
    }

    /**
     * 取消订单
     * @param orderInfo
     */
    orderCancel(navigation, dispatch, orderId) {
        navigation.navigate('OrderCancel', {
            orderId: orderId, level: 2, callBack: () => {
                dispatch(orderDetailSetting('4'));
            }
        });
        // msg.emit('route:goToNext', {sceneName: 'OrderCancel', orderId: orderId, level: 2});
    }

    /**
     * 评价
     */
    waitAppraise(orderId) {
        //调用原生的
        msg.emit('route:goToNext', {sceneName: 'MakeComment', orderId: orderId, level: 2});
    }


    render() {
        const {orderDetailReducer, dispatch, navigation} = this.props;
        var statusValue = orderDetailReducer.get('status');
        var orderDetail = orderDetailReducer.get('orderDetail') == null ? [] : orderDetailReducer.get('orderDetail').toJS();
        orderDetail.orderStatus = statusValue;
        let status = statusValue == undefined ? '' : orderDataDict.getOrderStatusDesc(orderDetail);
        let order_Goods = orderDetail.orderGoodsList == null ? [] : orderDetail.orderGoodsList;
        const evaluateFlag = orderDetailReducer.get('evaluateFlag') == undefined ? orderDetail.evaluateFlag : orderDetailReducer.get('evaluateFlag');
        //商品金额
        //let orderOldPrice = orderDetail.orderPrice - (orderDetail.orderPrePrice == null ? 0 : orderDetail.orderPrePrice)
        //- (orderDetail.expressPrice == null ? 0 : orderDetail.expressPrice);
        let orderGoodsPrice = 0;
        let buttonContents;//按钮的内容
        //是在线支付,非货到付款才显示支付按钮
        if (statusValue === '0' && orderDetail.orderLinePay === '1') {
            buttonContents = (
                <View style={{flexDirection: 'row'}}>


                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={[styles.btnContainer, styles.expressbutton]}
                        onPress={() => {
                            this.orderCancel(navigation,dispatch, orderDetail.orderId)
                        }}>
                        <Text
                            style={[styles.text, styles.expressbuttonText]}
                            allowFontScaling={false}>
                            取消订单
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={[styles.btnContainer, styles.buttonNew]}
                        onPress={() => {
                            msg.emit('route:goToNext', {
                                sceneName: 'PayOrder',
                                orderPrice: orderDetail.orderPrice,
                                orderCode: orderDetail.orderOldCode
                            });
                        }}>
                        <Text
                            style={[styles.text, styles.buttonTextNew]}
                            allowFontScaling={false}>
                            支付
                        </Text>
                    </TouchableOpacity>


                </View>
            )
        } else if ((statusValue === '1' || statusValue === '5' || statusValue === '6')
            && orderDetail.orderLinePay === '1') {
            buttonContents = (
                orderDetailReducer.get('orderSetting').canBackOrder == '1'
                    ?
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={[styles.btnContainer, styles.buttonNew]}
                        onPress={() => {
                            this._submitBack.bind(this, orderDetail)
                        }}>
                        <Text
                            style={[styles.text, styles.buttonTextNew]}
                            allowFontScaling={false}>
                            申请退款
                        </Text>
                    </TouchableOpacity>
                    : null
            )
        } else if (statusValue === '0' && orderDetail.orderLinePay === '0') {//等于0同意支付方式是货到付款的
            status = '待发货';
            buttonContents = (
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[styles.btnContainer, styles.expressbutton]}
                    onPress={() => {
                        this.orderCancel(navigation, dispatch,orderDetail.orderId)
                    }}>
                    <Text
                        style={[styles.text, styles.expressbuttonText]}
                        allowFontScaling={false}>
                        取消订单
                    </Text>
                </TouchableOpacity>
            )
        } else if (statusValue === '3') {

            console.log(orderDetailReducer.get('orderSetting').canBackOrder + "^^^^^" + evaluateFlag);
            buttonContents = (
                navigation.state.params.flag ?
                    evaluateFlag == '0' ?

                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={[styles.btnContainer, styles.buttonNew]}
                            onPress={() => {
                                this.waitAppraise.bind(this, orderDetail.orderId)
                            }}>
                            <Text
                                style={[styles.text, styles.buttonTextNew]}
                                allowFontScaling={false}>
                                评价
                            </Text>
                        </TouchableOpacity>
                        : null
                    :
                    orderDetailReducer.get('orderSetting').canBackOrder == '1'
                        ?
                        evaluateFlag == '0' ?
                            <View style={{flexDirection: 'row'}}>


                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={[styles.btnContainer, styles.expressbutton]}
                                    onPress={() => {
                                        this.waitAppraise.bind(this, orderDetail.orderId)
                                    }}>
                                    <Text
                                        style={[styles.text, styles.expressbuttonText]}
                                        allowFontScaling={false}>
                                        评价
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={[styles.btnContainer, styles.buttonNew]}
                                    onPress={() => {
                                        this.supplyBackGoods.bind(this, orderDetail)
                                    }}>
                                    <Text
                                        style={[styles.text, styles.buttonTextNew]}
                                        allowFontScaling={false}>
                                        申请退货
                                    </Text>
                                </TouchableOpacity>


                            </View>
                            :
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={[styles.btnContainer, styles.buttonNew]}
                                onPress={() => {
                                    this.supplyBackGoods.bind(this, orderDetail)
                                }}>
                                <Text
                                    style={[styles.text, styles.buttonTextNew]}
                                    allowFontScaling={false}>
                                    申请退货
                                </Text>
                            </TouchableOpacity>
                        :
                        evaluateFlag == '0' ?
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={[styles.btnContainer, styles.buttonNew]}
                                onPress={() => {
                                    this.waitAppraise.bind(this, orderDetail.orderId)
                                }}>
                                <Text
                                    style={[styles.text, styles.buttonTextNew]}
                                    allowFontScaling={false}>
                                    评价
                                </Text>
                            </TouchableOpacity>
                            :
                            null
            )
        } else if (statusValue === '2') {
            buttonContents = (
                <View style={{flexDirection: 'row'}}>
                    {/*<QMButton*/}
                    {/*style={styles.expressbutton}*/}
                    {/*textStyle={styles.expressbuttonText}*/}
                    {/*onPress={this.expressDetail.bind(this,orderDetail.orderId)}*/}
                    {/*disabled={false}*/}
                    {/*activeOpacity={0.8}>*/}
                    {/*查看物流*/}
                    {/*</QMButton>*/}
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={[styles.btnContainer, styles.buttonNew]}
                        onPress={() => {
                            Alert.alert('提示', '是否确认收货?', [
                                {text: '取消'},
                                {
                                    text: '确定', onPress: () => {
                                        dispatch(orderUpdateStatus(orderDetail.orderId, 3));
                                    }
                                }
                            ]);
                        }}>
                        <Text
                            style={[styles.text, styles.buttonTextNew]}
                            allowFontScaling={false}>
                            确认收货
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        } else if (statusValue === '14' || statusValue === '17'
            || statusValue === '10' || statusValue === '9' || statusValue === '16') {
            buttonContents = (
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[styles.btnContainer, styles.buttonNew]}
                    onPress={() => {
                        this.backLogs.bind(this, orderDetail)
                    }}>
                    <Text
                        style={[styles.text, styles.buttonTextNew]}
                        allowFontScaling={false}>
                        查看进度
                    </Text>
                </TouchableOpacity>
            )
        }
        else if (statusValue === '8') {
            buttonContents = (
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[styles.btnContainer, styles.buttonNew]}
                    onPress={() => {
                        this.addBackAddress.bind(this, orderDetail.orderCode, orderDetail.orderId)
                    }}>
                    <Text
                        style={[styles.text, styles.buttonTextNew]}
                        allowFontScaling={false}>
                        填写回寄信息
                    </Text>
                </TouchableOpacity>
            )
        } else {
            buttonContents = false;
        }

        //判断是否有发票
        let invoiceContent;

        if (orderDetail.invoiceType != '0' && orderDetail.invoiceType != undefined) {
            invoiceContent = (
                <View>
                    <Text style={{marginBottom: 15, color: '#666'}}
                          allowFontScaling={false}>发票抬头：{orderDetail.invoiceTitle}</Text>
                    <Text style={{color: '#666'}} allowFontScaling={false}>发票内容：{orderDetail.invoiceContent}</Text>
                </View>
            )
        }

        if (orderDetailReducer.get('loading')) {
            return (
                <Loading/>
            );
        }

        return (
            <View style={{flex: 1, backgroundColor: '#eee'}}>

                <ScrollView bounces={false}>
                    <View style={[styles.paper, {borderBottomWidth: 1, borderBottomColor: '#eee'}]}>
                        <Text allowFontScaling={false}>订单编号：{orderDetail.orderCode}</Text>
                        <Text numberOfLines={1} style={{color: '#e63a59'}} allowFontScaling={false}>{status}</Text>
                    </View>

                    <ImageBackground style={styles.addressBox} source={require('../components/img/address_bg.png')}>
                        <View style={{flexDirection: 'row'}}>
                            <View style={styles.rowItem}>
                                <Image style={styles.itemIcon} source={require('../components/img/user.png')}/>
                                <Text style={{fontSize: 16}}
                                      allowFontScaling={false}>{orderDetail.shippingPerson}</Text>
                            </View>
                            <View style={styles.rowItem}>
                                <Image style={styles.itemIcon} source={require('../components/img/phone.png')}/>
                                <Text numberOfLines={1} style={{fontSize: 16}}
                                      allowFontScaling={false}>{orderDetail.shippingMobile}</Text>
                            </View>
                        </View>
                        <Text
                            style={styles.addressText}
                            allowFontScaling={false}
                            numberOfLines={3}>
                            {orderDetail.shippingProvince}
                            {orderDetail.shippingCity}
                            {orderDetail.shippingCounty}
                            {orderDetail.shippingAddress}
                        </Text>
                    </ImageBackground>

                    {order_Goods.map((v, k) => {

                        //orderGoodsPrice = orderGoodsPrice + v.goodsInfoPrice * v.goodsInfoNum;
                        if (__DEV__) {
                            console.log('orderList goods render ', v);
                        }
                        return (
                            <TouchableOpacity
                                key={k}
                                activeOpacity={0.8}
                                style={styles.box}
                                onPress={() => msg.emit('route:goToNext', {
                                    sceneName: 'GoodsDetail',
                                    goodsInfoId: v.goodsInfoId
                                })}>
                                <View style={{flex: 5, flexDirection: 'row'}}>
                                    <Image key={v} style={styles.thumb} source={{uri: v.goodsImg}}/>
                                    <View style={{flex: 1}}>
                                        <Text style={styles.goodsName} numberOfLines={2}
                                              allowFontScaling={false}>{(v.isPresent.toString() == 1 ? "[赠品] " : "")}{v.goodsName} {v.specDesc}</Text>
                                        <Text allowFontScaling={false}>X{v.goodsInfoNum}</Text>
                                    </View>
                                </View>
                                <View style={{flex: 2, flexDirection: 'row', justifyContent: 'flex-end'}}>
                                    <Text style={{color: '#e63a59'}}
                                          allowFontScaling={false}>￥{orderDataDict.formatPrice(v.goodsInfoPrice)}</Text>
                                    <Image style={styles.arrow} source={require('../components/img/right.png')}/>
                                </View>
                            </TouchableOpacity>
                        );
                    })}

                    <View style={[styles.box, {flexDirection: 'column', alignItems: 'stretch'}]}>
                        <View style={styles.rowBar}>
                            <Text allowFontScaling={false}>商品金额：</Text>
                            <Text allowFontScaling={false}>&yen;&nbsp;
                                {orderDataDict.formatPrice(orderDetail.orderOldPrice)}</Text>
                        </View>
                        <View style={styles.rowBar}>
                            <Text allowFontScaling={false}>运费：</Text>
                            <Text
                                allowFontScaling={false}>+&yen;&nbsp;{orderDataDict.formatPrice(orderDetail.expressPrice)}</Text>
                        </View>
                        <View style={styles.rowBar}>
                            <Text allowFontScaling={false}>优惠券：</Text>
                            <Text
                                allowFontScaling={false}>-&yen;&nbsp;{orderDataDict.formatPrice(orderDetail.couponPrice)}</Text>
                        </View>
                        <View style={styles.rowBar}>
                            <Text allowFontScaling={false}>促销金额：</Text>
                            <Text
                                allowFontScaling={false}>-&yen;&nbsp;{orderDataDict.formatPrice(orderDetail.promotionsPrice)}</Text>
                        </View>
                        {/** 暂时不支持积分
                         <View style={styles.rowBar}>
                         <Text allowFontScaling={false}>使用积分：</Text>
                         <Text allowFontScaling={false}>-{orderDetail.orderIntegral == null ? 0 : orderDetail.orderIntegral.toFixed(2)}(&yen;&nbsp;)</Text>
                         </View> **/}
                        <View style={styles.rowBar}>
                            <Text allowFontScaling={false}>会员折扣：</Text>
                            <Text
                                allowFontScaling={false}>-&yen;&nbsp;{orderDataDict.formatPrice(orderDetail.discountPrice)}</Text>
                        </View>
                        <View style={styles.rowBar}>
                            <Text allowFontScaling={false}>积分兑换金额：</Text>
                            <Text
                                allowFontScaling={false}>-&yen;&nbsp;{orderDataDict.formatPrice(orderDetail.jfPrice)}</Text>
                        </View>
                        <View style={[styles.rowBar, {marginBottom: 0}]}>
                            <Text allowFontScaling={false}>总额：</Text>
                            <Text style={{color: '#e63a59'}}
                                  allowFontScaling={false}>&yen;&nbsp;{orderDataDict.formatPrice(orderDetail.orderPrice)}</Text>
                        </View>
                    </View>

                    <View style={[styles.box, {flexDirection: 'column', marginBottom: 0, alignItems: 'flex-start'}]}>
                        <Text style={{marginBottom: 15,}} allowFontScaling={false}>支付及发票信息</Text>
                        <Text style={{marginBottom: 15, color: '#666'}}
                              allowFontScaling={false}>支付方式：{payType[orderDetail.orderLinePay]}</Text>
                        <Text style={{marginBottom: 15, color: '#666'}}
                              allowFontScaling={false}>发票类型：{invoicType[orderDetail.invoiceType]}</Text>
                        {invoiceContent}
                    </View>
                </ScrollView>
                {
                    buttonContents ?
                        <View style={styles.button}>
                            {buttonContents}
                        </View> :
                        <View/>
                }
            </View>
        )
    }

}

const styles = StyleSheet.create({
    paper: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    box: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 20,
        paddingRight: 20,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: '#e9e8e8',
        borderBottomColor: '#ccc',
        marginBottom: 10,
    },
    addressBox: {
        height: 120,
        width: SCREEN_WIDTH,
        backgroundColor: 'rgba(0,0,0,0)',
        marginTop: 10,
        marginBottom: 10,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'center'
    },
    rowItem: {
        flexDirection: 'row',
        marginRight: 30,
        alignItems: 'center',
    },
    itemIcon: {
        width: 20,
        height: 20,
        marginRight: 5,
    },
    addressText: {
        color: '#666',
        marginTop: 10,
        lineHeight: 20,
        flex: 1,
        justifyContent: 'center'
    },
    thumb: {
        width: 60,
        height: 60,
        marginRight: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
    },
    goodsName: {
        color: '#666',
        lineHeight: 20,
        height: 40,
        marginTop: -5,
        marginBottom: 5
    },
    description: {
        fontSize: 18,
        margin: 5,
        color: '#656565'
    },
    button: {
        height: 50,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderColor: '#ddd',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    arrow: {
        width: 8,
        height: 16,
        marginLeft: 10,
    },
    rowBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15
    },
    buttonNew: {
        width: 70,
        height: 25,
        backgroundColor: '#E43A58',
        borderRadius: 3,
        justifyContent: 'center',
        marginLeft: 10
    },
    buttonTextNew: {
        fontSize: 14,
        color: 'white',
        alignSelf: 'center'
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
});
const mapStateToProps = (state) => ({
    orderDetailReducer: state.get('orderDetailReducer')
});
export default connect(mapStateToProps)(OrderDetail);
