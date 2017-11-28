import React, {Component} from 'react';

import {View, Text, PixelRatio, StyleSheet, TouchableOpacity, Image} from 'react-native';

import Immutable from 'immutable';



/**
 * 过滤按钮
 */
export default class FilterButton extends Component {

  render() {

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={this._isSelected('showStock') ? styles.selectedBtn :styles.btnBlock}
          activeOpacity={0.8}
          onPress={()=>this._setSelected('showStock')}>
          {
            this._isSelected('showStock') ?
              <Image source={require('./img/filter_checked.png')} style={styles.selectedImage}/> :
              null
          }
          <Text style={this._isSelected('showStock') ? styles.selectedBtnText :styles.btnText} allowFontScaling={false}>
            仅看有货
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={this._isSelected('isCustomerDismount') ? styles.selectedBtn :styles.btnBlock}
          activeOpacity={0.8}
          onPress={()=>this._setSelected('isCustomerDismount')}>
          {
            this._isSelected('isCustomerDismount') ?
              <Image source={require('./img/filter_checked.png')} style={styles.selectedImage}/> :
              null
          }
          <Text style={this._isSelected('isCustomerDismount') ? styles.selectedBtnText :styles.btnText} allowFontScaling={false}>
            促销
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={this._isSelected('freeShipment') ? styles.selectedBtn :styles.btnBlock}
          activeOpacity={0.8}
          onPress={()=>this._setSelected('freeShipment')}>
          {
            this._isSelected('freeShipment') ?
              <Image source={require('./img/filter_checked.png')} style={styles.selectedImage}/> :
              null
          }
          <Text style={this._isSelected('freeShipment') ? styles.selectedBtnText :styles.btnText} allowFontScaling={false}>
            包邮
          </Text>
        </TouchableOpacity>
      </View>
    );
  }


  /**
   * 判断按钮是否被选中
   * @param propName
   * @private
   */
  _isSelected(propName){
      let selectedValues=this.props.selectedValues;
      if(!Immutable.is(selectedValues)){
          selectedValues= Immutable.fromJS(selectedValues);
      }
    var selectValue = selectedValues.get(propName);
    return selectValue != null && selectValue != undefined;
  }


  /**
   * 设置按钮选中状态
   * @param propName
   * @private
   */
  _setSelected(propName){
    // var selectValue = appStore.data().get('selectedValues').get(propName);
    // if (selectValue != null && selectValue != undefined) {
    //   msg.emit('goodsFilterCondition:setSelectedValue', propName, null);
    // }
    // else {
    //   msg.emit('goodsFilterCondition:setSelectedValue', propName, 1);
    // }

  }
}


const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: '#FFF',
    marginBottom: 1 / PixelRatio.get(),
  },
  btnBlock: {
    height: 30,
    backgroundColor: '#FFF',
    flex: 1,
    borderRadius: 5,
    borderColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1 / PixelRatio.get(),
    marginLeft: 5,
    marginRight: 5
  },
  btnText: {
    color: 'grey',
    fontSize: 14,
  },
  selectedBtn: {
    height: 30,
    backgroundColor: '#FFF',
    flex: 1,
    borderRadius: 5,
    borderColor: '#F03157',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1 / PixelRatio.get(),
    flexDirection: 'row',
    marginLeft: 5,
    marginRight: 5
  },
  selectedBtnText: {
    color: '#F03157',
    fontSize: 14,
  },
  selectedImage: {
    width: 11,
    height: 11,
    marginRight: 5
  },
});



