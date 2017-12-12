import React, {Component} from 'react';
import {Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import NumberControl from "./NumberControl";
import {DetailNumber, SelectSpec} from "../../utils/actionTypes";

const isAndroid = Platform.OS === 'android';

export default class SpecContent extends Component {
    render() {
        const {specStatusArray, goodsInfo, specs, goodsInfoExist, addStatus} = this.props;
        const disableAdd = goodsInfo.get('addedStatus') != 1
            || goodsInfo.get('stock') <= 0 || !goodsInfoExist || !addStatus;
        if (__DEV__) {
            console.log('disableAdd--->', disableAdd);
        }

        return (
            <View style={{flex: 1}}>
                <View style={styles.specHeader}>
                    <Image style={styles.goodImg} source={{uri: goodsInfo.get('image')}}/>
                    <View style={{flex: 1, marginLeft: 15, paddingTop: 5}}>
                        <Text style={{color: '#e63a59'}} allowFontScaling={false}>&yen;&nbsp;<Text
                            style={{fontSize: 16}}
                            allowFontScaling={false}>{goodsInfo.get('warePrice') || goodsInfo.get('preferPrice')}</Text></Text>
                        <Text style={{lineHeight: 25, color: '#999'}}
                              allowFontScaling={false}>商品编号：{goodsInfo.get('itemNo')}</Text>
                    </View>
                </View>
                <ScrollView style={{flex: 1, padding: 20}} automaticallyAdjustContentInsets={false}>
                    {
                        (specs || []).map((val, index) => {
                            return (
                                <View style={styles.specItem} key={index}>
                                    <Text style={styles.label} allowFontScaling={false}>{val.get('name')}：</Text>
                                    <View style={styles.specBox}>
                                        {
                                            (val.get('specValueList') || []).map((v, i) => {
                                                //0 enable 1 disable 3 selected
                                                const specStatus = specStatusArray[index][i];
                                                return (
                                                    <TouchableOpacity
                                                        style={[styles.specBtn, specStatus == 2 && {borderColor: '#e63a59'},
                                                            specStatus == 0 && {backgroundColor: '#ddd'}]}
                                                        activeOpacity={specStatus == 0 ? 1 : 0.8}
                                                        key={i}
                                                        onPressIn={this._handleChooseSpec.bind(this, v.get('specValueId'), specStatus)}>
                                                        <Text style={{fontSize: 14, color: '#999'}}
                                                              allowFontScaling={false}>{v.get('specValueRemark')}</Text>
                                                    </TouchableOpacity>
                                                )
                                            })
                                        }
                                    </View>
                                </View>
                            );
                        })
                    }
                    <View style={[styles.specItem, {marginBottom: 20}]}>
                        <Text style={styles.label} allowFontScaling={false}>数量</Text>
                        <NumberControl
                            chosenNum={this.props.chooseNum.toString()}
                            maxNum={this.props.goodsInfo.get('stock') || 1}
                            minNum={1}
                            callbackParent={(number) => this._handleNumber(number)}
                        />
                    </View>
                </ScrollView>
                <View style={styles.specBar}>
                    <TouchableOpacity style={[styles.addCart, disableAdd && {backgroundColor: '#B6B6B6'}]}
                                      onPressIn={this._handleAddShoppingCart.bind(this, disableAdd)}>
                        <Text style={{color: '#fff', fontSize: 16}} allowFontScaling={false}>加入购物车</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }


    /**
     * 添加购物车
     */
    _handleAddShoppingCart(disableAdd) {
        if (disableAdd) {
            return;
        }

        msg.emit('goods:hideSpec');
        msg.emit('goods:addShoppingCart', this.props.goodsInfo.get('id'), this.props.spec.get('chosenNum'), true);
    }


    /**
     *  改变选中数量
     */
    _handleNumber(number) {
       this.props.dispatch({type:DetailNumber,data:number});
    }


    /**
     * 改变选中规格
     */
    _handleChooseSpec(specValueId, specStatus) {
        if (specStatus == 1) {
            this.props.dispatch({type:SelectSpec,add:true,data:specValueId});
        } else if (specStatus == 2) {
            this.props.dispatch({type:SelectSpec,add:false,data:specValueId});
        }
    }

}


const styles = StyleSheet.create({
    specHeader: {
        padding: 20,
        borderBottomWidth: 1 ,
        borderBottomColor: '#f2f2f2',
        flexDirection: 'row'
    },
    goodImg: {
        width: 80,
        height: 80,
        borderWidth: 1 ,
        borderColor: '#ddd',
        borderRadius: 5
    },
    specBar: {
        height: 60,
        flexDirection: 'row'
    },
    easyBuy: {
        flex: 4,
        backgroundColor: '#333',
        alignItems: 'center',
        justifyContent: 'center'
    },
    addCart: {
        flex: 1,
        height: 60,
        backgroundColor: '#e63a59',
        alignItems: 'center',
        justifyContent: 'center'
    },
    specItem: {
        flexDirection: 'row'
    },
    label: {
        color: '#999',
        width: 50,
        lineHeight: 22
    },
    specBox: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    specBtn: {
        height: 30,
        borderWidth: 1 ,
        borderColor: '#ddd',
        borderRadius: 3,
        marginRight: 20,
        marginBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'center'
    }
});

