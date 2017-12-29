'use strict'

import React, {Component} from 'react';
import {
    ActivityIndicator, AsyncStorage, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity,
    View,
} from 'react-native';
import Immutable from "immutable";
import {connect} from "react-redux";
import {followDelete, followList} from "../../action/followActions";
import SwipeOut from 'react-native-swipeout';

let page = 0;
const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

class Follow extends Component {
    static navigationOptions = {
        title: '我的关注',
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !Immutable.is(Immutable.Map(this.props.followReducer), Immutable.Map(nextProps.followReducer)) ||
            !Immutable.is(Immutable.Map(this.state), Immutable.Map(nextState));
    }

    componentDidMount() {
        console.log('componentDidMount');
        const {followReducer, dispatch, navigation} = this.props;
        page = 0;
        dispatch(followList(page));
    }

    render() {
        const {followReducer, dispatch} = this.props;
        const loading = followReducer.loading;
        const reloading = followReducer.reloading;
        const hasMore = followReducer.hasMore;
        const loadingMore = followReducer.loadingMore;
        return (
            <View style={styles.container}>
                <FlatList
                    renderItem={this._renderItem}
                    ListEmptyComponent={() => {
                        if (loading || reloading) {
                            return null;
                        } else {
                            return <View style={styles.noDataContainer}>
                                <Image style={styles.emptyIcon}
                                       source={require('../components/img/collect_empty.png')}/>
                                <Text style={styles.txt}
                                      allowFontScaling={false}>您还没关注过宝贝</Text>
                            </View>
                        }
                    }}
                    ListFooterComponent={() => {
                        if (loading || followReducer.data.length == 0)
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
                    data={followReducer.data}
                    onRefresh={() => {
                        page = 0;
                        dispatch(followList(page));
                    }}
                    refreshing={loading}
                    onEndReached={() => {
                        if (hasMore && !loading && !loadingMore) {
                            page++;
                            dispatch(followList(page));
                        }
                    }}
                    onEndReachedThreshold={0}
                />
                {/*<QMPullRefreshListView*/}
                {/*ref={(pullRefreshList) => this._pullRefreshList = pullRefreshList}*/}
                {/*icon={require('./img/collect_empty.png')}*/}
                {/*url={`${QMConfig.HOST}/customers/follows?region=${this.props.defaultRegion}`}*/}
                {/*renderRow={this._renderRow}*/}
                {/*renderSwipeOutBtns={this._renderSwipeOutBtns}*/}
                {/*emptyText={'您还没关注过宝贝'}*/}
                {/*/>*/}
            </View>
        );
    }


    _renderSwipeOutBtns(row, index) {
        if (row.addedStatus == false || !this._checkStore(row)) {
            return (
                [
                    {
                        text: '取消关注',
                        backgroundColor: '#ddd',
                        color: '#999',
                        row: {},
                        onPress: () => {

                            if (__DEV__) {
                                console.log("取消关注：", row.id);
                            }
                            this.props.dispatch(followDelete(row.id, index))
                        }
                    }
                ]
            );
        } else {
            return (
                [
                    {
                        text: '取消关注',
                        backgroundColor: '#ddd',
                        color: '#999',
                        row: {},
                        onPress: () => {

                            if (__DEV__) {
                                console.log("取消关注：", row.id);
                            }
                            this.props.dispatch(followDelete(row.id, index))
                        }
                    }, {
                    text: '加购物车',
                    backgroundColor: '#e63a59',
                    row: {},
                    onPress: () => {
                        if (__DEV__) {
                            console.log("加购物车：", row.id);
                        }
                        msg.emit('goods:addShoppingCart', row.id, 1, true);
                    }
                }
                ]
            );
        }

    }


    /**
     * render关注列表
     * @param row
     * @param _
     * @param index
     * @returns {XML}
     * @private
     */
    _renderItem = ({item, index}) => {

        return (
            <SwipeOut right={this._renderSwipeOutBtns(item, index)}>
                <TouchableOpacity key={index} style={styles.rowView} activeOpacity={0.8}
                                  onPress={() => {
                                      this.props.navigation.navigate('GoodsDetail', {
                                          goodsInfoId: item.id,
                                      })
                                  }}>
                    <View style={styles.imageView}>
                        <Image style={styles.image} source={{uri: item.image}}/>
                        {this._renderStatus(item)}
                    </View>
                    <View style={styles.textView}>
                        <View style={styles.subRowFirst}>
                            <Text style={{lineHeight: 20}} numberOfLines={2} allowFontScaling={false}>{item.name}</Text>
                        </View>
                        <View style={styles.subRowSecond}>
                            <Text numberOfLines={1} style={styles.money}
                                  allowFontScaling={false}>￥{item.storeList ? item.storeList[0].price : item.preferPrice}</Text>
                            {/*<Text*/}
                            {/*style={styles.praiseInfo}*/}
                            {/*allowFontScaling={false}>好评{Math.floor(Math.random() * 100 + 1) + '%'}&nbsp;{Math.floor(Math.random() * 1000 + 1)}人</Text>*/}
                        </View>
                    </View>
                </TouchableOpacity>
            </SwipeOut>
        );
    }

    /**
     * 判断是否有货 有货返回true,无货返回false
     * @param row
     * @private
     */
    _checkStore(row) {
        if (row.storeList && row.storeList.length > 0 && row.storeList[0].stock > 0) {
            return true;
        } else if (row.stock > 0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 根据是否有货展示状态
     * @param row
     * @returns {*}
     * @private
     */
    _renderStatus(row) {
        if (!row.addedStatus) {
            return (
                <View style={styles.noGoods}>
                    <Text style={{color: '#fff'}}>已下架</Text>
                </View>
            );
        } else if (!this._checkStore(row)) {
            return (
                <View style={styles.noGoods}>
                    <Text style={{color: '#fff'}}>无货</Text>
                </View>
            );
        }
        return null;
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
    },
    rowView: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    imageView: {
        //flex: 1,
    },
    image: {
        width: 85,
        height: 85,
    },
    textView: {
        flex: 1,
        paddingLeft: 15,
    },
    subRowFirst: {
        height: 40
    },
    subRowSecond: {
        marginTop: 5
    },
    money: {
        color: '#e63a59',
    },
    praiseInfo: {
        fontSize: 13,
        color: '#999',
        marginTop: 5
    },
    noGoods: {
        position: 'absolute',
        width: 100,
        height: 30,
        backgroundColor: 'rgba(0, 0, 0, .6)',
        left: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    noDataContainer: {

        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyIcon: {
        width: 110,
        height: 110,
        marginTop: 120,
        marginBottom: 50
    },
    txt: {
        flex: 1,
        fontSize: 16,
        color: '#666'
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
});

const mapStateToProps = (state) => ({
    followReducer: state.get('followReducer').toJS()
});
export default connect(mapStateToProps)(Follow);
