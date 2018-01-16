'use strict';

import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet, Text, ListView, PixelRatio, Image, Dimensions} from 'react-native';
import {List} from 'immutable';
import GoodItem from "./GoodItem";
import GroupItem from "./GroupItem";
import Tag from "./Tag";
import {ShopListStoreSelect} from "../../utils/actionTypes";

const {width: SCREEN_WIDTH} = Dimensions.get('window');

export default class CartItem extends Component {
    componentDidMount() {
        this.newGoods = [];
        this.props.cart.get("groupResponseList").map((v, i) => {
            this.newGoods.push(v.get("shoppingCartId"));
        });
        this.props.cart.get("marketingList").map((v, i) => {
            v.get("productResponseList").map((s, j) => {
                this.newGoods.push(s.get("shoppingCartId"));
            });
        });
        this.props.cart.get("productResponseList").map((v, i) => {
            this.newGoods.push(v.get("shoppingCartId"));
        });
    }

    render() {
        return (
            <View style={styles.cartItem}>
                {/*商家信息*/}
                {this._sellerContent()}

                <View style={styles.cartBox}>
                    {/*特惠套装*/}
                    {this._groupContent()}
                    {/*参与促销的促销和商品*/}
                    {this._marketingContent()}
                    {/*不参与促销商品*/}
                    {this._noMarketingProducts()}
                    <Text
                        style={styles.goodsPrice}
                        allowFontScaling={false}>
                        小计：&yen;&nbsp;
                        {this.props.cart.get("sumPrice") < 0 ? '0.01' : this.props.cart.get("sumPrice")}
                    </Text>
                </View>
            </View>
        )
    }

    /**
     * 商家信息
     * @returns {XML}
     * @private
     */
    _sellerContent() {
        return (
            <View style={styles.cartTitle}>
                <TouchableOpacity
                    style={{height: 50, justifyContent: 'center'}}
                    onPress={()=>this._handleCheck()}
                    activeOpacity={0.8}>
                    <Image
                        style={styles.check}
                        source={this.props.cart.get("checked") ? require('./img/checked.png') : require('./img/uncheck.png')}/>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.storeTitle}
                    activeOpacity={0.8}
                    onPress={() => this.props.cart.get('storeId') != 0 ? this._goStore(this.props.cart.get('storeId')) : null}>
                    <Image
                        style={styles.house}
                        source={require('./img/store.png')}
                    />
                    <Text
                        style={{fontSize: 16}}
                        allowFontScaling={false}>
                        {this.props.cart.get("storeName")}
                    </Text>

                    {
                        this.props.cart.get("storeId") != 0
                            ? <Image style={styles.arrow} source={require('./img/right.png')}/>
                            : null
                    }
                </TouchableOpacity>
            </View>
        );
    }

    /**
     * 不参与促销的商品
     * @returns {*}
     * @private
     */
    _noMarketingProducts() {
        return (
            this.props.cart.get("productResponseList").map((v, i) => (
                <GoodItem
                    dispatch={this.props.dispatch}
                    ref={v.get("goodsInfoId")}
                    onSwipe={this.props.onSwipe}
                    listView={this.props.listView}
                    index={i}
                    good={v}
                    haveM={false}
                    key={i}
                    checkedList={this.props.checkedList}
                    callBackParent={(newChecked) => this.onChildChanged(newChecked)}/>
            )));
    }

    /**
     *特惠套装
     * @returns {*}
     * @private
     */
    _groupContent() {
        return this.props.cart.get("groupResponseList").map((group, i) => {

                return <GroupItem
                    group={group}
                    key={i}
                    checkedList={this.props.checkedList}
                    callBackParent={(newChecked) => this.onChildChanged(newChecked)}/>
            }
        )
    }

    /**
     * 参与促销的商品信息
     * @returns {*}
     * @private
     */
    _marketingContent() {
        return (this.props.cart.get("marketingList").map((v, i) => {
            this._fullBuyPresentProductResponseList = v.getIn(["presentGoodsInfo", "fullBuyPresentProductResponseList"]) || new List;
            this._fullBuyPresentProductResponseList = this._fullBuyPresentProductResponseList.filter(val => val.get('checked') == true);
            return (
                <View key={i}>
                    <TouchableOpacity
                        style={styles.promotionBar}
                        onPress={() => this._promotion(v.get("productResponseList"))} activeOpacity={0.8}>
                        <View style={styles.promotion}>
                            <Tag tag={v.get("tag")}/>
                            <Text numberOfLines={1}
                                  style={{flex: 1, marginLeft: 10}}
                                  allowFontScaling={false}>
                                {v.get("marketingName")}
                            </Text>
                        </View>
                        <Image style={styles.arrow}
                               source={require('./img/right.png')}/>
                    </TouchableOpacity>
                    {
                        v.get("productResponseList").map((s, j) => (
                                <GoodItem
                                    dispatch={this.props.dispatch}
                                    ref={s.get("goodsInfoId")}
                                    onSwipe={this.props.onSwipe}
                                    listView={this.props.listView}
                                    index={j}
                                    good={s}
                                    haveM={true}
                                    key={j}
                                    checkedList={this.props.checkedList}
                                    callBackParent={(newChecked) => this.onChildChanged(newChecked)}/>
                            )
                        )
                    }
                    <View style={styles.giftContent}>
                        <View>
                            {this._showPresentGoodsInfo()}
                        </View>
                        {
                            this._fullBuyPresentProductResponseList.count() > 0 ?
                                <TouchableOpacity
                                    onPress={() => this._queryPresents(v.getIn(["presentGoodsInfo", "fullBuyPresentMarketingId"]), v.getIn(["presentGoodsInfo", "store_index"]), v.getIn(["presentGoodsInfo", "marketing_index"]))}
                                    activeOpacity={0.8}>
                                    <Text style={{color: '#e63a59'}}>修改赠品</Text>
                                </TouchableOpacity> : null
                        }
                    </View>
                </View>
            )
        }))
    }

    _promotion(list) {
        let marketingId = '';
        list.map((v, i) => {
            if (i == 0) {
                if (v.get('marketingActivityId') != null) {
                    marketingId = v.get('marketingActivityId');
                }

                msg.emit('route:goToNext', {
                    sceneName: 'PromotionInfor',
                    marketingId: marketingId,
                    goodsInfoId: v.get('goodsInfoId'),
                    shoppingCartId: v.get('shoppingCartId')
                })
            }
        });
    }


    _goStore(storeId) {
        msg.emit('route:goToNext',
            {sceneName: 'ShopHome', thirdId: storeId}
        );
    }


    _handleCheck() {
        var goodsArr = this.newGoods;

        if (!this.props.cart.get("checked")) {
            this.props.dispatch({type:ShopListStoreSelect,index:this.props.index,checks:true,goodsArr:goodsArr});
            // msg.emit('cart:changeSellerChecked', this.props.index, this.props.cart.get("storeId"), true, goodsArr);
        } else {
            this.props.dispatch({type:ShopListStoreSelect,index:this.props.index,checks:false,goodsArr:goodsArr});
            // msg.emit('cart:changeSellerChecked', this.props.index, this.props.cart.get("storeId"), false, goodsArr);
        }
    }


    _queryPresents(fullBuyPresentMarketingId, store_index, marketing_index) {
        msg.emit('route:goToNext', {
            sceneName: 'Presents',
            fullBuyPresentMarketingId: fullBuyPresentMarketingId,
            store_index: store_index,
            marketing_index: marketing_index
        })
    }


    //展示赠品
    _showPresentGoodsInfo() {
        return (
            (this._fullBuyPresentProductResponseList || []).map((v, i) => {
                return (
                    <View style={styles.giftName} key={i}>
                        <View style={{flex: 1}}>
                            <Text style={{flex: 1}} numberOfLines={1}>[赠品]{v.get("name")}</Text>
                        </View>
                        <View><Text>x{v.get("scopeNum")}</Text></View>
                    </View>
                )
            })
        );
    }

}

const styles = StyleSheet.create({
    cartItem: {
        backgroundColor: '#fff',
        marginTop: 10
    },
    cartTitle: {
        height: 50,
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'row',
        borderBottomWidth: 1 / PixelRatio.get(),
        borderBottomColor: '#ccc',
        alignItems: 'center'
    },
    storeTitle: {
        flex: 1,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center'
    },
    check: {
        marginRight: 10,
        width: 20,
        height: 20
    },
    house: {
        width: 16,
        height: 16,
        marginRight: 10,
        tintColor: '#e63a59'
    },
    arrow: {
        width: 8,
        height: 16,
        marginLeft: 10
    },
    promotionBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 45,
        paddingRight: 15,
        paddingTop: 15
    },
    promotion: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    goodsPrice: {
        marginTop: 20,
        marginLeft: 45,
        color: '#e63a59',
        paddingBottom: 20
    },
    giftContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 45,
        paddingRight: 15
    },
    giftName: {
        flexDirection: 'row',
        width: (SCREEN_WIDTH - 45) / 2,
        marginTop: 10
    }
});

