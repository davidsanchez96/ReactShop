'use strict';

import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet, Text, Platform, PixelRatio, Image, Dimensions} from 'react-native';
import SwipeOut from 'react-native-swipeout';
import {List, OrderedSet} from 'immutable';
import NumberControl from "./NumberControl";
import {ShopListGoodsSelect, ShopListUpdate} from "../../utils/actionTypes";
import {shopListDelete, shopListUpdate} from "../../action/shopListActions";

const {width: SCREEN_WIDTH} = Dimensions.get('window');
export default class GoodItem extends Component {
    render() {
        this._goods = this.props.good;

        const swipeOutBtns = [{
            text: '删除',
            backgroundColor: '#e63a59',
            onPress: () => {
                this.props.dispatch(shopListDelete(new OrderedSet([this._goods.get("shoppingCartId")])));
            }
        }];
        //赠品集合
        this._fullBuyPresentProductResponseList = this._goods.getIn(["presentGoodsInfo", "fullBuyPresentProductResponseList"]) || new List;
        //过滤
        this._fullBuyPresentProductResponseList = this._fullBuyPresentProductResponseList.filter(val => val.get('checked') == true);
        return (
            <View style={{marginTop: 15,}}>
                <SwipeOut
                    right={swipeOutBtns}
                    backgroundColor='#fff'
                    autoClose={true}
                    ref={(swipeOut) => this['_swipeOut' + this.props.index] = swipeOut}>
                    <View style={[styles.cartGood, this._goods.get("goodsNum") ?
                        this._goods.get("goodsNum") > this._goods.get("wareStock") ? {backgroundColor: '#ffc08b',} : {}
                        :
                        {}]}>

                        <TouchableOpacity
                            style={{height: 80, justifyContent: 'center'}}
                            onPress={() => this._handleCheck(this._goods.get("shoppingCartId"))}
                            activeOpacity={0.8}>
                            <Image
                                style={styles.check}
                                source={this.props.checkedList.has(this._goods.get("shoppingCartId")) ? require('./img/checked.png') : require('./img/uncheck.png')}/>
                        </TouchableOpacity>

                        <View style={{flex: 1}}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() => this._goodsDetail(this._goods.get("goodsInfoId"))}>
                                    <View style={styles.goodImg}>
                                        <Image style={{width: 80, height: 80}}
                                               source={{uri: this._goods.get("goodsImg")}}/>
                                    </View>
                                </TouchableOpacity>
                                {this._goods.get("addedStatus") == false ?
                                    <View style={styles.noGoods}>
                                        <Text style={{color: '#fff'}}>已下架</Text>
                                    </View> :
                                    this._goods.get("wareStock") == 0 || this._goods.get("wareStock") == null ?
                                        <View style={styles.noGoods}>
                                            <Text style={{color: '#fff'}}>无货</Text>
                                        </View> :
                                        <View/>
                                }
                                <View style={styles.goodCont}>
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={() => this._goodsDetail(this._goods.get("goodsInfoId"))}>
                                        <Text
                                            numberOfLines={2}
                                            style={{lineHeight: 20, height: 40, color: '#333'}}
                                            allowFontScaling={false}>
                                            {this._goods.get("goodsName")}
                                        </Text>
                                    </TouchableOpacity>

                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between'
                                    }}>
                                        <Text style={styles.goodPrice}
                                              allowFontScaling={false}>
                                            &yen;&nbsp;{this._goods.get("warePrice").toFixed(2)}
                                        </Text>
                                        <NumberControl
                                            callbackParent={(newState) => this.onChildChanged(newState, this._goods.get("shoppingCartId"))}
                                            chosenNum={this._goods.get("goodsNum") != null ? this._goods.get("goodsNum") : '0'}
                                            maxNum={this._goods.get("wareStock") != null ? this._goods.get("wareStock") : '1'}/>
                                    </View>
                                </View>

                            </View>
                        </View>
                    </View>
                </SwipeOut>
                {
                    !this.props.haveM ?
                        <TouchableOpacity style={styles.promotionBar}
                                          onPress={() => this._promotionProduct(this._goods.get("goodsInfoId"))}
                                          activeOpacity={0.8}>
                            <Text style={{color: '#999'}}>选择促销</Text>
                            <Image style={styles.arrow} source={require('./img/right.png')}/>
                        </TouchableOpacity> : null
                }
            </View>
        )
    }

    _handleScroll(isOpen) {
        if (this.props.onSwipe) {
            this.props.onSwipe(this['_swipeOut' + this.props.index])
        }
        if (this.props.listView && Platform.OS === 'ios') {
            this.props.listView.changeScrollEnable(isOpen);
        }
    }

    _handleCheck(shoppingCartId) {
        this.props.dispatch({
            type: ShopListGoodsSelect,
            shoppingCartId: shoppingCartId,
            checks: !this.props.checkedList.has(shoppingCartId)
        });
        // msg.emit('cart:changeGoodChecked', shoppingCartId, !this.props.checkedList.has(shoppingCartId));
    }

    _promotionProduct(goodsInfoId) {
        this.props.navigation.navigate('SalesPromotion',{goodsInfoId: goodsInfoId,
            shoppingCartId: this._goods.get("shoppingCartId")});
        // msg.emit('route:goToNext', {
        //     sceneName: 'PromotionInfor',
        //     goodsInfoId: goodsInfoId,
        //     shoppingCartId: this._goods.get("shoppingCartId"),
        // })
    }

    onChildChanged(newState, shoppingCartId) {
        // msg.emit('cart:changeGoodsNum', shoppingCartId, newState);
        this.props.dispatch(shopListUpdate(shoppingCartId, newState));
    }

    _goodsDetail(goodsInfoId) {
        msg.emit('route:goToNext', {
            sceneName: 'GoodsDetail',
            goodsInfoId: goodsInfoId
        });
    }
}


const styles = StyleSheet.create({
    check: {
        marginRight: 10,
        width: 20,
        height: 20
    },
    cartGood: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingLeft: 15,
        paddingRight: 15
    },
    goodImg: {
        borderWidth: 1 / PixelRatio.get(),
        borderColor: '#ddd',
        borderRadius: 5
    },
    goodCont: {
        flex: 1,
        alignSelf: 'flex-start',
        marginLeft: 10,
        height: 80,
        justifyContent: 'space-between'
    },
    goodPrice: {
        color: '#e63a59',
        fontSize: 16,
        marginTop: 5,
        marginBottom: 5
    },
    extraInfo: {
        marginLeft: 45,
        marginRight: 15,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1 / PixelRatio.get(),
        borderColor: '#ddd',
        borderRadius: 3,
        padding: 5,
        paddingRight: 10
    },
    rightOperation: {
        flexDirection: 'row'
    },
    opsItem: {
        padding: 10,
        flex: 1,
        justifyContent: 'center',
        height: 80,
        marginTop: 20
    },
    swiperBtn: {
        width: 50,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    noGoods: {
        position: 'absolute',
        width: 80,
        height: 30,
        backgroundColor: 'rgba(0, 0, 0, .6)',
        left: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    promotionBar: {
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: '#f6f6f6',
        paddingLeft: 45,
        paddingRight: 15,
        height: 30,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    arrow: {
        width: 8,
        height: 16,
        marginLeft: 10
    }
});

