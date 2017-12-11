import React, {Component} from 'react';
import {View, ListView, Text, StyleSheet, TouchableOpacity, Image, PixelRatio} from 'react-native';

import moment from 'moment';
import Stars from "./Stars";

export default class CommentsList extends Component {
    render() {
        return (
            <View>
                {
                    this.props.comments.map((val, index) => {
                        return (
                            <View style={styles.commentItem} key={index}>
                                <View style={styles.commentTitle}>
                                    <Stars star={'star' + val.get('commentScore')}/>
                                    <View style={styles.textBar}>
                                        <Text
                                            allowFontScaling={false}
                                            numberOfLines={1}
                                            style={[styles.commentInfo, {
                                                width: 50,
                                                textAlign: 'right'
                                            }]}>{val.get('customerNickname') || '匿名'}</Text>
                                        <Text
                                            allowFontScaling={false}
                                            numberOfLines={1}
                                            style={[styles.commentInfo, {marginLeft: 10}]}>{moment(val.get('publishTime')).format('YYYY-MM-DD HH:mm:ss')}</Text>
                                    </View>
                                </View>
                                <Text style={styles.commentCont}
                                      allowFontScaling={false}>{val.get('commentContent')}</Text>
                            </View>
                        )
                    })
                }
            </View>
        )
    }


    /**
     * 导航至有图图片
     */
    imgsComments() {
        msg.emit('route:goToNext', {
            sceneName: 'Comments',
            comments: this.props.comments,
            commentsType: 'imgsComments'
        })
    }
}

const styles = StyleSheet.create({
    commentItem: {
        borderBottomWidth: 1 / PixelRatio.get(),
        borderBottomColor: '#eee',
        padding: 20
    },
    commentTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    textBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    commentInfo: {
        color: '#999'
    },
    commentCont: {
        //fontSize: 16,
        lineHeight: 20
    },
    imgs: {
        flexDirection: 'row'
    },
    commentImg: {
        width: 100,
        height: 100,
        marginTop: 15,
        marginRight: 20,
        borderRadius: 10
    },
    commentsOps: {
        flexDirection: 'row',
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 10,
        paddingRight: 10
    },
    cmtBtn: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        borderWidth: 1 / PixelRatio.get(),
        borderColor: '#eee',
        borderRadius: 5,
        height: 40,
        justifyContent: 'center'
    },
    btnText: {
        textAlign: 'center',
        color: '#666'
        //fontSize: 16
    }
});

