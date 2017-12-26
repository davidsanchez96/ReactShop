'use strict'

import React, {Component} from 'react';
import {
    Dimensions, Image, InteractionManager, PixelRatio, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity,
    View,
} from 'react-native';
import {connect} from "react-redux";
import {VerifyPasswordChange, VerifyPasswordShow} from "../../../utils/actionTypes";
import Toast from "react-native-root-toast";
import {verifyPassword} from "../../../action/modifyPasswordSecondActions";
import Loading from "../../components/Loading";


const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

class ModifyPasswordSecond extends Component {
    static navigationOptions = {
        title: '修改密码',
    };

    render() {
        const {modifyPasswordSecondReducer,dispatch,navigation,nav} = this.props;

        const phone = navigation.state.params.phone;
        const password = modifyPasswordSecondReducer.get('password');
        const isHide = modifyPasswordSecondReducer.get('isHide');
        let disabled = true;
        InteractionManager.runAfterInteractions(() => {
            if (modifyPasswordSecondReducer.get('isSuccess')) {
                const {goBack} = navigation;
                let key;
                for (let i = 0; i < nav.routes.length; i++) {
                    if (nav.routes[i].routeName === 'Account') {
                        key = nav.routes[i].key;
                        break;
                    }
                }
                goBack(key);
            }
        });
        return (
            <View style={styles.container}>
                <Loading visible={modifyPasswordSecondReducer.get('loading')}/>
                <ScrollView
                    bounces={false}
                    contentContainerStyle={{flex: 1}}
                    keyboardDissmisMode='on-drag'
                    keyboardShouldPresistTaps={false}
                >
                    {/*修改密码导航图*/}
                    <View style={styles.navItem}>
                        <View style={styles.navItemCol}>
                            <Image style={styles.image} source={require('../../components/img/c_phone.png')}/>
                            <Text style={styles.navItemText} allowFontScaling={false}>输入验证码</Text>
                        </View>
                        <View style={styles.navItemCol}>
                            <Image style={styles.image} source={require('../../components/img/c_done_red.png')}/>
                            <Text style={styles.navItemTextChosen} allowFontScaling={false}>修改密码</Text>
                        </View>
                    </View>
                    {/*主体内容区域*/}
                    <View style={styles.navContent}>
                        <Text allowFontScaling={false}>请输入新密码</Text>
                        <View style={styles.inputBox}>
                            <TextInput
                                style={styles.input}
                                clearButtonMode='while-editing'
                                placeholder='请输入6-20位字符'
                                placeholderTextColor='#ddd'
                                underlineColorAndroid='transparent'
                                password={isHide}
                                value={password}
                                onChangeText={(password) => {
                                    dispatch({type: VerifyPasswordChange,data:password})
                                }}/>


                            <TouchableOpacity
                                activeOpacity={0.6}
                                onPress={() => {
                                    dispatch({type: VerifyPasswordShow})
                                }}>
                                <Image
                                    style={[styles.eye,]}
                                    resizeMode='cover'
                                    source={isHide
                                        ? require('../../components/img/eye-close.png')
                                        : require('../../components/img/eye-open.png')}
                                />
                            </TouchableOpacity>

                        </View>
                        <Text style={styles.tip}
                              allowFontScaling={false}>备注:请将密码设置为6-20位，并且由字母、数字和符号两种或两种以上组合，区分大小写。</Text>

                        <TouchableOpacity
                            disabled={!(password)}
                            activeOpacity={0.8}
                            style={[styles.btnContainer, !(password) ? styles.btnDisabled : {}]}
                            onPress={() => {
                                if (password && disabled) {
                                    let complex = 0;
                                    complex = /\d/.test(password) ? complex + 1 : complex;
                                    complex = /[a-zA-Z]/.test(password) ? complex + 1 : complex;
                                    complex = /[-`=\\\[\];',./~!@#$%^&*()_+|{}:"<>?]/.test(password) ? complex + 1 : complex;

                                    if (complex < 2 || password.length < 6 || password.length > 20) {
                                        Toast.show('密码格式不正确!');

                                    } else {
                                        disabled = false;
                                        const data = {
                                            phone: phone,
                                            password: password,
                                        };
                                        dispatch(verifyPassword(data))
                                    }


                                }
                            }}>
                            <Text
                                style={[styles.text, !(password) ? styles.disabledText : {}]}
                                allowFontScaling={false}>
                                完成
                            </Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </View>
        );
    }

    _passwordChange(password) {
        msg.emit('security:passwordChange', password);
    }

    _showPassword() {
        msg.emit('security:showPassword');
    }

    _newPwd() {
        let complex = 0;
        complex = /\d/.test(this._password) ? complex + 1 : complex;
        complex = /[a-zA-Z]/.test(this._password) ? complex + 1 : complex;
        complex = /[-`=\\\[\];',./~!@#$%^&*()_+|{}:"<>?]/.test(this._password) ? complex + 1 : complex;

        if (complex < 2 || this._password.length < 6 || this._password.length > 20) {
            msg.emit('app:tip', '密码格式不正确!');
            return;
        }

        msg.emit('security:settingPwd', this._phone);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    navItem: {
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'space-between',
        borderBottomWidth: 1 / PixelRatio.get(),
        borderBottomColor: '#eee'
    },
    navContent: {
        padding: 20
    },
    navItemCol: {
        alignItems: 'center'
    },
    image: {
        width: SCREEN_WIDTH / 10,
        height: SCREEN_WIDTH / 10,
    },
    navItemText: {
        color: '#999',
        marginTop: 10
    },
    navItemTextChosen: {
        color: '#e63a59',
        marginTop: 10,
    },
    inputBox: {
        height: 50,
        marginBottom: 20,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: '#bbb',
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 1,

    },
    input: {
        flex: 1,
        padding: 0,
        fontSize: 16
    },
    lightText: {
        //fontSize: 16,
        color: '#999'
    },
    bar: {
        paddingTop: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    tip: {
        color: '#999',
        marginBottom: 20
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
    eye: {
        width: 70,
        height: 40,
    },
});

const mapStateToProps = (state) => ({
    modifyPasswordSecondReducer: state.get('modifyPasswordSecondReducer'),
    nav: state.get('nav').toJS(),
});
export default connect(mapStateToProps)(ModifyPasswordSecond);
