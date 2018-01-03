'use strict';

import React, {Component} from 'react';
import {ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Immutable from "immutable";
import {connect} from "react-redux";
import {integrationList, integrationTotal} from "../../action/integrationActions";
import {IntegrationType} from "../../utils/actionTypes";

let page = 0;

class Integration extends Component {
    static navigationOptions = {
        title: '我的积分',
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !Immutable.is(Immutable.Map(this.props.integrationReducer), Immutable.Map(nextProps.integrationReducer)) ||
            !Immutable.is(Immutable.Map(this.state), Immutable.Map(nextState));
    }

    componentDidMount() {
        const {integrationReducer, dispatch} = this.props;
        page = 0;
        dispatch(integrationList(page, integrationReducer.status));
        dispatch(integrationTotal());

    }

    render() {

        const {integrationReducer, dispatch} = this.props;
        const loading = integrationReducer.loading;
        const reloading = integrationReducer.reloading;
        const hasMore = integrationReducer.hasMore;
        const loadingMore = integrationReducer.loadingMore;
        const status = integrationReducer.status;
        const total = integrationReducer.totalPoint;
        return (
            <View style={styles.container}>
                <View style={styles.totalIntegral}>
                    <Text allowFontScaling={false}>我的积分总额：<Text style={{color: '#e63a59'}}>{total}</Text></Text>
                </View>
                <View style={styles.tabBar}>
                    <TouchableOpacity
                        style={[styles.tabItem, status === '1' && {backgroundColor: '#e63a59'}]}
                        activeOpacity={0.8}
                        onPress={() => {
                            dispatch({type: IntegrationType, data: '1'});
                            page = 0;
                            dispatch(integrationList(page,'1'));
                            dispatch(integrationTotal());
                        }}>
                        <Text
                            style={status === '1' && {color: '#fff'}}
                            allowFontScaling={false}>获得</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tabItem, status === '0' && {backgroundColor: '#e63a59'}]}
                        activeOpacity={0.8}
                        onPress={() => {
                            dispatch({type: IntegrationType, data: '0'});
                            page = 0;
                            dispatch(integrationList(page,'0'));
                            dispatch(integrationTotal());
                        }}>
                        <Text
                            style={status === '0' && {color: '#fff'}}
                            allowFontScaling={false}>支出</Text>
                    </TouchableOpacity>
                </View>


                <FlatList
                    renderItem={this._renderItem}
                    ListEmptyComponent={() => {
                        if (loading || reloading) {
                            return null;
                        } else {
                            return <Text style={styles.txt}
                                         allowFontScaling={false}>{
                                status === 1 ? '您还没有获取积分记录' :
                                    '您还没有支出积分记录'

                            }</Text>

                        }
                    }}
                    ListFooterComponent={() => {
                        if (loading || integrationReducer.data.length === 0)
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
                    data={integrationReducer.data}
                    onRefresh={() => {
                        page = 0;
                        dispatch(integrationList(page, status));
                        dispatch(integrationTotal());
                    }}
                    refreshing={loading}
                    onEndReached={() => {
                        if (hasMore && !loading && !loadingMore) {
                            page++;
                            dispatch(integrationList(page, status));
                        }
                    }}
                    onEndReachedThreshold={10}
                />
            </View>
        )
    }



    _renderItem = ({item}) => {
        return (
            <View style={styles.integralItem}>
                <View style={styles.integralDate}>
                    <Text allowFontScaling={false} style={{color: '#666'}}>{item.createTime}</Text>
                </View>
                <View style={styles.integralContent}>
                    <View style={styles.integralTitle}>
                        <Image
                            style={styles.icon}
                            source={require('../components/img/coin.png')}/>
                        <Text allowFontScaling={false}>{item.detail}</Text>
                    </View>
                    <Text allowFontScaling={false}
                          style={{color: '#e63a59'}}>{item.type == '1' ? '+' : '-'} {item.point}</Text>
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
    totalIntegral: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    tabBar: {
        flexDirection: 'row',
        marginBottom: 5
    },
    tabItem: {
        flex: 1,
        height: 50,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    integralItem: {
        marginBottom: 5,
        backgroundColor: '#fff'
    },
    integralDate: {
        height: 25,
        justifyContent: 'center',
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    integralContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 20
    },
    integralTitle: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 10
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
    integrationReducer: state.get('integrationReducer').toJS()
});
export default connect(mapStateToProps)(Integration);
