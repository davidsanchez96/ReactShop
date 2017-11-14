'use strict';

import React, {Component} from 'react';
import {
    View, TouchableOpacity, Modal,
    Text, Dimensions, StyleSheet, PixelRatio
} from 'react-native';


const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');


export default class Dialog extends Component {


    static defaultProps = {
        visible: true,
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
        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.props.visible}
                onRequestClose={() => {
                    alert("Modal has been closed.")
                }}
            >
                <View style={styles.mask}>
                    <View style={styles.dialog}>

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
                                        onPress={()=>this._okAction()}>
                                        <Text style={styles.OkText} allowFontScaling={false}>{this.props.okText}</Text>
                                    </TouchableOpacity>
                                </View>
                                :
                                <View style={styles.operation}>
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        style={[styles.btn, styles.cancelBtn]}
                                        onPress={()=>this._cancelAction()}>
                                        <Text style={styles.cancelText}>{this.props.cancelText}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        style={[styles.btn, this.props.pwdVisible ? styles.disableBtn : styles.OkBtn]}
                                        onPress={()=>this._okAction()}>
                                        <Text style={styles.OkText} allowFontScaling={false}>{this.props.okText}</Text>
                                    </TouchableOpacity>
                                </View>
                        }
                    </View>
                </View>
            </Modal>
        );
    }

    _cancelAction() {
        if (__DEV__) {
            console.log("_cancelAction", this.props.cancelHandle);
        }
        if (this.props.cancelHandle) {
            this.props.cancelHandle();
        }
    }

    _okAction() {

        if (!this.props.pwdVisible && this.props.okHandle) {
            this.props.okHandle();
        }
    }


}


const styles = StyleSheet.create({
    mask: {
       // backgroundColor: 'rgba(0,0,0,.5)',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(52,52,52,0.5)',  //rgba  a0-1  其余都是16进制数

    },
    dialog: {
        backgroundColor: '#eee',
        borderRadius: 5,
        padding: 20,
        width: SCREEN_WIDTH * 0.8,
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
        // flex: 1,
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

