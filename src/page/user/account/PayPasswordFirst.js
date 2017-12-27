'use strict';

import React, {Component} from 'react';
import {
    Dimensions, Image, InteractionManager, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity,
    View
} from 'react-native';
import {connect} from "react-redux";
import Immutable from "immutable";
import {CodeSet, PayCodeReset, PayCodeSet, PayPasswordFirstClean, VerifyCodeReset} from "../../../utils/actionTypes";
import {payCode, payVerifyCode} from "../../../action/payPasswordFirstActions";
import ResendButton from "../../components/ResendButton";
import {getCode, verifyCode} from "../../../action/modifyPasswordFirstActions";
import Toast from "react-native-root-toast";


const {width: SCREEN_WIDTH,} = Dimensions.get('window');

class PayPasswordFirst extends Component {
    static navigationOptions = {
        title: '设置支付密码',
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !Immutable.is(Immutable.Map(this.props.payPasswordFirstReducer), Immutable.Map(nextProps.payPasswordFirstReducer)) ||
            !Immutable.is(Immutable.Map(this.state), Immutable.Map(nextState));
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            //进入页面就发送验证码
            this.props.dispatch(payCode(this.props.navigation.state.params.phone))
        })
    }

    componentWillUnmount() {
        this.props.dispatch({type: PayPasswordFirstClean});
    }


    render() {
        const {payPasswordFirstReducer, dispatch, navigation} = this.props;
        const phone = navigation.state.params.phone;
        const smsVerifyCode = payPasswordFirstReducer.get('smsVerifyCode');
        const smsReFlag = payPasswordFirstReducer.get('smsReFlag');
        let disabled = true;
        InteractionManager.runAfterInteractions(() => {
            if (payPasswordFirstReducer.get('isSuccess')) {
                navigation.navigate('PayPasswordSecond', {
                    phone: phone,
                });
                dispatch({type: PayCodeReset});
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
                            <Image style={[styles.image, {tintColor: '#e63a59'}]}
                                   source={require('../../components/img/send_sms.png')}/>
                            <Text allowFontScaling={false}
                                  style={[styles.navItemText, {color: '#e63a59'}]}>验证身份</Text>
                        </View>
                        <View style={styles.navItemCol}>
                            <Image style={styles.image} source={require('../../components/img/set_password.png')}/>
                            <Text allowFontScaling={false} style={styles.navItemText}>设置密码</Text>
                        </View>
                        <View style={styles.navItemCol}>
                            <Image style={styles.image} source={require('../../components/img/done.png')}/>
                            <Text allowFontScaling={false} style={styles.navItemText}>完成</Text>
                        </View>
                    </View>

                    <View style={styles.navContent}>
                        <Text
                            allowFontScaling={false}>我们已经给您的手机{phone.substring(0, 3) + '****' + phone.substring(7)}发送了一条短信</Text>
                        <View style={styles.inputBox}>
                            <View style={styles.textWrap}>
                                <TextInput
                                    style={styles.input}
                                    placeholder='请输入短信验证码'
                                    placeholderTextColor='#ddd'
                                    underlineColorAndroid='transparent'
                                    keyboardType='numeric'
                                    onChangeText={(smsVerifyCode) => {
                                        dispatch({type: PayCodeSet, data: smsVerifyCode});
                                    }}/>
                            </View>
                            {
                                smsReFlag
                                    ?
                                    <ResendButton
                                        resend={() => {
                                            dispatch(payCode(phone))
                                        }}
                                        time={60}/>
                                    :
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        style={[styles.sendBtn, {borderColor: '#E63A59'}]}
                                        onPress={() => {
                                            dispatch(payCode(phone))
                                        }}>
                                        <Text style={[styles.sendText, {color: '#e63a59'}]}
                                              allowFontScaling={false}>获取验证码</Text>
                                    </TouchableOpacity>
                            }
                        </View>

                        <Text allowFontScaling={false} style={styles.tip}>
                            短信已经发送到您的手机，如在60秒之内还没有收到短信验证码，请重新获取验证码
                        </Text>

                        <TouchableOpacity
                            disabled={!(smsVerifyCode)}
                            activeOpacity={0.8}
                            style={[styles.btnContainer, !(smsVerifyCode) ? styles.btnDisabled : {}]}
                            onPress={() => {
                                if (smsVerifyCode && disabled) {
                                    if (!(/^\d{6}$/.test(smsVerifyCode))) {
                                        Toast.show('验证码格式不正确!');
                                    } else {
                                        disabled = false;
                                        let data = {
                                            phone: phone,
                                            smsVerifyCode: smsVerifyCode,
                                        };
                                        dispatch(payVerifyCode(data));
                                    }

                                }
                            }}>
                            <Text
                                style={[styles.text, !(smsVerifyCode) ? styles.disabledText : {}]}
                                allowFontScaling={false}>
                                下一步
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }



    _nextStep() {
        //
        msg.emit("balance:validPhone", this.props.phone, this.props.orderCode, this.props.orderPrice, this.props.viewName);
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
    inputBox: {
        marginBottom: 10,
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textWrap: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 5,
        overflow: 'hidden',
        flex: 4
    },
    input: {
        height: 50,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 0,
        paddingBottom: 0,
        fontSize: 16
    },
    tip: {
        color: '#E63A59'
    },
    btn: {
        marginTop: 20
    },
    sendBtn: {
        //flex: 2,
        width: 120,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 5,
        marginLeft: 10,
        backgroundColor: '#fff'
    },
    sendText: {
        fontSize: 16
    },
    btnContainer: {
        borderRadius: 5,
        height: SCREEN_WIDTH <= 320 ? 40 : 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e63a59',
        marginTop: 20,
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
    payPasswordFirstReducer: state.get('payPasswordFirstReducer')
});
export default connect(mapStateToProps)(PayPasswordFirst);
