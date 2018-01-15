'use strict';

import React, {Component} from 'react';
import {View, Image, Text, addons, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import Swiper from 'react-native-swiper';

const {width: SCREEN_WIDTH} = Dimensions.get('window');


/**
 * 首页楼层模板组件, 此模板只允许展示(n*3+2, n>=0)件商品,
 * 其中前两件商品在顶部展示;剩下商品在每行3列展示;
 */
export default class FloorThree extends Component {

    render() {
        const floor = this.props.data;

        if (!floor.adverts || (floor.adverts.length - 2) % 3 != 0) {
            return null;
        }

        const banners = floor.banners;
        const advert_1 = floor.adverts[0];
        const advert_2 = floor.adverts[1];

        const smAdverts = floor.adverts.slice(2);

        return (
            <View style={styles.prosBox}>
                <TouchableOpacity activeOpacity={0.8}
                                  onPress={() => {
                                      this._handleBack(floor.action, floor.actionParam)
                                  }}>
                    <Text style={styles.title} allowFontScaling={false}>{floor.text}</Text>
                </TouchableOpacity>
                <View style={styles.prosTop}>
                    <TouchableOpacity activeOpacity={0.8}
                                      onPress={() => {
                                          this._handleBack(advert_1.action, advert_1.actionParam)
                                      }}>
                        <Image style={styles.bigImg} source={{uri: advert_1.img}} resizeMode={'stretch'}/>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8}
                                      onPress={() => {
                                          this._handleBack(advert_2.action, advert_2.actionParam)
                                      }}>
                        <Image style={styles.bigImg} source={{uri: advert_2.img}} resizeMode={'stretch'}/>
                    </TouchableOpacity>
                </View>

                <View style={styles.prosBottom}>
                    {
                        smAdverts.map((advert, id) => {
                                return (
                                    <TouchableOpacity activeOpacity={0.8} key={id}
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
                    </Swiper>
                    : null
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

const imgWidth = SCREEN_WIDTH / 2 - 15;
const imgHeight = 0.61 * imgWidth;
const smImgWidth = SCREEN_WIDTH / 3 - 1;
const smImgHeight = 0.84 * smImgWidth;
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
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10
    },
    prosBottom: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    bigImg: {
        width: imgWidth,
        height: imgHeight
    },
    smImg: {
        width: smImgWidth,
        height: smImgHeight,
        marginTop: 2
    }
});

