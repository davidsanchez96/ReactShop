'use strict';

import {
    Dimensions,
    InteractionManager,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import React, {Component} from "react";
import Immutable from "immutable";
import {connect} from "react-redux";
import Toast from "react-native-root-toast";
import Loading from "../../components/Loading";
import {SetPhoneFirstClean, SetPhoneFirstReset, SetPhoneFirstSet, VerifyCodeReset} from "../../../utils/actionTypes";
import {passwordCheck} from "../../../action/setPhoneFirstActions";

const {width: SCREEN_WIDTH} = Dimensions.get('window');

class SetPhoneFirst extends Component {
    static navigationOptions = {
        title: '手机验证',
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !Immutable.is(Immutable.Map(this.props.setPhoneFirstReducer), Immutable.Map(nextProps.setPhoneFirstReducer)) ||
            !Immutable.is(Immutable.Map(this.state), Immutable.Map(nextState));
    }

    componentWillUnmount() {
        this.props.dispatch({type: SetPhoneFirstClean});
    }

    render() {
        const {setPhoneFirstReducer, dispatch, navigation} = this.props;
        const password = setPhoneFirstReducer.get('password');
        let disabled = true;
        InteractionManager.runAfterInteractions(() => {
            if (setPhoneFirstReducer.get('isSuccess')) {
                navigation.navigate('SetPhoneSecond', );
                dispatch({type: SetPhoneFirstReset});
            }
        });
        return (
            <View style={styles.container}>
                <Loading visible={setPhoneFirstReducer.get('loading')}/>
                {/*手机验证导航图*/}
                <View style={styles.navItem}>
                    <View style={styles.navItemCol}>
                        <Image style={[styles.image, {tintColor: '#e63a59'}]}
                               source={require('../../components/img/c_isPerson.png')}/>
                        <Text style={styles.navItemTextChosen} allowFontScaling={false}>验证身份</Text>
                    </View>
                    <View style={styles.navItemCol}>
                        <Image style={styles.image} source={require('../../components/img/c_phone.png')}/>
                        <Text style={styles.navItemText} allowFontScaling={false}>验证手机</Text>
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
                                placeholder='请输入登录密码'
                                placeholderTextColor='#ddd'
                                underlineColorAndroid='transparent'
                                keyboardType='default'
                                secureTextEntry={true}
                                onChangeText={(password) => {
                                    dispatch({type: SetPhoneFirstSet, data: password});
                                }}/>
                        </View>
                    </View>


                    <TouchableOpacity
                        disabled={!(password)}
                        activeOpacity={0.8}
                        style={[styles.btnContainer, !(password) ? styles.btnDisabled : {}]}
                        onPress={() => {
                            if (password && disabled) {
                                let complex = 0;
                                complex = /\d/.test(password) ? complex + 1 : complex;
                                complex = /[a-zA-Z]/.test(password) ? complex + 1 : complex;
                                if (complex < 1 || password.length < 6 || password.length > 20) {
                                    Toast.show('密码格式不正确!');
                                } else {
                                    disabled = false;
                                    dispatch(passwordCheck(password));
                                }

                            }
                        }}>
                        <Text
                            style={[styles.text, !(password) ? styles.disabledText : {}]}
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
    setPhoneFirstReducer: state.get('setPhoneFirstReducer')
});
export default connect(mapStateToProps)(SetPhoneFirst);
