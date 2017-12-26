'use strict'

import React, {Component} from 'react';
import {
    AsyncStorage, Dimensions, Image, InteractionManager, PixelRatio, ScrollView, StyleSheet, Text, TextInput,
    TouchableOpacity, View
} from 'react-native';

import {connect} from "react-redux";
import ResendButton from "../../components/ResendButton";
import Immutable from "immutable";
import {CodeSet, VerifyCodeReset} from "../../../utils/actionTypes";
import {getCode, verifyCode} from "../../../action/modifyPasswordFirstActions";
import Toast from 'react-native-root-toast';
import ModifyPasswordSecond from "./ModifyPasswordSecond";
import Loading from "../../components/Loading";


const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

class ModifyPasswordFirst extends Component {
    static navigationOptions = {
        title: '修改密码',
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !Immutable.is(Immutable.Map(this.props.modifyPasswordFirstReducer), Immutable.Map(nextProps.modifyPasswordFirstReducer)) ||
            !Immutable.is(Immutable.Map(this.state), Immutable.Map(nextState));
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            //进入页面就发送验证码
            this.props.dispatch(getCode(this.props.navigation.state.params.phone))
        })
    }

    render() {
        const {modifyPasswordFirstReducer, dispatch, navigation} = this.props;

        const phone = navigation.state.params.phone;
        const smsVerifyCode = modifyPasswordFirstReducer.get('smsVerifyCode');
        const smsReFlag = modifyPasswordFirstReducer.get('smsReFlag');
        let disabled = true;
        InteractionManager.runAfterInteractions(() => {
            if (modifyPasswordFirstReducer.get('isSuccess')) {
                navigation.navigate('ModifyPasswordSecond', {
                    phone: phone,
                });
                dispatch({type: VerifyCodeReset});
            }
        });

        return (
            <View style={styles.container}>
                <Loading visible={modifyPasswordFirstReducer.get('loading')}/>
                <ScrollView
                    bounces={false}
                    contentContainerStyle={{flex: 1}}
                    keyboardDissmisMode='on-drag'
                    keyboardShouldPresistTaps={false}
                >
                    {/*修改密码导航图*/}
                    <View style={styles.navItem}>
                        <View style={styles.navItemCol}>
                            <Image style={styles.image}
                                   source={require('../../components/img/c_phone_red.png')}/>
                            <Text style={styles.navItemTextChosen} allowFontScaling={false}>输入验证码</Text>
                        </View>
                        <View style={styles.navItemCol}>
                            <Image style={styles.image} source={require('../../components/img/c_done.png')}/>
                            <Text style={styles.navItemText} allowFontScaling={false}>修改密码</Text>
                        </View>
                    </View>
                    {/*主体内容区域*/}
                    <View style={styles.navContent}>
                        <Text
                            allowFontScaling={false}>我们已经给您的手机{phone.substring(0, 3) + '****' + phone.substring(7)}发送了一条短信</Text>

                        <View style={styles.inputBox}>
                            <View style={styles.textWrap}>
                                <TextInput style={styles.input}
                                           placeholder='请输入短信验证码'
                                           placeholderTextColor='#ddd'
                                           underlineColorAndroid='transparent'
                                           keyboardType='numeric'
                                           onChangeText={(smsVerifyCode) => {
                                               dispatch({type: CodeSet, data: smsVerifyCode});
                                           }}/>
                            </View>
                            {
                                smsReFlag
                                    ?
                                    <ResendButton
                                        resend={() => {
                                            dispatch(getCode(phone))
                                        }}
                                        time={60}/>
                                    :
                                    <TouchableOpacity activeOpacity={0.6}
                                                      style={[styles.sendBtn, {borderColor: '#E63A59'}]}
                                                      onPress={() => {
                                                          dispatch(getCode(phone))
                                                      }}>
                                        <Text style={[styles.sendText, {color: '#e63a59'}]}
                                              allowFontScaling={false}>获取验证码</Text>
                                    </TouchableOpacity>
                            }

                        </View>


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
                                        dispatch(verifyCode(data));
                                    }

                                }
                            }}>
                            <Text
                                style={[styles.text, !(smsVerifyCode) ? styles.disabledText : {}]}
                                allowFontScaling={false}>
                                下一步
                            </Text>
                        </TouchableOpacity>


                        <View style={styles.bar}>
                            <Text style={styles.lightText} allowFontScaling={false}>遇到问题？您可以</Text>
                            <TouchableOpacity onPress={this._contactService}>
                                <Text style={{color: '#666'}} allowFontScaling={false}>联系客服</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }

    /**
     * 联系客服
     * @private
     */
    async _contactService() {
        try {
            const data = await AsyncStorage.getItem('hkshop@SysBasicSettings');

            if (__DEV__) {
                console.log("_contactService", data);
            }

            if (data) {
                const sysBasicSettings = JSON.parse(data);
                const contactPhone = sysBasicSettings.contactPhone;

                if (contactPhone) {
                    Communications.phonecall(contactPhone, true)
                }
            }
        } catch (err) {
            //ignore
        }
    }

    _nextStep(phone) {
        msg.emit('security:validSMS', phone)
    }

    _resend() {
        msg.emit('security:sendSMS');
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
    inputBox: {
        marginBottom: 20,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textWrap: {
        backgroundColor: '#fff',
        borderWidth: 1 / PixelRatio.get(),
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
    lightText: {
        //fontSize: 16,
        color: '#999'
    },
    bar: {
        paddingTop: 20,
        flexDirection: 'row',
        alignItems: 'center'
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
})

const mapStateToProps = (state) => ({
    modifyPasswordFirstReducer: state.get('modifyPasswordFirstReducer')
});
export default connect(mapStateToProps)(ModifyPasswordFirst);
