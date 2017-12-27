'use strict'

import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import NavItem from "../../components/NavItem";
import ModifyPasswordFirst from "./ModifyPasswordFirst";


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
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <NavItem
                    showLeftImage={false}
                    title='登录密码'
                    subTitle='*建议您定期更改密码以保护账户安全'
                    onPress={() => {
                        navigation.navigate('ModifyPasswordFirst', {phone: navigation.state.params.phone})
                    }}
                />
                {
                    navigation.state.params.mobileVerifyStatus === '1' ?
                        <NavItem
                            showLeftImage={false}
                            title='修改已验证手机'
                            subTitle='*可用于找回密码'
                            onPress={() => {
                                navigation.navigate('SetPhoneFirst')
                            }}
                        />
                        :
                        <NavItem
                            showLeftImage={false}
                            title='手机验证'
                            subTitle='*可用于找回密码'
                            onPress={() => {
                                navigation.navigate('SetPhoneFirst')
                            }}
                        />
                }
                <NavItem
                    title='支付密码'
                    showLeftImage={false}
                    subTitle='*设置支付密码用户可进行预存款支付'
                    onPress={() => {
                        navigation.navigate('PayPasswordFirst', {phone: navigation.state.params.phone})
                    }}
                />
                <View style={styles.spanner}>
                    <NavItem
                        showLeftImage={false}
                        title='安全Tips'
                        onPress={() => {
                            navigation.navigate('SecurityTip')
                        }}/>
                </View>
            </View>
        );
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
