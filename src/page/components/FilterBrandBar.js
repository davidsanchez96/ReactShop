import React, {Component} from 'react';

import {View, Text, StyleSheet, TouchableOpacity, PixelRatio} from 'react-native';
import {SelectType} from "../../utils/actionTypes";




/**
 * 品牌视图选择工具条
 */
export default class FilterBrandBar extends Component {
  render(){
    var isSortSelected = this.props.selectReducer.get('brandViewType') === 'sort';
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.btnBlock} activeOpacity={0.8} onPress={()=>this._onClickItem('recommend')}>
          <View style={isSortSelected ? styles.btnView : styles.selectedBtnView}>
            <Text style={isSortSelected ? styles.valueText : styles.selectedValueText} allowFontScaling={false}> 推荐品牌 </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.separatorLine}/>
        <TouchableOpacity style={styles.btnBlock} activeOpacity={0.8} onPress={()=>this._onClickItem('sort')}>
          <View style={!isSortSelected ? styles.btnView : styles.selectedBtnView}>
            <Text style={!isSortSelected ? styles.valueText : styles.selectedValueText} allowFontScaling={false}> 字母排序 </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  /**
   * 点击元素
   * @private
   */
  _onClickItem(type) {
    this.props.dispatch({type:SelectType,data:type});
    // msg.emit('goodsFilterConditionValue:setBrandViewType', type);
  }
}


var styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: '#FFF',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#EEE'
  },
  separatorLine: {
    height: 20,
    width: 1 / PixelRatio.get(),
    backgroundColor: '#EEE',
    alignSelf: 'center',
  },
  btnBlock: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    flexDirection: 'row'
  },
  btnView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15
  },
  valueText: {
    color: '#666',
  },
  selectedBtnView: {
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#e63a59',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15
  },
  selectedValueText: {
    color: '#e63a59',
  },
});
