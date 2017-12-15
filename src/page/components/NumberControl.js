'use strict';

import React, {Component} from 'react';
import { Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Toast from 'react-native-root-toast';


export default class NumberControl extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chosenNum: this.props.chosenNum,
            tempNum: this.props.chosenNum,
            maxNum: this.props.maxNum,
            minNum: this.props.minNum,
            visible: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.chosenNum != nextProps.chosenNum) {
            this.setState({
                chosenNum: nextProps.chosenNum,
                maxNum: nextProps.maxNum
            });
        }
    }

    static defaultProps = {
        chosenNum: 1,
        maxNum: 100,
        minNum: 1,
    };

    render() {
        return (
            <View style={[styles.numBox, this.props.width ? {width: this.props.width, height: this.props.height} : {}]}>
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.visible}
                    onRequestClose={() => {
                    }}
                >
                    <View style={styles.mask}>
                        <View style={styles.dialog}>
                            <Text style={{fontSize: 16, marginBottom: 20}}>修改购买数量</Text>
                            <View style={[styles.numBox, styles.bigNumBox]}>
                                <TouchableOpacity style={styles.numItem} activeOpacity={0.8}
                                                  onPress={() => this._numberMinus(true)}>
                                    <Image
                                        style={styles.numBtn}
                                        source={require('./img/minus.png')}/>
                                </TouchableOpacity>
                                <TextInput
                                    ref={component => this._textInput = component}
                                    style={styles.numInput}
                                    underlineColorAndroid='transparent'
                                    keyboardType='numeric'
                                    value={this.state.tempNum.toString()}
                                    autoFocus={true}
                                    onChangeText={(tempNum) => this._changeNumber(tempNum)}
                                    onBlur={() => this._handleNumber()}/>

                                <TouchableOpacity style={styles.numItem} activeOpacity={0.8}
                                                  onPress={() => this._numberPlus(true)}>
                                    <Image
                                        style={styles.numBtn}
                                        source={require('./img/plus.png')}/>
                                </TouchableOpacity>
                            </View>
                            <Text
                                style={{
                                    marginTop: 5,
                                    marginBottom: 10,
                                    fontSize: 12,
                                    color: '#e63a59'
                                }}>最多可选{this.props.maxNum}件商品</Text>
                            <View style={styles.operation}>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={[styles.btn, styles.cancelBtn]}
                                    onPress={() => {
                                        this.setState({
                                            visible: false,
                                            tempNum:  this.state.chosenNum,
                                        })
                                    }}>
                                    <Text style={styles.cancelText}>取消</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={[styles.btn,styles.OkBtn]}
                                    onPress={() => {
                                        this.setState({
                                            visible: false,
                                            chosenNum: this.state.tempNum == '' ? this.props.minNum : this.state.tempNum,
                                        },()=>this.props.callbackParent(this.state.chosenNum));
                                    }}>
                                    <Text style={styles.OkText} allowFontScaling={false}>确定</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <TouchableOpacity style={styles.numItem} activeOpacity={0.8} onPressIn={() => this._numberMinus()}>
                    <Image
                        style={[styles.numBtn, this.state.chosenNum <= this.props.minNum ? {tintColor: '#ccc'} : {}]}
                        source={require('./img/minus.png')}/>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={styles.inputItem} onPressIn={() => this._editDialog()}>
                    <Text style={this.props.size ? {fontSize: this.props.size} : {}}>{this.props.chosenNum}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.numItem} activeOpacity={0.8} onPressIn={() => this._numberPlus()}>
                    <Image
                        style={[styles.numBtn, this.state.chosenNum >= this.props.maxNum ? {tintColor: '#ccc'} : {}]}
                        source={require('./img/plus.png')}/>
                </TouchableOpacity>
            </View>
        )
    }

    //弹窗内容
    _renderDialog() {
        return (
            <View style={styles.dialog}>
                <Text style={{fontSize: 16, marginBottom: 20}}>修改购买数量</Text>
                <View style={[styles.numBox, styles.bigNumBox]}>
                    <TouchableOpacity style={styles.numItem} activeOpacity={0.8}
                                      onPress={(inTemp) => this._numberMinus(true)}>
                        <Image
                            style={styles.numBtn}
                            source={require('./img/minus.png')}/>
                    </TouchableOpacity>
                    <View style={styles.inputItem}>
                        <TextInput
                            ref={component => this._textInput = component}
                            style={styles.numInput}
                            underlineColorAndroid='transparent'
                            value={'12132'}
                            keyboardType='numeric'
                            autoFocus={true}
                            onChangeText={(tempNum) => this._changeNumber(tempNum)}
                            onBlur={() => this._handleNumber()}/>
                    </View>
                    <TouchableOpacity style={styles.numItem} activeOpacity={0.8}
                                      onPress={(inTemp) => this._numberPlus(true)}>
                        <Image
                            style={styles.numBtn}
                            source={require('./img/plus.png')}/>
                    </TouchableOpacity>
                </View>
                <Text style={{marginTop: 5, fontSize: 12, color: '#e63a59'}}>最多可选{this.props.maxNum}件商品</Text>
            </View>
        )
    }

    //编辑文本弹窗
    _editDialog() {
        this.setState({
            tempNum: this.state.chosenNum,
            visible: true,
        });
    }

    //文本框输入
    _changeNumber(tempNum) {
        let reg = new RegExp('^[0-9]*$');
        let num = tempNum;
        let tipText = '';

        if (!reg.test(tempNum)) {
            num = this.props.minNum;
        } else if (tempNum > this.props.maxNum) {
            num = this.props.maxNum;
            tipText = '最多可选' + this.props.maxNum + '件商品';
        } else if (tempNum < this.props.minNum && tempNum !== '') {
            num = this.props.minNum;
        } else {
            num = tempNum;
        }


        this.setState({
            tempNum: parseInt(num)
        }, () => {
            this._textInput.setNativeProps({
                text: num.toString()
            });
        })
    }

    //文本框失去焦点
    _handleNumber() {
        if (this.state.tempNum == '') {
            this.setState({
                tempNum: this.props.minNum
            });
        }
        ;
    }

    //点击减少
    _numberMinus(inTemp) {
        let nextNum = parseInt(this.state.tempNum) - 1;
        let num = '';

        if (nextNum >= this.props.minNum) {
            num = nextNum;
        } else {
            num = Math.min(this.props.minNum, this.props.maxNum);
        }
        ;
        if (inTemp) {
            this.setState({
                tempNum: num
            }, () => {
                this._textInput.setNativeProps({
                    text: num.toString()
                })
            });
        } else {
            this.setState({
                chosenNum: num,
                tempNum: num
            }, () => this.props.callbackParent(num));
        }
        ;
    }

    //点击增加
    _numberPlus(inTemp) {
        let nextNum = parseInt(this.state.tempNum) + 1;
        let num = '';

        if (nextNum <= this.props.maxNum) {
            num = nextNum;
        } else {
            num = this.props.maxNum;
            Toast.show('最多可选' + this.props.maxNum + '件商品');
        }
        ;
        if (inTemp) {
            this.setState({
                tempNum: num
            }, () => {
                this._textInput.setNativeProps({
                    text: num.toString()
                })
            });
        } else {
            this.setState({
                chosenNum: num,
                tempNum: num
            }, () => this.props.callbackParent(num));
        }
        ;
    }
}


const styles = StyleSheet.create({
    numBox: {
        flexDirection: 'row',
        width: 120,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 3,
        height: 30,
        overflow: 'hidden',
    },
    numItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderLeftColor: '#ddd',
        borderRightColor: '#ddd',
    },
    numInput: {
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        padding: 0,
        color: '#666',
        fontSize: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderLeftColor: '#ddd',
        borderRightColor: '#ddd',
    },
    numBtn: {
        width: 12,
        height: 12
    },
    mask: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(52,52,52,0.5)',  //rgba  a0-1  其余都是16进制数

    },
    dialog: {
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#eee',
        borderRadius: 5,
        padding: 20,
        marginLeft: 30,
        marginRight: 30,
    },
    bigNumBox: {
        width: 150,
        height: 40,
        backgroundColor: '#fff'
    },
    operation: {
        // flex: 1,
        paddingTop: 20,
        borderWidth: 1,
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
        borderWidth: 1,
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

