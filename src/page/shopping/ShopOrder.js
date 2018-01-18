/**
 * 填写订单
 */

'use strict';
import React, {Component} from 'react';
import {
    InteractionManager,
    View,
    TouchableOpacity,
    StyleSheet,
    Text,
    ScrollView,
    PixelRatio,
    Image,
    Dimensions,
    Switch,
    Platform
} from 'react-native';
import {List} from 'immutable';


import {QMHeader, QMTag, QMDialog, QMLoading, QMFloat} from 'hk0472kit';



import {connect} from "react-redux";
import OrderAddress from "../components/OrderAddress";
import OrderGoods from "../components/OrderGoods";

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');

/**
 * 填写订单页面
 */
class ShopOrder extends Component {
    static navigationOptions = {
        title: '填写订单',
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !Immutable.is(Immutable.Map(this.props.giveawayReducer), Immutable.Map(nextProps.giveawayReducer)) ||
            !Immutable.is(Immutable.Map(this.state), Immutable.Map(nextState));
    }

    getInitialState() {
        return {
            integralValue: false,
            total_price: 0
        }
    }


    componentWillMount() {
        //设置订单赠品
        msg.emit('cartOrder:presents', this.props.presentGoodsInfoList);
    }


    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            msg.emit('cartOrder:cartsOrder', this.props.checkedList, 0);
            msg.emit('cartOrder:presentGoodsInfoList', this.props.presentGoodsInfoList, 0);
        });
    }

    render() {
        const store = appStore.data();
        const goods = store.get("goods");
        const groups = store.get("groups");
        goods.map((v, i) => {
            //库存数量少于购买数量/ 库存为0/没有上架
            if (v.get('wareStock') < v.get('goodsNum') || v.get('wareStock') == 0 || !v.get('addedStatus')) {
                msg.emit('app:alert', {
                    visible: true,
                    title: '提示',
                    msgContent: '您所选择的区域库存不足或已下架',
                    okText: '返回购物车',
                    showButton:true,
                    okHandle: () => {
                        msg.emit('route:backToLast');
                        msg.emit('cart:cartlist');
                    },

                });
            }
        });
        groups.map((view, i) => {
            //库存数量少于购买数量/ 库存为0/没有上架
            view.get('productResponseList').map((v, j) => {
                if (v.get('wareStock') < v.get('goodsNum') || v.get('wareStock') == 0 || !v.get('addedStatus')) {
                    msg.emit('app:alert', {
                        visible: true,
                        title: '提示',
                        msgContent: '您所选择的区域库存不足或已下架',
                        okText: '返回购物车',
                        okHandle: () => {
                            msg.emit('route:backToLast');
                            msg.emit('cart:cartlist');
                        },
                    });
                }
            });

        });

        const sellerFlag = store.get("sellerFlag");
        const payFlag = store.get("payFlag");
        //自提信息
        const delivery = store.get("delivery");
        const defaultAddress = store.get("defaultAddress");
        const totalPrice = store.get("totalPrice");
        const total_Price = (this.state.total_price === undefined ? totalPrice : this.state.total_price);
        const jfTotalPrice = store.get("jfTotalPrice");
        const jfTotal = store.get("jfTotal");
        //boss平台的金额,减去会员折扣后的,包括运费
        const bossPrice = store.get("bossPrice");
        //除了boss上下的总金额
        const lastPrice = store.get("lastPrice");
        //是否可以使用积分
        const jfIsCanUse = store.get('jfIsCanUse');
        //是否可使用优惠券
        const canCouponUse = store.get('canCouponUse');

        // 使用的积分
        const jfPrice = store.get('jfPrice');

        return (
            <View style={{flex: 1, backgroundColor: '#eee',}}>

                <View style={{flex: 1, backgroundColor: '#eee',}}>
                    <ScrollView bounces={false} automaticallyAdjustContentInsets={false}>
                        <OrderAddress
                            defaultAddress={defaultAddress}/>
                        <OrderGoods
                            goods={goods}
                            groups={groups}
                        />
                        {this._showPresentGoodsInfo()}
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => this._orderPays((defaultAddress != '' && defaultAddress != null) ? defaultAddress.get('city') : '')}
                            style={[styles.orderItem, {flexDirection: 'column', alignItems: 'stretch',}]}>
                            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center',}}>
                                <View style={styles.itemBox}>
                                    <Text style={styles.label} allowFontScaling={false}>支付配送</Text>
                                    <View>
                                        <Text style={[styles.itemText, {marginBottom: 2,}]}
                                              allowFontScaling={false}>{payFlag != 6 ? '在线支付' : '货到付款'}</Text>
                                        <Text style={[styles.itemText, {marginTop: 2,}]} allowFontScaling={false}>
                                            {
                                                sellerFlag == "0" ? delivery != '' ? '上门自提' : '快递配送' : null
                                            }
                                            {
                                                sellerFlag == "1" ? '商家配送' : null
                                            }
                                            {
                                                sellerFlag == "2" ? delivery != '' ? '商家配送+上门自提' : '商家配送+快递配送' : null
                                            }
                                        </Text>
                                    </View>
                                </View>
                                <Image style={styles.arrow} source={require('./img/right.png')}/>
                            </View>
                            {
                                sellerFlag != "0" ?
                                    <View style={styles.introWrap}>
                                        <Text style={styles.expressIntro}>部分商品由商家选择合作快递为您配送</Text>
                                    </View> : null
                            }
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this._invoice()} style={styles.orderItem}>
                            <View style={styles.itemBox}>
                                <Text style={styles.label} allowFontScaling={false}>发票信息</Text>
                                <Text
                                    style={[styles.itemText, {width: WIDTH / 2, textAlign: 'right'}]}
                                    allowFontScaling={false}
                                    numberOfLines={1}>
                                    {store.get("invoice") == 0 ? "不开发票" : store.get("invoiceTitle")}
                                </Text>
                            </View>
                            <Image style={styles.arrow} source={require('./img/right.png')}/>
                        </TouchableOpacity>


                        {
                            canCouponUse == true ?
                                <TouchableOpacity activeOpacity={0.8} onPress={() => this._coupons()}
                                                  style={[styles.orderItem, {
                                                      flexDirection: 'column',
                                                      alignItems: 'stretch'
                                                  }]}>
                                    <View style={{flexDirection: 'row'}}>
                                        <View style={styles.itemBox}>
                                            <Text style={styles.label} allowFontScaling={false}>优惠券</Text>
                                            <Text
                                                style={store.get("coupon") == '' ? styles.itemText : styles.couponText}
                                                allowFontScaling={false}>{store.get("coupon") == '' ? "您有(" + store.get("couponTotal") + ")张优惠券可使用" : '-￥' + store.get("coupon").get('price').toFixed(2)}</Text>
                                        </View>
                                        <Image style={styles.arrow} source={require('./img/right.png')}/>
                                    </View>
                                    {
                                        store.get("coupon") !== '' ?
                                            <Text style={{color: '#999', marginTop: 5}}>优惠券可与其他优惠（立减优惠）同享</Text> :
                                            <View/>
                                    }
                                </TouchableOpacity>
                                : null
                        }

                        {
                            jfIsCanUse == '1' && jfTotal != undefined && jfTotal != 0 ?
                                <View style={[styles.orderItem, {justifyContent: 'space-between'}]}>
                                    <Text
                                        allowFontScaling={false}
                                        style={{color: '#666', fontSize: 16}}>可用{store.get("jfTotal")}商城积分抵&yen;
                                        {jfTotalPrice.toFixed(2)}</Text>
                                    {
                                        jfTotalPrice > 0 ?
                                            <Switch
                                                style={[Platform.OS === 'android' && {
                                                    width: 100
                                                }]}
                                                value={this.state.integralValue}
                                                onTintColor='#e63a59'
                                                onValueChange={() => this._changeSwitch(!this.state.integralValue, total_Price, jfTotalPrice, bossPrice)}
                                            /> : null
                                    }

                                </View>
                                : null
                        }

                        <View style={[styles.orderItem, {flexDirection: 'column', alignItems: 'stretch',}]}>
                            <View style={[styles.itemBox, {paddingRight: 0,}]}>
                                <Text style={styles.label} allowFontScaling={false}>商品金额</Text>
                                <Text style={styles.orderPrice}
                                      allowFontScaling={false}>&yen;&nbsp;{store.get("totalOldPrice").toFixed(2)}</Text>
                            </View>
                            <View style={[styles.itemBox, {paddingRight: 0, marginTop: 10,}]}>
                                <Text style={styles.label} allowFontScaling={false}>运费</Text>
                                <Text style={styles.orderPrice}
                                      allowFontScaling={false}>+&nbsp;&yen;&nbsp;{store.get("yunFei").toFixed(2)}</Text>
                            </View>
                            <View style={[styles.itemBox, {paddingRight: 0, marginTop: 10,}]}>
                                <Text style={styles.label} allowFontScaling={false}>优惠券</Text>
                                <Text style={styles.orderPrice}
                                      allowFontScaling={false}>-&nbsp;&yen;&nbsp;{store.get("coupon") != '' ? store.get("coupon").get('price').toFixed(2) : "0.00"}</Text>
                            </View>
                            <View style={[styles.itemBox, {paddingRight: 0, marginTop: 10,}]}>
                                <Text style={styles.label} allowFontScaling={false}>促销金额</Text>
                                <Text style={styles.orderPrice}
                                      allowFontScaling={false}>-&nbsp;&yen;&nbsp;{store.get("cxPrice").toFixed(2)}</Text>
                            </View>
                            <View style={[styles.itemBox, {paddingRight: 0, marginTop: 10,}]}>
                                <Text style={styles.label} allowFontScaling={false}>会员折扣</Text>
                                <Text style={styles.orderPrice}
                                      allowFontScaling={false}>-&nbsp;&yen;&nbsp;{store.get("discountPrice").toFixed(2)}</Text>
                            </View>
                            {
                                jfIsCanUse == '1' && jfTotal != undefined && jfTotal != 0 ?
                                    <View style={[styles.itemBox, {paddingRight: 0, marginTop: 10,}]}>
                                        <Text style={styles.label} allowFontScaling={false}>积分兑换金额</Text>
                                        <Text style={styles.orderPrice}
                                              allowFontScaling={false}>-&nbsp;&yen;&nbsp;{jfPrice.toFixed(2)}</Text>
                                    </View>
                                    : null
                            }
                        </View>
                    </ScrollView>
                    <View style={styles.settlement}>
                        <View style={styles.settlementInfo}>
                            <Text style={styles.totalPrice} allowFontScaling={false}>实付款：<Text
                                style={{fontSize: 18}}>&yen;&nbsp;{total_Price < 0.01 ? 0.01 : total_Price.toFixed(2)}</Text></Text>
                        </View>
                        <TouchableOpacity
                            style={styles.settlementBtn}
                            onPress={() => this._payOrder()}
                            activeOpacity={0.8}>
                            <Text style={{fontSize: 18, color: '#fff'}} allowFontScaling={false}>提交订单</Text>
                        </TouchableOpacity>
                    </View>

                    {
                        store.get('isLoading') ? <QMLoading overlay={true} size='large'/> : null
                    }
                </View>
            </View>
        )
    }

    _orderPays(city) {
        const store = appStore.data();
        const payTypeList = store.get("payTypeList");
        const payType = store.get("payType");
        const sellerFlag = store.get("sellerFlag");
        const alloList = store.get("alloList");
        const delivery = store.get("delivery");
        const goods = store.get("goods");
        msg.emit('route:goToNext', {
            sceneName: 'OrderPays',
            payTypeList: payTypeList,
            payType: payType,
            goods: goods,
            sellerFlag: sellerFlag,
            alloList: alloList,
            delivery: delivery,
            city: city
        })
    }
    _invoice() {
        const store = appStore.data();
        const invoice = store.get("invoice");
        const invoiceFlag = store.get("invoiceFlag");
        const invoiceTitle = store.get("invoiceTitle");

        msg.emit('route:goToNext', {
            sceneName: 'InvoiceInfor',
            invoice: invoice,
            invoiceFlag: invoiceFlag,
            invoiceTitle: invoiceTitle
        })
    }
    _coupons() {
        const store = appStore.data();
        const couponData = store.get("couponData");
        msg.emit('route:goToNext', {
            sceneName: 'OrderCoupon',
            couponData: couponData
        })
    }
    _payOrder() {
        if (appStore.data().get("yunFei") > 0) {
            msg.emit('app:alert', {
                title: '', msgContent: '您当前的订单有运费产生，是否继续？',
                okHandle: () => {
                    msg.emit('cartOrder:payOrder', {jfUsed: this.state.integralValue});
                }
            });
        } else {
            msg.emit('cartOrder:payOrder', {jfUsed: this.state.integralValue});
        }

    }

    /**
     * 积分切换,积分只能精确到角
     * @param isUse
     * @param totalPrice
     * @param jfPrice
     * @param bossPrice
     * @private
     */
    _changeSwitch(isUse, totalPrice, jfPrice, bossPrice) {

        const store = appStore.data();
        const isSelectedCoupon = store.get('isSelectedCoupon');

        if (isUse) {
            if (totalPrice <= 0.1) {
                this.setState({integralValue: true});
                return;
            }

            let jfUsePrice = Math.min(bossPrice, jfPrice);
            let jfLastPrice = totalPrice - jfUsePrice;
            jfLastPrice = jfLastPrice <= 0 ? 0.01 : jfLastPrice;

            appStore.cursor().set('jfPrice', jfUsePrice);
            this.setState({jfPrice: jfUsePrice, integralValue: true, total_price: jfLastPrice});
        } else {
            let jfLastPrice;
            if (isSelectedCoupon) {
                jfLastPrice = bossPrice - store.getIn(['coupon', 'price']);
            } else {
                jfLastPrice = bossPrice;
            }
            appStore.cursor().set('jfPrice', 0);
            this.setState({jfPrice: 0, integralValue: false, total_price: jfLastPrice + store.get('lastPrice')});
        }
    }

    /**
     * 显示赠品
     * @returns {XML}
     * @private
     */
    _showPresentGoodsInfo() {
        const store = appStore.data();
        const presentGoodsInfoList = store.get("presentGoodsInfoList") || new List;
        if (presentGoodsInfoList.count() > 0) {
            return (<View style={[styles.orderItem, {flexDirection: 'column'}]}>{
                    presentGoodsInfoList.map((present) => {
                        return (present.get("fullBuyPresentProductResponseList").filter(val => val.get("checked")).map((presentProduct) => {
                            return (<View style={{
                                width: WIDTH - 40,
                                height: 20,
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <View style={{width: WIDTH - 100}}><Text
                                    numberOfLines={1}>[赠品]{presentProduct.get("name")}</Text></View>
                                <View><Text>x{presentProduct.get("scopeNum")}</Text></View>
                            </View>)
                        }))
                    })}</View>
            )
        } else {
            return null;
        }

    }
}

const styles = StyleSheet.create({
    orderItem: {
        marginTop: 10,
        backgroundColor: '#fff',
        borderTopWidth: 1 / PixelRatio.get(),
        borderTopColor: '#e9e8e8',
        borderBottomWidth: 1 / PixelRatio.get(),
        borderBottomColor: '#ccc',
        flexDirection: 'row',
        paddingRight: 10,
        paddingTop: 20,
        paddingLeft: 20,
        paddingBottom: 20,
        alignItems: 'center'
    },
    itemBox: {
        flex: 1,
        flexDirection: 'row',
        paddingRight: 15,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    arrow: {
        width: 10,
        height: 18
    },
    label: {
        fontSize: 16,
        color: '#666'
    },
    introWrap: {
        marginTop: 20,
        backgroundColor: '#e8e7e7'
    },
    expressIntro: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'right'
    },
    itemText: {
        fontSize: 16,
    },
    orderPrice: {
        fontSize: 16,
        color: '#e63a59'
    },
    settlement: {
        height: 60,
        flexDirection: 'row'
    },
    settlementInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#333'
    },
    settlementBtn: {
        width: 130,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e63a59'
    },
    totalPrice: {
        color: '#fff',
        fontSize: 16
    },
    couponText: {
        color: '#e63a59'
    }
});

const mapStateToProps = (state) => ({
    giveawayReducer: state.get('giveawayReducer')
});
export default connect(mapStateToProps)(ShopOrder);
