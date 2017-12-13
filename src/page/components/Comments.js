import React, {Component} from 'react';
import {Image, PixelRatio, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';

import CommentsList from './CommentsList';

export default class Comments extends Component {
    render() {
        return (
            <View style={styles.commentsWrap}>
                <TouchableOpacity style={styles.box} activeOpacity={1} onPress={() => this._handleToGoodComments()}>
                    <Text style={styles.label} allowFontScaling={false}>商品评价</Text>
                    <View style={styles.rowItem}>
                        <Text style={{marginRight: 20}} allowFontScaling={false}>好评度&nbsp;<Text
                            style={{color: '#e63a59'}}
                            allowFontScaling={false}>{this.props.product.get('commentPercent')}</Text></Text>
                        <Text style={{color: '#666'}}
                              allowFontScaling={false}>{this.props.product.get('commentCount')}人评论</Text>
                    </View>
                    <Image style={styles.arrow} source={require('./img/right.png')}/>
                </TouchableOpacity>
                <CommentsList comments={this.props.comments}/>
            </View>
        )
    }


    /**
     * 跳转至商品评论
     */
    _handleToGoodComments() {
        this.props.navigation.navigate('Comment', {product: this.props.product});
    }
}

const styles = StyleSheet.create({
    box: {
        borderBottomWidth: 1 / PixelRatio.get(),
        borderBottomColor: '#eee',
        padding: 20,
        paddingBottom: 10
    },
    rowItem: {
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 10
    },
    label: {
        color: '#666',
        //fontSize: 16,
        marginRight: 10
    },
    arrow: {
        position: 'absolute',
        top: 20,
        right: 20,
        width: 10,
        height: 18
    }
});

