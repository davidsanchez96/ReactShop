import React, {Component} from 'react';
import {
    ActivityIndicator, Alert, Dimensions, findNodeHandle, FlatList, Image, InteractionManager, StyleSheet, Text,
    TouchableOpacity, View,
} from 'react-native';

import Immutable, {OrderedSet} from 'immutable'
import {connect} from "react-redux";
import {
    messageDelete, messageDeleteAll, messageList, messageRead,
    messageReadAll
} from "../../action/messageListActions";
import MessageItem from "../components/MessageItem";
import {MessageListClean, MessageListEdit} from "../../utils/actionTypes";

const {width: SCREEN_WIDTH} = Dimensions.get('window');


class Message extends Component {
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        return {
            title: '我的消息',
            headerRight:
                (
                    navigation.state.params.count !== 0 ?
                        <TouchableOpacity
                            style={{padding: 10}}
                            onPress={params.handleSave}
                            activeOpacity={0.8}>
                            {
                                navigation.state.params.editable ?
                                    <Text style={{color: '#666'}}
                                          allowFontScaling={false}>取消</Text>
                                    : <Text style={{color: '#666'}}
                                            allowFontScaling={false}>编辑</Text>
                            }
                        </TouchableOpacity> : null
                ),
        };
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !Immutable.is(Immutable.Map(this.props.messageListReducer), Immutable.Map(nextProps.messageListReducer)) ||
            !Immutable.is(Immutable.Map(this.state), Immutable.Map(nextState));
    }

    componentWillUnmount() {
        this.props.dispatch({type: MessageListClean})
    }

    componentDidMount() {
        const {messageListReducer, dispatch, navigation} = this.props;
        InteractionManager.runAfterInteractions(() => {
            dispatch(messageList(messageListReducer.page));
            navigation.setParams({
                handleSave: this._handleSave
            });
        });
    }

    _handleSave = () => {
        const {messageListReducer, dispatch, navigation} = this.props;
        if (messageListReducer.checkedList.length > 0) {
            dispatch({type: MessageListEdit});
            navigation.setParams({editable: !navigation.state.params.editable});
        }

    }

    render() {
        const {messageListReducer, dispatch, navigation} = this.props;

        //是不是正在编辑
        const isEdit = messageListReducer.editable;

        const checkedList = Immutable.fromJS(messageListReducer.checkedList);

        return (
            <View style={styles.container} onStartShouldSetResponderCapture={(e) => {
                this._handleCapture(e);
                return false;
            }}>


                {/* 内容区域 */}
                {this._renderContent(messageListReducer, dispatch, navigation)}

                {/* 按钮区域 */}
                {
                    isEdit ?
                        <View style={styles.viewContainer}>
                            <TouchableOpacity
                                disabled={messageListReducer.total === 0}
                                activeOpacity={0.8}
                                style={[styles.btnContainer, styles.btn, messageListReducer.total === 0 ? styles.btnDisabled : {}]}
                                onPress={() => {
                                    if (checkedList.size === 0) {
                                        dispatch(messageReadAll())
                                    } else {
                                        const ids = checkedList.toArray().join(',');
                                        dispatch(messageRead(ids, true))
                                    }
                                    this._handleSave();
                                }}>
                                <Text
                                    style={[styles.text, messageListReducer.total === 0 ? styles.disabledText : {}]}
                                    allowFontScaling={false}>
                                    {checkedList.size === 0 ? '全部已读' : `已读`}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                disabled={messageListReducer.total === 0}
                                activeOpacity={0.8}
                                style={[styles.btnContainer, styles.btn, messageListReducer.total === 0 ? styles.btnDisabled : {}]}
                                onPress={() => {
                                    if (checkedList.size === 0) {
                                        Alert.alert('提示', '确定要清空吗?', [
                                            {text: '取消'},
                                            {
                                                text: '确定', onPress: () => {
                                                    dispatch(messageDeleteAll());
                                                    this._handleSave();
                                                }
                                            }
                                        ]);

                                    } else {
                                        const ids = checkedList.toArray().join(',');
                                        Alert.alert('提示', '确定要删除选择的消息吗?', [
                                            {text: '取消'},
                                            {
                                                text: '确定', onPress: () => {
                                                    dispatch(messageDelete(ids));
                                                    this._handleSave();
                                                }
                                            }
                                        ]);

                                    }
                                }}>
                                <Text
                                    style={[styles.text, messageListReducer.total === 0 ? styles.disabledText : {}]}
                                    allowFontScaling={false}>
                                    {checkedList.size === 0 ? '清空所有' : `删除(${checkedList.size})`}
                                </Text>
                            </TouchableOpacity>

                        </View> : null
                }
            </View>
        );
    }


    /**
     * 内容区域
     *
     * @returns {*}
     * @private
     */
    _renderContent(messageListReducer, dispatch, navigation) {
        const loading = messageListReducer.loading;
        const reloading = messageListReducer.reloading;
        const hasMore = messageListReducer.hasMore;
        const loadingMore = messageListReducer.loadingMore;
        return (
            <View style={styles.container}>


                <FlatList
                    renderItem={({item, index}) => this._renderItem(item, index, messageListReducer, dispatch, navigation)}
                    ListEmptyComponent={() => {
                        if (loading || reloading) {
                            return null;
                        } else {
                            return <Text style={styles.txt}
                                         allowFontScaling={false}>
                                亲，您暂时没有消息
                            </Text>

                        }
                    }}
                    ListFooterComponent={() => {
                        if (loading || messageListReducer.data.length === 0)
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
                    data={messageListReducer.data}
                    onRefresh={() => {
                        dispatch(messageList(0));
                    }}
                    refreshing={loading}
                    onEndReached={() => {
                        if (hasMore && !loading && !loadingMore) {
                            dispatch(messageList(messageListReducer.page + 1));
                        }
                    }}
                    onEndReachedThreshold={10}
                />


            </View>
        );
    }


    /**
     * @param row
     * @param _
     * @param index
     * @returns {XML}
     * @private
     */
    _renderItem(item, index, messageListReducer, dispatch, navigation) {

        return (
            <MessageItem
                dispatch={dispatch}
                navigation={navigation}
                onSwipe={this._onSwipe}
                isEdit={messageListReducer.editable}
                checkedList={OrderedSet(messageListReducer.checkedList)}
                index={index}
                data={Immutable.fromJS(item)}
                key={index}/>
        )
    }


    _onSwipe(swipe) {
        this._currentSwipe = swipe;
    }


    _handleCapture(e) {
        if (this._currentSwipe) {
            try {
                if (e.nativeEvent.target != findNodeHandle(this._currentSwipe)) {
                    this._currentSwipe._close();
                    this._currentSwipe = undefined;
                }
            } catch (e) {
                //
            }
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee'
    },
    viewContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10
    },
    btn: {
        width: SCREEN_WIDTH / 2 - 40
    },
    editPanel: {
        flex: 1,
        paddingLeft: 20,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    btnContainer: {
        borderRadius: 5,
        height: SCREEN_WIDTH <= 320 ? 40 : 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e63a59'
    },
    text: {
        fontSize: SCREEN_WIDTH <= 320 ? 16 : 18,
        color: '#fff',
    },
    btnDisabled: {
        backgroundColor: '#ddd'
    },
    disabledText: {
        color: '#999'
    },
    txt: {
        flex: 1,
        fontSize: 16,
        color: '#666',
        alignSelf: 'center',
        marginTop: 120,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
});

const mapStateToProps = (state) => ({
    messageListReducer: state.get('messageListReducer').toJS()
});
export default connect(mapStateToProps)(Message);
