'use strict'

import React, {Component} from 'react';
import {InteractionManager, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {connect} from "react-redux";
import Immutable from "immutable";
import {NicknameChange, NicknameClean} from "../../../utils/actionTypes";
import Toast from 'react-native-root-toast';
import {changeNickname} from "../../../action/nicknameActions";
import Loading from "../../components/Loading";


class Nickname extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '修改昵称',
            headerRight:
                (
                    <TouchableOpacity style={{padding: 10}} activeOpacity={0.8}
                                      onPress={navigation.state.params.onPress}>
                        <Text style={styles.text} allowFontScaling={false}>确定</Text>
                    </TouchableOpacity>
                ),
        };
    };

    shouldComponentUpdate(nextProps, nextState) {

        return !Immutable.is(this.props.nicknameReducer, nextProps.nicknameReducer) ||
            !Immutable.is(Immutable.Map(this.state), Immutable.Map(nextState));
    }

    componentDidMount() {
        this.props.navigation.setParams({
                onPress: () => {
                    const {nicknameReducer, dispatch} = this.props;
                    const nickname = nicknameReducer.getIn(['form', 'nickname']);
                    if (!nickname || nickname.trim().length === 0) {
                        Toast.show('请输入昵称')
                    } else if (/[`=\\\[\];',./~!@#$%^&*()+|{}:"<>?]/.test(nickname)) {
                        Toast.show('包含特殊字符')
                    } else if (nickname.length < 4) {
                        Toast.show('最小长度为4')
                    } else {
                        dispatch(changeNickname(nickname))
                    }

                },
            }
        );
        InteractionManager.runAfterInteractions(() => {
            this.props.dispatch({type: NicknameChange, data: this.props.navigation.state.params.nickname})
        })
    }

    componentWillUnmount() {
        this.props.dispatch({type: NicknameClean});
    }

    render() {
        const description = '4-20个字符,可由中英文、数字、"_"、"-"组成';

        const {nicknameReducer, navigation, dispatch} = this.props;
        const loading = nicknameReducer.get('loading');
        let value = nicknameReducer.getIn(['form', 'nickname']);
        InteractionManager.runAfterInteractions(() => {
            if (nicknameReducer.get('isSuccess')) {
                navigation.state.params.nicknameBack(value);
                navigation.goBack();
            }
        });
        return (
            <View style={styles.container}>
                <Loading visible={loading}/>
                <ScrollView
                    bounces={false}
                    keyboardDissmisMode='on-drag'
                    keyboardShouldPresistTaps={false}
                >
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.input}
                            autoCorrect={false}
                            autoFocus={true}
                            placeholder='请输入新的昵称'
                            placeholderTextColor='#ddd'
                            underlineColorAndroid='transparent'
                            value={value}
                            clearButtonMode='while-editing'
                            maxLength={20}
                            onChangeText={(nickname) => {
                                dispatch({type: NicknameChange, data: nickname});
                            }}
                        />
                    </View>
                    <Text style={[styles.text, {marginTop: 10}]} allowFontScaling={false}>
                        {description}
                    </Text>
                </ScrollView>
            </View>
        );

    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
    },
    inputView: {
        backgroundColor: '#FFF',
        height: 50,
        paddingLeft: 20,
        paddingRight: 20
    },
    input: {
        flex: 1,
        fontSize: 16,
        height: 20,
        padding: 0
    },
    text: {
        color: '#666',
        fontSize: 14,
        marginLeft: 20
    }
})

const mapStateToProps = (state) => ({
    nicknameReducer: state.get('nicknameReducer')
});
export default connect(mapStateToProps)(Nickname);
