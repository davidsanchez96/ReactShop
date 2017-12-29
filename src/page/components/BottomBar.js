import React, {Component} from 'react';
import {
    View,
    Text,
    Platform,
    StyleSheet,
    TouchableOpacity,
    Image,
    NativeModules,
    Dimensions,
    Animated,
    findNodeHandle
} from 'react-native';
import {followType} from "../../action/followActions";

const {UIManager} = NativeModules;
const {width: SCREEN_WIDTH} = Dimensions.get('window');
const bottomValue = new Animated.Value(30);
const rightValue = new Animated.Value(45);
const scaleValue = new Animated.Value(1);
const opacityValue = new Animated.Value(0);

export default class SearchHistory extends Component {
    render() {
        if (__DEV__) {
            console.log('this.props.follower..', this.props.follower);
        }

        let shoppingCount = this.props.shoppingCount <= 99 ? this.props.shoppingCount : '99+';

        const disableAddCart = (!this.props.goodsInfo.get('stock') || this.props.goodsInfo.get('stock') <= 0
            || this.props.goodsInfo.get('addedStatus') == 0 || !this.props.goodsInfoExist);


        return (
            <View style={styles.bottomBar}>
                <Animated.Image
                    style={this.getStyle()}
                    source={{uri: this.props.goodsInfo.get('image')}}/>

                <View style={styles.navBar}>
                    <TouchableOpacity style={styles.navItem} activeOpacity={0.8}
                                      onPress={()=>this._handleFollow()}>
                        <View style={{alignItems: 'center'}}>
                            {
                                Platform.OS === 'android' ?
                                    <Image style={styles.navIcon}
                                           source={this.props.follower ? require('./img/followed.png') : require('./img/follow.png')}/> :
                                    <Image style={{height: 25, marginBottom: 3}}
                                           resizeMode="contain"
                                           source={this.props.follower ? require('./img/followed.png') : require('./img/follow.png')}/>
                            }
                            <Text style={styles.navText}
                                  allowFontScaling={false}>{this.props.follower ? '已关注' : '关注'}</Text>
                        </View>
                    </TouchableOpacity>

                    {
                        this.props.goodsInfo.get('thirdType') == 1 ?
                            <TouchableOpacity style={styles.navItem} activeOpacity={0.8}
                                              onPress={() => msg.emit('route:goToNext', {
                                                  sceneName: 'ShopHome',
                                                  thirdId: this.props.storeInfo.get('storeId')
                                              })}>
                                <View style={{alignItems: 'center'}}>
                                    <Image style={styles.navIcon} source={require('./img/store1.png')}/>
                                    <Text style={styles.navText} allowFontScaling={false}>店铺</Text>
                                </View>
                            </TouchableOpacity> : null
                    }

                    <TouchableOpacity
                        style={styles.navItem}
                        activeOpacity={0.8}
                        onPress={() => msg.emit('route:goToNext', {sceneName: 'ShoppingCart', haveParent: true})}>
                        <View
                            onLayout={(e) => {
                            }}
                            ref={(view) => this._cartItem = view}>
                            <Image
                                style={[styles.navIcon, {marginLeft: 3}]}
                                source={require('./img/cart_icon.png')}/>

                            <Text style={styles.navText} allowFontScaling={false}>购物车</Text>
                        </View>
                        {shoppingCount == 0 ? null :
                            <View
                                style={[styles.bage, this.props.goodsInfo.get('thirdType') == 1 && {right: (SCREEN_WIDTH - 120) / 6 - 25}]}>
                                <Text
                                    style={styles.bageText}
                                    allowFontScaling={false}>
                                    {shoppingCount}
                                </Text>
                            </View>
                        }
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={[styles.addCart, disableAddCart && {backgroundColor: '#B6B6B6'}]}
                    activeOpacity={disableAddCart ? 1 : 0.8}
                    onPress={this._handleAddCart}>
                    <Text style={{color: '#fff', fontSize: 16}} allowFontScaling={false}>加入购物车</Text>
                </TouchableOpacity>
            </View>
        )
    }


    /**
     * 添加购物车
     */
    _handleAddCart() {
        //没有库存
        if (!this.props.goodsInfo.get('stock') || this.props.goodsInfo.get('stock') <= 0 || this.props.goodsInfo.get('addedStatus') == 0
            || !this.props.goodsInfo.get('id') || !this.props.goodsInfoExist) {
            return;
        }

        const handle = findNodeHandle(this._cartItem);
        opacityValue.setValue(0);

        this.requestAnimationFrame(() => {
            opacityValue.setValue(1);
            UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
                const _x = SCREEN_WIDTH - pageX - width;

                Animated.parallel([
                    Animated.timing(rightValue, {
                        toValue: _x,
                        duration: 600
                    }),
                    Animated.timing(scaleValue, {
                        toValue: 0.5,
                        duration: 600
                    }),

                    Animated.sequence([
                        Animated.timing(bottomValue, {
                            toValue: 100,
                            duration: 300
                        }),
                        Animated.timing(bottomValue, {
                            toValue: 40,
                            duration: 300
                        })
                    ])
                ]).start(this._handdleHiddenImg);
            })
        });
    }


    /**
     * 隐藏图片
     */
    _handdleHiddenImg() {
        opacityValue.setValue(0);
        rightValue.setValue(45);
        bottomValue.setValue(30);
        scaleValue.setValue(1);

        msg.emit('goods:addShoppingCart', this.props.goodsInfo.get('id'), this.props.spec.get('chosenNum'), false);
    }


    _handleFollow() {

        if(window.token){
            if (this.props.goodsInfoExist) {
                this.props.follower ? this.props.dispatch(followType(this.props.goodsInfo.get('id'),'delete')) :
                    this.props.dispatch(followType(this.props.goodsInfo.get('id'),'add'));
            }
        }else {


        }

    }


    getStyle() {
        return [
            styles.goodImg,
            {
                right: rightValue,
                bottom: bottomValue,
                opacity: opacityValue,
                transform: [
                    {scale: scaleValue}
                ]
            }
        ]
    }
}

const styles = StyleSheet.create({
    bottomBar: {
        height: 60,
        flexDirection: 'row',
    },
    navBar: {
        flex: 1,
        backgroundColor: '#333',
        flexDirection: 'row',
    },
    addCart: {
        width: 120,
        backgroundColor: '#e63a59',
        alignItems: 'center',
        justifyContent: 'center',
    },
    navItem: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
    },
    navIcon: {
        width: 25,
        height: 25,
        marginBottom: 3
    },
    navText: {
        fontSize: 12,
        color: '#fff',
    },
    bage: {
        position: 'absolute',
        top: Platform.OS === 'android' ? 5 : 7,
        right: (SCREEN_WIDTH - 120) / 4 - 25,
        height: 15,
        backgroundColor: '#f00',
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bageText: {
        fontSize: 12,
        color: '#fff',
    },
    goodImg: {
        width: 30,
        height: 30,
        position: 'absolute'
    }
});

