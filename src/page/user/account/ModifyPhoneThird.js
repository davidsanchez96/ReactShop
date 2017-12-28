'use strict';

import React, {Component} from 'react';
import {Dimensions, Image, InteractionManager, ScrollView, StyleSheet, Text, View} from 'react-native';
import {connect} from "react-redux";

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');


class ModifyPhoneThird extends Component {

    static navigationOptions = {
        title: '修改手机验证',
    };

    componentDidMount() {
        const {navigation, nav} = this.props;
        InteractionManager.runAfterInteractions(() => {

            this.timer = setTimeout(() => {
                const {goBack} = navigation;
                let key;
                for (let i = 0; i < nav.routes.length; i++) {
                    if (nav.routes[i].routeName === 'PayPasswordFirst') {
                        key = nav.routes[i].key;
                        break;
                    }
                }
                goBack(key);

            }, 500);

        })
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    render() {

        return (
            <View style={styles.container}>
                <ScrollView
                    contentContainerStyle={{flex: 1}} //非常重要，让ScrollView的子元素占满整个区域
                    keyboardDismissMode='on-drag' //拖动界面输入法退出
                    keyboardShouldPersistTaps={false} //点击输入法意外的区域，输入法退出
                >
                    {/*修改密码导航图*/}
                    <View style={styles.navItem}>
                        <View style={styles.navItemCol}>
                            <Image style={styles.image} source={require('../../components/img/c_isPerson.png')}/>
                            <Text style={styles.navItemText} allowFontScaling={false}>验证身份</Text>
                        </View>
                        <View style={styles.navItemCol}>
                            <Image style={styles.image} source={require('../../components/img/c_phone.png')}/>
                            <Text style={styles.navItemText} allowFontScaling={false}>修改已验证手机</Text>
                        </View>
                        <View style={styles.navItemCol}>
                            <Image style={styles.image} source={require('../../components/img/c_done_red.png')}/>
                            <Text style={styles.navItemTextChosen} allowFontScaling={false}>完成</Text>
                        </View>
                    </View>
                    {/*主体内容区域*/}
                    <View style={styles.navContent}>
                        <Image style={styles.imageDone} source={require('../../components/img/c_bind_done.png')}/>
                        <Text style={[styles.lightText]} allowFontScaling={false}>手机已经修改成功!</Text>
                    </View>
                </ScrollView>
            </View>
        )
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
        padding: 20,
        marginTop: 20,
        justifyContent: 'space-between',
        alignItems: 'center'
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
    input: {
        backgroundColor: '#fff',
        height: 50,
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 10,
        flex: 3
    },
    lightText: {
        marginTop: 10,
        color: '#999'
    },
    imageDone: {
        width: SCREEN_WIDTH / 3,
        height: SCREEN_WIDTH / 3,
    },
});
const mapStateToProps = (state) => ({
    nav: state.get('nav').toJS(),
});
export default connect(mapStateToProps)(ModifyPhoneThird);
