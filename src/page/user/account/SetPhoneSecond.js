'use strict';

import {
    Dimensions, Image, InteractionManager, StyleSheet, Text, TextInput, TouchableOpacity,
    View,
} from 'react-native';
import React, {Component} from "react";
import {connect} from "react-redux";
import {
    SetPhoneFirstReset, SetPhoneSecondClean, SetPhoneSecondCode,
    SetPhoneSecondPhone
} from "../../../utils/actionTypes";
import Immutable from "immutable";
import ResendButton from "../../components/ResendButton";
import Toast from "react-native-root-toast";
import {getPhoneCode, verifyPhoneCode} from "../../../action/setPhoneSecondActions";
import Loading from "../../components/Loading";

const {width: SCREEN_WIDTH} = Dimensions.get('window');


class SetPhoneSecond extends Component {
    static navigationOptions = {
        title: '手机验证',
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !Immutable.is(Immutable.Map(this.props.setPhoneSecondReducer), Immutable.Map(nextProps.setPhoneSecondReducer)) ||
            !Immutable.is(Immutable.Map(this.state), Immutable.Map(nextState));
    }


    componentWillUnmount() {
        this.props.dispatch({type: SetPhoneSecondClean});
    }

    render() {
        const {setPhoneSecondReducer, dispatch, navigation} = this.props;
        const phone = setPhoneSecondReducer.get('phone');
        const smsVerifyCode = setPhoneSecondReducer.get('smsVerifyCode');
        const smsReFlag = setPhoneSecondReducer.get('smsReFlag');
        let disabled = true;
        InteractionManager.runAfterInteractions(() => {
            if (setPhoneSecondReducer.get('isSuccess')) {
                navigation.navigate('SetPhoneThird',);
                dispatch({type: SetPhoneFirstReset});
            }
        });
        return (
            <View style={styles.container}>
                <Loading visible={setPhoneSecondReducer.get('loading')}/>
                {/*手机验证导航图*/}
                <View style={styles.navItem}>
                    <View style={styles.navItemCol}>
                        <Image style={styles.image} source={require('../../components/img/c_isPerson.png')}/>
                        <Text style={styles.navItemText} allowFontScaling={false}>验证身份</Text>
                    </View>
                    <View style={styles.navItemCol}>
                        <Image style={[styles.image, {tintColor: '#e63a59'}]}
                               source={require('../../components/img/c_phone.png')}/>
                        <Text style={styles.navItemTextChosen} allowFontScaling={false}>验证手机</Text>
                    </View>
                    <View style={styles.navItemCol}>
                        <Image style={styles.image} source={require('../../components/img/c_done.png')}/>
                        <Text style={styles.navItemText} allowFontScaling={false}>完成</Text>
                    </View>
                </View>

                {/*主体内容区域*/}
                <View style={styles.navContent}>
                    <View style={styles.inputBox}>
                        <View style={styles.textWrap}>
                            <TextInput
                                style={styles.input}
                                placeholder='请输入手机号码'
                                placeholderTextColor='#ddd'
                                underlineColorAndroid='transparent'
                                keyboardType='numeric'
                                onChangeText={(phone) => {
                                    dispatch({type: SetPhoneSecondPhone, data: phone});
                                }}/>
                        </View>
                    </View>

                    <View style={styles.inputBox}>
                        <View style={styles.textWrap}>
                            <TextInput
                                style={styles.input}
                                placeholder='请输入手机验证码'
                                placeholderTextColor='#ddd'
                                underlineColorAndroid='transparent'
                                keyboardType='numeric'
                                onChangeText={(smsCode) => {
                                    dispatch({type: SetPhoneSecondCode, data: smsCode});
                                }}/>
                        </View>
                        {
                            smsReFlag
                                ?
                                <ResendButton
                                    resend={() => {
                                        if (!(/^1\d{10}$/.test(phone))) {
                                            Toast.show('手机号不合法');
                                        } else {
                                            let data = {
                                                phone: phone,
                                            };
                                            dispatch(getPhoneCode(data))
                                        }
                                    }}
                                    time={60}/>
                                :
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={[styles.sendBtn, {borderColor: '#e63a59'}]}
                                    onPress={() => {
                                        if (!(/^1\d{10}$/.test(phone))) {
                                            Toast.show('手机号不合法');
                                        } else {
                                            let data = {
                                                phone: phone,
                                            };
                                            dispatch(getPhoneCode(data))
                                        }
                                    }}>
                                    <Text style={[styles.sendText, {color: '#e63a59'}]}
                                          allowFontScaling={false}>获取验证码</Text>
                                </TouchableOpacity>
                        }
                    </View>


                    <TouchableOpacity
                        disabled={!(phone && smsVerifyCode)}
                        activeOpacity={0.8}
                        style={[styles.btnContainer, !(phone && smsVerifyCode) ? styles.btnDisabled : {}]}
                        onPress={() => {
                            if (phone && smsVerifyCode && disabled) {
                                if (!(/^1\d{10}$/.test(phone))) {
                                    Toast.show('手机号不合法');
                                } else if (!(/^\d{6}$/.test(smsVerifyCode))) {
                                    Toast.show('验证码格式不正确!');
                                } else {
                                    disabled = false;
                                    let data = {
                                        phone: phone,
                                        smsVerifyCode: smsVerifyCode,
                                    };
                                    dispatch(verifyPhoneCode(data));
                                }
                            }
                        }}>
                        <Text
                            style={[styles.text, !(phone && smsVerifyCode) ? styles.disabledText : {}]}
                            allowFontScaling={false}>
                            下一步
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
        marginTop: 10
    },
    navItemTextChosen: {
        color: '#e63a59',
        marginTop: 10,
    },
    image: {
        width: SCREEN_WIDTH / 10,
        height: SCREEN_WIDTH / 10,
    },
    navContent: {
        padding: 20
    },
    inputBox: {
        marginBottom: 20,
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
    sendBtn: {
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
    setPhoneSecondReducer: state.get('setPhoneSecondReducer')
});
export default connect(mapStateToProps)(SetPhoneSecond);
