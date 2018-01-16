'use strict';

import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet, Text, Platform, PixelRatio, Image, Dimensions} from 'react-native';

import SwipeOut from 'react-native-swipeout';
import {List} from 'immutable';
import GroupGoodItem from "./GroupGoodItem";
import Tag from "./Tag";
import NumberControl from "./NumberControl";

const {width: SCREEN_WIDTH} = Dimensions.get('window');


export default class GroupItem extends Component {
    render() {


        this._group = this.props.group;

        var _groupName = this._group.get("groupName");
        var _shoppingCartId = this._group.get("shoppingCartId");

        var _warePrice = this._group.get("warePrice");

        if (__DEV__) {
            console.log("[GroupItem]rendering...group=", this._group.toJS());
        }

        //if (__DEV__) {
        //  console.log("_groupName", _groupName);
        //  console.log("_shoppingCartId", _shoppingCartId);
        //}
        return (
            <View style={styles.groupBox}>
                <View style={styles.cartTitle}>
                    <TouchableOpacity
                        style={{height: 50, justifyContent: 'center'}}
                        onPress={() => this._handleCheck(_shoppingCartId)}
                        activeOpacity={0.8}>
                        <Image
                            style={styles.check}
                            source={this.props.checkedList.has(_shoppingCartId) ?
                                require('./img/checked.png') : require('./img/uncheck.png')}/>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.storeTitle}
                        activeOpacity={0.8}>
                        <Tag tag={"套装"}/>
                        <Text numberOfLines={1}
                              style={{flex: 1, marginLeft: 10}}
                              allowFontScaling={false}>
                            {_groupName}
                        </Text>
                    </TouchableOpacity>
                </View>


                <View style={styles.cartGood}>

                    {/* groupGoodsList */}
                    {
                        this._group.get("productResponseList").map((good, i) => (
                                <GroupGoodItem good={good} key={i}/>
                            )
                        )
                    }

                    <View style={styles.goodPriceBar}>
                        <Text style={styles.goodsPrice}
                              allowFontScaling={false}>
                            {"套装价:"}&yen;&nbsp;{_warePrice.toFixed(2)}
                        </Text>
                        <NumberControl
                            style={{marginRight: 40, alignSelf: 'flex-end', backgroundColor: "e5e"}}
                            callbackParent={(newState) => this.onChildChanged(newState, this._group.get("shoppingCartId"))}
                            chosenNum={this._group.get("groupNum") != null ? this._group.get("groupNum") : '0'}
                            maxNum={this._group.get("wareStock") != null ? this._group.get("wareStock") : '10'}/>
                    </View>
                </View>
            </View>
        )
    }

    _handleCheck(shoppingCartId) {
        msg.emit('cart:changeGoodChecked', shoppingCartId, !this.props.checkedList.has(shoppingCartId));
    }


    onChildChanged(newState, shoppingCartId) {
        msg.emit('cart:changeGoodsNum', shoppingCartId, newState);
    }
}

const styles = StyleSheet.create({
    cartGood: {
        flex: 1,
        backgroundColor: '#fff',
        marginLeft: 45,
        paddingRight: 15
    },
    cartItem: {
        backgroundColor: '#fff',
        marginTop: 10
    },
    cartTitle: {
        height: 50,
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    storeTitle: {
        flex: 1,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center'
    },
    check: {
        marginRight: 10,
        width: 20,
        height: 20
    },
    house: {
        width: 16,
        height: 16,
        marginRight: 10,
        tintColor: '#e63a59'
    },
    arrow: {
        width: 8,
        height: 16,
        marginLeft: 10
    },
    cartBox: {
        paddingBottom: 20
    },
    promotionBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 45,
        paddingRight: 15,
        marginTop: 20
    },
    promotion: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    goodPriceBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    goodsPrice: {
        flex: 1,
        color: '#e55',
        fontSize: 16,
    },
    groupBox: {
        paddingBottom: 20,
        borderBottomWidth: 1 / PixelRatio.get(),
        borderBottomColor: '#ccc'
    }
});

