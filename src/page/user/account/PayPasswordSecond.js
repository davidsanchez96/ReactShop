'use strict';

import React, {Component} from 'react';
import {
    Dimensions, Image, InteractionManager, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity,
    View,
} from 'react-native';
import {connect} from "react-redux";
import Immutable from "immutable";
import {
    PayPasswordFirstSet, PayPasswordReset, PayPasswordSecond,
    PayPasswordSecondClean
} from "../../../utils/actionTypes";
import Toast from "react-native-root-toast";
import {payPassword} from "../../../action/payPasswordSecondActions";


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
        const phone = navigation.state.params.phone;
        const orderCode = this.props.orderCode;
        const orderPrice = this.props.orderPrice;
        const viewName = this.props.viewName;
        const fPassword = payPasswordSecondReducer.get('firstPassword');
        const nPassword = payPasswordSecondReducer.get('nextPassword');
        let disabled = true;
        InteractionManager.runAfterInteractions(() => {
            if (payPasswordSecondReducer.get('isSuccess')) {
                navigation.navigate('PayPasswordThird');
                dispatch({type: PayPasswordReset});
            }
        });
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
                                   source={require('../../components/img/set_password.png')}/>
                            <Text allowFontScaling={false} style={[styles.navItemText, {color: '#e63a59'}]}>设置密码</Text>
                        </View>
                        <View style={styles.navItemCol}>
                            <Image style={styles.image} source={require('../../components/img/done.png')}/>
                            <Text allowFontScaling={false} style={styles.navItemText}>完成</Text>
                        </View>
                    </View>

                    <View style={styles.navContent}>
                            <TextInput
                                style={styles.input}
                                clearButtonMode='while-editing'
                                placeholder='请输入新的支付密码'
                                placeholderTextColor='#ddd'
                                underlineColorAndroid='transparent'
                                keyboardType='default'
                                secureTextEntry={true}
                                onChangeText={(password) => {
                                    dispatch({type: PayPasswordFirstSet, data: password});
                                }}/>
                            <TextInput
                                style={styles.input}
                                clearButtonMode='while-editing'
                                placeholder='请重复密码'
                                placeholderTextColor='#ddd'
                                underlineColorAndroid='transparent'
                                keyboardType='default'
                                secureTextEntry={true}
                                onChangeText={(password) => {
                                    dispatch({type: PayPasswordSecond, data: password});
                                }}/>


                        <TouchableOpacity
                            disabled={!(fPassword && nPassword)}
                            activeOpacity={0.8}
                            style={[styles.btnContainer, !(fPassword && nPassword) ? styles.btnDisabled : {}]}
                            onPress={() => {
                                if (fPassword && nPassword && disabled) {

                                    let fComplex = 0;
                                    fComplex = /\d/.test(fPassword) ? fComplex + 1 : fComplex;
                                    fComplex = /[a-zA-Z]/.test(fPassword) ? fComplex + 1 : fComplex;

                                    if (fComplex < 1 || fPassword.length < 6 || fPassword.length > 20) {
                                        Toast.show('验证码格式不正确!');
                                    }

                                    else if (fPassword !== nPassword) {
                                        Toast.show('两次密码不一致!');
                                    }
                                    else {
                                        disabled = false;
                                        let data = {
                                            phone: phone,
                                            password: fPassword,
                                        };
                                        dispatch(payPassword(data));
                                    }

                                }
                            }}>
                            <Text
                                style={[styles.text, !(fPassword && nPassword) ? styles.disabledText : {}]}
                                allowFontScaling={false}>
                                下一步
                            </Text>
                        </TouchableOpacity>

                        <View style={styles.textBar}>
                            <Image style={styles.icon} source={require('../../components/img/icon.png')}/>
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
        borderBottomWidth: 1,
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

    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 5,
        height: 50,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 0,
        paddingBottom: 0,
        fontSize: 16,
        marginBottom: 15
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
    },
    btnContainer: {
        borderRadius: 5,
        height: SCREEN_WIDTH <= 320 ? 40 : 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e63a59',
        marginTop: 10,
        marginBottom: 20,
    },
    text: {
        fontSize: SCREEN_WIDTH <= 320 ? 16 : 18,
        color: '#fff',
    },
    btnDisabled: {
        backgroundColor: '#ddd'
    },
    disabledText: {
        color: '#999'
    },
});

const mapStateToProps = (state) => ({
    payPasswordSecondReducer: state.get('payPasswordSecondReducer')
});
export default connect(mapStateToProps)(PayPasswordFirst);
