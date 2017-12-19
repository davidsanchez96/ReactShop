'use strict';

import React, {Component} from 'react';
import {
    AsyncStorage,
    Dimensions,
    Image,
    PixelRatio,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Linking,
    InteractionManager,
} from 'react-native';

import Immutable from "immutable";
import {connect} from "react-redux";
import ResendButton from "../components/ResendButton";
import {checkPhone} from "../../action/findPasswordFirstActions";
import {sendPhone, verifyPhone} from "../../action/findPasswordSecondActions";
import {VerifyPasswordCode} from "../../utils/actionTypes";
import Toast from 'react-native-root-toast';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

/**
 * 找回密码--短信认证
 */
class FindPasswordSecond extends Component {
    static navigationOptions = {
        title: '找回密码',
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !Immutable.is(Immutable.Map(this.props.findPasswordSecondReducer), Immutable.Map(nextProps.findPasswordSecondReducer)) ||
            !Immutable.is(Immutable.Map(this.state), Immutable.Map(nextState));
    }

    render() {
        const {findPasswordSecondReducer, dispatch, navigation} = this.props;

        const phone = navigation.state.params.phone;
        const nickName = navigation.state.params.nickname;
        const uuid = navigation.state.params.uuid;
        const smsVerifyCode = findPasswordSecondReducer.get('smsVerifyCode');
        const slurPhone = (phone ? (phone.substring(0, 3) + '****' + phone.substring(7)) : '');
        let disabled = true;
        InteractionManager.runAfterInteractions(()=>{
            if (findPasswordSecondReducer.get('isSuccess')) {
                navigation.navigate('FindPasswordThird', {
                    phone: phone,
                });
            }
        });

        return (
            <View style={styles.container}>

                <View style={styles.banner}>
                    <Image style={{width: 50, height: 50,}} source={require('../components/img/psw_phone.png')}/>
                    <Text style={styles.bannerTip} allowFontScaling={false}>
                        {`验证码已发送到${slurPhone}手机上`}
                    </Text>
                </View>
                <View style={styles.wrapper}>
                    <Text style={styles.lightText} allowFontScaling={false}>{`昵称: ${nickName}`}</Text>
                    <View style={styles.inputBox}>
                        <View style={styles.inputWrap}>
                            <TextInput style={styles.input}
                                       placeholder='请输入短信验证码'
                                       placeholderTextColor='#ddd'
                                       keyboardType='numeric'
                                       underlineColorAndroid='transparent'
                                       onChangeText={(smsVerifyCode) => {
                                           dispatch({type: VerifyPasswordCode, data: smsVerifyCode});
                                       }}/>
                        </View>
                        <ResendButton resend={() => {
                            let data = {
                                phone: phone,
                                uuid: uuid,
                            };
                            dispatch(sendPhone(data));
                        }} time={60}/>
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
                                    const data = {
                                        phone: phone,
                                        smsVerifyCode: smsVerifyCode,
                                    };
                                    dispatch(verifyPhone(data))
                                }


                            }
                        }}>
                        <Text
                            style={[styles.text, !(smsVerifyCode) ? styles.disabledText : {}]}
                            allowFontScaling={false}>
                            下一步
                        </Text>
                    </TouchableOpacity>

                    {/*<QMButton activeOpacity={0.8}*/}
                    {/*disabled={!(this._smsVerifyCode)}*/}
                    {/*onPress={() => this._nextStep(this._phone)}>下一步</QMButton>*/}
                    <View style={styles.bar}>
                        <Text style={styles.lightText} allowFontScaling={false}>遇到问题？您可以</Text>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => {
                            Linking.openURL('tel:18585025253');
                        }}>
                            <Text style={{color: '#666'}} allowFontScaling={false}>联系客服</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
     * 下一步按钮动作
     * @private
     */
    _nextStep(phone) {
        msg.emit("findPwd:validSms", phone);
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee'
    },
    wrapper: {
        padding: 20
    },
    banner: {
        paddingTop: 15,
        paddingBottom: 10,
        backgroundColor: '#e63a59',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    bannerTip: {
        marginTop: 10,
        color: '#fff',
        fontSize: 15,
        fontWeight: '500'
    },
    lightText: {
        //fontSize: 16,
        color: '#999'
    },
    inputBox: {
        paddingTop: 20,
        paddingBottom: 40,
        flexDirection: 'row'
    },
    inputWrap: {
        backgroundColor: '#fff',
        borderWidth: 1 / PixelRatio.get(),
        borderColor: '#999',
        borderRadius: 5,
        overflow: 'hidden',
        flex: 3
    },
    input: {
        height: 50,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 0,
        paddingBottom: 0,
        fontSize: 16
    },
    bar: {
        paddingTop: 20,
        flexDirection: 'row',
        alignItems: 'center'
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
    findPasswordSecondReducer: state.get('findPasswordSecondReducer')
});
export default connect(mapStateToProps)(FindPasswordSecond);
