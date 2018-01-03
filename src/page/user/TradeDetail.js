'use strict';

import React, {Component} from 'react';
import {ActivityIndicator, Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import moment from 'moment';


import Immutable from "immutable";
import {connect} from "react-redux";
import {tradeList} from "../../action/tradeDetailActions";
import {TradeDetailType} from "../../utils/actionTypes";

const {width: SCREEN_WIDTH} = Dimensions.get('window');
let page = 0;

class TradeDetail extends Component {
    static navigationOptions = {
        title: '预存款明细',
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !Immutable.is(Immutable.Map(this.props.tradeDetailReducer), Immutable.Map(nextProps.tradeDetailReducer)) ||
            !Immutable.is(Immutable.Map(this.state), Immutable.Map(nextState));
    }

    componentDidMount() {
        const {tradeDetailReducer,dispatch} = this.props;
        page = 0;
        dispatch(tradeList(page,tradeDetailReducer.status));

    }

    render() {
        const {tradeDetailReducer, dispatch} = this.props;
        const loading = tradeDetailReducer.loading;
        const reloading = tradeDetailReducer.reloading;
        const hasMore = tradeDetailReducer.hasMore;
        const loadingMore = tradeDetailReducer.loadingMore;
        const status = tradeDetailReducer.status;

        return (
            <View style={styles.container}>

                <View style={styles.tabBar}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={[styles.tabItem, status === '0' && styles.active]}
                        onPress={() => {
                            dispatch({type: TradeDetailType, data: '0'});
                            page = 0;
                            dispatch(tradeList(page,'0'));
                        }}>
                        <Text
                            allowFontScaling={false}
                            style={[styles.tabText, status === '0' && {color: '#ff3952'}]}>全部</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={[styles.tabItem, status === '1' && styles.active]}
                        onPress={() => {
                            dispatch({type: TradeDetailType, data: '1'});
                            page = 0;
                            dispatch(tradeList(page,'1'));
                        }}>
                        <Text
                            allowFontScaling={false}
                            style={[styles.tabText, status === '1' && {color: '#ff3952'}]}>收入</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={[styles.tabItem, status === '2' && styles.active]}
                        onPress={() => {
                            dispatch({type: TradeDetailType, data: '2'});
                            page = 0;
                            dispatch(tradeList(page,'2'));
                        }}>
                        <Text
                            allowFontScaling={false}
                            style={[styles.tabText, status === '2' && {color: '#ff3952'}]}>支出</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    renderItem={this._renderItem}
                    ListEmptyComponent={() => {
                        if (loading || reloading) {
                            return null;
                        } else {
                            return <Text style={styles.txt}
                                         allowFontScaling={false}>暂无相关交易记录！</Text>

                        }
                    }}
                    ListFooterComponent={() => {
                        if (loading || tradeDetailReducer.data.length == 0)
                            return null;
                        if (hasMore) {
                            return (
                                <View style={styles.footer}>
                                    <ActivityIndicator/>
                                    <Text>正在加载更多数据...</Text>
                                </View>
                            );
                        } else {
                            return (
                                <View style={styles.footer}>
                                    <Text>
                                        没有更多数据了
                                    </Text>
                                </View>

                            );
                        }
                    }}
                    keyExtractor={item => item.id}
                    removeClippedSubviews={false}
                    data={tradeDetailReducer.data}
                    onRefresh={() => {
                        page = 0;
                        dispatch(tradeList(page,status));
                    }}
                    refreshing={loading}
                    onEndReached={() => {
                        if (hasMore && !loading && !loadingMore) {
                            page++;
                            dispatch(tradeList(page,status));
                        }
                    }}
                    onEndReachedThreshold={0}
                />


            </View>
        )
    }

    _renderItem = ({item}) => {
        const statusName = {
            0: '在线充值',
            1: '订单退款',
            2: '线下提现',
            3: '订单消费'
        };
        const typeName = {
            0: '待审核',
            1: '已打回',
            2: '待打款',
            3: '待确认',
            4: '已完成',
            5: '未支付',
            6: '充值成功',
            8: '已取消'
        };
        return (
            <View style={styles.listItem}>
                <View style={styles.bar}>
                    <Text allowFontScaling={false}>{statusName[item.orderType]}</Text>
                    <Text allowFontScaling={false}
                          style={item.orderType === '0' || item.orderType === '1' ? {'color': 'green'} : styles.change}>
                        {item.orderType === '0' || item.orderType === '1' ? '+' : '-'}&yen;
                        {item.orderPrice.toFixed(2)}
                    </Text>
                </View>
                <View style={[styles.bar, {marginTop: 10}]}>
                    <Text allowFontScaling={false}
                          style={styles.grey}>{moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
                    <Text allowFontScaling={false} style={styles.grey}>
                        {item.orderType === '1' || item.orderType === '3' ? '已完成' : typeName[item.orderStatus]}</Text>
                </View>
            </View>
        )
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee'
    },
    tabBar: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ececec',
        backgroundColor: '#fff'
    },
    tabItem: {
        flex: 1,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center'
    },
    active: {
        height: 47,
        borderBottomWidth: 2,
        borderBottomColor: '#ff3952'
    },
    tabText: {
        fontSize: 16
    },
    listItem: {
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ececec',
        padding: 15
    },
    bar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    grey: {
        color: '#999'
    },
    change: {
        color: '#ff3952'
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
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    txt: {
        flex: 1,
        fontSize: 16,
        color: '#666',
        alignSelf: 'center',
        marginTop:120,
    },
});

const mapStateToProps = (state) => ({
    tradeDetailReducer: state.get('tradeDetailReducer').toJS()
});
export default connect(mapStateToProps)(TradeDetail);
