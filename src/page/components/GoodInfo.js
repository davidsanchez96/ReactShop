import React, {Component} from 'react';
import {View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity, Image, PixelRatio} from 'react-native';


export default class GoodInfo extends Component {
  render() {
    return (
      <View style={styles.box}>
        <Text style={styles.title} allowFontScaling={false}>{this.props.goodName}</Text>
        <Text style={styles.description} allowFontScaling={false}>{this.props.description}</Text>
        <Text style={styles.price} allowFontScaling={false}><Text style={{fontSize: 14}} allowFontScaling={false}>&yen;&nbsp;</Text>
          {this.props.goodsInfoExist ? this.props.price: '暂无报价'}</Text>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  box: {
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#eee',
    padding: 20
  },
  title: {
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 10
  },
  description: {
    color: '#e63a59',
    marginBottom: 10
  },
  price: {
    color: '#e63a59',
    fontSize: 18
  }
});
