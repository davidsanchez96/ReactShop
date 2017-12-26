'use strict';

import React, {Component} from 'react';
import {
    Image, StyleSheet, Text, TextInput, Dimensions,
    InteractionManager,
    TouchableOpacity, View
} from 'react-native';


import {connect} from "react-redux";
import Immutable from "immutable";
import {PasswordSetCode, PasswordShow} from "../../utils/actionTypes";
import Toast from "react-native-root-toast";
import {setPassword} from "../../action/findPasswordThirdActions";
import Loading from "../components/Loading";

const {width: SCREEN_WIDTH} = Dimensions.get('window');

class FindPasswordThird extends Component {

    static navigationOptions = {
        title: '修改密码',
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !Immutable.is(Immutable.Map(this.props.findPasswordThirdReducer), Immutable.Map(nextProps.findPasswordThirdReducer)) ||
            !Immutable.is(Immutable.Map(this.state), Immutable.Map(nextState));
    }

    render() {
        const {findPasswordThirdReducer, dispatch, navigation, nav} = this.props;
        //手机
        const phone = navigation.state.params.phone;
        //密码
        const password = findPasswordThirdReducer.get('password');
        //是否显示密码
        const isHide = findPasswordThirdReducer.get('isHide');
        let disabled = true;
        InteractionManager.runAfterInteractions(() => {
            if (findPasswordThirdReducer.get('isSuccess')) {
                const {goBack} = navigation;
                let key;
                for (let i = 0; i < nav.routes.length; i++) {
                    if (nav.routes[i].routeName === 'FindPasswordFirst') {
                        key = nav.routes[i].key;
                        break;
                    }
                }
                goBack(key);
            }
        });

        return (
            <View style={styles.container}>
                <Loading visible={findPasswordThirdReducer.get('loading')}/>
                <Text style={styles.lightText} allowFontScaling={false}>请输入新密码</Text>
                <View style={styles.inputBox}>
                    <TextInput
                        style={styles.input}
                        clearButtonMode='while-editing'
                        placeholder='请输入6-20位字符'
                        placeholderTextColor='#ddd'
                        password={isHide}
                        value={password}
                        underlineColorAndroid='transparent'
                        onChangeText={(password) => {
                            dispatch({type: PasswordSetCode, data: password})
                        }}/>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => {
                            dispatch({type: PasswordShow})
                        }}>
                        <Image
                            style={[styles.eye,]}
                            resizeMode='cover'
                            source={isHide
                                ? require('../components/img/eye-close.png')
                                : require('../components/img/eye-open.png')}
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
                                dispatch(setPassword(data))
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
        )
    }


}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
        padding: 20
    },

    lightText: {
        color: '#999',
        fontSize: 16
    },
    inputBox: {
        backgroundColor: '#fff',
        height: 50,
        borderWidth: 1,
        borderColor: '#999',
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20
    },
    input: {
        flex: 1,
        padding: 0,
        fontSize: 16
    },
    tip: {
        marginTop: 20,
        marginBottom: 20,
        fontSize: 14,
        color: '#999',
        lineHeight: 20
    },
    eye: {
        width: 70,
        height: 40,
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
    findPasswordThirdReducer: state.get('findPasswordThirdReducer'),
    nav: state.get('nav').toJS(),
});
export default connect(mapStateToProps)(FindPasswordThird);
