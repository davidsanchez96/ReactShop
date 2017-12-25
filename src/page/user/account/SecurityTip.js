'use strict'

import React, {Component} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';


export default class SecurityTip extends Component {
    static navigationOptions = {
        title: '安全Tips',
    };

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.view}>
                    <View style={styles.item}>
                        <Text style={styles.title} allowFontScaling={false}>{'一、设置密码'}</Text>
                        <Text style={styles.content}
                              allowFontScaling={false}>{'密码的设置要做到复杂又好记。请尽量使用数字、字母或符号的组合，以免被轻易破解；请避免与生日、车牌号等个人信息相同，以免轻易猜到；为了支付安全，建议支付密码和登录密码不要相同。'}</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.title} allowFontScaling={false}>{'二、密码保存'}</Text>
                        <Text style={styles.content}
                              allowFontScaling={false}>{'请勿将密码保存在手机中，也请勿轻易向人透露自己的密码。定期修改密码，是一个好习惯。'}</Text>
                    </View>
                    <View>
                        <Text style={styles.title} allowFontScaling={false}>{'三、安全等级'}</Text>
                        <Text style={styles.content}
                              allowFontScaling={false}>{'为了保障您的账户安全，我们建议您开启手机验证，同时，将登录密码设为高强度的复杂密码，提高账户安全等级。'}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    view: {
        padding: 20
    },
    item: {
        marginBottom: 20
    },
    title: {
        fontSize: 16
    },
    content: {
        fontSize: 14,
        lineHeight: 30,
        color: '#999'
    }
})

