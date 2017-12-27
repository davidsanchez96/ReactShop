'use strict'

import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    Image,
    Dimensions,
    TextInput,
    PixelRatio,
    InteractionManager,
    TouchableOpacity
} from 'react-native';
import Immutable from "immutable";
import {
    CodeSet,
    ModifyPasswordFirstClean, ModifyPhoneFirstClean, ModifyPhoneFirstReset, ModifyPhoneFirstSet,
    VerifyCodeReset
} from "../../../utils/actionTypes";
import ResendButton from "../../components/ResendButton";
import {connect} from "react-redux";
import Toast from "react-native-root-toast";
import {getCode, verifyCode} from "../../../action/modifyPasswordFirstActions";
import {getModifyPhoneCode, verifyModifyPhoneCode} from "../../../action/modifyPhoneFirstActions";


const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');


class ModifyPhoneFirst extends Component {
    static navigationOptions = {
        title: '修改手机验证',
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !Immutable.is(Immutable.Map(this.props.modifyPhoneFirstReducer), Immutable.Map(nextProps.modifyPhoneFirstReducer)) ||
            !Immutable.is(Immutable.Map(this.state), Immutable.Map(nextState));
    }

    componentWillUnmount() {
        this.props.dispatch({type: ModifyPhoneFirstClean});
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            //进入页面就发送验证码
            this.props.dispatch(getModifyPhoneCode())
        })
    }

    render() {
        const {modifyPhoneFirstReducer, dispatch, navigation} = this.props;

        const phone = navigation.state.params.phone;
        const smsVerifyCode = modifyPhoneFirstReducer.get('smsVerifyCode');
        const smsReFlag = modifyPhoneFirstReducer.get('smsReFlag');
        let disabled = true;
        InteractionManager.runAfterInteractions(() => {
            if (modifyPhoneFirstReducer.get('isSuccess')) {
                navigation.navigate('ModifyPasswordSecond', {
                    phone: phone,
                });
                dispatch({type: ModifyPhoneFirstReset});
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
                            <Image style={styles.image} source={require('../../components/img/c_isPerson_red.png')}/>
                            <Text style={styles.navItemTextChosen} allowFontScaling={false}>验证身份</Text>
                        </View>
                        <View style={styles.navItemCol}>
                            <Image style={styles.image} source={require('../../components/img/c_phone.png')}/>
                            <Text style={styles.navItemText} allowFontScaling={false}>修改已验证手机</Text>
                        </View>
                        <View style={styles.navItemCol}>
                            <Image style={styles.image} source={require('../../components/img/c_done.png')}/>
                            <Text style={styles.navItemText} allowFontScaling={false}>完成</Text>
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
                                               dispatch({type: ModifyPhoneFirstSet, data: smsVerifyCode});
                                           }}/>
                            </View>
                            {
                                smsReFlag
                                    ?
                                    <ResendButton
                                        resend={() => {
                                            dispatch(getModifyPhoneCode())
                                        }}
                                        time={60}/>
                                    :
                                    <TouchableOpacity activeOpacity={0.6}
                                                      style={[styles.sendBtn, {borderColor: '#E63A59'}]}
                                                      onPress={() => {
                                                          dispatch(getModifyPhoneCode())
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
                                        dispatch(verifyModifyPhoneCode(data));
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
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <Image style={{width: 15, height: 15}}
                                       source={require('../../components/img/c_tip.png')}/>
                                <Text style={styles.lightText} allowFontScaling={false}> 小提示:</Text>
                            </View>
                            <Text style={{color: '#999', marginTop: 5}}
                                  allowFontScaling={false}>设置手机验证后,可用于快速找回登录密码</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
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
        color: '#999',

    },
    bar: {
        paddingTop: 20,
        alignItems: 'flex-start'
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
    }
})
const mapStateToProps = (state) => ({
    modifyPhoneFirstReducer: state.get('modifyPhoneFirstReducer')
});
export default connect(mapStateToProps)(ModifyPhoneFirst);
