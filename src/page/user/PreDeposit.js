'use strict';

import React, {Component} from 'react';
import {
    Dimensions, Image, InteractionManager, StyleSheet, Text, TouchableOpacity,
    View, ImageBackground,
} from 'react-native';
import Immutable from "immutable";
import {connect} from "react-redux";
import NavItem from "../components/NavItem";
import {preDepositInfo} from "../../action/preDepositActions";
import Loading from "../components/Loading";

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

class PreDeposit extends Component {
    static navigationOptions = {
        title: '预存款',
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !Immutable.is(Immutable.Map(this.props.preDepositReducer), Immutable.Map(nextProps.preDepositReducer)) ||
            !Immutable.is(Immutable.Map(this.state), Immutable.Map(nextState));
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.props.dispatch(preDepositInfo())
        });
    }

    render() {
        const {preDepositReducer, dispatch} = this.props;
        const loading = preDepositReducer.get('loading');
        return (
            <View style={styles.container}>
                <Loading visible={loading}/>
                <ImageBackground style={styles.header} source={require('../components/img/bg.jpg')}>
                    <Text allowFontScaling={false}
                          style={styles.deposit}>{preDepositReducer.get('preDeposit').toFixed(2)}</Text>
                    <Text allowFontScaling={false} style={styles.depositText}>可用预存款(元)</Text>
                </ImageBackground>

                <View style={styles.depositBox}>
                    <View style={styles.depositItem}>
                        <Text allowFontScaling={false}
                              style={[styles.text, {fontSize: 16}]}>{preDepositReducer.get('sumDeposit').toFixed(2)}</Text>
                        <Text allowFontScaling={false} style={styles.text}>预存款总额</Text>
                    </View>
                    <View style={styles.depositItem}>
                        <Text allowFontScaling={false}
                              style={[styles.text, {fontSize: 16}]}>{preDepositReducer.get('freezePreDeposit').toFixed(2)}</Text>
                        <Text allowFontScaling={false} style={styles.text}>冻结预存款</Text>
                    </View>
                </View>

                <NavItem title='充值'
                         style={styles.line}
                         imageSource={require('../components/img/recharge.png')}
                         onPress={() => msg.emit('route:goToNext', {sceneName: 'Recharge'})}/>
                <NavItem title='提现'
                         style={{marginBottom: 10}}
                         imageSource={require('../components/img/cash.png')}
                         onPress={() => this._toWithdrawals()}/>
                <NavItem title='账户明细'
                         style={styles.line}
                         imageSource={require('../components/img/account_details.png')}
                         onPress={() => msg.emit('route:goToNext', {sceneName: 'AccountDetail'})}/>
                <NavItem title='提现记录'
                         imageSource={require('../components/img/present_record.png')}
                         onPress={() => msg.emit('route:goToNext', {sceneName: 'PresentRecord'})}/>
            </View>
        )
    }

    _toWithdrawals() {
        msg.emit('preDeposit:toWithdrawals');
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee'
    },
    header: {
        width: SCREEN_WIDTH,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    deposit: {
        fontSize: 30,
        color: '#fff',
        backgroundColor: 'transparent'
    },
    depositText: {
        color: '#fff',
        backgroundColor: 'transparent',
        marginTop: 10,
        fontSize: 15
    },
    depositBox: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginBottom: 10,
    },
    depositItem: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: '#999',
        marginVertical: 3
    },
    line: {
        borderBottomColor: '#ececec',
        borderBottomWidth: 1,
    },
});

const mapStateToProps = (state) => ({
    preDepositReducer: state.get('preDepositReducer')
});
export default connect(mapStateToProps)(PreDeposit);
