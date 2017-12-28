'use strict'

import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    Dimensions,
    ScrollView,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
    InteractionManager,
} from 'react-native';

import {connect} from "react-redux";
import ResendButton from "../../components/ResendButton";
import Toast from "react-native-root-toast";
import {getModifyPhoneCode, verifyModifyPhoneCode} from "../../../action/modifyPhoneFirstActions";
import Immutable from "immutable";
import {
    ModifyPhoneFirstClean, ModifyPhoneFirstReset, ModifyPhoneFirstSet, ModifyPhoneSecondClean, ModifyPhoneSecondCode,
    ModifyPhoneSecondPhone,
    ModifyPhoneSecondReset
} from "../../../utils/actionTypes";
import {getModifyNewCode, verifyModifyNewCode} from "../../../action/modifyPhoneSecondActions";


const {width: SCREEN_WIDTH} = Dimensions.get('window');


class ModifyPhoneSecond extends Component {
    static navigationOptions = {
        title: '修改手机验证',
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !Immutable.is(Immutable.Map(this.props.modifyPhoneSecondReducer), Immutable.Map(nextProps.modifyPhoneSecondReducer)) ||
            !Immutable.is(Immutable.Map(this.state), Immutable.Map(nextState));
    }

    componentWillUnmount() {
        this.props.dispatch({type: ModifyPhoneSecondClean});
    }

    render() {
        const {modifyPhoneSecondReducer, dispatch, navigation} = this.props;

        const smsVerifyCode = modifyPhoneSecondReducer.get('smsVerifyCode');
        const newPhone = modifyPhoneSecondReducer.get('newPhone');
        const smsReFlag = modifyPhoneSecondReducer.get('smsReFlag');
        const time = modifyPhoneSecondReducer.get('time');
        let disabled = true;
        InteractionManager.runAfterInteractions(() => {
            if (modifyPhoneSecondReducer.get('isSuccess')) {
                navigation.navigate('ModifyPhoneThird',);
                dispatch({type: ModifyPhoneSecondReset});
            }
        });
        return (
            <View style={styles.container}>
                <ScrollView
                    contentContainerStyle={{flex: 1}}
                    keyboardDissmisMode='on-drag'
                    keyboardShouldPresistTaps={false}
                >
                    {/*修改密码导航图*/}
                    <View style={styles.navItem}>
                        <View style={styles.navItemCol}>
                            <Image style={styles.image} source={require('../../components/img/c_isPerson.png')}/>
                            <Text style={styles.navItemText} allowFontScaling={false}>验证身份</Text>
                        </View>
                        <View style={styles.navItemCol}>
                            <Image style={styles.image} source={require('../../components/img/c_phone_red.png')}/>
                            <Text style={styles.navItemTextChosen} allowFontScaling={false}>修改已验证手机</Text>
                        </View>
                        <View style={styles.navItemCol}>
                            <Image style={styles.image} source={require('../../components/img/c_done.png')}/>
                            <Text style={styles.navItemText} allowFontScaling={false}>完成</Text>
                        </View>
                    </View>
                    {/*主体内容区域*/}
                    <View style={styles.navContent}>
                        <Text allowFontScaling={false}>请输入新的手机号</Text>
                        <View style={styles.inputBox}>
                            <View style={styles.textWrap}>
                                <TextInput style={styles.input}
                                           placeholder='验证手机号'
                                           placeholderTextColor='#ddd'
                                           underlineColorAndroid='transparent'
                                           keyboardType='numeric'
                                           onChangeText={(newPhone) => {
                                               dispatch({type: ModifyPhoneSecondPhone, data: newPhone});
                                           }}/>
                            </View>
                            {
                                smsReFlag
                                    ?
                                    <ResendButton
                                        disabled={!(newPhone)}
                                        name='重新发送'
                                        resend={() => {
                                            let data = {
                                                phone: newPhone,
                                            };
                                            dispatch(getModifyNewCode(data))
                                        }}
                                        time={time}/>
                                    :
                                    <TouchableOpacity activeOpacity={0.6}
                                                      style={[styles.sendBtn, {borderColor: '#E63A59'}]}
                                                      onPress={() => {
                                                          let data = {
                                                              phone: newPhone,
                                                          };
                                                          dispatch(getModifyNewCode(data))
                                                      }}>
                                        <Text style={[styles.sendText, {color: '#e63a59'}]}
                                              allowFontScaling={false}>获取验证码</Text>
                                    </TouchableOpacity>
                            }
                        </View>
                        <View style={[styles.inputBox, {marginBottom: 20}]}>
                            <View style={styles.textWrap}>
                                <TextInput style={styles.input}
                                           placeholder='短信验证码'
                                           placeholderTextColor='#ddd'
                                           underlineColorAndroid='transparent'
                                           keyboardType='numeric'
                                           onChangeText={(newCode) => {
                                               dispatch({type: ModifyPhoneSecondCode, data: newCode});
                                           }}/>
                            </View>
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
                                            phone: newPhone,
                                            smsVerifyCode: smsVerifyCode,
                                        };
                                        dispatch(verifyModifyNewCode(data));
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

    /**
     * 下一步
     * @param phone
     * @private
     */
    _nextStep(phone) {
        msg.emit('security:changePhone:validNewSMS', phone);
    }

    /**
     * 重新发送
     * @private
     */
    _resend() {
        if (!(/^1\d{10}$/.test(appStore.data().get('newPhone')))) {
            msg.emit('app:tip', '手机号不合法');
            return;
        } else {
            msg.emit('security:changePhone:sendNewSMS', appStore.data().get('newPhone'));
        }
    }

    /**
     * 页面初始化 或者 当手机号码变化时,触发校验
     * @private
     */
    _validPhone() {
        if (!(/^1\d{10}$/.test(appStore.data().get('newPhone')))) {
            msg.emit('app:tip', '手机号不合法');
            return;
        } else {
            msg.emit('security:changePhone:sendNewSMS', appStore.data().get('newPhone'));
        }
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
        borderBottomWidth: 1,
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
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textWrap: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 5,
        flex: 4,
        overflow: 'hidden'
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
});

const mapStateToProps = (state) => ({
    modifyPhoneSecondReducer: state.get('modifyPhoneSecondReducer')
});
export default connect(mapStateToProps)(ModifyPhoneSecond);
