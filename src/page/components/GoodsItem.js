import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Image, Text} from 'react-native';


export default class GoodsItem extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.cartGood}>
                    <TouchableOpacity
                        style={{height: 80, justifyContent: 'center'}}
                        onPress={() => this._chooseGoodsItem(this.props.goodsIndex, this.props.presentMode == 1 ? true : !this.props.goods.get('checked'))}
                        activeOpacity={0.8}>
                        <Image
                            style={styles.check}
                            source={this.props.goods.get('checked') ? require('./img/checked.png') : require('./img/uncheck.png')}/>
                    </TouchableOpacity>

                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={styles.goodImg}>
                            <Image style={{width: 80, height: 80}} source={{uri: this.props.goods.get("image")}}/>
                            {
                                this.props.goods.get('stock') == 0 || this.props.goods.get('addedStatus') == '0' ?
                                    <View style={styles.noGoods}>
                                        <Text style={{color: '#fff'}}>无货</Text>
                                    </View> : null
                            }
                        </View>
                        <View style={styles.goodCont}>
                            <Text
                                numberOfLines={2}
                                style={{lineHeight: 20, height: 40}}
                                allowFontScaling={false}>
                                {this.props.goods.get("name")}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    /**
     * 选择赠品
     * @param index
     * @param status
     * @private
     */
    _chooseGoodsItem(index, status) {
        if (__DEV__) {
            console.log('index--->', index);
            console.log('status--->', status);
        }
        msg.emit('cart:presentsChecked', {index: index, status: status});
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    cartGood: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        paddingVertical: 10
    },
    goodImg: {
        borderWidth: 1 ,
        borderColor: '#ddd',
        borderRadius: 5
    },
    check: {
        marginRight: 20,
        width: 20,
        height: 20
    },
    goodCont: {
        flex: 1,
        alignSelf: 'flex-start',
        marginLeft: 10
    },
    noGoods: {
        position: 'absolute',
        width: 80,
        height: 30,
        backgroundColor: 'rgba(0, 0, 0, .6)',
        left: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
