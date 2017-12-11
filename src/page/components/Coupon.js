import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet, PixelRatio} from 'react-native';

export default class Coupon extends Component {
  render() {
    const coupons = this.props.coupon;

    return (
      <View style={styles.box}>
        <View style={styles.rowItem}>
          <Text style={styles.label} allowFontScaling={false}>领券</Text>
          <TouchableOpacity activeOpacity={this.props.goodsInfoId || 1} style={styles.rowCont} onPress={() => this._handleToCouponView()}>
            {
              this._renderCoupons(coupons)
            }
            <Image style={styles.arrow} source={require('./img/right.png')}/>
          </TouchableOpacity>
        </View>
      </View>
    )
  }


  /**
   * 渲染优惠券tag
   * @param coupons
   * @returns {*}
   * @private
   */
  _renderCoupons(coupons){
    return (
      coupons.map((counpon, index) => {
        if(index > 1) {
          return;
        }

        return(
          <View style={styles.couponItem} key={index}>
            <Text style={styles.couponText} allowFontScaling={false}>
              {
                (counpon.get('couponRuleType') == '1' && `直降${counpon.get('price')}元`) ||
                (counpon.get('couponRuleType') == '2' && `满${counpon.get('fullPrice')}减${counpon.get('price')}元`)
              }
            </Text>
          </View>
          )
      })
    )
  }


  /**
   * 导航到领券页面
   * @private
   */
  _handleToCouponView(){
    this.props.goodsInfoId && msg.emit('route:goToNext', {
      sceneName: 'GoodsCoupon',
      goodsInfoId: this.props.goodsInfoId
    });
  }
}


const styles = StyleSheet.create({
  box: {
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#eee',
    paddingHorizontal: 20
  },
  rowItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    alignItems: 'center'
  },
  label: {
    color: '#666',
    marginRight: 10
  },
  rowCont: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  couponItem: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1 / PixelRatio.get(),
    borderColor: '#e63a59',
    borderRadius: 5,
    marginRight: 10
  },
  couponText: {
    fontSize: 12,
    color: '#e63a59'
  },
  arrow: {
    position: 'absolute',
    top: 3,
    right: 0,
    width: 10,
    height: 18
  }
});
