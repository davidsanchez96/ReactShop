'use strict';

import React, {Component} from 'react';
import {Dimensions, Image, InteractionManager, StyleSheet, Text, View} from 'react-native';
import {connect} from "react-redux";

const {width: SCREEN_WIDTH} = Dimensions.get('window');


class PayPasswordThird extends Component {
    static navigationOptions = {
        title: '设置支付密码',
    };

    componentDidMount() {
        const {navigation, nav} = this.props;
        InteractionManager.runAfterInteractions(() => {

            this.timer = setTimeout(() => {
                if (this.props.orderCode != null && this.props.orderCode != undefined) {
                    // msg.emit('route:goToNext', {sceneName: 'PayOrder', orderPrice: this.props.orderPrice, orderCode: this.props.orderCode});
                } else if (this.props.viewName != null && this.props.viewName != undefined) {
                    // msg.emit('route:goToNext', {sceneName: this.props.viewName});
                } else {
                    const {goBack} = navigation;
                    let key;
                    for (let i = 0; i < nav.routes.length; i++) {
                        if (nav.routes[i].routeName === 'PayPasswordFirst') {
                            key = nav.routes[i].key;
                            break;
                        }
                    }
                    goBack(key);
                }
            }, 500);

        })
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    render() {
        return (

            <View style={{flex: 1}}>
                <View style={styles.navItem}>
                    <View style={styles.navItemCol}>
                        <Image style={styles.image} source={require('../../components/img/send_sms.png')}/>
                        <Text allowFontScaling={false} style={styles.navItemText}>验证身份</Text>
                    </View>
                    <View style={styles.navItemCol}>
                        <Image style={styles.image} source={require('../../components/img/set_password.png')}/>
                        <Text allowFontScaling={false} style={styles.navItemText}>设置密码</Text>
                    </View>
                    <View style={styles.navItemCol}>
                        <Image style={[styles.image, {tintColor: '#e63a59'}]}
                               source={require('../../components/img/done.png')}/>
                        <Text allowFontScaling={false} style={[styles.navItemText, {color: '#e63a59'}]}>完成</Text>
                    </View>
                </View>

                <View style={styles.content}>
                    <Image source={require('../../components/img/success.png')} style={styles.icon}/>
                    <Text allowFontScaling={false}>支付密码设置成功！</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
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
        marginTop: 10,
        width: 60,
        textAlign: 'center'
    },
    image: {
        width: SCREEN_WIDTH / 10,
        height: SCREEN_WIDTH / 10,
    },
    content: {
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        width: 80,
        height: 80,
        marginBottom: 30
    }
});

const mapStateToProps = (state) => ({
    nav: state.get('nav').toJS(),
});
export default connect(mapStateToProps)(PayPasswordThird);