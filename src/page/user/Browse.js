'use strict'

import React, {Component} from 'react';
import {
    ActivityIndicator, FlatList, Image, InteractionManager, ListView, StyleSheet, Text, TouchableOpacity,
    View,
} from 'react-native';

import Immutable from "immutable";
import {connect} from "react-redux";
import {browseClean, browseList} from "../../action/browseActions";


let page = 0;

class Browse extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '浏览记录',
            headerRight:
                (
                    <TouchableOpacity style={{padding: 10}} activeOpacity={0.8}
                                      onPress={() => navigation.state.params.onPress()}>
                        <Text style={{color: '#999',}} allowFontScaling={false}>清空</Text>
                    </TouchableOpacity>
                ),
        };
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !Immutable.is(Immutable.Map(this.props.browseReducer), Immutable.Map(nextProps.browseReducer)) ||
            !Immutable.is(Immutable.Map(this.state), Immutable.Map(nextState));
    }

    componentDidMount() {
        const {followReducer, dispatch, navigation} = this.props;
        // if (!window.token) {
        //     // InteractionManager.runAfterInteractions(() =>
        //     // msg.emit('browserecord:findGoodsByStore', this.props.defaultRegion)
        //     // )
        // } else {

            page = 0;
            dispatch(browseList(page));
        // }
        this.props.navigation.setParams({
                onPress: () => {
                    dispatch(browseClean());
                },
            }
        );
    }

    render() {
        const {browseReducer, dispatch} = this.props;
        const loading = browseReducer.loading;
        const reloading = browseReducer.reloading;
        const hasMore = browseReducer.hasMore;
        const loadingMore = browseReducer.loadingMore;

        // if (window.token) {//已登录
            return (
                <View style={styles.container}>


                    <FlatList
                        renderItem={this._renderItem}
                        ListEmptyComponent={() => {
                            if (loading || reloading) {
                                return null;
                            } else {
                                return <Text style={styles.txt}
                                             allowFontScaling={false}>浏览记录为空</Text>

                            }
                        }}
                        ListFooterComponent={() => {
                            if (loading || browseReducer.data.length == 0)
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
                        data={browseReducer.data}
                        onRefresh={() => {
                            page = 0;
                            dispatch(browseList(page));
                        }}
                        refreshing={loading}
                        onEndReached={() => {
                            if (hasMore && !loading && !loadingMore) {
                                page++;
                                dispatch(browseList(page));
                            }
                        }}
                        onEndReachedThreshold={0}
                    />

                </View>
            );
        // } else {//未登录
            // if (this.dataSource.toJS().length > 0) {
            //     return (
            //         <View style={styles.container}>
            //             <QMHeader title="浏览记录"
            //                       onLeftMenuPress={this._backToMemberCenter}
            //                       renderRight={() => {
            //                           return (
            //                               <View>
            //                                   <Text
            //                                       style={styles.text}
            //                                       onPress={() => this._clearWithOutLogin()}
            //                                       allowFontScaling={false}
            //                                   >清空</Text>
            //                               </View>
            //                           )
            //                       }}/>
            //             <ListView style={{flex: 1}}
            //                       dataSource={ds.cloneWithRows(this.dataSource.toJS())}
            //                       renderRow={this._renderRow}
            //             />
            //         </View>
            //     );
            // } else {
            //     return (
            //         <View style={styles.container}>
            //             <QMHeader title="浏览记录" onLeftMenuPress={this._backToMemberCenter}/>
            //             {
            //                 store.get('isLoading')
            //                     ?
            //                     <QMLoading/>
            //                     :
            //                     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            //                         <Text style={{padding: 10}} allowFontScaling={false}>浏览记录为空</Text>
            //                     </View>
            //             }
            //         </View>
            //     );
            // }
        // }

    }

    _renderSwipeOutBtns(row, _, index) {
        if (row.addedStatus == false || !this._checkStore(row)) {
            return [];
        } else {
            return [
                {
                    text: '加购物车',
                    backgroundColor: '#e63a59',
                    row: {},
                    onPress: () => {
                        if (__DEV__) {
                            console.log('加购物车', row.id);
                        }
                        msg.emit('goods:addShoppingCart', row.id, 1, true);
                    }
                }
            ]
        }

    }


    /**
     * render浏览记录
     * @param row
     * @param _
     * @param index
     * @private
     */
    _renderItem = ({item, index}) => {

        return (
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
                    </View>
                </View>
            </TouchableOpacity>
        );
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
     * 清空 - 未登录
     * @private
     */
    _clearWithOutLogin() {
        msg.emit('browserecord:clearGoodsByStore');
    }

    /**
     * 清空 - 已登录
     * @private
     */
    _clearWithLogin() {
        msg.emit('browserecord:clearGoodsByDB', this._pullRefreshList);
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
        flex: 2,
        width: 85,
        height: 85,
    },
    image: {
        width: 85,
        height: 85,
    },
    textView: {
        flex: 5,
        paddingLeft: 15,
    },
    subRowFirst: {
        height: 40
    },
    subRowSecond: {
        marginTop: 10
    },
    money: {
        color: '#e63a59',
    },
    text: {
        color: '#666'
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
    browseReducer: state.get('browseReducer').toJS()
});
export default connect(mapStateToProps)(Browse);
