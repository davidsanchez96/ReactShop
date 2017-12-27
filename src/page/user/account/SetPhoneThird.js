'use strict';

import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    InteractionManager
} from 'react-native';
import React, {Component} from "react";
import {connect} from "react-redux";

const {width: SCREEN_WIDTH} = Dimensions.get('window');

class SetPhoneThird extends Component {
    static navigationOptions = {
        title: '手机验证',
    };

    componentDidMount() {
        const {navigation, nav} = this.props;
        InteractionManager.runAfterInteractions(() => {
            this.timer = setTimeout(() => {
                if ((this.props.orderCode != null && this.props.orderCode != undefined) || (this.props.viewName != null && this.props.viewName != undefined)) {
                    // msg.emit('route:goToNext', {sceneName: 'SetPayPassword', orderPrice: this.props.orderPrice, orderCode: this.props.orderCode, phone: this.props.phone, viewName: this.props.viewName});
                } else {
                    const {goBack} = navigation;
                    let key;
                    for (let i = 0; i < nav.routes.length; i++) {
                        if (nav.routes[i].routeName === 'SetPhoneFirst') {
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
            <View style={styles.container}>
                {/*手机验证导航图*/}
                <View style={styles.navItem}>
                    <View style={styles.navItemCol}>
                        <Image style={styles.image} source={require('../../components/img/c_isPerson.png')}/>
                        <Text style={styles.navItemText} allowFontScaling={false}>验证身份</Text>
                    </View>
                    <View style={styles.navItemCol}>
                        <Image style={styles.image} source={require('../../components/img/c_phone.png')}/>
                        <Text style={styles.navItemText} allowFontScaling={false}>验证手机</Text>
                    </View>
                    <View style={styles.navItemCol}>
                        <Image style={[styles.image, {tintColor: '#e63a59'}]}
                               source={require('../../components/img/c_done.png')}/>
                        <Text style={styles.navItemTextChosen} allowFontScaling={false}>完成</Text>
                    </View>
                </View>

                <View style={styles.navContent}>
                    <Image style={styles.imageDone} source={require('../../components/img/c_bind_done.png')}></Image>
                    <Text style={[styles.lightText]} allowFontScaling={false}>手机号码验证成功!</Text>
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
        padding: 20,
        marginTop: 20,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    lightText: {
        marginTop: 10,
        color: '#999'
    },
    imageDone: {
        width: SCREEN_WIDTH / 3,
        height: SCREEN_WIDTH / 3,
    }
});

const mapStateToProps = (state) => ({
    nav: state.get('nav').toJS(),
});
export default connect(mapStateToProps)(SetPhoneThird);
