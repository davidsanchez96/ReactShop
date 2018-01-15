'use strict';

import React, {Component} from 'react';
import {View, Image, Text, addons, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import Swiper from 'react-native-swiper';

const {width: SCREEN_WIDTH} = Dimensions.get('window');


/**
 * 首页楼层模板组件, 此模板只允许展示三件商品.
 */
export default class FloorOne extends Component {


    render() {
        const floor = this.props.data;

        if (!floor.adverts || floor.adverts.length != 3) {
            return null;
        }

        const banners = floor.banners;
        const advert_1 = floor.adverts[0];
        const advert_2 = floor.adverts[1];
        const advert_3 = floor.adverts[2];

        return (
            <View style={styles.prosBox}>
                <TouchableOpacity activeOpacity={0.8}
                                  onPress={() => {
                                      this._handleBack(floor.action, floor.actionParam)
                                  }}>
                    <Text style={styles.title} allowFontScaling={false}>{floor.text}</Text>
                </TouchableOpacity>
                <View style={styles.pros}>
                    <View>
                        <TouchableOpacity activeOpacity={0.8}
                                          onPress={() => {
                                              this._handleBack(advert_1.action, advert_1.actionParam)
                                          }}>
                            <Image style={styles.bigImg} source={{uri: advert_1.img}} resizeMode={'stretch'}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.proRight}>
                        <TouchableOpacity activeOpacity={0.8}
                                          onPress={() => {
                                              this._handleBack(advert_2.action, advert_2.actionParam)
                                          }}>
                            <Image style={styles.smImg} source={{uri: advert_2.img}} resizeMode={'stretch'}/>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8}
                                          onPress={() => {
                                              this._handleBack(advert_3.action, advert_3.actionParam)
                                          }}>
                            <Image style={styles.smImg} source={{uri: advert_3.img}} resizeMode={'stretch'}/>
                        </TouchableOpacity>
                    </View>
                </View>

                {banners ?
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
                    </Swiper> : null
                }
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

    _isEmptyObject(e) {
        var t;
        for (t in e)
            return !1;
        return !0
    }
}

const imgWidth = SCREEN_WIDTH / 2 - 1;
const bigImgHeight = 0.89 * imgWidth;
const smImgHeight = (bigImgHeight - 1) / 2;
const slideHeight = 0.28 * SCREEN_WIDTH;

var styles = StyleSheet.create({
    slide: {
        width: SCREEN_WIDTH,
        height: slideHeight
    },
    prosBox: {
        marginTop: 0
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 20,
        paddingRight: 20,
        marginBottom: 10,
        marginTop: 15
    },
    pros: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    proRight: {
        flexDirection: 'column',
        marginTop: -2
    },
    bigImg: {
        width: imgWidth,
        height: bigImgHeight
    },
    smImg: {
        width: imgWidth,
        height: smImgHeight,
        marginTop: 2
    }
});


