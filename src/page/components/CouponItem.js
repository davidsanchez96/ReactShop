'use strict'

import React, {Component} from 'react';
import {View, StyleSheet, Text, Image,ImageBackground, Dimensions, PixelRatio, TouchableOpacity} from 'react-native';

import moment from 'moment'

const {width: SCREEN_WIDTH,} = Dimensions.get('window');


export default class CouponItem extends Component {

    render() {
        const dateFormat = 'YYYY-M-D';
        if (__DEV__) {
            console.log('比较优惠券结束时间', moment(this.props.endTime).toDate(), moment(this.props.endTime).toDate() > new Date());
            console.log(this.props.couponRuleType);
        }
        const _imageUrl = this.props.status && moment(this.props.endTime).toDate() > new Date() ? require('./img/c_coupon.png') : require('./img/c_coupon_expired.png');

        return (
            <View style={styles.container}>
                <ImageBackground
                    style={styles.backgroundImage}
                    resizeMode='stretch'
                    source={_imageUrl}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => this.props.handlePress()}
                        style={styles.couponList}>
                        <View style={styles.preView}>
                            <Text style={[styles.fontColor, {fontSize: 16}]}
                                  allowFontScaling={false}>￥
                                <Text style={{fontSize: 40}} allowFontScaling={false}>{this.props.price}</Text>
                                {
                                    this.props.couponRuleType == '2'
                                        ? <Text style={{fontSize: 12}}
                                                allowFontScaling={false}>&nbsp;满{this.props.fullPrice}可用</Text>
                                        : null
                                }
                            </Text>
                            <View style={{width: 120, paddingLeft: 15}}>
                                <Text numberOfLines={1} style={styles.fontColor}>{`由${this.props.name}发行`}</Text>
                            </View>
                        </View>

                        <View style={styles.sufView}>
                            <View style={{alignItems: 'flex-end'}}>
                                <Text style={styles.fontColor} allowFontScaling={false}>指定商品可用</Text>
                                <View style={styles.ruleBox}>
                                    <Text style={styles.ruleText} allowFontScaling={false}>优惠券使用规则&nbsp;></Text>
                                </View>
                            </View>

                            <Text style={styles.fontColor} allowFontScaling={false}>
                                {moment(this.props.startTime).format(dateFormat)}
                                ~
                                {moment(this.props.endTime).format(dateFormat)}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
    },
    backgroundImage: {
        width: SCREEN_WIDTH * 0.95,
        height: SCREEN_WIDTH * 0.38,
        marginBottom: 10,
    },
    couponList: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
        padding: 20
    },
    fontColor: {
        color: '#fff'
    },
    preView: {
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    sufView: {
        alignItems: 'flex-end',
        justifyContent: 'space-between'
    },
    ruleBox: {
        marginTop: 10,
        borderWidth: 1 / PixelRatio.get(),
        borderColor: '#fff',
        padding: 5,
        borderRadius: 3
    },
    ruleText: {
        color: '#fff',
        fontSize: 12
    }
});

