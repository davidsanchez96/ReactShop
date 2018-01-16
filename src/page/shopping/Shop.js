/**
 * 购物车列表
 */


'use strict';

import React, {Component} from 'react';
import {
    Dimensions, findNodeHandle, Image, InteractionManager, PixelRatio, Platform, RefreshControl, ScrollView,
    StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import {List, Map} from 'immutable';


import {connect} from "react-redux";
import Badge from "../components/Badge";
import GoShopping from "../components/GoShopping";
import CartItem from "../components/CartItem";
import {shopList} from "../../action/shopListActions";

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const cartIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAYAAACo29JGAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjI3MDM2RTI3NjBBMTFFNUJDMzVGOUQ3Q0M1OTVEOUIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjI3MDM2RTM3NjBBMTFFNUJDMzVGOUQ3Q0M1OTVEOUIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCMjcwMzZFMDc2MEExMUU1QkMzNUY5RDdDQzU5NUQ5QiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCMjcwMzZFMTc2MEExMUU1QkMzNUY5RDdDQzU5NUQ5QiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pibw6G4AAAPlSURBVHja7FptaE1xGD+Xa7vYhsWKqEWkhS+bRqJtWAzzAYUbPqiR8kFePmyKi0gI+bakFMp8WJGZbLOND17K5OW6MWqTt0LLvBvX7+k+//rvdO62837u7T7127Nzz9n/nt95nv/zduaLRqNKssogJYklRS5FzoPipx/V1dVNUMX9XNsIhCoqKm7FuwDruEoG92bYcvOBVhCYnlBuCcYlUOlAgLUW6vhvliaUWzLB331dCItdhipjCx5KtoDSyLoYRAOJQM6np0IBqbdQY4GFsHSDxvkpLkfgbKAD9/aml1sOUGqBLRxZG1TELkCt8YDBPgJjjJC7yuQoqFSpzrUDEfIGwOmClb5vJHvVB6NumQHVzYejYf5PHspz+4HdwE7c11HdFQr+6CvUPT4s8lj8WKkKfIY2f52U1L0itMemAt9hgDYz5EQgWeYhcvNYXzFbON8FeoDx2GO5HiNXb4oczN4jWa9E45JMh0EFxRL+7hua5ZdOuQYsAkqBM9Ln54Cgw1b7xbVvRCRvs/1cE+vFqs9HSHnHqfyWrgp05sjhCT2B6gKyVC0QBZksYBgw1CFUqR64abcU1UqQXfOx9Hm3w25ZzvqmlWMGsXlXuBglKZgUAs8ox1lJTjyp2XDNTJfIiULivKUDIuy7TqhXosdziVy5tEUUKy0nLzrXJXKrgM/Awz7HDCZccyu7JlXiax2eIoyi5rTfGYpBaWY9h+G0UJ77AgwB/pgaM8Tp8agFmglsYjd1eszwXhBTzy39Fixez+So5XB3KmtxQJHbjKDiMTFNDq5wH4o69By2XlJZjuS6B7tzy8iJUqzUS+T8Fq3TLFUMrQ5zeEG7A/hrF7mXvO8yXKhW6Ps220aORg/c101wMHn7+PdOrQRuSRJXJXRX95gdSVxLaL4yC0gDHgE1wD+LXHAB15TPOcd22B1QhFBfV6uREg5wBd9mYt0afmiynAK2ASfsTAVCbjOxd8BeYJcSm3NOUmJjeCN7kvbWHSZG07V8YBqwj88fB1bbSg77bQPUDCAMTARCwBF2zxr2kmMGlqaCPI+JrQMeAE+BPUAlX3OaOwPbLCdmKTuAnxo3SLIcGKxzXfHOL6Rxjl5f0+vu4UCBneSypaSqli7WaQw9ksU6XkASn+fYSa6dtdYLkgKp9/qhc90I60qNc+QlgXgP1UpyZ1kfVnq/Q6D9d1F1ja7tzHojcBLIBcYB23lPiwcbtjuJUydexodhtlI+H1MEnQx8M/jg1vdxvghoMfMfRAMRettyieu8PIkYpYNCg8RIKBIfVGIv84XQEPY1N8kttpdfSdeJp8ilyKXIpcgJ+S/AANNC9+pEQUUnAAAAAElFTkSuQmCC';

class Shop extends Component {
    static navigationOptions = {
        tabBarLabel: '购物车',
        tabBarIcon: ({tintColor}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Image source={{uri: cartIcon, scale: 2}}
                       style={{
                           width: 25,
                           height: 25,
                           tintColor: tintColor,
                       }}
                />
                <Badge badge={223}/>
            </View>
        ),
        title: '购物车',

    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            const {shopListReducer, navigation, dispatch} = this.props;
            dispatch(shopList())
            // msg.emit('cart:cartlist');
            // if (window.update) {
            //     msg.emit('app:checkVersion');
            // }
        });
        // if (Platform.OS === 'ios') {
        //     JPushModule.setBadge(0, (badgeNumber) => {
        //     });
        // }
    }


    render() {
        const {shopListReducer, navigation, dispatch} = this.props;
        //是不是正在loading
        const isLoading = shopListReducer.get('loading');

        //根据条件是否显示左侧箭头
        const left = {};
        if (!this.props.haveParent) {
            left['renderLeft'] = () => null;
        }

        return (
            <View
                style={[{
                    flex: 1,
                    backgroundColor: '#eee'
                },]}
                onStartShouldSetResponderCapture={(e) => {
                    this._handleCapture(e);
                    return false;
                }}>


                {/*<QMSwipeRefreshView*/}
                {/*ref={(view) => this._listView = view}*/}
                {/*onRefreshStart={(onRefreshEnd) => msg.emit('cart:cartlist', onRefreshEnd)}*/}
                {/*needInitLoading={isLoading}>*/}


                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={isLoading}
                            onRefresh={() => {
                                if (window.token) {
                                    dispatch(shopList());
                                } else {

                                }
                            }}
                        />
                    }
                >

                    {this._renderContent(shopListReducer)}
                </ScrollView>
                {/*</QMSwipeRefreshView>*/}

                {this._renderEditableView(shopListReducer)}
            </View>
        )
    }


    /**
     * 内容部分
     * @returns {*}
     * @private
     */
    _renderContent(shopListReducer) {
        const cart = shopListReducer.get("cart");
        const checkedList = shopListReducer.get("checkedList");

        if (cart.isEmpty()) {
            return <GoShopping/>
        } else {
            return cart.map((v, i) => (
                <CartItem
                    ref={'cart' + i}
                    key={i}
                    cart={v}
                    index={i}
                    listView={this._listView}
                    onSwipe={this._onSwipe}
                    checkedList={checkedList}
                    callBackParent={(newChecked) => this.onChildChanged(newChecked)}
                    updateData={(newSubtotal, discount) => this.updateData(newSubtotal, discount)}
                />
            ));
        }
    }


    /**
     * 编辑状态的视图
     *
     * @private
     */
    _renderEditableView(shopListReducer) {
        const cart = shopListReducer.get("cart");
        const editable = shopListReducer.get("editable");

        if (cart.isEmpty()) {
            return null;
        }

        if (editable) {
            return (
                <View style={[styles.settlement, styles.editBar]}>
                    {/*左侧全选*/}
                    <TouchableOpacity
                        onPress={this._handleCheck}
                        style={{flexDirection: 'row', alignItems: 'center'}}
                        activeOpacity={0.8}>
                        <Image
                            style={[styles.check, {marginRight: 5}]}
                            source={store.get("checkedAll") ? require('../components/img/checked.png') : require('../components/img/uncheck.png')}/>
                        <Text allowFontScaling={false}>全选</Text>
                    </TouchableOpacity>

                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity
                            style={[styles.editBtn, {borderColor: '#e63a59'}]}
                            activeOpacity={0.8}
                            onPress={() => msg.emit('cart:deleteAll')}>
                            <Text style={{color: '#e63a59'}} allowFontScaling={false}>删除</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={styles.settlement}>
                    <View style={styles.settlementInfo}>
                        <TouchableOpacity
                            onPress={() => this._handleCheck()}
                            style={{flexDirection: 'row', alignItems: 'center', height: 60}}
                            activeOpacity={0.8}>
                            <Image
                                style={[styles.check, {marginRight: 5}]}
                                source={shopListReducer.get("checkedAll") ? require('../components/img/checked.png') :
                                    require('../components/img/uncheck.png')}/>
                            <Text style={{color: '#fff'}} allowFontScaling={false}>全选</Text>
                        </TouchableOpacity>
                        <View style={{marginLeft: 10}}>
                            <Text style={styles.totalPrice}
                                  allowFontScaling={false}>合计：&yen;&nbsp;{shopListReducer.get("totalPrice") < 0 ? 0.01 :
                                shopListReducer.get("totalPrice")}</Text>
                            {
                                SCREEN_WIDTH <= 320 ?
                                    <Text style={{color: '#fff', fontSize: 11}}
                                          allowFontScaling={false}>总额：&yen;{shopListReducer.get("sumPrice")}</Text> :
                                    <Text style={{color: '#fff', fontSize: 11}}
                                          allowFontScaling={false}>总额：&yen;{shopListReducer.get("sumPrice")}&nbsp;
                                        优惠：&yen;{shopListReducer.get("yhPrice")}</Text>
                            }
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.settlementBtn}
                        activeOpacity={0.8}
                        onPress={() => this._handleSubmit()}>
                        <Text style={{fontSize: 18, color: '#fff'}} allowFontScaling={false}>去结算<Text
                            style={{fontSize: 14}}>({shopListReducer.get("cartNum")})</Text></Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }

    _handleCheck() {
        msg.emit('cart:checkedAll');
    }


    _handleSubmit() {
        const store = appStore.data();

        let presentGoodsInfoList = new List;

        const checkedList = store.get("checkedList");
        const canCouponUse = store.get('canCouponUse');
        if (checkedList.isEmpty()) {
            msg.emit('app:tip', '请选择商品');
        } else {

            //检查抢购数量不能大于限购数量
            //循环商家
            let isCheck = false;
            store.get("cart").map((c, i) => {
                //循环促销
                c.get("marketingList").map((m, j) => {
                    let presentGoodsInfo = new Map;
                    presentGoodsInfo = this._submitQueryGoodsPresent(m, checkedList, presentGoodsInfo);
                    if (presentGoodsInfo != null && presentGoodsInfo.get("marketingId") != null) {
                        presentGoodsInfoList = presentGoodsInfoList.push(presentGoodsInfo);
                    }
                    //循环商品
                    m.get("productResponseList").map((p, q) => {
                        //如果选中的是当前这个
                        if (checkedList.has(p.get("shoppingCartId"))) {
                            if (m.get("codexType") == "11") {
                                //抢购
                                //如果选择的商品数量大于限购数量,给出提示
                                var limitNumber = m.get("rushDiscountResponse").get("limitation");
                                if (limitNumber < p.get("goodsNum")) {
                                    msg.emit('app:tip', '购买数量不能大于最大限购数量' + limitNumber);
                                    isCheck = true;
                                    return;
                                }
                            }

                        }
                    });
                });

            });

            if (!isCheck) {
                msg.emit('route:goToNext', {
                    sceneName: 'CartOrder',
                    checkedList: checkedList,
                    presentGoodsInfoList: presentGoodsInfoList
                });
            }

        }

    }


    renderRight() {
        const store = appStore.data();
        const cart = store.get("cart");
        const editable = store.get("editable");

        if (cart.isEmpty()) {
            return null;
        } else {
            return (
                <TouchableOpacity
                    style={{height: 39, justifyContent: 'center', paddingLeft: 20}}
                    onPress={() => msg.emit('cart:editAll')}
                    activeOpacity={0.8}>
                    <Text style={{color: '#666'}} allowFontScaling={false}>{editable ? '完成' : '编辑'}</Text>
                </TouchableOpacity>
            );
        }
    }

    _onSwipe(swipe) {
        this._currentSwipe = swipe;
    }


    _handleCapture(e) {
        if (this._currentSwipe) {
            try {
                if (e.nativeEvent.target != findNodeHandle(this._currentSwipe)) {
                    this._currentSwipe._close();
                    this._currentSwipe = undefined;
                }
            } catch (e) {
                //
            }
        }
    }

    /**
     * 查询满赠规则下的赠品显示
     * @param cursor
     * @param marketing
     * @param store_index
     * @param marketing_index
     */
    _submitQueryGoodsPresent(marketing, checkedList, presentGoodsInfo) {
        //满赠
        if (marketing.get("codexType") == "6") {
            var nums = 0;
            var sumPrice = 0;
            var oldNums = 0;
            var oldSumPrice = 0;
            var count = 0;
            marketing.get("productResponseList").map((p) => {
                if (p.get("marketingActivityId") == marketing.get("marketingId")) {
                    if (checkedList.has(p.get("shoppingCartId"))) {
                        nums += p.get("goodsNum");
                        sumPrice += p.get("warePrice") * p.get("goodsNum");
                        count++;
                    }
                    oldNums += p.get("goodsNum");
                    oldSumPrice += p.get("warePrice") * p.get("goodsNum");
                }
            });
            if (count != 0) {
                if (oldNums == nums && oldSumPrice == sumPrice) {
                    presentGoodsInfo = marketing.get("presentGoodsInfo");
                } else {
                    marketing.get("fullBuyPresentMarketingList").map((f) => {
                        if (f.get("presentType") == "0") {
                            if (f.get("fullPrice") <= sumPrice) {
                                presentGoodsInfo = f;
                            }
                        } else {
                            if (f.get("fullPrice") <= nums) {
                                presentGoodsInfo = f;
                            }
                        }
                    });
                }
            }
        }
        return presentGoodsInfo;
    }
}

const styles = StyleSheet.create({
    check: {
        marginRight: 20,
        width: 20,
        height: 20
    },
    settlement: {
        height: 60,
        flexDirection: 'row'
    },
    settlementInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#333'
    },
    settlementBtn: {
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e63a59'
    },
    totalPrice: {
        color: '#fff',
        fontSize: 16,
        marginBottom: 5
    },
    editBar: {
        backgroundColor: '#eaedf1',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'space-between'
    },
    editBtn: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderWidth: 1 / PixelRatio.get(),
        borderColor: '#ccc',
        borderRadius: 5,
        marginLeft: 10,
        backgroundColor: '#fff'
    },
    rightOps: {
        flex: 1,
        justifyContent: 'center',
        position: 'absolute',
        height: 60,
        right: 20,
        top: 20
    }
});


const mapStateToProps = (state) => ({
    shopListReducer: state.get('shopListReducer')
});
export default connect(mapStateToProps)(Shop);
