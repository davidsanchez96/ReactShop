'use strict';

import React, {Component} from 'react';
import {Dimensions, Image, StyleSheet, Text,
    InteractionManager,
    TextInput, TouchableOpacity, View} from 'react-native';

import Toast from 'react-native-root-toast';

import {connect} from "react-redux";
import Loading from "../components/Loading";
import {URL} from "../../utils/Constant";
import {checkPhone} from "../../action/findPasswordFirstActions";
import {FindPasswordCaptcha, FindPasswordClean, FindPasswordPhone, FindPasswordUUID} from "../../utils/actionTypes";
import Immutable from "immutable";
import FindPasswordSecond from "./FindPasswordSecond";

const {width: SCREEN_WIDTH} = Dimensions.get('window');

/**
 * 找回密码--手机号码认证
 */
class FindPasswordFirst extends Component {
    static navigationOptions = {
        title: '找回密码',
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !Immutable.is(Immutable.Map(this.props.findPasswordFirstReducer), Immutable.Map(nextProps.findPasswordFirstReducer)) ||
            !Immutable.is(Immutable.Map(this.state), Immutable.Map(nextState));
    }
    

    componentDidMount() {
        // msg.emit('findPwd:newCaptcha');
    }

    componentWillUnmount() {
        this.props.dispatch({type: FindPasswordClean});
    }

    render() {
        const {findPasswordFirstReducer, dispatch,navigation} = this.props;
        //帐号
        const phone = findPasswordFirstReducer.get('phone');
        //验证码
        const captcha = findPasswordFirstReducer.get('captcha');
        const uuid = findPasswordFirstReducer.get('uuid');
        let disabled = true;
        InteractionManager.runAfterInteractions(()=>{
            if (findPasswordFirstReducer.get('isSuccess')) {
                navigation.navigate('FindPasswordSecond', {
                    phone: findPasswordFirstReducer.get('phone'),
                    nickname: findPasswordFirstReducer.get('nickname'),
                    uuid: findPasswordFirstReducer.get('uuid')
                });

            }
        });


        return (
            <View style={styles.container}>
                <Loading visible={findPasswordFirstReducer.get('loading')}/>
                <View style={styles.wrapper}>
                    <View style={styles.inputWrap}>
                        <TextInput
                            style={styles.input}
                            placeholder='请输入手机号码'
                            placeholderTextColor='#ddd'
                            value={phone}
                            keyboardType='numeric'
                            ref={(phone) => this.phoneInput = phone}
                            onFocus={() => this.phoneInput.focus()}
                            underlineColorAndroid='transparent'
                            onChangeText={(user) => {
                                dispatch({type: FindPasswordPhone, phone: user})
                            }}/>
                    </View>
                    <View style={styles.inputBox}>
                        <View style={[styles.inputWrap, {flex: 4}]}>
                            <TextInput
                                style={styles.input}
                                placeholder='请输入验证码'
                                placeholderTextColor='#ddd'
                                value={captcha}
                                keyboardType='numeric'
                                ref={(code) => this.codeInput = code}
                                onFocus={() => this.codeInput.focus()}
                                underlineColorAndroid='transparent'
                                onChangeText={(captcha) => {
                                    dispatch({type: FindPasswordCaptcha, captcha: captcha})
                                }}/>
                        </View>
                        <Image style={styles.captcha}
                               source={{uri: `${URL}/captcha?uuid=` + uuid}}/>
                        <Text style={styles.change} onPress={() => {
                            dispatch({type: FindPasswordUUID})
                        }}
                              allowFontScaling={false}>换一张</Text>
                    </View>


                    <TouchableOpacity
                        disabled={!(phone && captcha)}
                        activeOpacity={0.8}
                        style={[styles.btnContainer, {marginTop: 20}, !(phone && captcha) ? styles.btnDisabled : {}]}
                        onPress={() => {
                            if (phone && captcha && disabled) {
                                disabled = false;
                                if (phone && !(/^1\d{10}$/.test(phone))) {
                                    Toast.show('手机号码不正确!');
                                } else if (captcha && !(/^\d{4,6}$/.test(captcha))) {
                                    Toast.show('验证码错误!');
                                } else {
                                    let data = {
                                        phone: phone,
                                        uuid: uuid,
                                        captcha: captcha,
                                    };
                                    dispatch(checkPhone(data))
                                }

                            }
                        }}>
                        <Text
                            style={[styles.text, !(phone && captcha) ? styles.disabledText : {}]}
                            allowFontScaling={false}>
                            下一步
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }


}

var styles = StyleSheet.create({
    change: {
        fontSize: 14,
        color: '#CC0000',
        marginRight: 20,
    },
    captcha: {
        flex: 3,
        height: 40,
        marginRight: 20,
        marginLeft: 20,
        backgroundColor: '#eee'
    },
    container: {
        flex: 1,
        backgroundColor: '#eee'
    },
    wrapper: {
        padding: 20
    },
    inputWrap: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#999',
        borderRadius: 5,
        overflow: 'hidden'
    },
    input: {
        height: 50,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 0,
        paddingBottom: 0,
        fontSize: 16,
        flex: 1
    },
    inputBox: {
        marginBottom: 20,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    sendBtn: {
        flex: 2,
        marginLeft: 10,
        height: 48,
        borderWidth: 1,
        borderColor: '#e63a59',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e63a59',
        borderRadius: 5,
        overflow: 'hidden'
    },
    sendText: {
        color: '#e63a59',
        fontSize: 16
    },
    btnContainer: {
        borderRadius: 5,
        height: SCREEN_WIDTH <= 320 ? 40 : 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e63a59'
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
    findPasswordFirstReducer: state.get('findPasswordFirstReducer')
});
export default connect(mapStateToProps)(FindPasswordFirst);
