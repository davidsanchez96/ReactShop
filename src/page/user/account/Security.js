'use strict'

import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import NavItem from "../../components/NavItem";


export default class Security extends Component {

    static navigationOptions = {
        title: '账户安全',
    };
    constructor(props) {
        super(props);
        this.state = {
            verified: true // 假设判断是否进行过手机验证
        }
    }



    render() {

        return (
            <View style={styles.container}>
                <NavItem
                    showLeftImage={false}
                    title='登录密码'
                    subTitle='*建议您定期更改密码以保护账户安全'
                    onPress={() => this.securityPassword()}
                />
                {
                    this.props.mobileVerifyStatus === '1' ?
                        <NavItem
                            showLeftImage={false}
                            title='修改已验证手机'
                            subTitle='*可用于找回密码'
                            onPress={() => this.securityPhone()}
                        />
                        :
                        <NavItem
                            showLeftImage={false}
                            title='手机验证'
                            subTitle='*可用于找回密码'
                            onPress={() => this.verifyPhone()}
                        />
                }
                <NavItem
                    title='支付密码'
                    showLeftImage={false}
                    subTitle='*设置支付密码用户可进行预存款支付'
                    onPress={() => this.payPassword()}
                />
                <View style={styles.spanner}>
                    <NavItem
                        showLeftImage={false}
                        title='安全Tips'
                        onPress={() => this._securityTips()}/>
                </View>
            </View>
        );
    }

    _securityTips() {
        if (__DEV__) {
            console.log("phone------->", this.props.mobile);
        }
        msg.emit('route:goToNext', {sceneName: 'SecurityTips', phone: this.props.mobile});
    }

    securityPassword() {
        msg.emit('route:goToNext', {sceneName: 'SendSMS', phone: this.props.mobile});
    }

    verifyPhone() {
        msg.emit('route:goToNext', {sceneName: 'ValidAccount'});
    }

    securityPhone() {
        msg.emit('route:goToNext', {sceneName: 'ValidOldPhone', phone: this.props.mobile});
    }

    payPassword() {
        // if (!this.state.verified) {
        //     msg.emit('app:alert', {
        //         title: '',
        //         msgContent: '设置支付密码，请先验证手机',
        //         okText: '立即验证',
        //         cancelText: '稍后再说',
        //         okHandle: () => {
        //         }
        //     });
        // } else {
            msg.emit('route:goToNext', {sceneName: 'SendPaySMS', phone: this.props.mobile});
        // }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EAEAEA',
    },
    spanner: {
        marginTop: 10,
    }

});
