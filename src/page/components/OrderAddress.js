'use strict';

import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet, Dimensions, Text, Image} from 'react-native';
import Tag from "./Tag";
const {width: SCREEN_WIDTH} = Dimensions.get('window');


export default class OrderAddress extends Component {
  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={{marginTop: 10,}}
        onPress={() => this._handleAddress()}>
        <Image style={styles.addressBox}
               source={require('./img/address_bg.png')}>
          {
            this._renderAddressDetail()
          }
        </Image>
      </TouchableOpacity>
    )
  }
  /**
   * 收货地址详细
   * @returns {XML}
   * @private
   */
  _renderAddressDetail(){
    return (this.props.defaultAddress ?
        <View style={styles.contWrap}>
          <View style={styles.contBox}>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              <View style={styles.rowItem}>
                <Image style={styles.itemIcon}
                       source={require('./img/user.png')}/>
                <Text style={{fontSize: 16,}}
                      allowFontScaling={false}>
                  {this.props.defaultAddress.get('name')}
                </Text>
              </View>
              <View style={styles.rowItem}>
                <Image style={styles.itemIcon}
                       source={require('./img/phone.png')}/>
                <Text style={{fontSize: 16,}}
                      allowFontScaling={false}>
                  {this.props.defaultAddress.get('mobile')}
                </Text>
              </View>
            </View>
            <View style={{marginTop: 10, flexDirection: 'row',}}>
              {
                this.props.defaultAddress.get('defaultAddress')
                  ?
                  <Tag style={{marginRight: 5,}} tag='默认'/>
                  : null
              }
              <Text style={styles.addressContent}
                    allowFontScaling={false}>
                {this.props.defaultAddress.get('provinceName')}
                {this.props.defaultAddress.get('cityName')}
                {this.props.defaultAddress.get('districtName')}
                {this.props.defaultAddress.get('detail')}
              </Text>
            </View>
          </View>
          <Image style={styles.arrow}
                 source={require('./img/right.png')}/>
        </View>
        :
        <Text style={styles.newAddress}
              allowFontScaling={false}>
          请新建收货地址以确保商品顺利到达
        </Text>
    )
  }

  _handleAddress() {
    const defaultAddress = this.props.defaultAddress;
    const defaultAddressId = defaultAddress ? defaultAddress.get('id') : '';

    //msg.emit('app:tip', '对接收货地址选择页面');
    msg.emit('route:goToNext', {
      sceneName: 'AddressManager',
      choose: true
    })
  }
}

const styles = StyleSheet.create({
  addressBox: {
    width: SCREEN_WIDTH,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0)'
  },
  contWrap: {
    flex: 1,
    width: SCREEN_WIDTH,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  contBox: {
    flex: 1,
    paddingRight: 20,
  },
  arrow: {
    width: 10,
    height: 18,
  },
  newAddress: {
    fontSize: 16,
    color: '#666',
  },
  rowItem: {
    flexDirection: 'row',
    marginRight: 20,
    alignItems: 'center',
  },
  itemIcon: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  addressContent: {
    color: '#666',
    lineHeight: 18,
    marginLeft: 4,
    flex: 1,
  },
});

