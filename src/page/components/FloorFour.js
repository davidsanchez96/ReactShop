'use strict';

import React, {Component} from 'react';
import {View, Image, Text, StyleSheet, Dimensions, TouchableOpacity, PixelRatio} from 'react-native';
import Swiper from 'react-native-swiper';

const {width: SCREEN_WIDTH} = Dimensions.get('window');


/**
 * 首页楼层模板组件, 此模板只允许展示七件商品;
 * 第1件商品在左侧展示,第2~5件商品在中间从上至下展示,最后两件商品在右边从上至下展示
 */
export default class FloorFour extends Component {

    render() {
        const floor = this.props.data;

        if (!floor.adverts || floor.adverts.length != 7) {
            return null;
        }

        const banners = floor.banners;
        const advert_1 = floor.adverts[0];

        const centerAdverts = floor.adverts.slice(1, 5);
        const rightAdverts = floor.adverts.slice(-2);

        return (
            <View style={styles.prosBox}>
                <TouchableOpacity activeOpacity={0.8}
                                  onPress={() => {
                                      this._handleBack(floor.action, floor.actionParam)
                                  }}>
                    <Text style={styles.title} allowFontScaling={false}>{floor.text}</Text>
                </TouchableOpacity>

                <View style={styles.pros}>
                    <View style={styles.prosLeft}>
                        <TouchableOpacity activeOpacity={0.8}
                                          onPress={() => {
                                              this._handleBack(advert_1.action, advert_1.actionParam)
                                          }}>
                            <Image style={styles.bigImg} source={{uri: advert_1.img}}/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.prosCenter}>
                        {
                            centerAdverts.map((advert, id) => {
                                    return (
                                        <TouchableOpacity activeOpacity={0.8} key={id}
                                                          onPress={() => {
                                                              this._handleBack(advert.action, advert.actionParam)
                                                          }}>
                                            <Image style={styles.ssmImg} source={{uri: advert.img}}/>
                                        </TouchableOpacity>
                                    )
                                }
                            )
                        }
                    </View>

                    <View style={styles.prosRight}>
                        {
                            rightAdverts.map((advert, id) => {
                                    return (
                                        <TouchableOpacity activeOpacity={0.8} key={id}
                                                          onPress={() => {
                                                              this._handleBack(advert.action, advert.actionParam)
                                                          }}>
                                            <Image style={styles.smImg} source={{uri: advert.img}}/>
                                        </TouchableOpacity>
                                    )
                                }
                            )
                        }
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

}

const imgWidth = SCREEN_WIDTH / 3 - 10;
const bigImgHeight = 1.41 * imgWidth;
const smImgHeight = bigImgHeight / 2 - 1;
const ssmImgHeight = 0.38 * (SCREEN_WIDTH / 3) - 6;
const slideHeight = 0.28 * SCREEN_WIDTH;

var styles = StyleSheet.create({
    slide: {
        width: SCREEN_WIDTH,
        height: slideHeight
    },
    pros: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        paddingTop: 10,
        paddingRight: 10,
        paddingLeft: 10,
        paddingBottom: 10,
        borderBottomWidth: 1 / PixelRatio.get(),
        borderBottomColor: '#ddd'
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
    prosCenter: {
        flexDirection: 'column',
        marginTop: 1
    },
    prosRight: {
        flexDirection: 'column',
        marginTop: -5
    },
    bigImg: {
        width: imgWidth,
        height: bigImgHeight
    },
    smImg: {
        width: imgWidth,
        height: smImgHeight,
        marginTop: 5
    },
    ssmImg: {
        width: imgWidth,
        height: ssmImgHeight,
        borderWidth: 1 / PixelRatio.get(),
        borderColor: '#eee',
        marginTop: -1
    }
});

