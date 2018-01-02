'use strict';

import React, {Component} from 'react';
import {
    AsyncStorage, Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity,
    View,
} from 'react-native';


import {connect} from "react-redux";
import {LoginClean, LoginPass, LoginPassword, LoginUser, Refresh} from "../../utils/actionTypes";
import {login} from "../../action/loginActions";
import Immutable from "immutable";
import Loading from "../components/Loading";

const {width: SCREEN_WIDTH} = Dimensions.get('window');


/**
 * 登录
 */
class Login extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '登录',
            headerLeft:
                (
                    <TouchableOpacity style={{padding: 10}} activeOpacity={0.8} onPress={() => {
                        navigation.goBack()
                    }
                    }>
                        <Text style={{color: '#999',}} allowFontScaling={false}>取消</Text>
                    </TouchableOpacity>
                ),

        };
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !Immutable.is(Immutable.Map(this.props.loginReducer), Immutable.Map(nextProps.loginReducer)) ||
            !Immutable.is(Immutable.Map(this.state), Immutable.Map(nextState));
    }

    componentDidUpdate() {
        const {loginReducer, navigation, dispatch} = this.props;
        if (loginReducer.get('isSuccess')) {
            navigation.goBack();
            dispatch({type: Refresh})
        }
    }

    componentWillUnmount() {
        this.props.dispatch({type: LoginClean});
    }

    render() {
        const {loginReducer, dispatch, navigation} = this.props;
        const store = loginReducer;
        let disabled = true;

        return (
            <View style={styles.loginContainer}>
                {/*帐号*/}
                <Loading visible={loginReducer.get('loading')}/>
                <Image style={styles.banner} source={require('../components/img/loginBanner.png')}/>
                <View style={styles.inputBox}>
                    <View style={styles.inputItem}>
                        <Text style={styles.label} allowFontScaling={false}>账号：</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='用户名/手机号/邮箱'
                            placeholderTextColor='#ddd'
                            value={store.get('user')}
                            underlineColorAndroid='transparent'
                            onChangeText={(user) => {
                                dispatch({type: LoginUser, user: user})
                            }}/>
                    </View>

                    {/*密码*/}
                    <Image style={{width: SCREEN_WIDTH}} source={require('../components/img/line.png')}/>
                    <View style={[styles.inputItem, {
                        paddingTop: 10,
                        paddingBottom: 10
                    }]}>
                        <Text style={styles.label} allowFontScaling={false}>密码：</Text>
                        <TextInput
                            style={styles.input}
                            clearButtonMode='while-editing'
                            placeholder='请输入密码'
                            placeholderTextColor='#ddd'
                            secureTextEntry={store.get('isHide')}
                            value={store.get('password')}
                            underlineColorAndroid='transparent'
                            onChangeText={(password) => {
                                dispatch({type: LoginPassword, password: password})
                            }}/>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={() => {
                                dispatch({type: LoginPass})
                            }}>
                            <Image
                                style={[styles.eye,]}
                                resizeMode='cover'
                                source={store.get('isHide')
                                    ? require('../components/img/eye-close.png')
                                    : require('../components/img/eye-open.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/*登录按钮*/}
                <View style={styles.wrap}>

                    <TouchableOpacity
                        disabled={!(store.get('user') && store.get('password'))}
                        activeOpacity={0.8}
                        style={[styles.btnContainer, !(store.get('user') && store.get('password')) ? styles.disabled : {}]}
                        onPress={() => {
                            if (store.get('user') && store.get('password') && disabled) {
                                disabled = false;
                                dispatch(login(loginReducer.get('user'), loginReducer.get('password')))
                            }
                        }}>
                        <Text
                            style={[styles.btn, !(store.get('user') && store.get('password')) ? styles.disabledText : {}]}
                            allowFontScaling={false}>
                            登录
                        </Text>
                    </TouchableOpacity>

                    <View style={styles.quick}>
                        {/*<Text style={styles.quickTitle} onPress={() => this._quickRegister()} allowFontScaling={false}>手机快速注册</Text>*/}
                        <Text style={styles.quickTitle} onPress={() => {
                            navigation.navigate('FindPasswordFirst');
                        }}
                              allowFontScaling={false}>找回密码</Text>
                    </View>
                </View>
            </View>


        );
    }


    _renderLeft() {
        return (
            <TouchableOpacity style={styles.headLeftTouch}
                              activeOpacity={0.8}
                              onPress={this._handleCancel}>
                <Text style={{color: '#666'}} allowFontScaling={false}>取消</Text>
            </TouchableOpacity>
        );
    }

    /**
     * 取消按钮事件
     * @private
     */
    _handleCancel() {
        //如果是被动跳转到登录页面,点击取消按钮时,返回到主页面; 否则返回上一页入口
        msg.emit('route:cancelLoginNav');
    }


    // /**
    //  * 快速注册
    //  * @private
    //  */
    // _quickRegister() {
    //   msg.emit('route:goToNext', {sceneName: 'RegistryValidPhone'});
    // },


}


var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee'
    },
    loginContainer: {
        flex: 1,
        alignItems: 'center'
    },
    banner: {
        height: 100
    },
    inputBox: {
        alignSelf: 'stretch',
        marginTop: 15,
        marginBottom: 2,
        backgroundColor: '#fff',
        paddingTop: 5,
        paddingBottom: 5,
        borderTopWidth: 1 ,
        borderBottomWidth: 2 ,
        borderTopColor: '#eee',
        borderBottomColor: '#eee'
    },
    inputItem: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center'
    },
    label: {
        fontSize: 16,
        color: '#666',
        paddingRight: 10
    },
    input: {
        flex: 1,
        fontSize: 16,
        height: 40,
        padding: 0
    },
    eye: {
        width: 70,
        height: 40,
    },
    wrap: {
        padding: 20,
        alignSelf: 'stretch'
    },
    disabled: {
        backgroundColor: '#ddd'
    },
    quick: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        marginTop: 15
    },
    quickTitle: {
        fontSize: 14,
        color: '#666'
    },
    tabBar: {
        flexDirection: 'row',
        height: 60,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60
    },
    icon: {
        height: 16,
    },
    tabWord: {
        color: '#999'
    },
    headLeftTouch: {
        paddingLeft: 20,
        paddingRight: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnContainer: {
        borderRadius: 5,
        height: SCREEN_WIDTH <= 320 ? 40 : 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e63a59'
    },
    btn: {
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
    loginReducer: state.get('loginReducer')
});
export default connect(mapStateToProps)(Login);
