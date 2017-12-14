import React, {Component} from 'react';
import {Image, PixelRatio, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default class CommentTab extends Component {
    render() {
        return (
            <View style={styles.tabBar}>
                <TouchableOpacity style={styles.tabItem} activeOpacity={0.6}
                                  onPress={()=>this.props.click(3)}>
                    <Text
                        style={[styles.itemText, {marginBottom: 5}, this.props.commentsType === '3' && {color: '#e63a59'}]}
                        allowFontScaling={false}>全部评价</Text>
                    <Text style={[styles.itemText, this.props.commentsType === 3 && {color: '#e63a59'}]}
                          allowFontScaling={false}>{this.props.product.getIn(['commentMap', 'ALL']) || 0}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem} activeOpacity={0.6}
                                  onPress={() => this.props.click(0)}>
                    <Text
                        style={[styles.itemText, {marginBottom: 5}, this.props.commentsType == '0' && {color: '#e63a59'}]}
                        allowFontScaling={false}>好评</Text>
                    <Text style={[styles.itemText, this.props.commentsType === 0 && {color: '#e63a59'}]}
                          allowFontScaling={false}>{this.props.product.getIn(['commentMap', 'GOOD']) || 0}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem} activeOpacity={0.6}
                                  onPress={() => this.props.click(1)}>
                    <Text
                        style={[styles.itemText, {marginBottom: 5}, this.props.commentsType === '1' && {color: '#e63a59'}]}
                        allowFontScaling={false}>中评</Text>
                    <Text style={[styles.itemText, this.props.commentsType === 1 && {color: '#e63a59'}]}
                          allowFontScaling={false}>{this.props.product.getIn(['commentMap', 'NORMAL'])}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem} activeOpacity={0.6}
                                  onPress={() => this.props.click(2)}>
                    <Text
                        style={[styles.itemText, {marginBottom: 5}, this.props.commentsType === '2' && {color: '#e63a59'}]}
                        allowFontScaling={false}>差评</Text>
                    <Text style={[styles.itemText, this.props.commentsType === 2 && {color: '#e63a59'}]}
                          allowFontScaling={false}>{this.props.product.getIn(['commentMap', 'BAD']) || 0}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tabBar: {
        height: 50,
        backgroundColor: '#fff',
        borderBottomWidth: 1 / PixelRatio.get(),
        borderBottomColor: '#ccc',
        flexDirection: 'row'
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemText: {
        color: '#aaa'
    }
});
