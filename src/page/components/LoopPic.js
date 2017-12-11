import React, {Component} from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import Swiper from 'react-native-swiper';

const {width: SCREEN_WIDTH} = Dimensions.get('window');


export default class LoopPic extends Component {
    render() {
        let imgList = [];
        if (this.props.goodsInfoExist) {
            imgList = (this.props.imgList && this.props.imgList.toJS()) || [];
        } else {
            const url=require('./img/sku.png');

            imgList.push({bigUrl:url});
        }

        return (
            <View style={styles.pic}>
                {/*商品sku图片轮播*/}


                <Swiper
                    style={styles.image}
                >
                    {imgList.map((slider, i) => {
                        return (
                            <Image
                                key={i}
                                resizeMode={'cover'}
                                source={{uri: slider.bigUrl || slider.imageInName}}
                                style={styles.image}/>
                        )
                    })}
                </Swiper>

            </View>
        )
    }


    _renderPage({bigUrl, imageInName}, pageID) {
        return (
            <Image
                resizeMode={'cover'}
                style={styles.image}
                source={{uri: bigUrl || imageInName}}/>
        )
    }


    _renderDefaultPage(url) {
        return (
            <Image
                resizeMode={'cover'}
                style={styles.image}
                source={url}/>
        )
    }
}

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    image: {
        width: SCREEN_WIDTH,
        height: SCREEN_WIDTH
    },
    pic: {
        backgroundColor: '#fff'
    }
});
