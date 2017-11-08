'use strict';

import React, {Component} from 'react';
import {
    Platform,
    Animated,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Image,
} from 'react-native';
import SearchBar from "./SearchBar";


const {width: SCREEN_WIDTH} = Dimensions.get('window');



export default class MainTopBar extends Component {


    componentWillMount() {
        if (this.props.visible) {
            this._top = new Animated.Value(0);
        }
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.visible != this.props.visible) {
            Animated.timing(this._top, {
                toValue: nextProps.visible ? 0 : -70,
                duration: nextProps.visible ? 200 : 400
            }).start();
        }
    }


    render() {
        this.props.navigation;
        return (
            <Animated.View style={[styles.topBar, {backgroundColor: this.props.backgroundColor, top: this._top}]}>
                <TouchableOpacity style={styles.topBtn} activeOpacity={0.8} onPress={this._onBarCodeScan}>
                    <Image style={styles.topIcon} source={require('./img/sweep.png')}/>
                </TouchableOpacity>
                <SearchBar navigation={this.props.navigation} placeHolder='搜索商品' topic='searchPageOnMain:setVisible'/>
                <TouchableOpacity style={styles.topBtn} activeOpacity={0.8}
                                  onPress={this._messageHandler}>
                    <Image style={styles.topIcon} source={require('./img/message.png')}/>
                </TouchableOpacity>
            </Animated.View>
        )
    }


    /**
     * 条码扫描按钮事件
     * @private
     */
    _onBarCodeScan() {
        // //msg.emit('route:goToNext', {sceneName: 'QMTextView', text: 'asadsda\nhttp://test.hkshop.hk0472.com/goods/searchproduct2.html?title=%E8%8D%A3%E8%80%80'});
        // msg.emit('route:goToNext', {sceneName: 'QMBarcodeScanner', onBarCodeRead: this._onBarCodeRead});
    }


    /**
     * 消息图标按钮事件
     * @private
     */
    _messageHandler() {
        // msg.emit('route:goToNext', {sceneName: 'MessageCenter'});
        // window.selectedTab = 'memberCenter';
    }


}

var styles = StyleSheet.create({
    topBar: {
        position: 'absolute',
        width: SCREEN_WIDTH,
        height: Platform.OS == 'ios' ? 70 : 55,
        left: 0,
        top: 0,
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: Platform.OS == 'ios' ? 15 : 0
    },
    topBtn: {
        height: 40,
        justifyContent: 'center',
        paddingLeft: 15,
        paddingRight: 15
    },
    topIcon: {
        width: 25,
        height: 25
    }
});



