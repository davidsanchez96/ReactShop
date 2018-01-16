'use strict';

import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet, Text, Platform, PixelRatio, Image, Dimensions} from 'react-native';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
export default class GroupGoodItem extends Component {
    render() {
        this._goods = this.props.good;

        var _goodsImg = this._goods.get("goodsImg");
        var _goodsInfoId = this._goods.get("goodsInfoId");
        var _wareStock = this._goods.get("wareStock");
        var _goodsName = this._goods.get("goodsName");
        var _warePrice = this._goods.get("warePrice");
        var _goodsNum = this._goods.get("goodsNum");
        return (
            <View style={{marginBottom: 20, flexDirection: 'row'}}>
                {/*
         ===Goods Image===
         */}
                <TouchableOpacity
                    style={{width: 80}}
                    activeOpacity={0.8}
                    onPress={() => this._goodsDetail(_goodsInfoId)}>
                    <View style={styles.goodImg}>
                        <Image style={{width: 80, height: 80}} source={{uri: _goodsImg}}/>
                    </View>
                </TouchableOpacity>

                {/*
         ===Goods Unavailable Label===
         */}
                {this._goods.get("addedStatus") == false ?
                    <View style={styles.noGoods}>
                        <Text style={{color: '#fff'}}>已下架</Text>
                    </View> :

                    _wareStock == 0 || _wareStock == null ?
                        <View style={styles.noGoods}>
                            <Text style={{color: '#fff'}}>无货</Text>
                        </View> :
                        <View/>
                }

                {/*
         ===Goods Content:[Name,Price]===
         */}
                <View
                    style={styles.goodCont}>

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

                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text
                            style={{fontSize: 16, color: "#e55"}}
                            allowFontScaling={false}>
                            &yen;&nbsp;{_warePrice.toFixed(2)}
                        </Text>
                        <Text
                            style={{color: '#999'}}
                            allowFontScaling={false}>
                            {_goodsNum}{'件/套'}
                        </Text>
                    </View>

                </View>

            </View>

        )
    }

    _goodsDetail(goodsInfoId) {
        msg.emit('route:goToNext', {
            sceneName: 'GoodsDetail',
            goodsInfoId: goodsInfoId
        });
    }
}


var styles = StyleSheet.create({
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
        height: 80,
        justifyContent: 'space-between',
        marginLeft: 10,
    },
    goodPrice: {
        color: '#e63a59',
        fontSize: 16,
        marginTop: 5,
        marginBottom: 5
    },
    extraInfo: {
        marginRight: 20,
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


