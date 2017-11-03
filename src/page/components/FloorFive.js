'use strict';

import React, {Component} from 'react';
import {View, Image, Text, addons, StyleSheet, Dimensions, TouchableOpacity, PixelRatio} from 'react-native';

import Swiper from 'react-native-swiper';
import QMNumberControl from './NumberControl';

const {width: SCREEN_WIDTH} = Dimensions.get('window');



/**
 * 首页楼层模板组件, 此模板只允许展示(n*2+3,n>=0)件商品;
 * 其中前三件商品在顶部展示,剩下商品按每行两列展示
 */
export default class FloorFive extends Component {

    render() {
        const floor = this.props.data;
        if (!floor.adverts|| (floor.adverts.length - 3) < 0) {
            return null;
        }

        const banners = floor.banners;

        const topAdverts = floor.adverts.slice(0, 3);
        const bottomAdverts = floor.adverts.slice(3);

        return (
            <View style={styles.prosBox}>
                <TouchableOpacity activeOpacity={0.8}
                                  onPress={() => {
                                      this._handleBack(floor.action, floor.actionParam)
                                  }}>
                    <Text style={styles.title} allowFontScaling={false}>{floor.text}</Text>
                </TouchableOpacity>

                <View style={styles.prosTop}>
                    {
                        topAdverts.map((advert, id) => {
                                return (
                                    <TouchableOpacity activeOpacity={0.8} key={id} style={styles.advertCon}
                                                      onPress={() => {
                                                          this._handleBack(advert.action, advert.actionParam)
                                                      }}>
                                        <Image style={styles.smImg} source={{uri: advert.img}} resizeMode={'stretch'}/>
                                    </TouchableOpacity>
                                )
                            }
                        )
                    }
                </View>

                <View style={styles.prosBottom}>
                    {
                        bottomAdverts.map((advert, id) => {

                                return (

                                    <View style={styles.goodsItem}>
                                        <TouchableOpacity activeOpacity={0.8} key={id}
                                                          onPress={() => {
                                                              this._handleBack(advert.action, advert.actionParam)
                                                          }}>
                                            <Image style={styles.bigImg} source={{uri: advert.img}} resizeMode={'stretch'}/>

                                            <Text style={styles.advertTitle} numberOfLines={2}>{advert.text}</Text>
                                        </TouchableOpacity>
                                        <View style={styles.line}/>
                                        <View style={styles.priceStyle}>
                                            <Text style={styles.advertPrice}
                                                  allowFontScaling={false}>
                                                {window.token ? `￥${(Math.round(advert.price * 100) / 100).toFixed(2)}` :
                                                    `￥${(Math.round(advert.marketPrice * 100) / 100).toFixed(2)}`}
                                            </Text>
                                            <Text style={styles.stockStyle}>
                                                {window.token ? `库存:${advert.stock === null ? 0 : advert.stock}` : (advert.stock ? '库存有货' : '库存无货')}
                                            </Text>
                                        </View>
                                        <View style={[styles.priceStyle, {justifyContent: 'space-between'}]}>
                                            <QMNumberControl
                                                chosenNum={advert.clientCartNo}
                                                maxNum={advert.stock}
                                                minNum={0}
                                                width={80}
                                                height={20}
                                                callbackParent={(number) => {
                                                    // msg.emit('main:changeGoodsNum', advert.id, number);
                                                }}
                                            />
                                            <TouchableOpacity
                                                style={advert.clientCartNo ? styles.shopStyle : styles.shopDisableStyle}
                                                activeOpacity={0.8}
                                                disabled={advert.clientCartNo ? false : true}
                                                onPress={() => {
                                                    // msg.emit('goods:addShoppingCart', advert.id, advert.clientCartNo, true);
                                                }}>
                                                <Image
                                                    style={{width: 16, height: 16}}
                                                    source={require('./img/shop.png')}/>
                                            </TouchableOpacity>


                                        </View>
                                        <View style={[styles.priceStyle, {marginTop: 0}]}>
                                            <View style={styles.imageStyle}>
                                                <Text style={styles.textStyle}>
                                                    {advert.operatingType}
                                                </Text>
                                            </View>
                                            {
                                                advert.marktingTags.map((item) => {
                                                    return (
                                                        <View style={styles.image2Style}>
                                                            <Text style={styles.redTextStyle}>
                                                                {item}
                                                            </Text>
                                                        </View>
                                                    )
                                                })
                                            }
                                        </View>
                                    </View>

                                )
                            }
                        )
                    }
                </View>
                <Swiper
                    style={styles.slide}
                >
                    {banners.map((slider, i) => {
                        return (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                key={i}
                            >
                                <Image source={{uri: slider.img}} style={styles.slide}/>
                            </TouchableOpacity>
                        )
                    })}
                </Swiper>

            </View>
        );
    }

    _renderPage(slider, pageID) {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                    this._handleBack(slider.action, slider.actionParam)
                }}>
                <Image key={pageID} source={{uri: slider.img}} style={styles.slide}/>
            </TouchableOpacity>
        );
    }

    _handleBack(action, actionParam) {

    }


}

const imgWidth = (SCREEN_WIDTH - 70) / 2;
const smImgWidth = (SCREEN_WIDTH - 30) / 3;
const slideHeight = 0.28 * SCREEN_WIDTH;

var styles = StyleSheet.create({
    slide: {
        width: SCREEN_WIDTH,
        height: slideHeight
    },
    prosBox: {
        marginTop: 15
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 20,
        marginBottom: 10
    },
    prosTop: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingTop: 5,
        paddingBottom: 5,
        borderTopWidth: 1 / PixelRatio.get(),
        borderTopColor: '#dddddd',
        borderBottomWidth: 1 / PixelRatio.get(),
        borderBottomColor: '#dddddd',
        justifyContent: 'space-between',
    },
    prosBottom: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingRight: 10,
        paddingLeft: 10,
        //paddingBottom:10,
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    bigImg: {
        width: imgWidth,
        height: imgWidth,
        marginTop: 5,
        marginLeft: 5
    },
    smImg: {
        width: smImgWidth,
        height: smImgWidth
    },
    advertTitle: {
        width: (SCREEN_WIDTH - 70) / 2,
        fontSize: 13,
        color: '#666',
        marginTop: 5,
        marginBottom: 5,
        lineHeight: 18

    },
    advertPrice: {
        fontSize: 16,
        fontWeight: '400',
        color: '#f00101',
        flex: 1
    },
    line: {
        backgroundColor: '#eeeeee',
        height: 1 / PixelRatio.get(),
        width: SCREEN_WIDTH / 2 - 30
    },
    goodsItem: {
        backgroundColor: '#fff',
        alignItems: 'center',
        marginBottom: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        width: (SCREEN_WIDTH - 30) / 2
    },
    advertCon: {
        paddingLeft: 5,
        paddingRight: 5
    },
    priceStyle: {
        marginTop: 5,
        flexDirection: 'row',
        width: (SCREEN_WIDTH - 70) / 2,
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    stockStyle: {
        color: '#696969',
        fontSize: 12,
    },
    textStyle: {
        backgroundColor: '#00000000',
        fontSize: 10,
        color: 'white',
    },
    redTextStyle: {
        backgroundColor: '#00000000',
        fontSize: 10,
        color: '#f00101',
    },
    imageStyle: {
        marginTop: 5,
        backgroundColor: '#f00101',
        borderRadius: 3,
        borderColor: '#f00101',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
        paddingLeft: 3,
        paddingRight: 3,
        paddingTop: 1,
        paddingBottom: 1
    },
    image2Style: {
        marginTop: 5,
        borderColor: '#f00101',
        borderWidth: 1,
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
        paddingLeft: 3,
        paddingRight: 3,
        paddingTop: 1,
        paddingBottom: 1
    },
    shopStyle: {
        backgroundColor: '#f00101',
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 2,
        paddingBottom: 2
    },
    shopDisableStyle: {
        backgroundColor: '#afafaf',
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 2,
        paddingBottom: 2
    },

});
