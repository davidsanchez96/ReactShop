'use strict';

import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, Navigator, Dimensions} from 'react-native';

const { width: SCREEN_WIDTH} = Dimensions.get('window');


export default class GoShopping extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.emptyCon}>
          {/*是否显示登录按钮*/}
          {this._renderBtn()}

        </View>

        {/*empty view*/}
        <View>
          <View style={styles.emptyCart}>
            <Image style={styles.cart} source={require('./img/empty_cart.png')}/>
            <Text style={styles.grey} allowFontScaling={false}>您的购物车空空如也，快去装满它！</Text>
          </View>
          <View style={styles.btnCon}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.shoppingBtn}
              onPress={() => this._goHome()}>
              <Text style={styles.greyLarge} allowFontScaling={false}>去逛逛</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  /**
   * 登录按钮
   *
   * @returns {*}
   * @private
   */
  _renderBtn(){
    if (window.token) {
      return null;
    }

    return (
      <View style={{flexDirection:'row', alignItems:'center', flex: 1}}>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => msg.emit('route:goToNext',{
            sceneName: 'Login',
            sceneConfig: Navigator.SceneConfigs.FloatFromBottom
          })}>
          <Text style={styles.grey}>登录</Text>
        </TouchableOpacity>
           <Text
            style={styles.greyDark}
            allowFontScaling={false}>
             你可以在登录后同步电脑与手机购物车中的商品
          </Text>
       </View>
    );
  }

  _goHome(){
    msg.emit('app:menuChange', 'mainPage');
    msg.emit('route:backToTop');
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor:'#eee',
    flex:1
  },
  emptyCon: {
    backgroundColor: '#dddddd',
    paddingTop: 15,
    paddingLeft: 20,
    paddingBottom: 15,
    paddingRight: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  loginBtn: {
    backgroundColor: '#fff',
    borderWidth: 1 ,
    borderColor: '#999999',
    height: 30,
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    marginRight: 10,
    borderRadius: 5
  },
  grey: {
    color: '#666',
    fontSize: 14
  },
  greyDark: {
    flex: 1,
    color: '#333',
    fontSize: 12
  },
  emptyCart: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 35,
    paddingBottom: 35
  },
  cart: {
    width: SCREEN_WIDTH / 3,
    height: SCREEN_WIDTH / 3,
    marginBottom: 25
  },
  btnCon: {
    paddingLeft: 20,
    paddingRight: 20
  },
  shoppingBtn: {
    height: 50,
    backgroundColor: '#dddddd',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  greyLarge: {
    fontSize: 20,
    color: '#666'
  }
});

