import React, {Component} from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    InteractionManager,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import {connect} from "react-redux";
import CommentTab from "../components/CommentTab";
import Immutable from "immutable";
import {CommentClean, CommentType} from "../../utils/actionTypes";
import {comment} from "../../action/commentActions";
import moment from 'moment';
import {goodsList} from "../../action/goodsListActions";
import Stars from "../components/Stars";

let page = 0;

class Comment extends Component {
    static navigationOptions = {
        title: '商品评价',
    };

    shouldComponentUpdate(nextProps, nextState) {

        return !Immutable.is(Immutable.Map(this.props.commentReducer), Immutable.Map(nextProps.commentReducer)) ||
            !Immutable.is(Immutable.Map(this.state), Immutable.Map(nextState));
    }


    componentDidMount() {
        let {commentReducer, dispatch, navigation} = this.props;
        page = 0;
        dispatch(comment(navigation.state.params.product.id, commentReducer.get('commentsType'), page));

    }

    componentWillUnmount() {
        this.props.dispatch({type: CommentClean});
    }

    render() {
        let {commentReducer, dispatch, navigation} = this.props;
        const commentType = commentReducer.get('commentsType');
        let loading = commentReducer.get('loading');
        return (
            <View style={{flex: 1, backgroundColor: '#eee'}}>

                <CommentTab
                    click={(type) => {
                        if (commentType !== type) {
                            InteractionManager.runAfterInteractions(() => {
                                dispatch({type: CommentType, data: {commentsType: type}});
                                page = 0;
                                dispatch(comment(navigation.state.params.product.id, type, page));
                            })
                        }
                    }}
                    dispatch={dispatch}
                    product={Immutable.fromJS(navigation.state.params.product)}
                    commentsType={commentType}/>
                <FlatList
                    renderItem={this._renderRow}
                    ListEmptyComponent={this._empty}
                    ListFooterComponent={() => this._renderFooter()}
                    keyExtractor={item => item.id}
                    removeClippedSubviews={true}
                    data={commentReducer.get('data')}
                    onRefresh={() => {
                        page = 0;
                        dispatch(comment(navigation.state.params.product.id, commentType, page));
                    }}
                    refreshing={loading}
                    onEndReached={() => this._onEndReached()}
                    onEndReachedThreshold={0}
                />
            </View>
        )
    }

    /**
     * 渲染评价列表
     */
    _renderRow = ({item, index}) => {
        return (
            <View style={styles.commentItem} key={index}>
                <View style={styles.commentBox}>
                    <View style={styles.commentHeader}>
                        <View style={styles.commentUser}>
                            <Text allowFontScaling={false} numberOfLines={1}
                                  style={{width: 100}}>{item.customerNickname || '匿名'}</Text>
                        </View>
                        <Text style={{color: '#999'}}
                              allowFontScaling={false}>{moment(item.publishTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
                    </View>
                    <Stars star={'star' + item.commentScore}/>
                    <Text style={styles.commentContent} allowFontScaling={false}>{item.commentContent}</Text>
                    <Text style={{color: '#999', marginTop: 15}}
                          allowFontScaling={false}>{'购物日期 : ' + moment(item.buyTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
                </View>
            </View>
        );
    }

    _empty = () => {
        const {commentReducer} = this.props;
        let loading = commentReducer.get('loading');
        let reloading = commentReducer.get('reloading');
        if (loading || reloading) {
            return null;
        } else {
            return (
                <View style={styles.footer}>
                    <Text>暂无数据</Text>
                </View>
            )
        }

    };

    _renderFooter() {
        const {commentReducer} = this.props;
        let hasMore = commentReducer.get('hasMore');
        let loading = commentReducer.get('loading');

        if (loading || commentReducer.get('data').length == 0)
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
    }

    _onEndReached() {
        const {commentReducer, dispatch, navigation} = this.props;
        let hasMore = commentReducer.get('hasMore');
        let loading = commentReducer.get('loading');
        let loadingMore = commentReducer.get('loadingMore');
        const commentType = commentReducer.get('commentsType');
        if (hasMore && !loading && !loadingMore) {
            page++;
            dispatch(comment(navigation.state.params.product.id, commentType, page));
        }

    }
}

const mapStateToProps = (state) => ({
    commentReducer: state.get('commentReducer'),
});
export default connect(mapStateToProps)(Comment);

const styles = StyleSheet.create({
    commentItem: {
        backgroundColor: '#fff',
        marginTop: 10
    },
    commentBox: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    commentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    commentUser: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    userHead: {
        width: 30,
        height: 30,
        borderRadius: 5,
        marginRight: 10
    },
    commentContent: {
        fontSize: 16,
        lineHeight: 25,
        color: '#666',
        marginTop: 10
    },
    commentBtns: {
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row'
    },
    commentBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 5,
        marginLeft: 10,
        marginRight: 10
    },
    btnText: {
        color: '#666',
        fontSize: 16
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
});