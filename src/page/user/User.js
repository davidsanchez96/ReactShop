'use strict';
import React, {Component} from 'react';
import {
    View,
    ScrollView,
    Text,
    PixelRatio,
    StyleSheet,
    AsyncStorage,
    TouchableOpacity,
    Image,
    ImageBackground,
    Platform,
    Animated,
    Dimensions,
    InteractionManager
} from 'react-native';

import {connect} from "react-redux";
import NavItem from "../components/NavItem";
import {
    browse, user, userFollow, userLevel, userOrder, userRecord, userStatus,
    userUnread
} from "../../action/userActions";
import Immutable from "immutable";


const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
const memberIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAYAAACo29JGAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjI3MDM2REU3NjBBMTFFNUJDMzVGOUQ3Q0M1OTVEOUIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjI3MDM2REY3NjBBMTFFNUJDMzVGOUQ3Q0M1OTVEOUIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCMjcwMzZEQzc2MEExMUU1QkMzNUY5RDdDQzU5NUQ5QiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCMjcwMzZERDc2MEExMUU1QkMzNUY5RDdDQzU5NUQ5QiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pu+MDF8AAAPaSURBVHja7Jp7SBVBFMb3mlGRvYzU6KmWmb2ESIxKEDUSCZLCoD/6pxApCakoKoPIiiAqAqOSCDKhSIoSIy1BMqgspLLUpKDsSZSVtwJDwr7D/RYWUTDv7M4ie+Dju3MfM/5m9p6dOVdfd3e3MVgjxBjE4cF5cC6MULs6LikpSYCtgtKguVAEX/JDrdBd6DpU11cfubm57oID1BzYPmhNH28ZDS2itkIPof3QDVdflgArgD23gJ2DcqB4aAwUBk2HMqHD0BcoCaqEzroWDmDFsONsnoEmQxugcl6Gcjn+htqgKmgXNAnazs/Ie+9BQ1wFBzBZhc1s5uC7kgd96MdHu6Cj/E6+hxZDd1wDB7DlsJ1sZgCqfADdNEGJ0FdoCYH1wgHMB7vEZgHAaoLorp2Z1WCiidO9chuhcVAzwE4omOxG6CQfH9MNZ16OOxQmud30LFwZ47XAYeBoWCzUiVVTeY/yM5sa3ARoWbkk+m0bNjjV9GRdcLH0JzbAtdKn6IILo3fYANfRYwzH4TrpI2yAM/v8owuujR5nA1wM/aMuuMf0FTbALaU/1QX3DPoBTcBtIVEx3Gr6NS1wuLdJ2ayYzUMKwfKhkTJ5GOOVzh2KuUXKxOqlKgATqCOW/aW+7Rdm9rtsmNmsAGCEgpv3cKiG0nvk4Ya5ivekBgDGDLCrCh53ZMKyXXNYBWAmT9Fy+m4F4Pr/zIxynlvJk7ocWH+5qswAQJn1MiNQdDoPwPssHUzr5e3h3BRfMQJVsARm3/mWrVfQ4VP9WwGgFsIuQLMtT7+APkEyWBRhrHEA2tvLhAX1t4QqBpsBWwAN7fFSPGWNR9BVqDTYnYitcICK58yvszz9EqqHWqA3vOF30l8zcdgaoQrACmFFlqdOQxdxSdXhtWC6lhLfXy1w+MNH8bJK51NSqzwIqHcKJl32rZEYIxv91TuaLTFoJDe1AvbZCJT08hSBSUgleiL0AGNlOQaHwaTW3wBF8zuVEGRJr7eQWugpPq7EmGlOrZxUhKUMXg+oZOibTflgk2XvWgPAqbbCYQDZaiUydS+zO9th4rbBLrN5yzY4ntm2sJmOgbsMBwLjrDUCvyPMYma2ZeVK6ZIRWwxnwzy8FgFwrFI4dJgCmydVKYAVOgwmqyc/UN5ks1D1yu0xV83QF+bvePmY7BAlcOgonKnZvFFrCaxeM08Ow3g8UrJyGfRaDOA39EYZXRlcquWkrDtq6Smq4MyyXZML4BrpM1XBmSfpt7rJ8LWQ8nq7ymwZRe8w3BE+lXDtBPO7BE4y5k8tNRQ3hfdfex6cB+fBeXD9iX8CDAAgbBK3SXmMEQAAAABJRU5ErkJggg==';

class User extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return !Immutable.is(Immutable.Map(this.props.userReducer), Immutable.Map(nextProps.userReducer)) ||
            !Immutable.is(Immutable.Map(this.state), Immutable.Map(nextState));
    }
    static navigationOptions = ({navigation}) => {
        return {
            tabBarLabel: '我的',
            tabBarIcon: ({tintColor}) => (
                <Image source={{uri: memberIcon, scale: 2}}
                       style={{
                           width: 25,
                           height: 25, tintColor: tintColor
                       }}
                />
            ),
            title: '我的',
            headerRight:
                <TouchableOpacity
                    style={{padding: 10}}
                    activeOpacity={0.8}
                    onPress={() => {
                    }}>
                    <Image
                        style={styles.settingIcon}
                        source={require('../components/img/setting.png')}/>
                </TouchableOpacity>
            ,
        }
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            if (window.token) {
                this.props.dispatch(user());
                this.props.dispatch(userLevel());
                this.props.dispatch(userFollow());
                this.props.dispatch(userRecord());
                this.props.dispatch(userStatus());
                this.props.dispatch(userUnread());
                this.props.dispatch(userOrder());
            } else {
                this.props.dispatch(browse());
            }
            //     if (window.update) {
            //         msg.emit('app:checkVersion');
            //     }
            // });
            // if (Platform.OS === 'ios') {
            //     JPushModule.setBadge(0, (badgeNumber) => {
        });
        // }
    }

    componentWillMount() {
        this._opacity = new Animated.Value(0);
        // msg.emit('customers:pointConfig');
    }

    componentDidUpdate() {
        Animated.timing(this._opacity, {
            toValue: 1,
            duration: 300
        }).start();
    }

    render() {
        const {userReducer,navigation} = this.props;
        const isLoading = userReducer.getIn('loading');

        return (
            <View style={styles.container}>


                <ScrollView automaticallyAdjustContentInsets={false} bounces={false}>

                    {this._renderImageContent(userReducer,navigation)}

                    {this._renderMyOrderContent()}
                    {/*待付款 + 待收货 + 退款退货*/}
                    {this._renderOrderContent(userReducer)}

                    {this._renderMyAssets()}

                    {this._renderAssets()}

                    {this._renderItemContent(userReducer)}


                </ScrollView>


            </View>
        );
    }

    /**
     * 首页头部渲染
     */
    _renderImageContent(userReducer,navigation) {
        const store = userReducer;
        const followTotal = store.getIn(['follows', 'total']) || 0;
        const browserecordTotal = store.getIn(['browserecord', 'total']) || 0;
        const myStore = store.get('storage');
        if (__DEV__) {
            console.log(myStore);
        }
        let image = store.getIn(['customer', 'image']) || myStore.image;
        let nickname = store.getIn(['customer', 'nickname']) || myStore.nickname;
        if (__DEV__) {
            console.log('point is ', store.get('point'), store.get('point').name);
            console.log('mystore is ', store.get('storage'));
        }
        let pointName = store.getIn(['point']).name ? store.getIn(['point']).name : myStore.point ? myStore.point.name : '';
        return (
            <ImageBackground
                style={styles.backgroundImage}
                resizeMode='stretch'
                source={require('../components/img/my.png')}>
                <View style={{backgroundColor: 'transparent', flex: 1}}>
                    {
                        window.token
                            ?
                            <TouchableOpacity onPress={() => {
                                navigation.navigate('Account');
                            }
                            } style={styles.head} activeOpacity={0.8}>
                                <View style={styles.headRight}>
                                    {
                                        image ?
                                            <Animated.Image source={{uri: image}}
                                                            style={[styles.logo, {
                                                                opacity: this._opacity,
                                                                marginTop: 20,
                                                                marginLeft: 10
                                                            }]}
                                            />
                                            :
                                            <Animated.Image source={require('../components/img/c_defaultImg.png')}
                                                            style={[styles.logo, {
                                                                opacity: this._opacity, marginTop: 20, marginLeft: 10
                                                            }]}
                                            />
                                    }
                                    <View style={styles.accountRight}>
                                        <Text style={[styles.name]} allowFontScaling={false}>{nickname}</Text>
                                        <Text style={[styles.pointLevel]} allowFontScaling={false}>{pointName}</Text>

                                        <Text style={styles.linkRight} allowFontScaling={false}>账户管理、收货地址></Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => {
                                navigation.navigate('Login');
                            }}
                                              style={styles.head}
                                              activeOpacity={0.8}>
                                <View style={styles.headLogin}>
                                    <View style={styles.imgBox}>
                                        <ImageBackground source={require('../components/img/unlogin_img.png')}
                                               style={[styles.logo, {marginLeft: 0}]}>
                                            <Text style={styles.unlogin} allowFontScaling={false}>登录</Text>
                                        </ImageBackground>
                                    </View>
                                </View>
                            </TouchableOpacity>
                    }
                </View>
                {/*关注 + 浏览记录*/}
                <View style={styles.attention}>
                    <TouchableOpacity onPress={()=>{
                        navigation.navigate('Follow')
                    }} style={styles.attentionColumn} activeOpacity={0.8}>
                        <Text style={styles.attentionColumnRow} allowFontScaling={false}>{followTotal}</Text>
                        <Text style={styles.attentionColumnRow} allowFontScaling={false}>关注的商品</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._browseRecord} style={styles.attentionColumnWithBorder}
                                      activeOpacity={0.8}>
                        <Text style={styles.attentionColumnRow} allowFontScaling={false}>{browserecordTotal}</Text>
                        <Text style={styles.attentionColumnRow} allowFontScaling={false}>浏览记录</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    }

    /**
     * 订单分类渲染
     * @returns {XML}
     * @private
     */
    _renderOrderContent(userReducer) {
        const store = userReducer;
        const orderCounts = store.get('orderCounts') || [];
        return (
            <View style={styles.orderTotal}>
                <TouchableOpacity onPress={this._clickOrder.bind(this, 0)} style={{flex: 1}} activeOpacity={0.8}>
                    <View style={[styles.orderColumnImage]}>
                        <Image source={require('../components/img/c_pay.png')} style={styles.orderImage}/>
                        {
                            window.token && orderCounts.get('NOPAY') != 0 && orderCounts.get('NOPAY') != undefined
                                ?
                                <Animated.View style={[styles.tipBox, {opacity: this._opacity}]}>
                                    <Text style={styles.orderColumnRowAbsolute} allowFontScaling={false}>
                                        {orderCounts.get('NOPAY')}
                                    </Text>
                                </Animated.View> : null
                        }
                    </View>
                    <View style={styles.attentionColumn}>
                        <Text style={styles.orderColumnRow} allowFontScaling={false}>待付款</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={this._clickOrder.bind(this, 2)} style={{flex: 1}} activeOpacity={0.8}>
                    <View style={[styles.orderColumnImage]}>
                        <Image source={require('../components/img/c_notconsign.png')} style={styles.orderImage}/>
                        {
                            window.token && orderCounts.get('YESSEND') != 0 && orderCounts.get('YESSEND') != undefined
                                ?
                                <Animated.View style={[styles.tipBox, {opacity: this._opacity}]}>
                                    <Text style={styles.orderColumnRowAbsolute}
                                          allowFontScaling={false}>{orderCounts.get('YESSEND')}
                                    </Text>
                                </Animated.View> : null
                        }
                    </View>
                    <View style={styles.attentionColumn}>
                        <Text style={styles.orderColumnRow} allowFontScaling={false}>待收货</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={this._clickOrder.bind(this, 3)} style={{flex: 1}} activeOpacity={0.8}>
                    <View style={styles.orderColumnImage}>
                        <Image source={require('../components/img/c_comment.png')} style={styles.orderImage}/>

                        {
                            window.token && orderCounts.get('YESGET') != 0 && orderCounts.get('YESGET') != undefined
                                ?
                                <Animated.View style={[styles.tipBox, {opacity: this._opacity}]}>
                                    <Text style={styles.orderColumnRowAbsolute}
                                          allowFontScaling={false}>{orderCounts.get('YESGET')}
                                    </Text>
                                </Animated.View> : null
                        }

                    </View>
                    <View style={styles.attentionColumn}>
                        <Text style={styles.orderColumnRow} allowFontScaling={false}>待评价</Text>
                    </View>
                </TouchableOpacity>

            </View>
        )
    }

//我的订单
    _renderMyOrderContent() {
        return (
            <NavItem title='我的订单'
                     content='查看全部订单'
                     imageSource={require('../components/img/c_order.png')}
                     onPress={() => {
                         this._handelOrders()
                     }}
            />
        )
    }

// 我的资产
    _renderMyAssets() {
        return (
            <NavItem title='我的资产'
                     imageSource={require('../components/img/my_assets.png')}
                     showRightImage={false}
            />
        )
    }

// 预存款 提现记录 积分 优惠券
    _renderAssets() {
        return (
            <View style={styles.contentBox}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.contentItem}
                    onPress={() => msg.emit('route:goToNext', {sceneName: 'PreDeposit'})}>
                    <Image source={require('../components/img/pre-deposit.png')} style={styles.contentImage}/>
                    <Text allowFontScaling={false} style={styles.contentText}>预存款</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.contentItem}
                    onPress={() => msg.emit('route:goToNext', {sceneName: 'AccountDetail'})}>
                    <Image source={require('../components/img/present-record.png')} style={styles.contentImage}/>
                    <Text allowFontScaling={false} style={styles.contentText}>账户明细</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.contentItem}
                    onPress={() => msg.emit('route:goToNext', {sceneName: 'MyIntegral'})}>
                    <Image source={require('../components/img/integral.png')} style={styles.contentImage}/>
                    <Text allowFontScaling={false} style={styles.contentText}>积分</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.contentItem}
                    onPress={() => msg.emit('route:goToNext', {sceneName: 'MyCoupon'})}>
                    <Image source={require('../components/img/coupon.png')} style={styles.contentImage}/>
                    <Text allowFontScaling={false} style={styles.contentText}>优惠券</Text>
                </TouchableOpacity>
            </View>
        )
    }


    /**
     * 我的关注 我的消息
     * @returns {XML}
     * @private
     */
    _renderItemContent(userReducer) {
        const store = userReducer;
        return (
            <View style={styles.spanner}>
                {
                    <NavItem title='我的消息'
                             imageSource={require('../components/img/c_message.png')}
                             imageSourceLocal={
                                 store.get('message') > 0
                                     ?
                                     require('../components/img/c_unread_message.png')
                                     :
                                     ''
                             }
                             onPress={() => msg.emit('route:goToNext', {sceneName: 'MessageCenter'})}
                    />
                }
            </View>
        )
    }


    /**
     * 看浏览记录
     * @private
     */
    _browseRecord() {
        msg.emit('customers:browseRecord');
    }


    _account() {
        msg.emit('route:goToNext', {sceneName: 'AccountManager'});
    }


    /**
     * 查询我的关注
     * @private
     */
    _queryFollows() {
        if (__DEV__) {
            console.log('go to follow page ...');
        }
        msg.emit('customers:queryFollows');
    }

    /**
     * 处理点击全部订单
     *
     **/
    _handelOrders() {
        msg.emit('route:goToNext', {sceneName: 'OrderHome', flag: 3});
    }

    /**
     * 点击不同状态的订单
     * @private
     */
    _clickOrder(status) {
        if (status === 3) {//如果是待评价,则需要传递过去一个参数
            msg.emit('route:goToNext', {sceneName: 'OrderHome', status: status, flag: 1});
        } else if (status === 19) {
            msg.emit('route:goToNext', {sceneName: 'OrderHome', status: status, flag: 2});
        } else {
            msg.emit('route:goToNext', {sceneName: 'OrderHome', status: status});
        }
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#EAEAEA',
        marginBottom: Platform.OS === 'ios' ? 50 : 0
    },
    backgroundImage: {
        height: SCREEN_WIDTH <= 320 ? 140 : 160,
        width: SCREEN_WIDTH,
    },
    head: {
        flexDirection: 'row',
        height: 150,
    },
    headRight: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginLeft: 10,
        marginBottom: 10,
        marginRight: 10,
    },
    headLogin: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    accountRight: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    name: {
        color: '#fff',
        marginTop: SCREEN_WIDTH <= 320 ? 30 : 35,
        marginLeft: 10,
        textAlign: 'left',
        fontSize: 14,
    },
    pointLevel: {
        color: '#fff',
        marginTop: SCREEN_WIDTH <= 320 ? 5 : 10,
        marginLeft: 10,
        textAlign: 'left',
        fontSize: 12,
    },
    linkRight: {
        color: '#fff',
        fontSize: 14,
        marginBottom: SCREEN_WIDTH <= 320 ? 60 : 45,
        //marginBottom: SCREEN_HEIGHT / 13,
        textAlign: 'right',
    },
    imgBox: {
        marginTop: 20,
        marginBottom: 10,
        width: SCREEN_WIDTH <= 320 ? 62 : 76,
        height: SCREEN_WIDTH <= 320 ? 62 : 76,
        borderRadius: SCREEN_WIDTH <= 320 ? 31 : 38,
        padding: 3,
        backgroundColor: 'rgba(255, 255, 255, .5)'
    },
    logo: {
        alignItems: 'center',
        width: SCREEN_WIDTH <= 320 ? 56 : 70,
        height: SCREEN_WIDTH <= 320 ? 56 : 70,
        borderRadius: SCREEN_WIDTH <= 320 ? 28 : 35,
    },
    unlogin: {
        marginTop: SCREEN_WIDTH <= 320 ? 35 : 45,
        fontSize: SCREEN_WIDTH <= 320 ? 9 : 10,
        color: '#666'
    },
    attention: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        height: 50
    },
    attentionColumn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    attentionColumnWithBorder: {
        flex: 1,
        borderLeftWidth: 1 / PixelRatio.get(),
        borderLeftColor: '#5A313C',
        alignItems: 'center',
        justifyContent: 'center'
    },
    attentionColumnRow: {
        marginBottom: 5,
        color: '#fff',
        textAlign: 'center',
    },
    orderTotal: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        height: 65,
        marginBottom: 10
    },
    orderColumn: {
        flex: 1,
    },
    orderColumnRow: {
        flex: 1,
        marginTop: 3,
        textAlign: 'center',
        fontSize: 14,
        color: '#666'
    },
    tipBox: {
        position: 'absolute',
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 5,
        marginLeft: -3,
        marginTop: -3,
        backgroundColor: '#fd4062'
    },
    orderColumnRowAbsolute: {
        fontSize: 12,
        color: '#fff'
    },
    orderColumnImage: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'center',
        height: 40,
    },
    orderImage: {
        width: 20,
        height: 20,
    },
    spanner: {
        marginTop: 10,
    },
    recommendImage: {
        width: 25,
        height: 25
    },
    recommendTitle: {
        fontSize: 16,
        marginLeft: 20,
    },
    recommendBar: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20,
        height: 50,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    contentBox: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        height: 65
    },
    contentItem: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 10,
    },
    contentImage: {
        width: 25,
        height: 25,
        marginBottom: 5,
        tintColor: '#999'
    },
    contentText: {
        color: '#666'
    },
    settingIcon: {
        width: 20,
        height: 20,
    },
});

const mapStateToProps = (state) => ({
    userReducer: state.get('userReducer')
});
export default connect(mapStateToProps)(User);
