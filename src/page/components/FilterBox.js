'use strict';

import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, Dimensions} from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');


export default class FilterBox extends Component {
  render() {
    var isTypeSelected = false;
    if (this.props.filterOpen) {
      return (
        <TouchableOpacity
          style={styles.filterWrapper}
          activeOpacity={1}
          onPress={this.props.filterClose}>
          <View style={styles.filterCont}>
            <TouchableOpacity
              style={styles.filterItem}
              activeOpacity={0.8}
              onPress={this.props.filterFir}>
              <Text
                style={[styles.filterText, (isTypeSelected && this.props.filterChecked === '综合') && {color: '#e63a59'}]}
                allowFontScaling={false}>综合</Text>
              <Image
                style={[styles.filterChecked, (isTypeSelected && this.props.filterChecked === '综合') && {opacity: 1}]}
                source={require('./img/filter_checked.png')}/>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.filterItem}
              activeOpacity={0.8}
              onPress={this.props.filterSec}>
              <Text
                style={[styles.filterText, (isTypeSelected && this.props.filterChecked === '新品') && {color: '#e63a59'}]}
                allowFontScaling={false}>新品</Text>
              <Image
                style={[styles.filterChecked, (isTypeSelected && this.props.filterChecked === '新品') && {opacity: 1}]}
                source={require('./img/filter_checked.png')}/>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )
    } else {
      return (
        <View />
      )
    }
  }
}

const styles = StyleSheet.create({
  filterWrapper: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  filterCont: {
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10
  },
  filterItem: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  filterText: {
    color: '#666'
  },
  filterChecked: {
    width: 20,
    height: 20,
    opacity: 0
  }
});

