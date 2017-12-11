import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Image, PixelRatio} from 'react-native';

export default class StoreInfo extends Component {
    render() {
        if (__DEV__) {
            console.log('this.storeInfo...', this.props.storeInfo.toJS())
        }
        const point = Math.floor(this.props.storeInfo.get('point'));
        const heart = styles['heart' + point];


        return (
            <View style={styles.itemBox}>
                <TouchableOpacity activeOpacity={1} style={{padding: 20}} onPress={() => msg.emit('route:goToNext', {
                    sceneName: 'ShopHome',
                    thirdId: this.props.storeInfo.get('storeId')
                })}>
                    <View style={styles.title}>
                        <Image style={styles.storeIcon} source={require('./img/store.png')}/>
                        <Text style={{fontSize: 16, marginRight: 10}}
                              allowFontScaling={false}>{this.props.storeInfo.get('storeName')}</Text>
                        <Text style={{color: '#e63a59', fontSize: 16}}
                              allowFontScaling={false}>{this.props.storeInfo.get('point')}分</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 15, alignItems: 'center'}}>
                        <Image style={[styles.heartBox, {tintColor: '#bbb'}]} source={require('./img/heart.png')}>
                            <View style={[styles.heartValue, heart]}>
                                <Image style={styles.heartBox} source={require('./img/heart.png')}/>
                            </View>
                        </Image>
                        <Text style={{color: '#999', fontSize: 16, marginLeft: 10}}
                              allowFontScaling={false}>({this.props.storeInfo.get('followNum')}人关注)</Text>
                    </View>
                    <Image style={styles.arrow} source={require('./img/right.png')}/>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    itemBox: {
        backgroundColor: '#fff',
        marginTop: 15
    },
    arrow: {
        position: 'absolute',
        top: 20,
        right: 20,
        width: 10,
        height: 18
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    storeIcon: {
        width: 18,
        height: 18,
        marginRight: 10
    },
    heartBox: {
        width: 98,
        height: 14
    },
    heartValue: {
        width: 0,
        height: 14,
        overflow: 'hidden'
    },
    heart5: {
        width: 98
    },
    heart4: {
        width: 78
    },
    heart3: {
        width: 58
    },
    heart2: {
        width: 38
    },
    heart1: {
        width: 18
    },
    heart0: {
        width: 0
    },
    storeOps: {
        flexDirection: 'row',
        paddingBottom: 20,
        paddingLeft: 10,
        paddingRight: 10
    },
    storeBtn: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
        borderWidth: 1 / PixelRatio.get(),
        borderColor: '#eee',
        borderRadius: 5,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
        textAlign: 'center',
        color: '#666',
        fontSize: 16
    }
});

