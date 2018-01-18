'use strict';

import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet, Text, PixelRatio, Image, Dimensions} from 'react-native';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const viewNum = SCREEN_WIDTH <= 320 ? 3 : 4;


export default class OrderGoods extends Component {

    render() {
        //debugger;
        var _goods = this.props.goods;

        if (this.props.groups.count() > 0) {
            this.props.groups.map((v, i) => {
                _goods = _goods.concat(v.get("productResponseList"));
            });
        }

        if (__DEV__) {
            console.log("[OrderGoods]rendering...goods=", this.props.goods.toJS());
            console.log("[OrderGoods]rendering...groups=", this.props.groups.toJS());
            console.log("[OrderGoods]rendering..._goods=", _goods.toJS());
        }

        //总数量
        let goodsNumber = 0;

        return (
            <TouchableOpacity activeOpacity={0.8} style={styles.orderItem} onPress={() => this._orderList()}>
                <View style={styles.itemBox}>
                    {
                        _goods.count() == 1 ?
                            <View>
                                {
                                    _goods.map((v, i) => {
                                        return (
                                            <View style={styles.goodsCont} key={i}>
                                                <View style={styles.goodInfo}>
                                                    <Image style={styles.goodImg} source={{uri: v.get("goodsImg")}}/>
                                                    <View style={{flex: 1,}}>
                                                        <Text numberOfLines={2} style={styles.goodName}
                                                              allowFontScaling={false}>{v.get("goodsName")}</Text>
                                                        <Text style={{marginTop: 5,}}
                                                              allowFontScaling={false}>X{v.get("goodsNum")}</Text>
                                                    </View>
                                                </View>
                                                <Text style={{color: '#e63a59', fontSize: 16}}
                                                      allowFontScaling={false}>&yen;&nbsp;{v.get("warePrice").toFixed(2)}</Text>
                                            </View>
                                        );
                                    })
                                }
                            </View> :
                            <View style={styles.goodsCont}>
                                <View style={styles.goodsList}>
                                    {
                                        _goods.map((v, i) => {
                                            goodsNumber = goodsNumber + v.get('goodsNum');
                                            if (i < viewNum)
                                                return (
                                                    <Image style={styles.goodImg} key={i}
                                                           source={{uri: v.get("goodsImg")}}/>
                                                )

                                        })
                                    }
                                </View>
                                <Text style={{fontSize: 16,}} allowFontScaling={false}>共{goodsNumber}件</Text>
                            </View>
                    }
                </View>
                <Image style={styles.arrow} source={require('./img/right.png')}/>
            </TouchableOpacity>
        )
    }

    _orderList() {
        msg.emit('route:goToNext', {
            sceneName: 'CartGoodsList',
            goods: this.props.goods,
            groups: this.props.groups,
        })
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
        padding: 20,
        alignItems: 'center',
    },
    itemBox: {
        flex: 1,
        paddingRight: 15,
    },
    arrow: {
        width: 10,
        height: 18,
    },
    goodsCont: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    goodInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    goodImg: {
        width: 60,
        height: 60,
        borderWidth: 1 / PixelRatio.get(),
        borderColor: '#ddd',
        borderRadius: 5,
        marginRight: 10,
    },
    goodName: {
        lineHeight: 20,
        color: '#666',
    },
    goodsList: {
        flexDirection: 'row',
    },
});

