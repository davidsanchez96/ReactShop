'use strict'

import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';


export default class CouponDetail extends Component {
    static navigationOptions = {
        title: '优惠券使用规则',
    };

    render() {

        return (
            <ScrollView style={styles.container} automaticallyAdjustContentInsets={false} bounces={false}>
                <View style={styles.view}>
                    <Text style={styles.text} allowFontScaling={false}>
                        类型:
                        {
                            this.props.navigation.state.params.couponRuleType == 1
                                ?
                                '直降'
                                :
                                '满减'
                        }
                    </Text>
                </View>
                <View style={styles.descriptionView}>
                    <Text style={styles.description} allowFontScaling={false}>
                        描述:
                        {this.props.navigation.state.params.remark}
                    </Text>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EAEAEA',
    },
    view: {
        backgroundColor: '#FFFFFF',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderBottomWidth: 1,
        borderBottomColor: '#EAEAEA',
        paddingLeft: 15,
        paddingRight: 15
    },
    text: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        color: '#666'
    },
    description: {
        padding: 10,
        fontSize: 14,
        lineHeight: 20,
        color: '#666'
    },
    descriptionView: {
        backgroundColor: '#FFFFFF',
        paddingLeft: 15,
        paddingRight: 15
    }
});

