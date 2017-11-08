'use strict';

import React, {Component} from 'react';
import {View, TouchableOpacity, Text, Dimensions, StyleSheet, PixelRatio} from 'react-native';


const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');


export default class Dialog extends Component {


    static defaultProps = {
        visible: false,
        pwdVisible: false,
        title: '确定要继续吗?',
        msgContent: undefined,
        cancelHandle: undefined,
        okHandle: undefined,
        cancelText: '取消',
        okText: '确定',
        children: null,
        diaStyle: {},
        showButton: false
    };

    render() {
        if (!this.props.visible) {
            return null;
        }
        return (
            <View style={[styles.mask, this.props.maskStyle]}>
                <View style={[styles.dialog, this.props.diaStyle]}>
                    {
                        this.props.children ? this.props.children :
                            <View style={styles.messageContainer}>
                                {this.props.title ? <Text style={styles.msgTitle}
                                                          allowFontScaling={false}>{this.props.title}</Text> : null}
                                {this.props.msgContent ? <Text style={styles.msgContent}
                                                               allowFontScaling={false}>{this.props.msgContent}</Text> : null}
                            </View>
                    }
                    {
                        this.props.showButton ?
                            <View style={styles.operation}>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={[styles.btn, this.props.pwdVisible ? styles.disableBtn : styles.OkBtn]}
                                    onPress={this._okAction}>
                                    <Text style={styles.OkText} allowFontScaling={false}>{this.props.okText}</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <View style={styles.operation}>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={[styles.btn, styles.cancelBtn]}
                                    onPress={this._cancelAction}>
                                    <Text style={styles.cancelText}>{this.props.cancelText}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={[styles.btn, this.props.pwdVisible ? styles.disableBtn : styles.OkBtn]}
                                    onPress={this._okAction}>
                                    <Text style={styles.OkText} allowFontScaling={false}>{this.props.okText}</Text>
                                </TouchableOpacity>
                            </View>
                    }
                </View>
            </View>
        );
    }

    _cancelAction() {
        if (__DEV__) {
            console.log("_cancelAction", this.props.cancelHandle);
        }
        this._setVisible(false);
        if (this.props.cancelHandle) {
            this.props.cancelHandle();
        }
    }

    _okAction() {
        if (!this.props.pwdVisible) {
            this._setVisible(false);
        }
        if (!this.props.pwdVisible && this.props.okHandle) {
            this.props.okHandle();
        }
    }

    /**
     * 设置确认框是否可见
     */
    _setVisible(isV) {
        msg.emit('app:setAlertVisible', isV);
    }
}


const styles = StyleSheet.create({
    mask: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.5)',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dialog: {
        width: 300,
        backgroundColor: '#eee',
        padding: 20,
        borderRadius: 5
    },
    messageContainer: {
        borderWidth: 1 / PixelRatio.get(),
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#ccc',
        paddingBottom: 30
    },
    msgTitle: {
        marginBottom: 10,
        fontWeight: '500'
    },
    msgContent: {
        marginTop: 10,
        lineHeight: 20
    },
    operation: {
        flex: 1,
        paddingTop: 20,
        borderWidth: 1 / PixelRatio.get(),
        borderTopColor: '#fff',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderWidth: 1 / PixelRatio.get(),
        borderRadius: 5
    },
    cancelBtn: {
        marginRight: 10,
        borderColor: '#ddd',
        backgroundColor: '#fff'
    },
    OkBtn: {
        marginLeft: 10,
        borderColor: '#e63a59',
        backgroundColor: '#e63a59'
    },
    disableBtn: {
        marginLeft: 10,
        backgroundColor: '#ddd',
        borderColor: '#ccc'
    },
    cancelText: {
        color: '#666'
    },
    OkText: {
        color: '#fff'
    }
});

