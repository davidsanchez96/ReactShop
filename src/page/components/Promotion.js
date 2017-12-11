import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Tag from "./Tag";

export default class Promotion extends Component {
  render() {
    const promotions = this.props.promotion.sortBy(promotion => promotion.tagName);
    const groups = this.props.groups;

    if(__DEV__){
      console.log('promotionVisible---->', this.props.promotionVisible);
      console.log('promotions---->', promotions.toJS());
      console.log('groups---->', groups.toJS());
    }

    return (
      <View style={styles.box}>
        <View style={styles.rowItem}>
          <Text style={[styles.label, {lineHeight: 18}]} allowFontScaling={false}>促销</Text>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.rowCont}
            onPress={() => {msg.emit('goods:chosenTab', {promotionVisible: !this.props.promotionVisible})}}>
            {
              this.props.promotionVisible ?
                < View style={styles.promotion}>
                  <Text style={[styles.label, {lineHeight: 18}]} allowFontScaling={false}>可享受以下促销</Text>
                </View>
                :
                < View style={styles.promotion}>
                  {
                    this.props.promotion.count() > 0 ?
                      promotions.map((v) => {
                        return (
                          <Tag tag={v.get('tagName')}/>
                        )
                      }) : null
                  }

                  {
                    this.props.groups.count() > 0 ?
                      <Tag tag="优惠套装"/>
                      : null
                  }
                </View>
            }
            <Image style={[styles.arrow, this.props.promotionVisible ? styles.arrowUp: styles.arrowDown]}
                   source={require('./img/right.png')}/>
          </TouchableOpacity>
        </View>
        {
          this.props.promotionVisible ?
            <View>
              {
                this.props.promotion.count() > 0 ?
                  promotions.map((v, i) => {
                    return (
                      <View key={i} style={[styles.promotion, styles.promotionBar]}>
                        <Tag tag={v.get('tagName')}/>
                        <Text
                          numberOfLines={1}
                          style={{flex: 1, marginLeft: 5}}
                          allowFontScaling={false}>{v.get('marketingText')}</Text>
                      </View>
                    )
                  }) : null
              }

              { /* 优惠套装   */ }
              {
                this.props.groups.count() > 0 ?
                  <TouchableOpacity
                    style={[styles.promotion, styles.promotionBar]}
                    activeOpacity={0.8}
                    onPress={() => {msg.emit('route:goToNext', {sceneName: 'GroupList',groupList: this.props.groups})}}>
                    <Tag tag="优惠套装"/>
                    {
                      this.props.promotionVisible ?
                        <View style={{flex: 1}}>
                          <Text
                            numberOfLines={1}
                            style={{flex: 1, marginLeft: 5}}
                            allowFontScaling={false}>共{this.props.groups.count()}款套装</Text>
                          <Image style={styles.arrow}
                                 source={require('./img/right.png')}/>
                        </View> : null
                    }
                  </TouchableOpacity>

                  : null
              }
            </View>
            : null
        }

      </View>
    )
  }
}


const styles = StyleSheet.create({
  box: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
    paddingHorizontal: 20
  },
  rowItem: {
    flexDirection: 'row',
    paddingVertical: 15
  },
  label: {
    color: '#666',
    //fontSize: 16,
    marginRight: 10,
    lineHeight: 20,
    marginTop: -2
  },
  rowCont: {
    flex: 1
  },
  promotion: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  contText: {
    //fontSize: 16,
    lineHeight: 20
  },
  promotionBar: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#eee',
    paddingVertical: 15,
    paddingLeft: 38
  },
  arrow: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 10,
    height: 18
  },
  arrowDown: {
    transform: [{rotate: '90deg'}],
    top: 2,
    right: 4
  },
  arrowUp: {
    transform: [{rotate: '270deg'}],
    top: 2,
    right: 4
  }
});

