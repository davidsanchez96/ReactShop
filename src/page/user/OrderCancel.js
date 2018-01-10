'use strict';

import React, {Component} from 'react';
import {
    Dimensions, Image, InteractionManager, ListView, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight,
    TouchableOpacity, View,
} from 'react-native';

import Immutable from "immutable";
import {connect} from "react-redux";
import {orderCancel} from "../../action/orderCancelActions";
import Loading from "../components/Loading";
import {OrderCancelClean} from "../../utils/actionTypes";
import Toast from 'react-native-root-toast';
//导入store

const cancelReason = [
    '不想买了',
    '商品价格较贵',
    '价格波动',
    '商品缺货',
    '重复下单',
    '添加或删除商品',
    '收货人信息有误',
    '发票信息有误/发票未开',
    '送货时间过长',
    '其他原因',
];
const {width: SCREEN_WIDTH} = Dimensions.get('window');

class OrderCancel extends Component {
    static navigationOptions = {
        title: '填写取消信息',
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !Immutable.is(this.props.orderCancelReducer, nextProps.orderCancelReducer) ||
            !Immutable.is(Immutable.Map(this.state), Immutable.Map(nextState));
    }

    constructor(props) {
        super(props);
        this.state = {
            radioValue: 0,
            reasonContent: '',
        }
    }

    componentWillMount() {
       console.log('componentWillMount')
    }

    /**
     * 处理radio点击事件
     * @param shoppingCartId
     * @private
     */
    _handleCheck(v) {
        this.setState({radioValue: v});
    }

    /**
     * 点击取消订单按钮
     * @private
     */
    _handleSubmit() {
        msg.emit('order:cancel:save', {
            orderId: this.props.orderId, reason: this.state.radioValue,
            remark: this.state.reasonContent, level: this.props.level
        });
    }

    /**
     * 处理填写的退货原因按钮
     * @returns {XML}
     */
    _handleFieldChange(value) {
        this.setState({reasonContent: value});
    }

    componentDidUpdate() {
        const {orderCancelReducer, navigation} = this.props;
        if (orderCancelReducer.get('isSuccess')) {
            navigation.goBack();
            if (navigation.state.params.callBack) {
                navigation.state.params.callBack();
            }
        }
    }

    componentWillUnmount() {
        this.props.dispatch({type: OrderCancelClean});
    }

    render() {
        const {orderCancelReducer, dispatch, navigation} = this.props;
        return (
            <View style={{flex: 1, backgroundColor: '#eee'}}>

                <Loading visible={orderCancelReducer.get('loading')}/>
                <ScrollView
                    bounces={false}
                    style={{flex: 1}}
                    automaticallyAdjustContentInsets={false}>

                    <View style={styles.box}>
                        <View style={styles.title}><Text>选择取消原因</Text></View>
                        {

                            cancelReason.map((v, k) => {
                                return (
                                    <TouchableOpacity
                                        key={k}
                                        style={styles.checkBtn}
                                        onPress={() => this._handleCheck(v)}
                                        activeOpacity={0.8}>
                                        <Image
                                            style={styles.check}
                                            source={(v === this.state.radioValue) ? require('../components/img/checked.png') : require('../components/img/uncheck.png')}/>
                                        <Text style={{color: '#666'}} allowFontScaling={false}>{v}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>

                    {/* 修改故障单0041924,测试要求取消问题说明字段
            <View style={[styles.box, {marginBottom: 0}]}>
              <View style={styles.rowItem}>
                <Text style={{marginRight: 10}} allowFontScaling={false}>问题说明</Text>
                <TextInput
                  style={styles.textdefault}
                  clearButtonMode='while-editing'
                  multiline={true}
                  placeholder='您最多可填写200字'
                  onChangeText={this._handleFieldChange.bind(this)}
                />
              </View>
            </View>
             */}
                </ScrollView>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[styles.btnContainer, styles.button]}
                    onPress={() => {
                        let params = {
                            orderId: navigation.state.params.orderId, reason: this.state.radioValue,
                            remark: this.state.reasonContent, level: navigation.state.params.level
                        };
                        if (params.reason === 0) {
                            Toast.show('请选择取消原因');
                        } else {
                            let requestParam = '';
                            for (let key in params) {
                                if (params[key] !== undefined && params[key] !== null) {
                                    requestParam += key + '=' + params[key] + '&';
                                }
                            }
                            dispatch(orderCancel(navigation.state.params.orderId, encodeURI(requestParam)));
                        }

                    }}>
                    <Text
                        style={[styles.text, styles.buttonText]}
                        allowFontScaling={false}>
                        取消订单
                    </Text>
                </TouchableOpacity>

            </View>
        )
    }

}

const styles = StyleSheet.create({
    paper: {
        backgroundColor: '#fff',
        marginBottom: 10,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 20,
        paddingRight: 20
    },
    box: {
        backgroundColor: '#fff',
        marginBottom: 10,
    },
    title: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 20,
        paddingRight: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    rowItem: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    goodsName: {
        flex: 1,
        color: '#666',
        lineHeight: 20,
        height: 40,
    },
    goodsText: {
        fontSize: 12,
        color: '#999',
        marginRight: 10
    },
    numBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    checkBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingTop: 10,
        paddingBottom: 10,
    },
    check: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    thumb: {
        width: 60,
        height: 60,
        marginRight: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
    },
    button: {
        height: 50,
        flexDirection: 'row',
        backgroundColor: '#E43A58',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 0
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    arrow: {
        width: 8,
        height: 16,
        marginLeft: 10,
    },
    textdefault: {
        height: 80,
        width: 200,
        flex: 4,
        borderWidth: 1,
        borderColor: '#ddd',
        fontSize: 14,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerContainer: {
        borderRadius: 10,
        padding: 10,
    },
    okButton: {
        height: 35,
        width: 80,
        backgroundColor: '#E43A58',
        borderColor: '#E43A58',
        borderWidth: 1,
        justifyContent: 'center',
        borderRadius: 4,
        alignSelf: 'stretch',
        marginLeft: 10,
    },

    cancleButton: {
        height: 35,
        width: 80,
        backgroundColor: 'white',
        borderColor: '#DDDDDD',
        borderWidth: 1,
        justifyContent: 'center',
        borderRadius: 4,
        alignSelf: 'stretch',
        marginRight: 10
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
});
const mapStateToProps = (state) => ({
    orderCancelReducer: state.get('orderCancelReducer')
});
export default connect(mapStateToProps)(OrderCancel);
