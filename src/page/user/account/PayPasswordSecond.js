'use strict';

import React, {Component} from 'react';
import {Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {connect} from "react-redux";
import Immutable from "immutable";
import {PayPasswordSecondClean} from "../../../utils/actionTypes";


const {width: SCREEN_WIDTH,} = Dimensions.get('window');

class PayPasswordFirst extends Component {
    static navigationOptions = {
        title: '设置支付密码',
    };
    shouldComponentUpdate(nextProps, nextState) {
        return !Immutable.is(Immutable.Map(this.props.payPasswordSecondReducer), Immutable.Map(nextProps.payPasswordSecondReducer)) ||
            !Immutable.is(Immutable.Map(this.state), Immutable.Map(nextState));
    }
    componentWillUnmount() {
        this.props.dispatch({type: PayPasswordSecondClean});
    }

    render() {
        const {payPasswordSecondReducer, dispatch, navigation} = this.props;
        const phone = this.props.phone;
        const orderCode = this.props.orderCode;
        const orderPrice = this.props.orderPrice;
        const viewName = this.props.viewName;
        const fPassword = payPasswordSecondReducer.get('firstPassword');
        const nPassword = payPasswordSecondReducer.get('nextPassword');
        return (
            <View style={styles.container}>

                <ScrollView
                    bounces={false}
                    contentContainerStyle={{flex: 1}}
                    keyboardDissmisMode='on-drag'
                    keyboardShouldPresistTaps={false}>
                    <View style={styles.navItem}>
                        <View style={styles.navItemCol}>
                            <Image style={styles.image} source={require('../../components/img/send_sms.png')}/>
                            <Text allowFontScaling={false} style={styles.navItemText}>验证身份</Text>
                        </View>
                        <View style={styles.navItemCol}>
                            <Image style={[styles.image, {tintColor: '#e63a59'}]}
                                   source={require('../img/set_password.png')}/>
                            <Text allowFontScaling={false} style={[styles.navItemText, {color: '#e63a59'}]}>设置密码</Text>
                        </View>
                        <View style={styles.navItemCol}>
                            <Image style={styles.image} source={require('../../components/img/done.png')}/>
                            <Text allowFontScaling={false} style={styles.navItemText}>完成</Text>
                        </View>
                    </View>

                    <View style={styles.navContent}>
                        <View style={styles.textWrap}>
                            <TextInput
                                style={styles.input}
                                clearButtonMode='while-editing'
                                placeholder='请输入新的支付密码'
                                placeholderTextColor='#ddd'
                                underlineColorAndroid='transparent'
                                keyboardType='default'
                                secureTextEntry={true}
                                onChangeText={(password) => {
                                    this._firstPasswordChange(password)
                                }}/>
                        </View>
                        <View style={styles.textWrap}>
                            <TextInput
                                style={styles.input}
                                clearButtonMode='while-editing'
                                placeholder='请重复密码'
                                placeholderTextColor='#ddd'
                                underlineColorAndroid='transparent'
                                keyboardType='default'
                                secureTextEntry={true}
                                onChangeText={(password) => {
                                    this._nextPasswordChange(password)
                                }}/>
                        </View>

                        <QMButton
                            activeOpacity={0.8}
                            style={styles.btn}
                            disabled={false}
                            onPress={() => this._nextStep()}>下一步</QMButton>

                        <View style={styles.textBar}>
                            <Image style={styles.icon} source={require('../img/icon.png')}/>
                            <Text allowFontScaling={false} style={styles.tip}>支付密码规则</Text>
                        </View>
                        <Text allowFontScaling={false} style={styles.tip}>支持数字及英文大小写，6-20位字符</Text>
                    </View>
                </ScrollView>
            </View>
        )
    }

    _firstPasswordChange(password) {
        msg.emit('balance:firstPassword', password);
    }

    _nextPasswordChange(password) {
        msg.emit('balance:nextPassword', password);
    }

    _nextStep() {
        let fComplex = 0;
        fComplex = /\d/.test(this._fPassword) ? fComplex + 1 : fComplex;
        fComplex = /[a-zA-Z]/.test(this._fPassword) ? fComplex + 1 : fComplex;

        if (fComplex < 1 || this._fPassword.length < 6 || this._fPassword.length > 20) {
            msg.emit('app:tip', '密码格式不正确!');
            return;
        }

        if (this._fPassword != this._nPassword) {
            msg.emit('app:tip', '两次密码不一致!');
            return;
        }

        msg.emit('balance:settingPwd', this._phone, this._orderCode, this._orderPrice, this._viewName);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    navItem: {
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'space-between',
        borderBottomWidth: 1 ,
        borderBottomColor: '#eee'
    },
    navItemCol: {
        alignItems: 'center'
    },
    navItemText: {
        color: '#999',
        marginTop: 10,
        width: 60,
        textAlign: 'center'
    },
    image: {
        width: SCREEN_WIDTH / 10,
        height: SCREEN_WIDTH / 10,
    },
    navContent: {
        padding: 20
    },
    textWrap: {
        backgroundColor: '#fff',
        borderWidth: 1 ,
        borderColor: '#bbb',
        borderRadius: 5,
        overflow: 'hidden',
        flex: 1,
        marginBottom: 15
    },
    input: {
        height: 50,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 0,
        paddingBottom: 0,
        fontSize: 16
    },
    btn: {
        marginTop: 10,
        marginBottom: 20
    },
    textBar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5
    },
    tip: {
        color: '#999'
    },
    icon: {
        width: 15,
        height: 15,
        marginRight: 5
    }
});

const mapStateToProps = (state) => ({
    payPasswordSecondReducer: state.get('payPasswordSecondReducer')
});
export default connect(mapStateToProps)(PayPasswordFirst);
